const socket = require("socket.io");
const cors = require("cors");

const Chat = require("../models/chat.model");
const ConnectionRequest = require("../models/connectionRequest.model");

const initializeSocket = (server) => {
  //add cors to listen socket.io from frontend Url
  const io = socket(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  //socket.io connection accept & it will handle events
  io.on("connection", (socket) => {
    console.log("client connected", socket.id);
    //handle events

    socket.on("joinChat", ({ firstName, lastName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_");

      console.log(
        firstName + " " + lastName + " " + "joining room" + " " + roomId,
      );
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, lastName, userId, targetUserId, text }) => {
        try {
          const roomId = [userId, targetUserId].sort().join("_");

          console.log(firstName + " " + lastName + " " + text);

          //verified the userId and targetUserId are friends i.e. status = accepted
          const validatedConnection = await ConnectionRequest.findOne({
            $or: [
              { fromUserId: userId, toUserId: targetUserId },
              { fromUserId: targetUserId, toUserId: userId },
            ],
            status: "accepted",
          });

          if (!validatedConnection) {
            throw new Error("Invalid connection....");
          }

          //messages save to chat and message schema in db
          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });

            chat.messages.push({
              senderId: userId,
              receiverId: targetUserId,
              message: text,
            });

            await chat.save();
          }

          chat.messages.push({
            senderId: userId,
            receiverId: targetUserId,
            message: text,
          });

          await chat.save();

          io.to(roomId).emit("messageReceived", { firstName, lastName, text });
        } catch (err) {
          console.log(err);
        }
      },
    );

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
