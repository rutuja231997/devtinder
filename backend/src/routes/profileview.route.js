const express = require("express");

const userAuth = require("../middlewares/auth.middleware");

const profileViewController = require("../controllers/profileview.controller");

const profileViewRouter = express.Router();

profileViewRouter.post(
  "/profile-view/:userId",
  userAuth,
  profileViewController.recordProfileView,
);

profileViewRouter.get(
  "/profile-views",
  userAuth,
  profileViewController.getProfileViews,
);

module.exports = profileViewRouter;
