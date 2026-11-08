import { motion } from "framer-motion";

function MessageBubble({ message, isMe, showMeta }) {
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[75%] flex-col ${isMe ? "items-end" : "items-start"}`}
      >
        <div
          className={
            isMe
              ? "rounded-2xl rounded-br-md bg-(image:--gradient-brand) px-4 py-2.5 text-[13.5px] leading-relaxed text-heading"
              : "rounded-2xl rounded-bl-md border border-border bg-elevated px-4 py-2.5 text-[13.5px] leading-relaxed text-body"
          }
        >
          {message.message}
        </div>
        {showMeta && time ? (
          <span className="mt-1 px-1 text-[11px] text-muted-foreground">
            {time}
          </span>
        ) : null}
      </div>
    </motion.div>
  );
}

export default MessageBubble;
