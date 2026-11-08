import { motion } from "framer-motion";
import { Bell, UserPlus, MessageSquare, Mail, Crown, Send } from "lucide-react";

const notifications = [
  {
    icon: UserPlus,
    title: "Neha Kulkarni sent you a request",
    time: "4m",
    tone: "cyan",
  },
  {
    icon: MessageSquare,
    title: "Diego Alvarez replied in chat",
    time: "22m",
    tone: "brand",
  },
  {
    icon: Mail,
    title: "Weekly network digest emailed",
    time: "3h",
    tone: "violet",
  },
  {
    icon: Crown,
    title: "Premium trial ends in 5 days",
    time: "1d",
    tone: "warning",
  },
];

const chats = [
  {
    name: "Sara Lindqvist",
    msg: "Sharing the repo now 👍",
    initials: "SL",
    unread: 2,
  },
  {
    name: "Ibrahim Khan",
    msg: "Are you open to pairing?",
    initials: "IK",
    unread: 1,
  },
  { name: "Mei Tanaka", msg: "Thanks for the review!", initials: "MT" },
];

const toneMap = {
  cyan: "bg-cyan/15 text-cyan",
  brand: "bg-brand/15 text-brand",
  violet: "bg-violet/15 text-violet",
  warning: "bg-warning/15 text-warning",
};

export default function ActivityPanel() {
  return (
    <aside className="hidden w-[320px] shrink-0 flex-col gap-4 border-l border-border bg-surface p-5 xl:flex">
      <section className="rounded-2xl border border-border bg-elevated p-4">
        <div className="mb-3 flex items-center gap-2">
          <Bell className="size-4 text-cyan" />
          <h3 className="text-sm font-semibold text-heading">Notifications</h3>
          <span className="ml-auto rounded-full bg-cyan/15 px-2 py-0.5 text-[11px] font-semibold text-cyan">
            4 new
          </span>
        </div>
        <div className="flex flex-col gap-1">
          {notifications.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i }}
              className="flex gap-3 rounded-xl p-2 transition hover:bg-surface"
            >
              <span
                className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${toneMap[n.tone]}`}
              >
                <n.icon className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] text-body">{n.title}</p>
                <p className="text-[11px] text-muted-foreground">
                  {n.time} ago
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="flex min-h-0 flex-1 flex-col rounded-2xl border border-border bg-elevated p-4">
        <div className="mb-3 flex items-center gap-2">
          <MessageSquare className="size-4 text-brand" />
          <h3 className="text-sm font-semibold text-heading">Chat</h3>
          <button className="ml-auto text-[11px] font-medium text-brand">
            Open inbox
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {chats.map((c) => (
            <button
              key={c.name}
              className="flex items-center gap-3 rounded-xl p-2 text-left transition hover:bg-surface"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-(image:--gradient-brand) text-xs font-semibold text-heading">
                {c.initials}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-heading">
                  {c.name}
                </span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  {c.msg}
                </span>
              </span>
              {c.unread ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-cyan text-[10px] font-bold text-background">
                  {c.unread}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-full border border-border bg-surface py-1.5 pl-4 pr-1.5">
          <input
            placeholder="Quick reply..."
            className="w-full bg-transparent text-xs text-body outline-none placeholder:text-muted-foreground"
          />
          <span className="flex size-7 items-center justify-center rounded-full bg-(image:--gradient-brand)">
            <Send className="size-3.5 text-heading" />
          </span>
        </div>
      </section>
    </aside>
  );
}
