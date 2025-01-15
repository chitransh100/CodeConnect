const express = require("express");
const app = express();
const PORT = 7777;
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const authRouter=require("./routes/authRouter.js")
const profileRouter=require("./routes/profileRouter.js")
const requestRouter=require("./routes/requestRouter.js")
const userRouter=require("./routes/userRouter.js")

connectDB().then(() => {
    console.log("connected to DB");
    app.listen(PORT, (error) => {
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
//middleware

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter)
app.use("/",userRouter)