import Navbar from "./Navbar";
import Footer from "./Footer";

import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userFetch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/profile/view`,
        { withCredentials: true },
      );
      dispatch(addUser(response.data.user));
    } catch (err) {
      navigate("/");
      console.log(err.message);
    }
  };

  useEffect(() => {
    userFetch();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
