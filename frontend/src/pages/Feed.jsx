import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";

// import UserCard from "../components/UserCard";
import DeveloperCard from "../components/DeveloperCard";

const Feed = () => {
  const [, setError] = useState("");

  const feed = useSelector((store) => store.feed);

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const response = await axiosInstance.post(
        `/request/send/${status}/${userId}`,
        {},
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
        const response = await axiosInstance.get(`/user/feed`);
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
    <main className="min-h-screen bg-[#0A0F1F] px-6 py-14 flex justify-center items-start w-full">
      <div className="mx-auto max-w-165">
        <header className="mb-10">
          {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2DD4BF]">
            TechDevTinder
          </p> */}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#F8FAFC]">
            Your developer feed
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#94A3B8]">
            Curated engineers matching your stack. Connect or ignore — your feed
            learns either way.
          </p>
        </header>

        <div className="flex  items-center">
          {feed.length > 0 && (
            <DeveloperCard
              key={feed[0]._id}
              user={feed[0]}
              handleSendRequest={handleSendRequest}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Feed;
