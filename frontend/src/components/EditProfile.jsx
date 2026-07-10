import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import FormInput from "./Form/FormInput";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    age: user?.age || 0,
    gender: user?.gender || "",
    about: user?.about || "",
    skills: user?.skills || "",
    photoUrl: user?.photoUrl || "",
    contact: user?.contact || "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError("");

      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/profile/update`,
        formData,
        { withCredentials: true },
      );

      console.log(response.data);
      dispatch(addUser(response.data.user));
    } catch (err) {
      console.log(err?.response?.data?.message);
      setError(err?.response?.data?.message);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className={`card card-border bg-base-300 w-150 p-8`}>
        <h2 className="card-title text-xl font-semibold">Profile Edit</h2>
        <form
          onSubmit={handleSubmit}
          className={`card-body grid grid-cols-2 gap-4`}
        >
          <>
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
              type="text"
              placeholder={"Enter a profile url"}
              label={"PhotoUrl"}
              name={"photoUrl"}
              value={formData.photoUrl}
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
              type="text"
              label="About"
              name={"about"}
              value={formData.about}
              onChange={handleChange}
            />
            <FormInput
              type="text"
              placeholder="Enter a skills"
              label="Skills"
              name={"skills"}
              onChange={handleChange}
              value={formData.skills}
            />
            <FormInput
              type="text"
              label="Contact"
              name={"contact"}
              placeholder={"Enter a contact"}
              value={formData.contact}
              onChange={handleChange}
            />
          </>
          <div className="card-actions flex flex-col justify-center items-center">
            <p className="text-red-500 text-xs font-semibold">{error}</p>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
      <UserCard user={formData} />
    </div>
  );
};

export default EditProfile;
