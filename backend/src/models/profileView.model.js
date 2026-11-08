const mongoose = require("mongoose");
const User = require("./user.model");

const profileViewSchema = new mongoose.Schema(
  {
    profileOwnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    viewerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
  },
  { timestamps: true },
);

//one record per viewer for each profile
profileViewSchema.index({ profileOwnerId: 1, viewerId: 1 }, { unique: true });

module.exports = mongoose.model("ProfileView", profileViewSchema);
