const mongoose = require("mongoose");
const User=require("./user.js")

const messageSchema=new mongoose.Schema({
    senderID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require:true
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true});

const chatSchema= new mongoose.Schema({
    participants:[{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true}],
    message:[messageSchema]
})


module.exports = mongoose.model("Chat",chatSchema);