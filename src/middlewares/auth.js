const jwt = require("jsonwebtoken")
const User = require("../models/User");

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
            throw new Error("Unauthorised access");
          }
          const decode=await jwt.verify(token, 'chitranshkumar');//this will give the content of the payload 
          const user =await User.findById(decode._id)
          console.log(user)
          if(!user){
            throw new Error("Unauthorised access");
          }
          req.user=user
          next();
        }catch(err){
          res.send(err.message)
        }
}

module.exports={
    userAuth
}