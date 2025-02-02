const express = require("express")
const requestRouter=express.Router()
const User=require("../models/user.js")
const ConnectionRequest=require("../models/connectionRequest.js")
const {userAuth}=require("../middlewares/auth")

requestRouter.post("/request/send/:status/:toUserID",userAuth,async(req,res)=>{
    try{
        const user=req.user;
        console.log(user)
        const fromUserID=user._id;
        const toUserID=req.params.toUserID;
        const status=req.params.status;
        const AllowedStatus = ["intrested","ignored"]
        if(!AllowedStatus.includes(status)){
            throw new Error("Invalid Status");
        }
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserID,toUserID},
                {fromUserID:toUserID,toUserID:fromUserID}
            ]
            
        })
        if(existingConnectionRequest){
            throw new Error("connection request already exists")
        }
        const connectionRequest= new ConnectionRequest({
            fromUserID,
            toUserID,
            status
        })
        const data= await connectionRequest.save();
        res.json({
            message:"request sent successfully",
            data
        })
    }catch(err){
        res.json({message:err.message})
    }
   
})
//api for accepting and rejecting the request
requestRouter.post("/request/review/:status/:requestID",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const {requestID,status}=req.params;
        //only requested status must be allowed
        const AllowedStatus=["accepted","rejected"];
        if(!AllowedStatus.includes(status)){
            throw new Error("Invalid Status");
        }
        //accepting and rejecting the request can only be handled by the user to which the request is sent i.e the loggin used must be the toUserID
        const connectionRequest=await ConnectionRequest.findOne({
            toUserID:loggedInUser._id,
            _id:requestID,
            status:"intrested"
        })
        if(!connectionRequest){
            throw new Error("Request not found")
        }
        //the status of the connection request must be intrested from the other side
        connectionRequest.status=status;
        await connectionRequest.save();
        res.send(`request ${status}`)
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
})

module.exports=requestRouter;