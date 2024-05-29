import React, {useState} from "react";
import { IconButton } from "@mui/material";
import { ScreenShare, StopScreenShare } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getActions } from "../../../store/actions/roomActions";
import * as webRTCHandler from "../../../realtimeCommunication/webRTCHandler";


const constraints = {
  audio: false,
  video: true,
}

const ScreenShareButton = ( { 
  localStream,
  screenSharingStream,
  isScreenSharingActive,
 } ) => {

    const dispatch = useDispatch();
    const actions = getActions(dispatch); 


    const handleToggleScreenShare = async () => {
        if(!isScreenSharingActive) {
          let stream = null;
          try{
            stream = await navigator.mediaDevices.getDisplayMedia(constraints);
          }catch(e){
            console.error(e);
          }

          if(stream) {
            actions.setScreenSharingStream(stream);
            webRTCHandler.switchOutgoingTracks(stream);
          }
        }else{
          webRTCHandler.switchOutgoingTracks(localStream);
            screenSharingStream.getTracks().forEach(t => {
              t.stop();
            });
            actions.setScreenSharingStream(null);
          }
    };

  return (
    <IconButton onClick={handleToggleScreenShare} style={{color: "white"}}>
        {isScreenSharingActive ? <ScreenShare /> : <StopScreenShare />}
    </IconButton>
  );
};

export default ScreenShareButton;