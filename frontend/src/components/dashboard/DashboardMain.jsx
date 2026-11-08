import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  MessageSquare,
  Eye,
  Compass,
  User,
  Crown,
  ArrowUpRight,
} from "lucide-react";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

import { useNavigate } from "react-router-dom";

import { fetchRequests, removeRequest } from "../../utils/requestSlice";
import { fetchConnections } from "../../utils/connectionsSlice";
import { fetchProfileViews } from "../../utils/profileviewSlice";
import { fetchUnreadMessages } from "../../utils/messagesSlice";

import { RequestCard } from "../../pages/Request";

const toneMap = {
  brand: "bg-brand/15 text-brand",
  cyan: "bg-cyan/15 text-cyan",
  violet: "bg-violet/15 text-violet",
  success: "bg-success/15 text-success",
};

const discover = [
  {
    name: "Kenji Sato",
    role: "Rust · Systems",
    initials: "KS",
    tags: ["Rust", "WASM"],
  },
  {
    name: "Amara Okafor",
    role: "ML Engineer",
    initials: "AO",
    tags: ["PyTorch", "LLM"],
  },
  {
    name: "Luca Bianchi",
    role: "Frontend Lead",
    initials: "LB",
    tags: ["React", "a11y"],
  },
];

const feed = [
  {
    name: "Sara Lindqvist",
    initials: "SL",
    time: "1h",
    text: "Shipped an open-source CLI for scaffolding TanStack apps — feedback welcome.",
  },
  {
    name: "Diego Alvarez",
    initials: "DA",
    time: "4h",
    text: "Looking for a backend dev to pair on a realtime chat side project this weekend.",
  },
];

const quick = [
  { label: "Discover", icon: Compass, link: "/feed" },
  { label: "Connections", icon: Users, link: "/connections" },
  { label: "Profile", icon: User, link: "/profile" },
];

export default function DashboardMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: connections, connectionStatus } = useSelector(
    (store) => store.connections,
  );

  const { items: connectionsRequest, status } = useSelector(
    (store) => store.requests,
  );

  const { unreadMessages, unreadStatus } = useSelector(
    (store) => store.messages,
  );

  const { profileTotalViews, profileStatus } = useSelector(
    (store) => store.profileviews,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRequests());
    }
    if (profileStatus === "idle") {
      dispatch(fetchProfileViews());
    }
    if (connectionStatus === "idle") {
      dispatch(fetchConnections());
    }
    if (unreadStatus === "idle") {
      dispatch(fetchUnreadMessages());
    }
  }, [dispatch, status, unreadStatus, profileStatus, connectionStatus]);

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

  const handleProfileView = (user) => {
    navigate(`/profile-view/${user._id}`, { state: { user: user } });
  };

  const stats = [
    {
      label: "Connections",
      value: connections.length,
      delta: "+12 this week",
      icon: Users,
      tone: "brand",
      link: "/connections",
    },
    {
      label: "Pending requests",
      value: connectionsRequest.length,
      delta: "3 new today",
      icon: UserPlus,
      tone: "cyan",
      link: "/requests",
    },
    {
      label: "Unread messages",
      value: unreadMessages,
      delta: "2 from premium",
      icon: MessageSquare,
      tone: "violet",
      link: "/message",
    },
    {
      label: "Profile views",
      value: profileTotalViews,
      delta: "+18% vs last week",
      icon: Eye,
      tone: "success",
      link: "/profile-views",
    },
  ];

  return (
    <main className="min-w-0 flex-1 overflow-y-auto p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-heading">
            Your developer network
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's what moved in your network since yesterday.
          </p>
        </div>
        <div className="flex gap-2">
          {quick.map(({ label, icon: Icon, link }) => (
            <button
              key={label}
              onClick={() => navigate(link)}
              className="flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-xs font-medium text-body transition hover:border-brand/40 hover:text-heading"
            >
              <Icon className="size-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => navigate(s.link)}
            className="rounded-2xl border border-border bg-elevated p-4 shadow-(--shadow-card)"
          >
            <div className="flex items-center justify-between">
              <span
                className={`flex size-9 items-center justify-center rounded-xl ${toneMap[s.tone]}`}
              >
                <s.icon className="size-4.5" />
              </span>
              <ArrowUpRight className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-3 font-display text-2xl font-semibold text-heading">
              {s.value}
            </p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-2 text-[11px] font-medium text-cyan">{s.delta}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <section className="rounded-2xl border border-border bg-elevated p-5 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-heading">
              Connection requests
            </h2>
            <button className="text-xs font-medium text-brand">View all</button>
          </div>
          <div className="flex flex-col gap-2">
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

          <h2 className="mb-3 mt-6 text-sm font-semibold text-heading">
            Latest from your feed
          </h2>
          <div className="flex flex-col gap-2">
            {feed.map((f) => (
              <article
                key={f.name}
                className="rounded-xl border border-border bg-surface p-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-elevated text-[11px] font-semibold text-body">
                    {f.initials}
                  </span>
                  <p className="text-xs font-medium text-heading">{f.name}</p>
                  <span className="text-[11px] text-muted-foreground">
                    · {f.time} ago
                  </span>
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-body">
                  {f.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <section className="rounded-2xl border border-border bg-elevated p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-heading">
                Discover developers
              </h2>
              <Compass className="size-4 text-violet" />
            </div>
            <div className="flex flex-col gap-2">
              {discover.map((d) => (
                <div
                  key={d.name}
                  className="rounded-xl border border-border bg-surface p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-elevated text-[11px] font-semibold text-body">
                      {d.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-heading">
                        {d.name}
                      </p>
                      <p className="truncate text-[11px] text-muted-foreground">
                        {d.role}
                      </p>
                    </div>
                    <button className="rounded-lg bg-(image:--gradient-brand) px-3 py-1.5 text-[11px] font-semibold text-heading">
                      Connect
                    </button>
                  </div>
                  <div className="mt-2.5 flex gap-1.5">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border px-2 py-0.5 text-[10px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-elevated p-5">
            <div className="flex items-center gap-2">
              <Crown className="size-4 text-warning" />
              <h2 className="text-sm font-semibold text-heading">Premium</h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              You've used <span className="text-heading">7 of 10</span> premium
              messages to developers outside your network this month.
            </p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface">
              <div className="h-full w-[70%] rounded-full bg-(image:--gradient-brand)" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
