import photoImg from "../assets/female-profile.jpg";
import { Link } from "react-router-dom";

const ConnectionsCard = ({ connection, index }) => {
  const { firstName, lastName, about } = connection;
  return (
    <ul className="list bg-base-300 rounded-box shadow-md w-150">
      <li className="list-row">
        <div className="text-4xl font-thin opacity-30 tabular-nums">
          {(index + 1).toString().padStart(2, "0")}
        </div>
        <div>
          <img className="h-12 w-12 rounded-full" src={photoImg} />
        </div>
        <div className="list-col-grow">
          <div>{firstName + " " + lastName}</div>
          <div className="text-xs uppercase font-semibold opacity-60">
            {about}
          </div>
        </div>
        <button className="btn btn-primary">Remove</button>
        <Link to={`/chat/${connection._id}`}>
          <button className="btn bg-pink-500">Chat</button>
        </Link>
      </li>
    </ul>
  );
};

export default ConnectionsCard;
