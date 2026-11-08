import { motion } from "framer-motion";
import { MessageSquare, UserMinus } from "lucide-react";

function ConnectionCard({
  // status = "offline",
  user,
  connectedAt,
  index = 0,
  onMessage,
  onRemove,
}) {
  const formatConnectedDate = (date) => {
    if (!date) return "Connected just now";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    return `Connected since ${formattedDate}`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
      className="flex flex-col gap-3 rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#121826] p-4 transition hover:border-[rgba(255,255,255,0.14)] hover:bg-[#1B2436]"
    >
      <div className="flex items-start gap-3.5">
        <span className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-sm font-semibold text-[#F8FAFC]">
          {user.firstName[0].toUpperCase() + user.lastName[0].toUpperCase()}
          {/* <span
            className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-[#121826] ${
              status === "online" ? "bg-[#22C55E]" : "bg-[#94A3B8]"
            }`}
          /> */}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-[#F8FAFC]">
            {user.firstName + " " + user.lastName}
          </p>
          <p className="truncate text-xs text-[#94A3B8]">{user.about}</p>
          <p className="mt-0.5 truncate text-[11px] text-[#94A3B8]/80">
            {formatConnectedDate(connectedAt)}
          </p>
        </div>
        {/* <button
          aria-label={`More options for ${name}`}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-[rgba(255,255,255,0.06)] hover:text-[#F8FAFC]"
        >
          <MoreHorizontal className="size-4" />
        </button> */}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {user.skills?.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[10px] text-[#94A3B8]"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onMessage}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-(image:--gradient-brand) py-2 text-xs font-semibold text-[#F8FAFC] transition"
        >
          <MessageSquare className="size-3.5" />
          Message
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRemove}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 py-2 text-xs font-semibold text-red-400 transition hover:border-red-500/50 hover:bg-red-500/20"
        >
          <UserMinus className="size-3.5" />
          Remove
        </motion.button>
      </div>
    </motion.div>
  );
}

export default ConnectionCard;
