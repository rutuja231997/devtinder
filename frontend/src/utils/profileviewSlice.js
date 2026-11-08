import axiosInstance from "./axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProfileViews = createAsyncThunk(
  "profileViews/fetchProfileViews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/profile-views`);

      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data.message || "Failed to fetch profile views",
      );
    }
  },
);

const profileviewSlice = createSlice({
  name: "profileViews",

  initialState: {
    profileVisitors: [],
    profileTotalViews: 0,
    profileStatus: "idle",
    profileError: null,
  },

  reducers: {
    clearProfileViews: (state) => {
      state.profileVisitors = [];
      state.profileTotalViews = 0;
      state.profileStatus = "idle";
      state.profileError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileViews.pending, (state) => {
        state.profileStatus = "loading";
        state.profileError = null;
      })
      .addCase(fetchProfileViews.fulfilled, (state, action) => {
        state.profileStatus = "succeeded";
        state.profileTotalViews = action.payload.totalViews;
        state.profileVisitors = action.payload.profileViews;
      })
      .addCase(fetchProfileViews.rejected, (state, action) => {
        state.profileStatus = "failed";
        state.profileError = action.payload;
      });
  },
});

export const { clearProfileViews } = profileviewSlice.actions;
export default profileviewSlice.reducer;
