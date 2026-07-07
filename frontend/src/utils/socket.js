import { io } from "socket.io-client";

export const createSocketConnection = () => {
  if (location.hostname === "localhost") {
    return io(import.meta.env.VITE_BACKEND_URL, {
      withCredentials: true,
    });
  } else {
    return io("/", { path: "/api/socket.io" });
  }
};
