const express = require("express");
const userAuth = require("../middlewares/auth.middleware");
const paymentController = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post(
  "/payment/create",
  userAuth,
  paymentController.paymentCreateOrder,
);

paymentRouter.post(
  "/payment/webhook",
  userAuth,
  paymentController.paymentVerification,
);

module.exports = paymentRouter;
