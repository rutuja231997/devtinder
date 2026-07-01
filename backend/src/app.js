const dotenv = require("dotenv");

dotenv.config();
const connectDB = require("./config/database");

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
const requestRouter = require("./routes/request.route");
const userRouter = require("./routes/user.route");

const app = express(); //write instance of express

//cors middleware to give access localhost frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

//middleware helps to read server json format data or helps parsed to server json data
app.use(express.json());

//middleware helps to parse cookie readable object format
app.use(cookieParser());

//connect db first and start server
connectDB()
  .then(() => {
    console.log("database connection established");
    app.listen(process.env.PORT, () => {
      console.log(
        `server is listening on http://localhost:${process.env.PORT}`,
      );
    });
  })
  .catch((err) => {
    console.log("database can not be connected", err);
  });

//handle request using instance of express
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.use((req, res) => {
  res.send("server is listening");
});
