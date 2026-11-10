/* eslint-disable react-hooks/set-state-in-effect */
import { Search, Bell, ChevronDown } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../utils/userSlice";

import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { data: user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");

  // keep the input synchronized with the URL
  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      const query = params.get("q") || "";

      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(`/logout`, {});
      console.log(response);

      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    user && (
      <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur-xl">
        {/* <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search developers..."
            className="h-10 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm text-body outline-none transition placeholder:text-muted-foreground focus:border-brand/50"
          />
        </div> */}

        {/* Global Search */}
        <form onSubmit={handleSearch} className="relative w-full max-w-md">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search developers..."
            aria-label="Search developers"
            className="h-10 w-full rounded-full border border-border bg-surface pl-4 pr-12 text-sm text-body outline-none transition placeholder:text-muted-foreground focus:border-brand/50"
          />

          <button
            type="submit"
            aria-label="Search developers"
            disabled={!searchQuery.trim()}
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-brand/10 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Search className="size-4" />
          </button>
        </form>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative flex size-10 items-center justify-center rounded-full border border-border bg-surface text-body transition hover:text-heading">
            <Bell className="size-4.5" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-cyan shadow-[0_0_0_3px_var(--surface)]" />
          </button>

          <button className="flex items-center gap-2.5 rounded-full border border-border bg-surface py-1.5 pl-1.5 pr-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-(image:--gradient-brand) text-xs font-semibold text-heading">
              {user.firstName[0] + user.lastName[0]}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-xs font-semibold text-heading">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="block text-[11px] text-muted-foreground">
                {user.role ? user.role : "No role specified"}
              </span>
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>

          <button onClick={handleLogout} className="">
            Logout
          </button>
        </div>
      </header>
    )
  );
}
