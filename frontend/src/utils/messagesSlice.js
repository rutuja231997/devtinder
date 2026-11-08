import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchConversationMessages = createAsyncThunk(
  "messages/fetchConversationMessages",
  async (targetUserId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/${targetUserId}`, {
        params: { limit: 100 },
      });

      const { chat, messages } = response.data;

      console.log(chat, messages);

      //no chat document exists yet
      if (chat === null) {
        return {
          targetUserId,
          chatId: null,
          messages: [],
        };
      }

      //existing chat document
      const conversation = messages;

      return {
        targetUserId,
        chatId: conversation._id,
        messages: conversation.messages ?? [],
      };
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

export const fetchUnreadMessages = createAsyncThunk(
  "unreadMessages/fetchUnreadMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/chat/unreadMessages`);

      console.log(response.data);

      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch messages",
      );
    }
  },
);

const messageSlice = createSlice({
  name: "messages",

  initialState: {
    conversations: [],
    currentMessages: [],
    currentChatId: null,
    currentTargetUserId: null,
    status: "idle",
    error: null,
    activeConversationId: null,

    //unread messages
    unreadMessages: 0,
    unreadStatus: "idle",
    unreadError: null,
  },

  reducers: {
    //called after GET /chat
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },

    //called when user selects a conversation
    setActiveConversation: (state, action) => {
      state.activeConversationId = action.payload;
    },

    //called after GET /chat/:targetUserId
    //response.data.messages is one complete conversation
    setConversationMessages: (state, action) => {
      const { conversationId, messages } = action.payload;

      const conversation = state.conversations.find(
        (c) => c._id === conversationId,
      );

      if (conversation) {
        conversation.messages = messages;
      }

      if (conversationId === state.currentChatId) {
        state.currentMessages = messages;
      }
    },

    //called when loading older messages
    prependMessages: (state, action) => {
      const { conversationId, messages } = action.payload;

      if (conversationId === state.currentChatId) {
        state.currentMessages = [...messages, ...state.currentMessages];
      }

      const conversation = state.conversations.find(
        (c) => c._id === conversationId,
      );

      if (conversation) {
        conversation.messages = [...messages, ...(conversation.messages ?? [])];
      }
    },

    //called when a new message arrives through Socket.io

    addIncomingMessage: (state, action) => {
      const { conversationId, message } = action.payload ?? [];

      if (!message || !message.senderId || !message.receiverId) {
        console.error("Invalid incoming message payload:", action.payload);
        return;
      }

      // Normalize populated and unpopulated MongoDB IDs.
      const getId = (value) => value?._id?.toString() ?? value?.toString();

      const chatId = getId(conversationId);

      // Update the currently open chat.
      const senderId = getId(message.senderId);
      const receiverId = getId(message.receiverId);
      const targetUserId = state.currentTargetUserId?.toString();

      const belongsToCurrentChat =
        targetUserId === senderId || targetUserId === receiverId;

      if (
        chatId &&
        (chatId === getId(state.currentChatId) ||
          (!state.currentChatId && belongsToCurrentChat))
      ) {
        state.currentChatId = chatId;

        const alreadyExists = state.currentMessages.some(
          (item) => getId(item._id) === getId(message._id),
        );

        if (!alreadyExists) {
          state.currentMessages.push(message);
        }
      }

      // Update the sidebar preview if this conversation already exists.
      const conversation = state.conversations.find(
        (item) => getId(item._id) === chatId,
      );

      if (conversation) {
        conversation.messages ??= [];

        const alreadyExists = conversation.messages.some(
          (item) => getId(item._id) === getId(message._id),
        );

        if (!alreadyExists) {
          conversation.messages.push(message);
        }

        conversation.updatedAt = message.createdAt;
      }
    },

    //Useful when user logs out
    clearMessages: (state) => {
      state.conversations = [];
      state.currentMessages = [];
      state.currentChatId = null;
      state.currentTargetUserId = null;
      state.activeConversationId = null;

      state.unreadMessages = 0;
      state.unreadStatus = "idle";
      state.unreadError = null;

      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationMessages.pending, (state, action) => {
        state.status = "loading";
        state.error = null;

        state.currentTargetUserId = action.meta.arg;
        state.currentMessages = [];
        state.currentChatId = null;
      })

      .addCase(fetchConversationMessages.fulfilled, (state, action) => {
        const { targetUserId, chatId, messages } = action.payload;

        //ignore a response for a different, previously selected user
        if (state.currentTargetUserId !== targetUserId) return;

        state.status = "succeeded";
        state.currentChatId = chatId;
        state.currentMessages = messages;

        //update the sidebar conversation if it already exists
        if (chatId) {
          const conversation = state.conversations.find(
            (c) => c._id === chatId,
          );

          if (conversation) {
            conversation.messages = messages;
          }
        }
      })

      .addCase(fetchConversationMessages.rejected, (state, action) => {
        if (state.currentTargetUserId !== action.meta.arg) return;

        state.status = "failed";
        state.error = action.payload;
      })

      //fetchUnreadMessages reducers
      .addCase(fetchUnreadMessages.pending, (state) => {
        state.unreadStatus = "loading";
        state.unreadError = null;
      })
      .addCase(fetchUnreadMessages.fulfilled, (state, action) => {
        state.unreadStatus = "succeeded";
        state.unreadMessages = action.payload.unreadMessages;
      })
      .addCase(fetchUnreadMessages.rejected, (state, action) => {
        state.unreadStatus = "failed";
        state.unreadError = action.payload;
      });
  },
});

export const {
  setConversations,
  setActiveConversation,
  setConversationMessages,
  prependMessages,
  addIncomingMessage,
  clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;
