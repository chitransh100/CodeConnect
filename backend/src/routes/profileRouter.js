const express=require("express")
const profileRouter=express.Router();
const {userAuth}=require("../middlewares/auth.js")
const User=require("../models/user.js")
const bcrypt=require("bcrypt")
const saltRounds = 10;

// app.use(express.json());
// app.use(cookieParser());

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
      const user=req.user;
      
      
      res.send(user);
    }catch(err){
      res.send("something unexpected happned")
    }
})
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    const loggedInUser=req.user;
    console.log(loggedInUser)
    const AllowedToEdit=["name","sex","skills","age"]
    const isAllowedToEdit=Object.keys(req.body).every((k)=>{
      if(!AllowedToEdit.includes(k)){
        throw new Error(`can't update the ${k}`)
      }
      return true;
    })
    if(isAllowedToEdit){
      Object.keys(req.body).forEach((k)=>(loggedInUser[k]=req.body[k]))
    }
    await loggedInUser.save()
    console.log(loggedInUser)
    res.send("user updated successfully");
  }catch(err){
    res.status(400).send(err.message);
  }
})

profileRouter.patch("/profile/edit/password",userAuth,async(req,res)=>{
  try{
    const {password,newPassword} = req.body
    const user=req.user;
    console.log(user.password)
    const isOldPasswordCorrect=await user.validatePassword(password)
    if(!isOldPasswordCorrect){
      throw new Error ("Incorrect password");
    }
    const newPasswordhash=await bcrypt.hash(newPassword,saltRounds)
    user.password=newPasswordhash
    console.log(newPasswordhash)
    await user.save()
    res.send("password updated successfully")
  }catch(err){
    res.send(err.message)
  }
})
module.exports=profileRouter
