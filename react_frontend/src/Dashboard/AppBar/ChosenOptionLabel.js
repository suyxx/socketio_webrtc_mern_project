import React from "react";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const ChosenOptionLabel = () => {
  const name = useSelector(state => state.chat.chosenChatDetails?.name);

  return (
    <Typography
      sx={{ fontSize: "16px", color: "white", fontWeight: "bold" }}
    >{`${name ? `Chosen conversation: ${name}` : ""}`}</Typography>
  );
};

export default ChosenOptionLabel;
