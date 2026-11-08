import {
  Bell,
  Compass,
  Crown,
  LayoutDashboard,
  MessagesSquare,
  Search,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Feed", active: true },
  { icon: Compass, label: "Discover", active: false },
  { icon: UserPlus, label: "Requests", active: false },
  { icon: MessagesSquare, label: "Messages", active: false },
  { icon: Users, label: "Connections", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const analytics = [
  { label: "Profile views", value: "1,284", trend: "+12%" },
  { label: "Connections", value: "342", trend: "+8%" },
  { label: "Messages", value: "1,096", trend: "+23%" },
];

const feed = [
  {
    initials: "MK",
    name: "Marco Klein",
    role: "Backend Engineer · Go, Kubernetes",
  },
  {
    initials: "SP",
    name: "Sara Pinto",
    role: "Frontend Engineer · React, Three.js",
  },
  {
    initials: "DN",
    name: "Dev Nair",
    role: "Platform Engineer · AWS, Terraform",
  },
];

/** Static, non-interactive mock of the product dashboard. */
export default function DashboardPreview() {
  return (
    <section
      id="dashboard"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <SectionHeading
        eyebrow="Product"
        title="A workspace built for developer networking"
        description="Feed, requests, chat and analytics — all in one calm, focused dashboard."
      />

      <Reveal delay={0.1}>
        <div className="glass-card mt-14 overflow-hidden rounded-3xl">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-elevated/60 px-5 py-3">
            <span className="size-2.5 rounded-full bg-destructive/70" />
            <span className="size-2.5 rounded-full bg-warning/70" />
            <span className="size-2.5 rounded-full bg-success/70" />
            <span className="ml-4 flex items-center gap-2 rounded-lg border border-border px-3 py-1 text-xs text-muted-foreground">
              <Search className="size-3" aria-hidden="true" /> Search
              developers…
            </span>
          </div>

          <div className="grid gap-px bg-border/50 md:grid-cols-[190px_1fr_240px]">
            {/* Sidebar */}
            <nav
              aria-label="Dashboard preview"
              className="hidden bg-surface p-4 md:block"
            >
              <ul className="space-y-1">
                {sidebarItems.map((item) => (
                  <li key={item.label}>
                    <span
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${
                        item.active
                          ? "bg-primary/15 text-heading"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 rounded-2xl border border-border bg-elevated p-3">
                <p className="flex items-center gap-2 text-xs font-medium text-heading">
                  <Crown className="size-3.5 text-warning" aria-hidden="true" />{" "}
                  Premium
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Message anyone instantly.
                </p>
              </div>
            </nav>

            {/* Feed + analytics */}
            <div className="space-y-4 bg-background/60 p-5">
              <div className="grid grid-cols-3 gap-3">
                {analytics.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-2xl border border-border bg-surface p-3 transition-colors duration-300 hover:border-primary/35"
                  >
                    <p className="text-xs text-muted-foreground">
                      {card.label}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-heading">
                      {card.value}
                    </p>
                    <p className="text-xs text-success">{card.trend}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-3">
                {feed.map((developer) => (
                  <li
                    key={developer.name}
                    className="group flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-xs font-semibold text-heading">
                      {developer.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-heading">
                        {developer.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {developer.role}
                      </span>
                    </span>
                    <span className="rounded-xl bg-primary/15 px-3 py-1.5 text-xs text-heading transition-colors duration-300 group-hover:bg-primary/30">
                      Connect
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right rail: notifications + chat */}
            <aside className="space-y-4 bg-surface p-4">
              <div className="rounded-2xl border border-border bg-elevated p-3 transition-colors duration-300 hover:border-accent/40">
                <p className="flex items-center gap-2 text-xs font-medium text-heading">
                  <Bell className="size-3.5 text-accent" aria-hidden="true" />{" "}
                  Notifications
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Sara Pinto accepted your request.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  2 new connection requests.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-elevated p-3 transition-colors duration-300 hover:border-primary/35">
                <p className="text-xs font-medium text-heading">Chat · Marco</p>
                <p className="mt-2 w-fit rounded-xl rounded-bl-sm bg-surface px-2.5 py-1.5 text-xs text-body">
                  Free for a code review?
                </p>
                <p className="mt-2 ml-auto w-fit rounded-xl rounded-br-sm bg-primary/25 px-2.5 py-1.5 text-xs text-heading">
                  Sending the PR now.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
