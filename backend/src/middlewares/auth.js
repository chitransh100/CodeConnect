const jwt = require("jsonwebtoken")
const User = require("../models/user.js");

// const adminauth=(req,res,next)=>{
//     const token="xyz"
//     const usertoken="xyz"
//     if(token === usertoken)
//     {
//         console.log("chutyapa")
//         next();
//     }
//     else{
//         res.status(401).send("unauthorised access")
//     }
// }
const userAuth=async(req,res,next)=>{
    try{
          //validate my token
          const {token}=req.cookies;
          if(!token){
            throw new Error("token not found");
          }
          const decode=await jwt.verify(token, process.env.JWT_secret);//this will give the content of the payload 
          //this chitranshkumar is the key
          const user =await User.findById(decode._id)
          // console.log(user)
          if(!user){
            throw new Error("no matching user");
          }
          req.user=user
          
          next();
        }catch(err){
          res.status(401).send(err.message)
        }
}

module.exports={
    userAuth
}