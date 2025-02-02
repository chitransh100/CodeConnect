const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const validator = require("validator");
const { validateSignUp } = require("../utils/validate.js");
const cookieParser = require("cookie-parser");
const { userAuth } = require("../middlewares/auth");

authRouter.use(express.json());
authRouter.use(cookieParser());

authRouter.post("/signup", async (req, res) => {
  try {
    const { name,age,sex,email,password,skills,photourl } =
      req.body;
    //validate the feilds
    validateSignUp(req);
    //encrypt the password
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    //store the hashpassword in the DB
    const user = new User(
      // req.body dont trust it
      {
        name,
        password: hashPassword,
        email,
        sex,
        age,
        skills,
        photourl
      }
    );
    console.log("faltu")
    await user.save();
    console.log(user)
    res.send("user added successfully");
  } catch (err) {
    // res.send(err)
    res.status(400).send(err.message);
  } //better to write this in try and catch
});//token is not generated in this Api

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    //check if user is present or email is valid
    if (!validator.isEmail(email) && !user) {
      throw new Error("invalid credentials");
    }
    //check if the password matches
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    }

    //if email and passwords a valid then create a jwt token using jwt.sign(payload, secretOrPrivateKey, [options, callback]) and we can add time limit to the token as jwt.sign({
    //   data: 'foobar'
    // }, 'secret', { expiresIn: '1h' });

    const token = await user.getjwt();
    //send cookie by res.cookie(name, value [, options])
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,  // Ensures cookies are sent over HTTPS
      sameSite: "None", // Important for cross-origin requests
    });
    
    res.send({ message: "logined successfully", user });
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,   // Ensure it works over HTTPS
    sameSite: "None",
    expires: new Date(0),  // Expire the cookie immediately
  });

  res.send("User logged out successfully");
});


module.exports = authRouter;
