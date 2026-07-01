const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    //read the token from the cookies
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      return res.status(404).json({
        message: "authentication failed",
      });
    }

    //validate the token
    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);

    //find the user
    const { _id } = decoded;
    const existingUser = await User.findById({ _id: _id });

    if (!existingUser) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    req.user = existingUser;
    req.token = token;

    next();
  } catch (err) {
    console.log("error:", err);
    return res.status(500).json({
      message: "Authentication is failed",
    });
  }
};

module.exports = userAuth;
