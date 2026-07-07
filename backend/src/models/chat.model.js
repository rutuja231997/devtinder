const mongoose = require("mongoose");

const User = require("./user.model");
const messageSchema = require("./message.model");

const ChatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User,
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true },
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
