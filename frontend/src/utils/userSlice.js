import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, authChecked: false },
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
      state.authChecked = true;
    },
    removeUser: (state) => {
      state.data = null;
      state.authChecked = true;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
