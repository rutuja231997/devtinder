const express = require("express");
const userAuth = require("../middlewares/auth.middleware");
const User = require("../models/user.model");
const ConnectionRequest = require("../models/connectionRequest.model");

const userController = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.get(
  "/user/requests/received",
  userAuth,
  userController.requestReceive,
);

userRouter.get("/user/connections", userAuth, userController.findConnections);

userRouter.get("/user/feed", userAuth, userController.findFeed);

module.exports = userRouter;
