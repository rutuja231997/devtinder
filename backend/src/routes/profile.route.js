const express = require("express");

const userAuth = require("../middlewares/auth.middleware");

const profileController = require("../controllers/profile.controller");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, profileController.profileView);

profileRouter.patch(
  "/profile/update",
  userAuth,
  profileController.profileUpdate,
);

profileRouter.post(
  "/profile/forgot-password",
  userAuth,
  profileController.forgotPassword,
);

profileRouter.patch(
  "/profile/password-reset/:token",
  profileController.passwordReset,
);

module.exports = profileRouter;
