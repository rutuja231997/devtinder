import { MessageSquare } from "lucide-react";

const MessageSidebar = ({ activeChatId, onSelect, user, conversations }) => {
  return (
    <div
      className={`w-full shrink-0 flex-col border-r border-border bg-surface md:flex md:w-65 ${
        activeChatId ? "hidden" : "flex"
      }`}
    >
      <div className="flex h-16 items-center gap-2 border-b border-border px-4">
        <MessageSquare className="size-4 text-brand" />
        <h1 className="text-sm font-semibold text-heading">Messages</h1>
      </div>
      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-2">
        {conversations.map((c) => {
          const participants = c.participants.find((p) => p._id !== user._id);

          const lastMessage = c.messages[c.messages.length - 1];
          return (
            <button
              key={c._id}
              type="button"
              onClick={() => onSelect(c._id)}
              className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-colors duration-200 hover:bg-elevated ${
                c._id === activeChatId ? "bg-elevated" : ""
              }`}
            >
              {participants.photoUrl ? (
                <img
                  src={participants.photoUrl}
                  alt={`${participants.firstName} ${participants.lastName}`}
                  className="size-10 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-xs font-semibold text-heading">
                  {participants.firstName[0].toUpperCase() +
                    participants.lastName[0].toUpperCase()}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="capitalize block truncate text-[13px] font-medium text-heading">
                  {participants.firstName + " " + participants.lastName}
                </span>
                <span className="block truncate text-[11px] text-muted-foreground">
                  1{lastMessage?.message || "No message yet"}
                </span>
              </span>

              {/* {c.unread ? (
                  <span className="flex size-5 items-center justify-center rounded-full bg-cyan text-[10px] font-bold text-background">
                    {c.unread}
                  </span>
                ) : null} */}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MessageSidebar;
