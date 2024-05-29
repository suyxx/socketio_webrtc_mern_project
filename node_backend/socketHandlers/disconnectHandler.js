const serverStore = require("../serverStore");
const roomLeaveHandler = require("./roomLeaveHandler");

const disconnectHandler = (socket) => {

  const activeRooms = serverStore.getActiveRooms();
  activeRooms.forEach(activeRoom => {
    const isUserInRoom = activeRoom.participants.some((participants) => participants.socketId === socket.id);
    if(isUserInRoom) {
      roomLeaveHandler(socket, {roomId : activeRoom.roomId});
    }
  });
  serverStore.removeConnectedUser(socket.id);
};

module.exports = disconnectHandler;
