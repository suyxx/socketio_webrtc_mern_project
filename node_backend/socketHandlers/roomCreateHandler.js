const serverStore = require("../serverStore");
const updateRooms = require("./updates/rooms");
const roomCreateHandler = (socket) => {
    console.log("handle room create event");
    const socketId = socket.id;
    const userId = socket.user.userId;

    const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

    socket.emit('room-create', {
        roomDetails,
    });
    updateRooms();

}

module.exports = roomCreateHandler;