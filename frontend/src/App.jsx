import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Body from "./components/Body";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Request from "./pages/Request";
import Home from "./pages/Home";
import Chat from "./pages/Chat";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Premium from "./pages/Premium";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/request" element={<Request />} />
            <Route path="/chat/:targetUserId" element={<Chat />} />
            <Route path="/memberships" element={<Premium />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
