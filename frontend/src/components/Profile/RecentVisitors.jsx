import { Link } from "react-router-dom";
import { Eye, ArrowRight, Clock3, UserRound } from "lucide-react";

function getTimeAgo(date) {
  if (!date) return "Recently";

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (!Number.isFinite(seconds) || seconds < 0) return "Recently";
  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

export default function RecentVisitors({
  visitors = [],
  status = "idle",
  error = null,
}) {
  const recentVisitors = visitors.slice(0, 5);

  return (
    <section className="mt-6 rounded-2xl border border-border bg-surface p-4 sm:p-5">
      {/* Heading */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-heading">
            Recent Visitors
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Developers who recently viewed your profile.
          </p>
        </div>

        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
          <Eye className="size-5 text-brand" />
        </div>
      </div>

      {/* Loading */}
      {status === "loading" && (
        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-elevated p-3"
            >
              <div className="size-11 animate-pulse rounded-full bg-border" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-32 animate-pulse rounded bg-border" />
                <div className="h-2.5 w-24 animate-pulse rounded bg-border" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {status === "failed" && (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-5 text-center">
          <p className="text-sm text-destructive">
            {error || "Unable to load profile visitors."}
          </p>
        </div>
      )}

      {/* Empty state */}
      {status === "succeeded" && recentVisitors.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-elevated/40 px-4 py-9 text-center">
          <div className="mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand/10">
            <UserRound className="size-6 text-brand" />
          </div>

          <h3 className="text-sm font-semibold text-heading">
            No visitors yet
          </h3>

          <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Your profile visitors will appear here when other developers check
            out your profile.
          </p>
        </div>
      )}

      {/* Visitors */}
      {status === "succeeded" && recentVisitors.length > 0 && (
        <div className="space-y-2">
          {recentVisitors.map((visitor) => (
            <VisitorCard key={visitor._id} visitor={visitor} />
          ))}
        </div>
      )}

      {/* View all */}
      {status === "succeeded" && visitors.length > 0 && (
        <Link
          to="/profile-views"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-xs font-semibold text-brand transition hover:border-brand/40 hover:bg-brand/5"
        >
          View all visitors
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </section>
  );
}

function VisitorCard({ visitor }) {
  const user = visitor.viewerId;

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, about } = user;

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "DV";

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-border bg-elevated/50 p-3 transition hover:border-brand/40 hover:bg-elevated">
      {/* Avatar */}
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={fullName}
          className="size-11 shrink-0 rounded-full border border-border object-cover"
        />
      ) : (
        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-xs font-semibold text-white">
          {initials}
        </div>
      )}

      {/* Developer details */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold capitalize text-heading">
          {fullName || "Developer"}
        </p>

        <p className="mt-0.5 truncate text-xs text-muted-foreground">
          {about || "Developer on TechDevTinder"}
        </p>

        <div className="mt-1.5 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Clock3 className="size-3" />
          <span>{getTimeAgo(visitor.viewedAt)}</span>
        </div>
      </div>

      {/* View profile */}
      <Link
        to={`/profile-view/${_id}`}
        state={{ user }}
        className="shrink-0 rounded-lg border border-brand/40 px-3 py-2 text-xs font-medium text-brand transition hover:bg-brand/10"
      >
        View Profile
      </Link>
    </div>
  );
}
