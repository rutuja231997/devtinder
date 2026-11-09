import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/connections`);
      console.log(response.data.connections);
      return response.data.connections;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch connections",
      );
    }
  },
);

const connectionSlice = createSlice({
  name: "connections",

  initialState: {
    items: [],
    connectionStatus: "idle",
    connectionError: null,
  },
  reducers: {
    addConnection: (state, action) => {
      state.items.push(action.payload);
    },
    removeConnection: (state, action) => {
      state.items = state.items.filter(
        (connection) => connection.user._id !== action.payload,
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchConnections.pending, (state) => {
        state.connectionStatus = "loading";
        state.connectionError = null;
      })

      .addCase(fetchConnections.fulfilled, (state, action) => {
        state.connectionStatus = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchConnections.rejected, (state, action) => {
        state.connectionStatus = "failed";
        state.connectionError = action.payload;
      });
  },
});

export const { removeConnection, addConnection } = connectionSlice.actions;

export default connectionSlice.reducer;
