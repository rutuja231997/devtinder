import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import axios from "axios";

import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  const [error, setError] = useState("");

  const user = useSelector((store) => store.user);

  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  useEffect(() => {
    const fetchedChatMessages = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/chat/${targetUserId}`,
          {
            withCredentials: true,
          },
        );

        const chatResponse = response.data.chat.messages.map((msg) => {
          const { senderId, message, _id } = msg;
          return {
            id: _id,
            firstName: senderId?.firstName,
            lastName: senderId?.lastName,
            text: message,
          };
        });

        setMessages(chatResponse);
      } catch (err) {
        console.log(err.message);
        setError(err?.response?.data?.message);
      }
    };

    fetchedChatMessages();
  }, [targetUserId]);

  useEffect(() => {
    const socket = createSocketConnection();

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.emit("joinChat", {
      firstName,
      lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " " + lastName + " " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, firstName, lastName, messages]);

  const handleSendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: message,
    });
    setMessage("");
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <h4 className="text-base text-red-500 font-semibold">{error}</h4>
      </div>
    );
  }

  return (
    user && (
      <div className="flex justify-center items-center w-full h-screen ">
        <div className="flex flex-col justify-between gap-4 bg-base-300 border border-gray-500 rounded-2xl w-1/2 min-h-10">
          <div className="p-4">
            {messages.map((msg) => {
              return (
                <div
                  className={`chat ${user.firstName === msg.firstName ? "chat-start" : "chat-end"}`}
                  key={msg.id}
                >
                  <div className="chat-header">
                    {msg.firstName + " " + msg.lastName}
                    <time className="text-xs opacity-50">2 hours ago</time>
                  </div>
                  <div
                    className={`chat-bubble ${user.firstName === msg.firstName ? "chat-bubble-primary" : "chat-bubble-success"}`}
                  >
                    {msg.text}
                  </div>
                  <div className="chat-footer opacity-50">Seen</div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-row justify-between items-center gap-4 border-t border-gray-500 p-2">
            <input
              type="text"
              value={message}
              name="message"
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-500 focus:outline-none rounded-lg p-2 chat-bubble-neutral w-full"
            />
            <button className="btn btn-accent" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Chat;
