const express = require("express");
const userAuth = require("../middlewares/auth.middleware");

const requestController = require("../controllers/request.controller");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  requestController.requestSend,
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  requestController.requestReview,
);

module.exports = requestRouter;
