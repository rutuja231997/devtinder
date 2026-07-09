const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    contact: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      required: true,
      enum: {
        values: ["female", "male", "prefer not to say"],
        message: `please choose the gender`,
      },
    },
    isPremium: {
      type: Boolean,
      required: true,
      default: false,
    },
    membershipType: {
      type: String,
    },
    photoUrl: {
      type: String,
      default: "",
    },
    about: {
      type: String,
      default: "This is a default about of the user...!",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function (expireTime) {
  const user = this;
  const _id = user._id;

  const token = await jwt.sign({ _id }, process.env.PRIVATE_KEY, {
    expiresIn: expireTime,
  });

  return token;
};

userSchema.methods.validatePassword = async function (PasswordInputByUser) {
  const user = this;
  const hashedPassword = user.password;

  const isPasswordValid = await bcrypt.compare(
    PasswordInputByUser,
    hashedPassword,
  );

  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
