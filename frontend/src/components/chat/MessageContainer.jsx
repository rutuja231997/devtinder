/* eslint-disable react-hooks/set-state-in-effect */
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

import { prependMessages } from "../../utils/messagesSlice";
import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";

import { MessageSquare } from "lucide-react";

const MessageContainer = ({ onSendMessage, targetUserId }) => {
  const dispatch = useDispatch();

  const { data: user } = useSelector((store) => store.user);

  const { currentMessages, currentChatId, currentTargetUserId, status, error } =
    useSelector((store) => store.messages);

  const scrollRef = useRef(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isCurrentTarget = currentTargetUserId === targetUserId;

  // Scroll to bottom on initial load / new messages (not on "load more")

  useEffect(() => {
    setHasMore(true);
    setLoadingMore(false);
  }, [targetUserId]);

  useEffect(() => {
    if (scrollRef.current && status === "succeeded" && isCurrentTarget) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentMessages.length, status, currentTargetUserId, isCurrentTarget]);

  const handleScroll = async () => {
    const container = scrollRef.current;

    if (
      !container ||
      loadingMore ||
      !hasMore ||
      !currentChatId ||
      currentMessages.length === 0
    )
      return;

    if (container.scrollTop >= 50) return;

    const oldest = currentMessages[0];

    if (!oldest?.createdAt) return;
    setLoadingMore(true);

    const prevScrollHeight = container.scrollHeight;
    const prevScrollTop = container.scrollTop;

    try {
      const response = await axiosInstance.get(`/chat/${targetUserId._id}`, {
        params: { before: oldest.createdAt, limit: 100 },
        withCredentials: true,
      });

      const olderMessages = response.data.messages ?? [];

      if (olderMessages.length === 0) {
        setHasMore(false);
        return;
      }

      dispatch(
        prependMessages({
          conversationId: currentChatId,
          messages: olderMessages,
        }),
      );

      setHasMore(olderMessages.length === 100);

      requestAnimationFrame(() => {
        if (!scrollRef.current) return;

        const newScrollHeight = scrollRef.current.scrollHeight;

        scrollRef.current.scrollTop =
          newScrollHeight - prevScrollHeight + prevScrollTop;
      });
    } catch (err) {
      console.error(
        "Failed to load older messages:",
        err.response?.data?.message || err.message,
      );
    } finally {
      setLoadingMore(false);
    }
  };

  if (!targetUserId) {
    return (
      <div className="flex-1 flex items-center justify-center">
        select a conversation...
      </div>
    );
  }
  if (!isCurrentTarget || status === "idle" || status === "loading") {
    return (
      <div className="flex-1 flex min-h-0 items-center justify-center">
        <LoadingMessages />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-1 items-center justify-center px-4 text-center text-sm">
        {error || "Unable to load messages"}
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Scrollable messages area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6"
      >
        {loadingMore && (
          <div className="py-2 text-center text-xs text-muted-foreground">
            Loading earlier messages…
          </div>
        )}

        {currentMessages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-elevated text-brand">
              <MessageSquare className="size-5" />
            </span>
            <p className="text-sm font-semibold text-heading">
              Start the conversation
            </p>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Say hello and start building your developer connection. Try: “Hi!
              Great to connect with you.”
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {currentMessages.map((m, i) => {
              const isMe = m.senderId._id === user._id;

              const prev = currentMessages[i - 1];
              const next = currentMessages[i + 1];

              const startsGroup = !prev || prev.senderId._id !== m.senderId._id;
              const endsGroup = !next || next.senderId._id !== m.senderId._id;

              return (
                <div key={m._id} className={startsGroup && i > 0 ? "mt-3" : ""}>
                  {startsGroup && (
                    <p
                      className={`mb-1 px-1 text-[11px] font-medium text-muted-foreground ${
                        isMe ? "text-right" : ""
                      }`}
                    >
                      {m.senderId.firstName} {m.senderId.lastName}
                    </p>
                  )}
                  <MessageBubble message={m} isMe={isMe} showMeta={endsGroup} />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Composer pinned below scroll area */}
      <MessageComposer onSend={onSendMessage} />
    </div>
  );
};

export default MessageContainer;

function LoadingMessages() {
  return (
    <div className="flex flex-col gap-3">
      {[70, 45, 60].map((w, i) => (
        <div
          key={w}
          className={`h-9 animate-pulse rounded-2xl bg-elevated ${i === 1 ? "self-end" : ""}`}
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}
