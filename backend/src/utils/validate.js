const validator=require("validator")

const validateSignUp =(req)=>{
    const {name,password,email}=req.body
    if(name.length===0 || name.length<4){
        throw new Error("firstName must be 4 character long")
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("the password is not strong enough");
    }
    else if (!validator.isEmail(email)){
        throw new Error("Enter a valid Email")
    }
}

module.exports= {validateSignUp}