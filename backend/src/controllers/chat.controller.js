const Chat = require("../models/chat.model");
const ConnectionRequest = require("../models/connectionRequest.model");

const USER_DATA = ["firstName", "lastName"];

const getMessages = async (req, res) => {
  try {
    const targetUserId = req.params.targetUserId;

    const user = req.user;

    const userId = user._id;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 100;

    limit = limit > 100 ? 100 : limit;
    const skip = (page - 1) * limit;

    //validate the connection between userId and targetUserId
    const validatedConnection = await ConnectionRequest.findOne({
      status: "accepted",
      $or: [
        { fromUserId: userId, toUserId: targetUserId },
        { fromUserId: targetUserId, toUserId: userId },
      ],
    })
      .skip(skip)
      .limit(limit);

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

    // A connection exists, but they haven't started chatting yet
    if (!chat) {
      return res.status(200).json({
        chat: null,
        messages: [],
        message: "No messages yet. Start the conversation!",
      });
    }

    //update the readAt field
    chat.messages.forEach((message) => {
      if (message.receiverId.equals(userId) && message.readAt === null) {
        message.readAt = new Date();
      }
    });

    await chat.save();

    return res.status(200).json({
      messages: chat,
      message: "chats found...",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const user = req.user;

    const messages = await Chat.find({
      participants: { $all: [user._id] },
    })
      .populate("participants", ["firstName", "lastName", "photoUrl"])
      .populate("messages.senderId", ["firstName", "lastName"])
      .populate("messages.receiverId", ["firstName", "lastName"]);

    if (messages.length === 0) {
      return res.status(400).json({
        message: "No messages found for the user",
      });
    }

    return res.status(200).json({
      message: "all messages found for the user",
      conversations: messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getUnreadMessages = async (req, res) => {
  try {
    const user = req.user;

    const userId = user._id;

    //matched logged in userId and readAt status
    const result = await Chat.aggregate([
      { $unwind: "$messages" },
      {
        $match: {
          "messages.receiverId": userId,
          $and: [
            { "messages.readAt": null },
            { "messages.readAt": { $exists: true } },
          ],
        },
      },
      { $count: "unreadCount" },
    ]);

    const unreadCount = result[0]?.unreadCount ?? 0;

    return res.status(200).json({
      unreadMessages: unreadCount,
      message: "calculate unread messages...",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { getMessages, getAllMessages, getUnreadMessages };
