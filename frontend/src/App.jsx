import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Body from "./components/Body";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Connections from "./pages/Connections";
import Request from "./pages/Request";
import Chat from "./pages/Chat";

import LandingPage from "./components/Landing/LandingPage";
import DashboardMain from "./components/dashboard/DashboardMain";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Premium from "./pages/Premium";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Message from "./components/chat/Message";
import AuthProvider from "./components/AuthProvider";
import ProfileView from "./pages/ProfileView";
import ProfileViews from "./pages/ProfileViews";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PublicRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/" element={<Body />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardMain />} />
                <Route path="/message" element={<Message />} />
                <Route path="/message/:targetUserId" element={<Message />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Request />} />
                <Route
                  path="/profile-view/:profileOwnerId"
                  element={<ProfileView />}
                />
                <Route path="/profile-views" element={<ProfileViews />} />
                <Route path="/chat/:targetUserId" element={<Chat />} />
                <Route path="/memberships" element={<Premium />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
