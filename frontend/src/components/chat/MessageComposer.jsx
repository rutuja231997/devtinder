import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function MessageComposer({ onSend }) {
  const [text, setText] = useState("");
  const canSend = text.trim().length > 0;
  const submit = (e) => {
    e.preventDefault();
    if (!canSend) return;
    onSend(text.trim());
    setText("");
  };
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) submit(e);
  };
  return (
    <form
      onSubmit={submit}
      className="shrink-0 border-t border-border p-3 sm:p-4"
      aria-label="Message composer"
    >
      <div className="flex items-end gap-2 rounded-2xl border border-border bg-surface p-2 transition focus-within:border-brand/60 focus-within:ring-2 focus-within:ring-brand/20">
        <label htmlFor="chat-message" className="sr-only">
          Write a message
        </label>
        <textarea
          id="chat-message"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Write a message..."
          className="max-h-32 min-h-9 w-full resize-none bg-transparent px-2 py-1.5 text-sm text-body outline-none placeholder:text-muted-foreground"
        />
        <motion.button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          whileHover={canSend ? { scale: 1.05 } : undefined}
          whileTap={canSend ? { scale: 0.95 } : undefined}
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-heading shadow-[0_6px_18px_-8px_var(--brand)] transition-opacity duration-200 disabled:opacity-40"
        >
          <Send className="size-4" />
        </motion.button>
      </div>
    </form>
  );
}
