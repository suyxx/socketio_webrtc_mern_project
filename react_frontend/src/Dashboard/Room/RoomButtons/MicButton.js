import React, {useState} from "react";
import { IconButton } from "@mui/material";
import { Mic, MicOff } from "@mui/icons-material";

const MicButton = ({localStream}) => {

    const [micEnabled, setMicEnabled] = useState(true);

    const handleToggleMic = () => {
      localStream.getAudioTracks()[0].enabled = !micEnabled;
        setMicEnabled(!micEnabled);
    };

  return (
    <IconButton onClick={handleToggleMic} style={{color: "white"}}>

        {micEnabled ? <Mic /> : <MicOff />}
      
    </IconButton>
  );
};

export default MicButton;