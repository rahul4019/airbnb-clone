const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sendBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  content: {
    type: String,
    required: true 
  },

  conversation: {
    type: mongoose.Schema.ObjectId,
    ref: "Conversation",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  
});


const Message = mongoose.model("message", messageSchema);

module.exports = Message;