import React, {useState} from "react";
import { styled } from "@mui/system";
import ResizeRoomButton from "./ResizeRoomButton";
import VideoContainer from "./VideoContainer";
import RoomButtons from "./RoomButtons/RoomButtons";


const MainContainer = styled('div')({
    position: 'absolute',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202225',
});

const fullScreenRoomStyle = {
    width: "100%",
    height: "100vh",
};

const minimisedRoomStyle = {
    bottom: "0px",
    right: "0px",
    width: "30%",
    height: "40vh",
};


const Room = () => {

  const [isRoomMinimised, setIsRoomMinimised]  = useState(true);

  const roomResizeHandler = () => {
    setIsRoomMinimised(!isRoomMinimised);
  };

  return (
    <MainContainer style={isRoomMinimised ? minimisedRoomStyle : fullScreenRoomStyle}>
      <VideoContainer />
        <RoomButtons />
        <ResizeRoomButton 
        isRoomMinimized={isRoomMinimised}
        handleRoomResize={roomResizeHandler}
        />
    </MainContainer>
  );
};

export default Room;
