const socket = require("socket.io");
const Chat=require("../models/chat")

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


    socket.on("sendMessage",async({ name, userID, targetUserID, input})=>{  

      const roomID = [userID, targetUserID].sort().join("_");
      //save the messages 
      try{ 
        
        let chat=await Chat.findOne({participants:{$all: [targetUserID,userID]}})
        // console.log(chat)
        if(!chat){
          chat=new Chat({
            participants:[targetUserID,userID],
            messages:[]
          })
        }
        // console.log(chat)

        chat.message.push({
          senderID:userID,
          text: input
        })
        // console.log(chat)

        await chat.save()

      }catch(err){
        console.log(err.message)
      }

      io.to(roomID).emit("messageReceive",{senderID,input})
    });

  });
  //the parameters we passed in the socket.emit must be same in this
};

module.exports = initializeSocket;