import { styled } from "@mui/system";

import React, { useReducer, useState } from "react";
import ScreenShareButton from "./ScreenShareButton";
import MicButton from "./MicButton";
import CloseRoomButton from "./CloseRoomButton";
import CameraButton from "./CameraButton";
import { useSelector } from "react-redux";
import RecordingButton from "./RecordingButton";


const MainContainer = styled('div')({
  height: '15%',
  width: '100%',
  backgroundColor: '#5865f2',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
});



const RoomButtons = ({}) => {

  const room = useSelector(state => state.room);
  const { localStream, isUserJoinedWithOnlyAudio } = room;
 

  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton room={room}/>}
      <MicButton localStream={localStream}/>
      <RecordingButton
       
      />
      <CloseRoomButton />
     {!isUserJoinedWithOnlyAudio &&  <CameraButton localStream={localStream}/>}
    </MainContainer>
  );
};

export default RoomButtons;
