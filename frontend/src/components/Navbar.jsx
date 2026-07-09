import { TbCodeCircle2Filled } from "react-icons/tb";

import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/logout`,
        {},
        { withCredentials: true },
      );
      console.log(response);
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm px-10">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          <TbCodeCircle2Filled size={32} />
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 justify-between items-center">
          <p>Welcome, {user.firstName}</p>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="user profile" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Friends</Link>
              </li>
              <li>
                <Link to="/request">Friend Request</Link>
              </li>
              <li>
                <Link to="/memberships">Buy membership</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
