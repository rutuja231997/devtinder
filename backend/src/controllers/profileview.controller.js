const mongoose = require("mongoose");
const profileView = require("../models/profileView.model");
const User = require("../models/user.model");

const recordProfileView = async (req, res) => {
  try {
    const user = req.user;
    const viewerId = user._id;

    const profileOwnerId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(profileOwnerId)) {
      return res.status(400).json({
        message: "Invalid user Id",
      });
    }

    // don't record your own profile views
    if (viewerId.toString() === profileOwnerId) {
      return res.status(200).json({
        messgae: "Own profile view not recorded",
      });
    }

    const profileExists = await User.exists({
      _id: profileOwnerId,
    });

    if (!profileExists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const result = await profileView.findOneAndUpdate(
      {
        profileOwnerId,
        viewerId,
      },
      {
        $set: { viewedAt: new Date() },
        $setOnInsert: { profileOwnerId, viewerId },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );

    return res.status(200).json({
      data: result,
      message: "Profile view recorded successfully...",
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

const getProfileViews = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;

    const profileViews = await profileView
      .find({
        profileOwnerId: userId,
      })
      .populate({
        path: "viewerId",
        select: "firstName lastName photoUrl about",
      })
      .sort({ viewedAt: -1 });

    return res.status(200).json({
      totalViews: profileViews.length,
      profileViews,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  recordProfileView,
  getProfileViews,
};
