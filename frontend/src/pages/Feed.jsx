import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";

import UserCard from "../components/UserCard";

const Feed = () => {
  const [, setError] = useState("");

  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      console.log(response.data);
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    async function fetchFeed() {
      if (feed.length > 0) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/feed`,
          { withCredentials: true },
        );
        console.log(response.data);
        dispatch(addFeed(response.data.users));
      } catch (err) {
        setError(err?.response?.data.message);
      }
    }
    fetchFeed();
  }, [feed, dispatch]);

  if (!feed) {
    return <div>Loading</div>;
  }

  if (feed.length == 0) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <h1 className="text-2xl font-semibold">
          Right now, don't have users in feed
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      {feed.length > 0 && (
        <UserCard
          key={feed[0]._id}
          user={feed[0]}
          handleSendRequest={handleSendRequest}
        />
      )}
    </div>
  );
};

export default Feed;
