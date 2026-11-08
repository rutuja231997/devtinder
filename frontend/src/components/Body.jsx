import Sidebar from "./dashboard/Sidebar";
import Topbar from "./dashboard/Topbar";

import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background font-sans">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="flex min-h-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;
