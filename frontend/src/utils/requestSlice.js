import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";

//fetch connection requests from the backend
export const fetchRequests = createAsyncThunk(
  "requests/fetchRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/user/requests/received`);

      console.log(response.data.connectionRequests);
      return response.data.connectionRequests;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch connection requests",
      );
    }
  },
);

const requestSlice = createSlice({
  name: "requests",

  initialState: {
    items: [],
    status: "idle",
    error: null,
  },

  reducers: {
    removeRequest: (state, action) => {
      state.items = state.items.filter((r) => r._id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })

      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
