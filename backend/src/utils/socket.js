const socket = require("socket.io");

const initializeSocket = (server) => {
  //handle the cors related problems a
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //these are event handlers for handling the events
  io.on("connection", (socket) => {
    //handle event
    socket.on("joinChat", ({name, userID, targetUserID }) => {
      const roomID = [userID, targetUserID].sort().join("_");
      //sort so that they both join the same room id 
      console.log(name + "is joining room ...", roomID);
      socket.join(roomID);
    });
    socket.on("sendMessage",({ name, userID, targetUserID, input})=>{
      const roomID = [userID, targetUserID].sort().join("_");
      io.to(roomID).emit("messageReceive",{name,input})
    });

  });
  //the parameters we passed in the socket.emit must be same in this
};

module.exports = initializeSocket;
