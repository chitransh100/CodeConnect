require('dotenv').config()
const express = require("express");
const http=require("http")
const app = express();
const PORT = 7777;
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter=require("./routes/authRouter.js");
const profileRouter=require("./routes/profileRouter.js");
const requestRouter=require("./routes/requestRouter.js");
const userRouter=require("./routes/userRouter.js");
const cors=require("cors");
const initializeSocket = require('./utils/socket.js');
const chatRouter = require('./routes/chatRouter.js');

//create the app as the server 
const server=http.createServer(app);
//handle the server related stuffs
initializeSocket(server);

connectDB().then(() => {
    console.log("connected to DB");
    server.listen(PORT, (error) => {
      if (!error) {
        console.log(`Server is listening on port ${PORT}`);
      } else {
        console.error("Error in starting the server:", error);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:5173", "https://code-connect-lilac.vercel.app"],
  credentials:true
}))
//middleware

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter)
app.use("/",userRouter)
app.use("/",chatRouter);

app.get('/', (req, res) => {
  res.send("chitransh's app");
})