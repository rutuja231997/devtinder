import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  pagination: {
    totalUsers: 0,
    totalPages: 0,
  },
};

const searchUserSlice = createSlice({
  name: "searchUser",
  initialState,

  reducers: {
    //store developers returned by the search api
    setSearchUsers: (state, action) => {
      state.users = action.payload;
    },

    // store pagination information
    setSearchPagination: (state, action) => {
      state.pagination = action.payload;
    },

    // remove a developer after connect or ignore succeeds
    removeSearchUser: (state, action) => {
      const userId = action.payload;

      state.users = state.users.filter((user) => user._id !== userId);

      //update the displayed result count
      state.pagination.totalUsers = Math.max(
        0,
        state.pagination.totalUsers - 1,
      );
    },

    // clear search results
    clearSearchResults: (state) => {
      state.users = [];
      state.pagination = {
        totalUsers: 0,
        totalPages: 0,
      };
    },
  },
});

export const {
  setSearchUsers,
  setSearchPagination,
  removeSearchUser,
  clearSearchResults,
} = searchUserSlice.actions;

export default searchUserSlice.reducer;
