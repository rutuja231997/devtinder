import { Eye, Users, ArrowUpRight } from "lucide-react";

export default function ProfileAnalytics({ totalViews = 0, status }) {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-heading">
          Profile Analytics
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Discover how developers are engaging with your profile.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-lg">
        {/* Decorative gradient */}
        <div className="pointer-events-none absolute -right-12 -top-16 size-40 rounded-full bg-brand/10 blur-3xl" />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Unique profile visitors
            </p>

            {status === "loading" ? (
              <div className="mt-2 h-10 w-20 animate-pulse rounded-lg bg-elevated" />
            ) : (
              <h3 className="mt-2 text-4xl font-bold tracking-tight text-heading">
                {totalViews}
              </h3>
            )}

            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
              Developers who have visited your profile.
            </p>
          </div>

          <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-(image:--gradient-brand) shadow-lg shadow-brand/20">
            <Eye className="size-7 text-white" />
          </div>
        </div>

        <div className="relative mt-5 flex items-center gap-2 border-t border-border pt-4">
          <div className="flex size-8 items-center justify-center rounded-lg bg-brand/10">
            <Users className="size-4 text-brand" />
          </div>

          <p className="flex-1 text-xs text-muted-foreground">
            Build your network by connecting with developers who share your
            interests.
          </p>

          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
