import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center space-x-8 items-center w-full h-screen">
      <Link to={"/login"}>
        <button className="btn btn-primary">Login</button>
      </Link>
      <Link to={"/signup"}>
        <button className="btn btn-primary">Sign up</button>
      </Link>
    </div>
  );
};

export default Home;
