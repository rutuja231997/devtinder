const express = require("express");

const userAuth = require("../middlewares/auth.middleware");
const chatController = require("../controllers/chat.controller");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, chatController.getMessages);

module.exports = chatRouter;
