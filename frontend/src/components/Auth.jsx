import FormInput from "./Form/FormInput";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Auth = ({ isLogin = true }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    gender: "",
    about: "",
    password: "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${isLogin ? "login" : "signup"}`,
        formData,
        { withCredentials: true },
      );

      console.log(response.data);
      console.log(response.data.user);

      dispatch(addUser(response.data.user));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        gender: "",
        about: "",
        skills: "",
        password: "",
      });

      navigate("/feed");
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div
        className={`card card-border bg-base-300 ${isLogin ? "w-94" : "w-150"} p-8`}
      >
        <h2 className="card-title text-xl font-semibold">
          {isLogin ? "Login" : "Sign up"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className={`card-body ${isLogin ? "flex flex-col justify-center items-left gap-4" : "flex flex-col justify-center items-left gap-4"}`}
        >
          {isLogin ? (
            <>
              <FormInput
                type="email"
                label="Email"
                placeholder={"Enter a email"}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                type="text"
                label={"Password"}
                placeholder={"Enter a password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {" "}
              <FormInput
                type="text"
                placeholder="Enter a first name"
                label="First Name"
                name={"firstName"}
                value={formData.firstName}
                onChange={handleChange}
              />
              <FormInput
                type="text"
                placeholder="Enter a last name"
                label="Last Name"
                name={"lastName"}
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormInput
                type="email"
                placeholder="Enter a email"
                label="Email"
                name={"email"}
                value={formData.email}
                onChange={handleChange}
              />
              <FormInput
                type="gender"
                placeholder="Enter a gender"
                label="Gender"
                name={"gender"}
                value={formData.gender}
                onChange={handleChange}
              />
              <FormInput
                type="number"
                placeholder="Enter a age"
                label="Age"
                name={"age"}
                value={formData.age}
                onChange={handleChange}
              />
              <FormInput
                type="password"
                placeholder="Enter a password"
                label="Password"
                name={"password"}
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="card-actions flex flex-col justify-center items-center">
            <p className="text-red-500 text-xs font-semibold">{error}</p>
            <button type="submit" className="btn btn-primary">
              {isLogin ? "Login" : "Sign up"}
            </button>
            <Link to={`${isLogin ? "/signup" : "/login"}`}>
              <button className="decoration-white underline text-sm font-medium">
                {isLogin ? "Sign up" : "Login"}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
