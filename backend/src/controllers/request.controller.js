const User = require("../models/user.model");
const ConnectionRequest = require("../models/connectionRequest.model.js");

const sendEmail = require("../utils/sendEmail.js");

const requestSend = async (req, res) => {
  try {
    const user = req.user;

    const toUserId = req.params.toUserId;
    const status = req.params.status;
    const fromUserId = user._id;

    //need to validate the receiver user id from params.
    const existUser = await User.findById({ _id: toUserId });

    if (!existUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    //validate the status
    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res.status(401).json({
        message: "Invalid request status...!!!",
      });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId, status },
        { fromUserId: toUserId, toUserId: fromUserId, status: status },
      ],
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request exist...!!!",
      });
    }

    //send request fromUserId to toUserId
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connectionRequest.save();

    //sending email
    const emailResponse = await sendEmail.run(
      `A friend request from ${user.firstName + " " + user.lastName}`,
      `${user.firstName + " " + user.lastName} send friend request.`,
    );

    console.log(emailResponse);

    return res.status(201).json({
      message: `${status === "interested" ? `Request successfully sent by ${user.firstName + " " + user.lastName} to ${existUser.firstName + " " + existUser.lastName} ` : `Request ignored by ${existUser.firstName + " " + existUser.lastName}`}  `,
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || "500").json({
      message: error.message || "something went wrong...",
    });
  }
};

const requestReview = async (req, res) => {
  try {
    const loggedUser = req.user;

    const { requestId, status } = req.params;

    //allowed status
    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid the status",
      });
    }

    //validate the requestId
    const connectionRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedUser._id,
      status: "interested" | "ignored",
    });

    if (connectionRequest) {
      return res.status(400).json({
        message: "Connection request not found...!!!",
      });
    }

    const updateStatus = await ConnectionRequest.findByIdAndUpdate(
      { _id: requestId },
      { status: status },
      { new: true },
    );

    // console.log(connectionRequest.status, status);
    //update status in table
    // connectionRequest.status = status;

    // const data = await validateRequest.save();

    return res.status(201).json({
      message: `${status === "accepted" ? `Request ${status} by ${loggedUser.firstName + " " + loggedUser.lastName}` : `Request ${status} by ${loggedUser.firstName + " " + loggedUser.lastName}`}`,
      request: updateStatus,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};

module.exports = { requestSend, requestReview };
