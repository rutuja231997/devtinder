import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchRequests, removeRequest } from "../utils/requestSlice";

import { useNavigate } from "react-router-dom";

import { Check, X } from "lucide-react";

const Request = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    items: connectionsRequest,
    status,
    error,
  } = useSelector((store) => store.requests);

  const handleRequest = async (status, requestId) => {
    try {
      const response = await axiosInstance.post(
        `/request/review/${status}/${requestId}`,
        {},
      );
      console.log(response.data);
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfileView = async (user) => {
    try {
      const response = await axiosInstance.post(
        `/profile-view/${user._id}`,
        {},
      );
      console.log(response.data);
      console.log("view profile");
      navigate(`/profile-view/${user._id}`, { state: { user: user } });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRequests());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Loading connection requests....</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>{error}</p>
      </div>
    );
  }

  if (connectionsRequest.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>No pending connection requests</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col min-h-screen w-full justify-start items-center space-y-8 mt-10">
      <div>
        <h1 className="font-semibold text-2xl">Connection Requests</h1>
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        {connectionsRequest.map((request) => {
          const user = request.fromUserId;

          return (
            <RequestCard
              key={request._id}
              user={user}
              requestId={request._id}
              handleRequest={handleRequest}
              handleProfileView={handleProfileView}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Request;

export function RequestCard({
  user,
  requestId,
  handleRequest,
  handleProfileView,
}) {
  const { firstName, lastName, about, age, gender } = user;

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-xs font-semibold text-heading">
        {firstName?.[0]}
        {lastName?.[0]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-heading">
          {firstName} {lastName}
        </p>

        {age && gender && (
          <p className="text-xs text-muted-foreground">
            {age} · {gender}
          </p>
        )}

        {about && (
          <p className="truncate text-xs text-muted-foreground">{about}</p>
        )}
      </div>

      <button
        onClick={() => handleProfileView(user)}
        className="rounded-lg border border-brand/40 px-3 py-2 text-xs font-medium text-brand transition hover:bg-brand/10"
      >
        View Profile
      </button>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handleRequest("accepted", requestId)}
          aria-label="Accept request"
          className="flex size-9 items-center justify-center rounded-lg bg-success/15 text-success transition hover:bg-success/25"
        >
          <Check className="size-4" />
        </button>

        <button
          onClick={() => handleRequest("rejected", requestId)}
          aria-label="Reject request"
          className="flex size-9 items-center justify-center rounded-lg bg-destructive/15 text-destructive transition hover:bg-destructive/25"
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  );
}
