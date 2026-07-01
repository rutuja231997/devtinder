const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateEditProfileData = require("../utils/validation");
const verifyJWT = require("../utils/token");

const User = require("../models/user.model");

const profileView = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      user: user,
      message: "user profile fetched successfully...!!!",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "can not read cookies",
    });
  }
};

const profileUpdate = async (req, res) => {
  try {
    if (!validateEditProfileData) {
      throw new Error("Invalid edit request");
    }

    const loggedUser = req.user;

    //go through javascript basics to understand this line of code
    Object.keys(req.body).forEach((key) => (loggedUser[key] = req.body[key]));

    await loggedUser.save();

    return res.status(200).json({
      message: `${loggedUser.firstName}, your profile updated successfully`,
      user: loggedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "error while updating user details",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const user = req.user;

    const { email } = req.body;

    //validate the email for the validate user and request
    const existUser = await User.findOne({ email: email });

    if (!existUser) {
      return res.status(404).json({
        message: "user not found...!!!",
      });
    }

    const token = await existUser.getJWT("5m");

    const updatePasswordLink = `http://localhost:${process.env.PORT}/profile/password-reset/${token}`;

    return res.status(200).json({
      message: "Linked send successfully...!!!",
      link: updatePasswordLink,
      user: existUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const passwordReset = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    const token = req.params.token;

    //decode the token to find the user and user id.
    const decoded = await verifyJWT(token);

    if (password !== confirmPassword) {
      return res.status(401).json({
        message: "password does not match",
      });
    }

    const { _id } = decoded;

    //compare password with existing password
    const user = await User.findById({ _id: _id });

    const comparePassword = await user.validatePassword(
      password,
      user.password,
    );

    if (comparePassword) {
      return res.status(400).json({
        message: "New password can not be the same as your current password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("userID", _id);

    const existUser = await User.findByIdAndUpdate(
      { _id: _id },
      {
        password: hashedPassword,
      },
      { new: true },
    );

    return res.status(201).json({
      message: "password updated successfully...!!!",
      user: existUser,
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Password reset link is expire. Please request a new one",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid password reset token",
      });
    }

    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

module.exports = { profileView, profileUpdate, forgotPassword, passwordReset };
