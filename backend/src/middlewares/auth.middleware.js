const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const userAuth = async (req, res, next) => {
  try {
    //read the token from the cookies
    const cookies = req.cookies;

    const { token } = cookies;

    if (!token) {
      return res.status(401).json({
        message: "Authenticaton required. Please Login in",
      });
    }

    //validate the token
    const decoded = await jwt.verify(token, process.env.PRIVATE_KEY);

    //find the user
    const { _id } = decoded;
    const existingUser = await User.findById({ _id: _id });

    if (!existingUser) {
      return res.status(401).json({
        message: "User not found. Please Login again",
      });
    }

    req.user = existingUser;
    req.token = token;

    next();
  } catch (err) {
    console.log("Authentication Error:", err);

    //expired or invalid JWT
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res.status(401).json({
        message: "Session expired. Please Login again.",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = userAuth;
