const Chat = require("../models/chat.model");
const ConnectionRequest = require("../models/connectionRequest.model");
const { validate } = require("../models/user.model");

const USER_DATA = ["firstName", "lastName"];

const getMessages = async (req, res) => {
  try {
    const targetUserId = req.params.targetUserId;

    const user = req.user;

    const userId = user._id;

    //validate the connection between userId and targetUserId
    const validatedConnection = await ConnectionRequest.findOne({
      status: "accepted",
      $or: [
        { fromUserId: userId, toUserId: targetUserId },
        { fromUserId: targetUserId, toUserId: userId },
      ],
    });

    if (!validatedConnection) {
      return res.status(404).json({
        message: "Invalid Connection....",
      });
    }

    //find existing  chat
    const chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    })
      .populate("messages.senderId", USER_DATA)
      .populate("messages.receiverId", USER_DATA);

    if (!chat) {
      // const chat = new Chat({
      //   participants: [userId, targetUserId],
      //   messages: [],
      // });

      // await chat.save();

      // return res.status(201).json({
      //   chat: chat,
      //   message: "chats are created",
      // });

      return res.status(404).json({
        message: "chats are not found....",
      });
    }

    return res.status(200).json({
      chat: chat,
      message: "chats found...",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getMessages };
