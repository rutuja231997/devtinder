import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

import photoImg from "../assets/female-profile.jpg";

const Request = () => {
  const dispatch = useDispatch();

  const connectionsRequest = useSelector((store) => store.requests);

  const [error, setError] = useState("");

  const handleRequest = async (status, requestId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );
      console.log(response.data);
      dispatch(removeRequest(requestId));
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/requests/received`,
          { withCredentials: true },
        );

        console.log(response.data.connectionRequests);
        dispatch(addRequest(response.data.connectionRequests));
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    }
    fetchRequests();
  }, [dispatch]);

  if (!connectionsRequest) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>{error}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen w-full justify-start items-center space-y-8 mt-10">
      <div>
        <h1 className="font-semibold text-2xl">Connection Requests</h1>
      </div>
      {connectionsRequest.map((request, index) => {
        const { firstName, lastName, about, age, gender } = request.fromUserId;
        return (
          <div key={request._id}>
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
                  <div>{age + " " + gender}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {about}
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn bg-pink-500"
                  onClick={() => handleRequest("accepted", request._id)}
                >
                  Accepted
                </button>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
