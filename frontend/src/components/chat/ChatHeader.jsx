import { ArrowLeft, User, MoreHorizontal, MessageSquare } from "lucide-react";

function ChatHeader({ participant, onBack }) {
  // No conversation or target developer is selected.
  if (!participant) {
    return (
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to conversations"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-body transition hover:text-heading md:hidden"
        >
          <ArrowLeft className="size-4" />
        </button>

        <span className="flex size-10 items-center justify-center rounded-full bg-elevated text-muted-foreground">
          <MessageSquare className="size-5" />
        </span>

        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-heading">Messages</h2>
          <p className="text-[11px] text-muted-foreground">
            Select a conversation to start chatting
          </p>
        </div>
      </header>
    );
  }

  const fullName =
    `${participant.firstName ?? ""} ${participant.lastName ?? ""}`.trim();

  const initials =
    `${participant.firstName?.[0] ?? ""}${participant.lastName?.[0] ?? ""}` ||
    "?";

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border px-4 sm:px-5">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to conversations"
        className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-body transition hover:text-heading md:hidden"
      >
        <ArrowLeft className="size-4" />
      </button>

      {participant.photoUrl ? (
        <img
          src={participant.photoUrl}
          alt={fullName || "Developer"}
          className="size-10 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-xs font-semibold text-heading">
          {initials}
        </span>
      )}

      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold text-heading">
          {fullName || "Developer"}
        </h2>
        <p className="truncate text-[11px] text-muted-foreground">
          {participant.about || "Connected developer"}
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          aria-label="View developer profile"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-body transition hover:border-brand/40 hover:text-heading"
        >
          <User className="size-4" />
        </button>

        <button
          type="button"
          aria-label="More options"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-surface text-body transition hover:border-brand/40 hover:text-heading"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
