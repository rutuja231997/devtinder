const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    //creating instance of the user model
    const userPayLoad = req.body;
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      photoUrl,
      about,
      skills,
    } = userPayLoad;

    //check user is new or existing
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "user is existed..!!!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
      age: age,
      gender: gender,
      photoUrl: photoUrl,
      about: about,
      skills: skills,
    });

    await user.save();

    const token = await user.getJWT("1hr");

    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 60 * 60 * 1000, //1hr
      secure: false,
      sameSite: "lax",
    });

    return res.status(201).json({
      user: user,
      token: token,
      message: "sign up successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const loginPayload = req.body;

    const { email, password } = loginPayload;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const checkingPassword = await existingUser.validatePassword(password);
    const token = await existingUser.getJWT("1h");

    if (!checkingPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, //1 hr,
    });

    return res.status(200).json({
      user: existingUser,
      token: token,
      message: "login successfully...!",
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  const user = req.user;
  const token = req.token;

  res.clearCookie(
    "token",
    token,
    { httpOnly: false },
    { secure: false },
    { sameSite: false },
  );

  return res.status(200).json({
    user: user,
    message: "user is successfully logout...",
  });
};

module.exports = { signup, login, logout };
