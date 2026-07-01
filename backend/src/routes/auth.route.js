const userAuth = require("../middlewares/auth.middleware");

const authController = require("../controllers/auth.controller");

const express = require("express");

const authRouter = express.Router();

authRouter.post("/signup", authController.signup);

authRouter.post("/login", authController.login);

authRouter.post("/logout", authController.logout);

module.exports = authRouter;
