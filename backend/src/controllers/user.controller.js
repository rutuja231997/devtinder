const ConnectionRequest = require("../models/connectionRequest.model");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const mongoose = require("mongoose");

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

    //find the list of connection requests
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
      const user =
        c.fromUserId._id.toString() === loggedUser._id.toString()
          ? c.toUserId
          : c.fromUserId;

      return {
        _id: c._id,
        user,
        connectedAt: c.updatedAt,
      };
    });

    // const data = connections.map((c) => {
    //   if (c.fromUserId._id.toString() === loggedUser._id.toString()) {
    //     return c.toUserId;
    //   }
    //   return c.fromUserId;
    // });

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

const removeConnection = async (req, res) => {
  try {
    // 1. get logged-in user id
    const user = req.user;
    const userId = user._id;

    // 2. get target user id
    const { targetUserId } = req.params;

    // 3. validate target user
    if (!mongoose.Types.ObjectId.isValid(targetUserId)) {
      return res.status(400).json({
        message: "Invalid user Id",
      });
    }

    // 4. prevent removing yourself
    if (userId.toString() === targetUserId) {
      return res.status(400).json({
        message: "You can not remove yourself...",
      });
    }

    // 5. check whether target user exists
    const existingUser = await User.findById({ _id: targetUserId });

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found...",
      });
    }
    // 5. verify connection & remove connection from both users
    const session = await mongoose.startSession();
    session.startTransaction();

    const removeConnection = await ConnectionRequest.findOneAndDelete(
      {
        $or: [
          { fromUserId: userId, toUserId: targetUserId, status: "accepted" },
          { fromUserId: targetUserId, toUserId: userId, status: "accepted" },
        ],
      },
      { session },
    );

    if (!removeConnection) {
      return res.status(404).json({
        message: "connection not found",
      });
    }

    await Chat.findOneAndDelete(
      {
        participants: {
          $all: [userId, targetUserId],
        },
      },
      { session },
    );

    await session.commitTransaction();

    // 6. return success response
    return res.status(200).json({
      removeConnection: removeConnection,
      message: "remove connection & chats successfully...",
    });
  } catch (error) {
    console.log("remove connection error: ", error);
    return res.status(500).json({
      message: "Internal Server Error...",
    });
  }
};

const searchUsers = async (req, res) => {
  try {
    // 1. get the logged-in user's id
    const userId = req.user._id;

    // 2. extract search query, page number and limit
    const { query, page = 1, limit = 10 } = req.query;

    // 3. validate the search query
    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required...",
      });
    }

    const searchQuery = query.trim();

    if (searchQuery.length > 100) {
      return res.status(400).json({
        message: "Search query is too long...",
      });
    }

    // 4. validate pagination values
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    if (
      !Number.isInteger(pageNumber) ||
      !Number.isInteger(limitNumber) ||
      pageNumber < 1 ||
      limitNumber < 1 ||
      limitNumber > 50
    ) {
      return res.status(400).json({
        message: "Invalid pagination values",
      });
    }

    // 5. calculate pagination
    const skip = (pageNumber - 1) * limitNumber;

    // 6. escape special regex characters
    const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // 7. get ID's of users already connected with logged-in user
    const connections = await ConnectionRequest.find({
      $or: [
        { fromUserId: userId, status: { $in: ["interested", "accepted"] } },
        { toUserId: userId, status: { $in: ["interested", "accepted"] } },
      ],
    }).select("fromUserId toUserId");

    // 8. extracted connected user ID's
    const connectedUserIds = connections.map((connection) =>
      connection.fromUserId.toString() === userId.toString()
        ? connection.toUserId
        : connection.fromUserId,
    );

    const excludedUserIds = [userId, ...connectedUserIds];

    // 9. create search condition
    const searchCondition = {
      $and: [
        { _id: { $nin: excludedUserIds } },
        {
          $or: [
            { firstName: { $regex: escapedQuery, $options: "i" } },
            { lastName: { $regex: escapedQuery, $options: "i" } },
            { skills: { $regex: escapedQuery, $options: "i" } },
            { about: { $regex: escapedQuery, $options: "i" } },
            { role: { $regex: escapedQuery, $options: "i" } },
          ],
        },
      ],
    };

    // 8. fetch matching developers
    const users = await User.find(searchCondition)
      .select("firstName lastName age gender photoUrl about skills role")
      .skip(skip)
      .limit(limitNumber)
      .lean();

    // 9. count total matching developers
    const totalUsers = await User.countDocuments(searchCondition);

    // 10. calculate total pages
    const totalPages = Math.ceil(totalUsers / limitNumber);

    // 11. return search results
    return res.status(200).json({
      message: "Developers found successfully...",
      users,
      pagination: {
        currentPage: pageNumber,
        limit: limitNumber,
        totalUsers,
        totalPages,
        hasNextPage: pageNumber < totalPages,
        hasPreviousPage: pageNumber > 1,
      },
    });
  } catch (err) {
    console.log("Search users error : ", err);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  requestReceive,
  findConnections,
  findFeed,
  removeConnection,
  searchUsers,
};
