const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/User");
//get all the accepted connection request of the logged in user
//the user can be to user or from user
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    console.log(loggedInUser._id);
    const status = "accepted";
    const acceptedConnections = await ConnectionRequest.find({
      $or: [{ fromUserID: loggedInUser._id }, { toUserID: loggedInUser._id }],
      status,
    })
      .populate("fromUserID", "firstName lastName")
      .populate("toUserID", "firstName lastName");
    const data = acceptedConnections.map((row) => {
      if (row.fromUserID._id.toString() === loggedInUser._id.toString()) {
        return row.toUserID;
      }
      return row.fromUserID;
    });
    if (acceptedConnections.length === 0) {
      throw new Error("No connections found");
    }
    res.send({ data });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//get all the received connection requests of the logged in user //contains a bug
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const status = "intrested";
    const receivedConnections = await ConnectionRequest.find({
      toUserID: loggedInUser._id,
      status,
    }).populate("fromUserID", "firstName lastName age");
    //.populate("fromUserId",["firstName","lastName"])
    if (receivedConnections.length === 0) {
      throw new Error("No received requests");
    }
    res.send(receivedConnections);
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
});

//get the feed of the user such that it does not get his own id and id to whome he has send the request of any kind
userRouter.get("/user/feed", userAuth, async (req, res) => {
  const loggedInUser = req.user;
  const skip=parseInt(req.params.page) || 1
  let limit=parsrInt(req.params.limt) || 10
  limit=limit > 50 ? 50 : limit 
  //if the user wants to see more than 50 users then set it to 50 
  skip=(page-1)*limit;
  //find all the users to whome the user has send or received the request
  try {
    const requestUsers = await ConnectionRequest.find({
      // fromUserID:loggedInUser._id
      $or: [{ fromUserID: loggedInUser }, { toUserID: loggedInUser }],
    });
    //this will get me the requestid of the person i want to hide in the feed
  const hideUsersFromFeed = new Set(); //we will use the set to store teh not allowed ones so that we get unique ids
    requestUsers.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserID.toString()),
        hideUsersFromFeed.add(req.toUserID.toString());
    });//function to run on each requestUser object and include the id in the hideUser..... 
    const feed = await User.find({
      $and: [//logic operators
        { _id: { $nin: Array.from(hideUsersFromFeed) } },//$nin not in array 
        { _id: { $ne: loggedInUser._id } },//$ne not equals 
      ],
    }).select("firstName lastName age").skip(skip).limit(limit);//will find the feed and will show only the selected data 
    res.send(feed);
  } catch (err) {
    res.status(400).send("something went wrong");
  }

  // const usersNotAllowed=await User.findById({
  //   or:[
  //     {_id:requestUsers.fromUserID},
  //     {_id:requestUsers.toUserID}
  //   ]
  // })
  // //this will find all the requests that user has either send and received to someone.
  // const allUsers=await User.find({});
  // const feedUsers=await allUsers.filter(user=>)
});
module.exports = userRouter;
