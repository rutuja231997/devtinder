import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Users } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchConnections, removeConnection } from "../utils/connectionsSlice";

import ConnectionCard from "../components/ConnectionCard";
import axiosInstance from "../utils/axiosInstance";

const Connections = () => {
  const dispatch = useDispatch();

  const {
    items: connections,
    connectionStatus,
    connectionError,
  } = useSelector((store) => store.connections);

  const navigate = useNavigate();

  const handleMessage = (connectedUser) => {
    navigate(`/message/${connectedUser._id}`, {
      state: { targetUser: connectedUser },
    });
  };

  const handleRemoveConnection = async (targetUserId) => {
    try {
      const response = await axiosInstance.delete(
        `/user/connection/${targetUserId}`,
      );
      dispatch(removeConnection(targetUserId));
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (connectionStatus === "idle") {
      dispatch(fetchConnections());
    }
  }, [dispatch, connectionStatus]);

  if (connectionStatus === "loading") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Loading connections...</p>
      </div>
    );
  }

  if (connectionStatus === "failed") {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>{connectionError}</p>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>No connections found...</p>
      </div>
    );
  }

  return (
    <main className="min-w-0 flex-1 overflow-y-auto p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-heading">
            Your connections
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {connections.length} developers in your professional network.
          </p>
        </div>
        {/* <div className="flex flex-wrap items-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                filter === f
                  ? "border-brand/50 bg-brand/15 text-heading"
                  : "border-border bg-surface text-muted-foreground hover:text-body"
              }`}
            >
              {f}
            </button>
          ))}
          <label className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search connections"
              className="w-40 bg-transparent text-xs text-body outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div> */}
      </div>

      {connections.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {connections.map((c, i) => (
            <ConnectionCard
              key={c._id}
              user={c.user}
              connectedAt={c.connectedAt || "Connected just now"}
              index={i}
              onMessage={() => handleMessage(c.user)}
              onRemove={() => handleRemoveConnection(c.user._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-elevated py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-surface">
            <Users className="size-5 text-muted-foreground" />
          </span>
          <p className="text-sm font-medium text-heading">
            No connections found
          </p>
          <p className="text-xs text-muted-foreground">
            Try a different search or filter.
          </p>
        </div>
      )}
    </main>
  );
};

export default Connections;
