const mongoose = require("mongoose");
const User = require("./user.model");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User, //reference of the User collection
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User, //reference of the User Collection
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  },
);

connectionRequestSchema.pre("save", async function () {
  const connectionRequest = this;

  //check if the fromUserId is same as toUserId
  if (this.fromUserId.equals(this.toUserId)) {
    const error = new Error("Can not send connection request to yourself");

    error.statusCode = 400;

    throw error;
  }
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema,
);

module.exports = ConnectionRequest;
