import React from "react";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import Video from "./Video";

const MainContainer = styled('div')({
  height: "85%",
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
});

const VideoContainer = () => {
  const room = useSelector(state => state.room);
  const { localStream, remoteStreams, screenSharingStream } = room;
  console.log("local stream in video container ", localStream);
  console.log("remote stream in video container ", remoteStreams);

  return (
    <MainContainer>
      <Video
        stream={screenSharingStream ? screenSharingStream : localStream}
        isLocalStream
      />
      {remoteStreams.map((stream) => (
        <Video stream={stream} key={stream.id} />
      ))}
    </MainContainer>
  );
};

export default VideoContainer;
