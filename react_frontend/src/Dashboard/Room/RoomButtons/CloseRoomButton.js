import React from "react";
import { IconButton } from "@mui/material";
 
import { Close } from "@mui/icons-material";
import * as roomHandler from "../../../realtimeCommunication/roomHandler";

const CloseRoomButton = () => {


    const handleLeaveRoom = () => {
      roomHandler.leaveRoom();
    };

  return (
    <IconButton onClick={handleLeaveRoom} style={{color: "white"}}>

        <Close />
      
    </IconButton>
  );
};

export default CloseRoomButton;