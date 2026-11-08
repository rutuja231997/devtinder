import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock3, Eye, Users } from "lucide-react";
import { useSelector } from "react-redux";

function getTimeAgo(date) {
  if (!date) return "Recently";

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (!Number.isFinite(seconds) || seconds < 0) return "Recently";
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function VisitorCard({ visitor }) {
  const user = visitor.viewerId;

  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, about } = user;

  const fullName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  const initials =
    `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "DV";

  return (
    <div className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 transition duration-200 hover:border-brand/40 hover:bg-elevated sm:flex-row sm:items-center">
      {/* Developer information */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={fullName}
            className="size-12 shrink-0 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-(image:--gradient-brand) text-sm font-semibold text-white">
            {initials}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold capitalize text-heading">
            {fullName || "Developer"}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {about || "Developer on TechDevTinder"}
          </p>

          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock3 className="size-3" />
            <span>Viewed {getTimeAgo(visitor.viewedAt)}</span>
          </div>
        </div>
      </div>

      {/* Profile action */}
      <Link
        to={`/profile-view/${_id}`}
        state={{ user }}
        className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-brand/40 px-4 py-2.5 text-xs font-semibold text-brand transition hover:bg-brand/10"
      >
        View Profile
        <ArrowUpRight className="size-3.5" />
      </Link>
    </div>
  );
}

export default function ProfileViews() {
  const navigate = useNavigate();

  const { profileVisitors, profileTotalViews, profileError } = useSelector(
    (store) => store.profileviews,
  );

  return (
    <main className="min-h-screen w-full bg-[#0A0F1F] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        {/* Page heading */}
        <header className="mb-7">
          <button
            onClick={() => navigate("/profile")}
            className="mb-5 flex items-center gap-2 text-xs font-medium text-muted-foreground transition hover:text-heading"
          >
            <ArrowLeft className="size-4" />
            Back to Profile
          </button>

          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-brand/10">
              <Eye className="size-5 text-brand" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-heading sm:text-3xl">
                Profile Views
              </h1>

              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Discover developers who have visited your profile.
              </p>
            </div>
          </div>
        </header>

        {/* Visitor count */}
        <section className="relative mb-7 overflow-hidden rounded-2xl border border-border bg-surface p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full bg-brand/10 blur-3xl" />

          <div className="relative flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total unique visitors
              </p>

              {status === "loading" ? (
                <div className="mt-3 h-10 w-20 animate-pulse rounded-lg bg-elevated" />
              ) : (
                <h2 className="mt-2 text-4xl font-bold tracking-tight text-heading">
                  {profileTotalViews}
                </h2>
              )}

              <p className="mt-2 text-xs text-muted-foreground">
                Developers who have viewed your profile.
              </p>
            </div>

            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-(image:--gradient-brand) shadow-lg shadow-brand/20">
              <Users className="size-7 text-white" />
            </div>
          </div>
        </section>

        {/* Visitor list heading */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-heading">All Visitors</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Your latest profile visitors.
            </p>
          </div>

          {status === "succeeded" && (
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              {profileTotalViews} visitors
            </span>
          )}
        </div>

        {/* Loading */}
        {status === "idle" || status === "loading" ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex animate-pulse items-center gap-3 rounded-2xl border border-border bg-surface p-4"
              >
                <div className="size-12 rounded-full bg-elevated" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-36 rounded bg-elevated" />
                  <div className="h-3 w-24 rounded bg-elevated" />
                </div>
              </div>
            ))}
          </div>
        ) : status === "failed" ? (
          <div className="rounded-2xl border border-destructive/20 bg-surface p-8 text-center">
            <p className="text-sm text-destructive">
              {profileError || "Unable to load profile visitors."}
            </p>
          </div>
        ) : profileVisitors.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface px-5 py-14 text-center">
            <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-brand/10">
              <Eye className="size-7 text-brand" />
            </div>

            <h3 className="text-base font-semibold text-heading">
              No profile visitors yet
            </h3>

            <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted-foreground">
              When other developers visit your profile, they'll appear here.
              Keep your profile updated to help developers discover you.
            </p>

            <Link
              to="/discover"
              className="mt-5 rounded-xl bg-(image:--gradient-brand) px-5 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
            >
              Discover Developers
            </Link>
          </div>
        ) : (
          /* Visitor list */
          <div className="space-y-3">
            {profileVisitors.map((visitor) => (
              <VisitorCard key={visitor._id} visitor={visitor} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
