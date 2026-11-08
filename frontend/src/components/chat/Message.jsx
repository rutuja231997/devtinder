import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { motion } from "framer-motion";

import { MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { createSocketConnection } from "../../utils/socket";
import {
  setConversations,
  addIncomingMessage,
  fetchConversationMessages,
  setActiveConversation,
} from "../../utils/messagesSlice";

import MessageSidebar from "./MessageSidebar";
import ChatHeader from "./ChatHeader";
import MessageContainer from "./MessageContainer";
import { useParams, useLocation } from "react-router-dom";

const Message = () => {
  const { data: user } = useSelector((store) => store.user);
  const { conversations, status, error, activeConversationId } = useSelector(
    (store) => store.messages,
  );

  const dispatch = useDispatch();

  const socketRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const { targetUserId } = useParams();
  const location = useLocation();

  const targetUser = location.state?.targetUser;

  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;

  const handleSelectConservation = (id) => {
    dispatch(setActiveConversation(id));

    if (!id) {
      navigate("/message");
      return;
    }

    const conversation = conversations.find((c) => c._id === id);

    const otherParticipant = conversation?.participants.find(
      (participant) => participant._id !== user?._id,
    );

    if (otherParticipant) {
      navigate(`/message/${otherParticipant._id}`);
    }
  };

  // Fetch conversation previews once
  useEffect(() => {
    async function fetchedAllConversations() {
      try {
        const response = await axiosInstance.get(`/chat`);
        dispatch(setConversations(response.data.conversations));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchedAllConversations();
  }, [dispatch]);

  useEffect(() => {
    if (targetUserId) {
      dispatch(fetchConversationMessages(targetUserId));
    }
  }, [targetUserId, dispatch]);

  console.log("conversations", conversations);

  console.log("targetUserId", targetUserId);

  const routeConversation = targetUserId
    ? conversations.find((conversation) =>
        conversation.participants.some(
          (participant) => participant._id === targetUserId,
        ),
      )
    : null;

  const selectedConversationId = targetUserId
    ? (routeConversation?._id ?? null)
    : activeConversationId;

  const activeConversation = conversations.find(
    (conversation) => conversation._id === selectedConversationId,
  );

  // Find the other participant in an existing conversation
  const conversationParticipant = activeConversation?.participants?.find(
    (participant) => participant._id !== user?._id,
  );

  const selectedParticipant =
    conversationParticipant ??
    (targetUser?._id === targetUserId ? targetUser : null);

  console.log("participant", conversationParticipant);

  // Socket connection — tied to whichever conversation is active
  useEffect(() => {
    if (!targetUserId || !userId) return;

    const socket = createSocketConnection();
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.emit("joinChat", {
      firstName,
      lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", (data) => {
      console.log("RECEIVED FROM SOCKET:", data);

      const chatId = data.chatId?.chatId ?? data.chatId;
      const message = data.message ?? data.chatId?.message;

      if (!message) {
        console.error("socket event did not contain a message", data);
        return;
      }
      dispatch(
        addIncomingMessage({
          conversationId: chatId,
          message,
        }),
      );
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [targetUserId, userId, dispatch, firstName, lastName]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    console.log("SENDING:", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      targetUserId,
      text,
    });

    socketRef.current.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId: user._id,
      targetUserId,
      text,
    });
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Loading conversations...
      </div>
    );
  }

  if (status === "failed" && targetUserId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        {error || "Unable to load messages"}
      </div>
    );
  }

  if (conversations.length === 0 && !activeConversation && !targetUserId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-background p-6 text-center">
        <MessageSquare className="size-10 text-muted-foreground" />

        <h2 className="text-lg font-semibold text-heading">
          Start a conversation
        </h2>

        <p className="max-w-sm text-sm text-muted-foreground">
          Connect with developers and start a conversation with them.
        </p>

        <button
          onClick={() => navigate("/connections")}
          className="rounded-lg bg-(image:--gradient-brand) px-4 py-2 text-sm font-semibold text-white"
        >
          View connections
        </button>
      </div>
    );
  }
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex min-h-0 min-w-0 flex-1"
    >
      {/* Conversation list */}
      <MessageSidebar
        activeChatId={activeConversationId}
        onSelect={handleSelectConservation}
        user={user}
        conversations={conversations}
        targetUser={targetUser}
      />

      {/* Conversation */}
      <div
        className={`min-h-0 min-w-0 flex-1 flex-col bg-background md:flex ${
          targetUserId || activeConversationId ? "flex" : "hidden"
        }`}
      >
        <ChatHeader
          participant={selectedParticipant}
          onBack={() => handleSelectConservation(null)}
        />
        <MessageContainer
          activeChatId={activeConversationId}
          onSendMessage={handleSendMessage}
          targetUserId={targetUserId}
        />
      </div>
    </motion.section>
  );
};

export default Message;
