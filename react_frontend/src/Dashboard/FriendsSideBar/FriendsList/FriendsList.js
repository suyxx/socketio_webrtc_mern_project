import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const FriendsList = () => {
  const {friends, onlineUsers, pendingFriendsInvitations} = useSelector(state => state.friends);

  const [processedFriends, setProcessedFriends] = useState([]);

  useEffect(() => {
    const checkOnlineUsers = (friends = [], onlineUsers = []) => {
      if (!Array.isArray(friends)) {
        return [];
      }
      return friends.map(friend => ({
        ...friend,
        isOnline: onlineUsers.some(user => user.userId === friend.id)
      }));
    };

    setProcessedFriends(checkOnlineUsers(friends, onlineUsers));
  }, [friends, onlineUsers]);

  return (
  
    <MainContainer>
      {processedFriends.map(friend => (
        <FriendsListItem
          username={friend.username}
          id={friend.id}
          key={friend.id}
          isOnline={friend.isOnline}
        />
      ))}
    </MainContainer>
  );
};
 


export default FriendsList;
