const express = require("express");

const userAuth = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.get(
  "/chat/unreadMessages",
  userAuth,
  chatController.getUnreadMessages,
);
chatRouter.get("/chat/:targetUserId", userAuth, chatController.getMessages);

chatRouter.get("/chat", userAuth, chatController.getAllMessages);

module.exports = chatRouter;
