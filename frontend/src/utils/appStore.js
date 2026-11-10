import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionsSlice";
import requestReducer from "./requestSlice";
import messagesReducer from "./messagesSlice";
import profileviewReducer from "./profileviewSlice";
import searchUserReducer from "./searchUserSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
    messages: messagesReducer,
    profileviews: profileviewReducer,
    searchUser: searchUserReducer,
  },
});

export default appStore;
