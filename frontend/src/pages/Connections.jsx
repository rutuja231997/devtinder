import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionsSlice";
import ConnectionsCard from "../components/ConnectionsCard";

const Connections = () => {
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    async function fetchedConnections() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/connections`,
          { withCredentials: true },
        );
        console.log(response.data.connections);
        dispatch(addConnection(response.data.connections));
      } catch (err) {
        console.log(err);
        setError(err?.response?.data?.message);
      }
    }
    fetchedConnections();
  }, [dispatch]);

  if (!connections) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full justify-start items-center space-y-8 mt-10">
      <div>
        <h1 className="font-semibold text-2xl">Connections</h1>
      </div>
      {connections.map((connection, index) => (
        <ConnectionsCard
          key={connection._id}
          connection={connection}
          index={index}
        />
      ))}
    </div>
  );
};

export default Connections;
