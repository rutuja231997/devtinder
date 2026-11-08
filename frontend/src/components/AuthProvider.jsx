import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { addUser, removeUser } from "../utils/userSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.get(`/profile/view`);

        dispatch(addUser(response.data.user));
      } catch (error) {
        dispatch(removeUser());
        console.log(error.message);
      }
    };

    checkAuth();
  }, [dispatch]);

  return children;
};

export default AuthProvider;
