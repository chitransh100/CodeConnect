const mongoose = require("mongoose");
const validator = require('validator')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,//minlength for string and min for number
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new error ("Password is not strong enough");
      }
    }
  },
  photourl: {
    type: String
  },
  email: {
    type: String,
    required:true,
    unique: true,
    trim: true,//will trim the extra spaces before and after
    lowercase: true,//no matter the case the email will be in lower case 
    // validate(value){
    //   if(!validator.isEmail(value)){
    //     throw new Error ("not a valid email")
    //   }
    // }
  },
  sex: {
    type: String,
    validate(value) {
      if (!["male", "female", "other"].includes(value)) {
        throw new Error("Not a valid sex");
      }
    },
  },//function to validate the string value of sex
  age: { type: Number, min: 0 },
  skills:{type:[String]}
},{timestamps:true});

// userSchema.index({firstName:1,lastName:1})

userSchema.methods.getjwt=async function () {
    const user=this;
    const token=await jwt.sign({_id:user._id},"chitranshkumar",{expiresIn:"1d"})
    return token;
}
userSchema.methods.validatePassword=async function(passwordByUser){
    const user=this;
    const ispassword=await bcrypt.compare(passwordByUser, user.password)
    return ispassword;
}

// module.exports = mongoose.models.User || mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.models.User || mongoose.model("User", userSchema);