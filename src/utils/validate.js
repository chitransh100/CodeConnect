const validator=require("validator")

const validateSignUp =(req)=>{
    const {firstName,password,email}=req.body
    if(firstName.length===0 || firstName.length<4){
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