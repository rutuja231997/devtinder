import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Compass,
  UserPlus,
  MessageSquare,
  Users,
  User,
  Crown,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import Logo from "../ui/Logo";

const items = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Discover", icon: Compass, path: "/feed" },
  { label: "Requests", icon: UserPlus, badge: 6, path: "/requests" },
  {
    label: "Messages",
    icon: MessageSquare,
    badge: 3,
    path: "/message",
  },

  { label: "Connections", icon: Users, path: "/connections" },
  { label: "Profile", icon: User, path: "/profile" },
  { label: "Memberships", icon: Crown, path: "/memberships" },
];

export default function Sidebar() {
  return (
    <aside className="hidden w-62 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
      <Logo className="mb-8" />

      <nav className="flex flex-col gap-1">
        {items.map(({ label, icon: Icon, path, badge }) => (
          <NavLink to={path} key={label}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.98 }}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-elevated text-heading"
                    : "text-muted-foreground hover:bg-elevated/60 hover:text-body"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-5 w-0.75 -translate-y-1/2 rounded-full bg-(image:--gradient-brand)" />
                )}

                <Icon className={`size-4.5 ${isActive ? "text-brand" : ""}`} />

                <span className="font-medium">{label}</span>

                {badge ? (
                  <span className="ml-auto rounded-full bg-cyan/15 px-2 py-0.5 text-[11px] font-semibold text-cyan">
                    {badge}
                  </span>
                ) : null}
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-border bg-(image:--gradient-brand) p-px">
        <div className="rounded-[15px] bg-elevated p-4">
          <div className="flex items-center gap-2">
            <Crown className="size-4 text-warning" />
            <p className="text-sm font-semibold text-heading">Go Premium</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Message developers before connecting and get priority in Discover.
          </p>
          <button className="mt-3 w-full rounded-lg bg-(image:--gradient-brand) py-2 text-xs font-semibold text-heading">
            Upgrade with Razorpay
          </button>
        </div>
      </div>
    </aside>
  );
}
