const mongoose=require("mongoose")
const User=require("./user.js")

const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserID: {
            type: mongoose.Schema.Types.ObjectId,
            //we need to write this to define a variable having a userid as a type
            ref:"User",
            required:true
        },
        toUserID: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        status: {
            type:String,
            enum:["intrested","rejected","ignored","accepted"],
            message:`{VALUE} cannot be a status `
        }

},{applyTimestamps:true})

connectionRequestSchema.index({fromUserID:1})

connectionRequestSchema.pre("save",async function(next){
    //this function will be called before every save method called to save a userObject
    connectionRequest=this;
    if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
        //as both of them are user objects so they are cheked by help of the equal method
        throw new Error(`can,t send a ${connectionRequest.status} to yourself`)
    }
    next();
    //as this is a middleware so calling next is important.
    //we can write this in the requestRouter as well 

})
module.exports=mongoose.model("ConnectionRequest",connectionRequestSchema)