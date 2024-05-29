import store from "../store/store";
import { setLocalStream, setRemoteStreams } from "../store/actions/roomActions";
import Peer from "simple-peer";
import * as socketConnection from "./socketConnection";

// Configuration function
const getConfiguration = () => {
  const turnIceServers = null;

  if (turnIceServers) {
    return { iceServers: turnIceServers };
  } else {
    console.warn("Using only STUN server");
    return {
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    };
  }
};

// Media constraints
const onlyAudioConstraints = {
  audio: true,
  video: false,
};

const defaultConstraints = {
  video: true,
  audio: true,
};

// Get local stream preview
export const getLocalStreamPreview = (onlyAudio = false, callbackFunc) => {
  const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
      callbackFunc();
    })
    .catch((err) => {
      console.error("Cannot get an access to local stream", err);
    });
};

// Peers object to keep track of connections
let peers = {};

// Prepare new peer connection
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const localStream = store.getState().room.localStream;

  if (!localStream) {
    console.error("Local stream is not available");
    return;
  }

  console.log(`Preparing new peer connection as ${isInitiator ? "initiator" : "not initiator"}`);

  try {
    // Create a new peer
    peers[connUserSocketId] = new Peer({
      initiator: isInitiator,
      config: getConfiguration(),
      stream: localStream,
    });

    console.log("Peers after connection", peers[connUserSocketId]);

    // Event listener for 'signal'
    peers[connUserSocketId].on("signal", (data) => {
      const signalData = {
        signal: data,
        connUserSocketId: connUserSocketId,
      };

      socketConnection.signalPeerData(signalData);
    });

    // Event listener for 'stream'
    peers[connUserSocketId].on("stream", (remoteStream) => {
      console.log("Peers when we get new remote stream", remoteStream);
      console.log("Remote stream came from other user");
      console.log("Direct connection has been established");
      remoteStream.connUserSocketId = connUserSocketId;
      addNewRemoteStream(remoteStream);
    });

    // Additional event listeners for debugging
    peers[connUserSocketId].on("error", (err) => {
      console.error("Peer error:", err);
    });

    peers[connUserSocketId].on("connect", () => {
      console.log("Peer connection established with", connUserSocketId);
    });

    peers[connUserSocketId].on("close", () => {
      console.log("Peer connection closed with", connUserSocketId);
      delete peers[connUserSocketId];
    });

  } catch (e) {
    console.error("Error using peers", e);
  }
};

// Handle signaling data
export const handleSignalingData = (data) => {
  const { connUserSocketId, signal } = data;

  if (peers[connUserSocketId]) {
    console.log("got inside handle signaling data")
    peers[connUserSocketId].signal(signal);
  }
};

// Add new remote stream
const addNewRemoteStream = (remoteStream) => {
  console.log("Adding new remote stream", remoteStream);
  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = [...remoteStreams, remoteStream];
  store.dispatch(setRemoteStreams(newRemoteStreams));
};

// Close all connections
export const closeAllConnections = () => {
  if (peers) {
    Object.entries(peers).forEach(([connUserSocketId, peer]) => {
      if (peer) {
        peer.destroy();
        delete peers[connUserSocketId];
      }
    });
  }
};

// Handle participant left room
export const handleParticipantLeftRoom = (data) => {
  const { connUserSocketId } = data;

  if (peers[connUserSocketId]) {
    peers[connUserSocketId].destroy();
    delete peers[connUserSocketId];
  }

  const remoteStreams = store.getState().room.remoteStreams;
  const newRemoteStreams = remoteStreams.filter(
    (remoteStream) => remoteStream.connUserSocketId !== connUserSocketId
  );

  store.dispatch(setRemoteStreams(newRemoteStreams));
};

// Switch outgoing tracks
export const switchOutgoingTracks = (stream) => {
  for (let socketId in peers) {
    const peer = peers[socketId];
    if (peer) {
      for (let track of peer.streams[0].getTracks()) {
        for (let newTrack of stream.getTracks()) {
          if (track.kind === newTrack.kind) {
            peer.replaceTrack(track, newTrack, peer.streams[0]);
            break;
          }
        }
      }
    }
  }
};
