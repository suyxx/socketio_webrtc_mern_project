import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import PendingInvitationsListItem from "./PendingInvitationsListItem";

const MainContainer = styled("div")({
  width: "100%",
  height: "22%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const PendingInvitationsList = () => {
  const pendingFriendsInvitations = useSelector(state => state.friends.pendingFriendsInvitations);

  return (
    <MainContainer>
      {pendingFriendsInvitations.map(invitation => (
        <PendingInvitationsListItem
          key={invitation._id}
          id={invitation._id}
          username={invitation.senderId.username}
          mail={invitation.senderId.mail}
        />
      ))}
    </MainContainer>
  );
};

export default PendingInvitationsList;
