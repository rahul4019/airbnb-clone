const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    users: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    },
    inquiryFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Place",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});


const Conversation = mongoose.model("conversation", conversationSchema);

module.exports = Conversation;