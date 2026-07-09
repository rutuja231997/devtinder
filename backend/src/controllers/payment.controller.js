const razorpayInstance = require("../utils/razorpay");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const Payment = require("../models/payment.model");
const membershipTypeAmount = require("../utils/constants");
const User = require("../models/user.model");

const paymentCreateOrder = async (req, res) => {
  try {
    const user = req.user;

    const { firstName, lastName, email, _id } = user;

    const { membershipType } = req.body;

    const order = await razorpayInstance.orders.create({
      amount: membershipTypeAmount[membershipType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        membershipType: membershipType,
      },
    });

    //save it in my database

    //this poor way writing code. improve the writing code here
    const { id, status, amount, currency, receipt, notes } = order;
    const payment = new Payment({
      userId: _id,
      orderId: id,
      status: status,
      amount: amount,
      currency: currency,
      receipt: receipt,
      notes: notes,
    });

    const savedPayment = await payment.save();

    return res.status(201).json({
      message: "payment order is created....",
      payment: { ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");

    console.log("webhook called");
    console.log("webhook signature", webhookSignature);
    // const webhookSignature = req.header("X-Razorpay-Signature");

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({
        msg: "Webhook signature is invalid....",
      });
    }

    //update my payment status in DB
    const paymentDetails = req.body.payload.payment.entity;

    console.log(paymentDetails);

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });

    console.log(payment);

    payment.status = paymentDetails.status;
    await payment.save();

    //update my user status in DB
    const user = await User.findOne({
      _id: payment.userId,
    });

    user.isPremium = true;
    user.membershipType = payment.notes.membershipType;
    await user.save();

    //updates the user as premium

    // if (req.body.event === "payment.capture") {
    // }
    // if (req.body.event === "payment.failed") {
    // }

    return res.status(200).json({
      msg: "Payment successful....",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { paymentCreateOrder, paymentVerification };
