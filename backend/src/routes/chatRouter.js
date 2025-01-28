const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat"); // Use uppercase for model name as a convention
const chatRouter = express.Router();

// Get or create a chat with a target user
chatRouter.get("/chat/:targetUserID", userAuth, async (req, res) => {
  const user = req.user; // Authenticated user from middleware
  const targetUserID = req.params.targetUserID;
  try {
    // Check if a chat already exists
    // console.log(user._id,targetUserID)
    let chat = await Chat.findOne({
      participants: { $all: [user._id, targetUserID] },
    })

    if (!chat) {
      // If no chat exists, create a new one
      chat = new Chat({
        participants: [user._id, targetUserID],
        message: [],
      });
      
    }
      // Save the new chat
    await chat.save();
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = chatRouter;
