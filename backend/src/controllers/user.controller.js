const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model");

const USER_DATA = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "about",
  "photoUrl",
  "skills",
];

const requestReceive = async (req, res) => {
  try {
    const loggedUser = req.user;

    //find the collection requests
    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "photoUrl",
      "age",
      "gender",
      "about",
      "skills",
    ]);

    if (connectionRequests.length === 0) {
      return res.status(400).json({
        message: "connection request not found...",
      });
    }

    return res.status(201).json({
      message: "requests are found...!!!",
      connectionRequests: connectionRequests,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};

const findConnections = async (req, res) => {
  try {
    const loggedUser = req.user;

    //find the connections;
    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedUser._id, status: "accepted" },
        { fromUserId: loggedUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_DATA)
      .populate("toUserId", USER_DATA);

    const data = connections.map((c) => {
      if (c.fromUserId._id.toString() === loggedUser._id.toString()) {
        return c.toUserId;
      }
      return c.fromUserId;
    });

    if (connections.length === 0) {
      return res.status(400).json({
        message: "connections are not found",
      });
    }

    return res.status(201).json({
      message: "Request connections are found...!!!",
      connections: data,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};

const findFeed = async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    //user should see all the users cards except
    //  0. his own card
    //  1. his connections
    //  2. ignored people
    //  3. already sent the connection express.request

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    //create set to store this connections id
    const hideUsersFromFeed = new Set();

    connections.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    //imp query to find users exclude hideUsers
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_DATA)
      .skip(skip)
      .limit(limit);

    if (users.length === 0) {
      return res.status(400).json({
        message: "Right now, don't have users in feed",
      });
    }

    return res.status(201).json({
      message: "users successfully fetched...!!!",
      users: users,
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      message: err.message,
    });
  }
};

module.exports = { requestReceive, findConnections, findFeed };
