import {
  ShieldCheck,
  KeyRound,
  Users,
  UserPlus,
  MessagesSquare,
  Mail,
  AlarmClock,
  CreditCard,
  MonitorSmartphone,
  Lock,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: KeyRound,
    title: "JWT Authentication",
    description:
      "Stateless, token-based sign-in with secure httpOnly session handling.",
  },
  {
    icon: ShieldCheck,
    title: "Authorization",
    description:
      "Role-aware access rules so every request only touches what it should.",
  },
  {
    icon: Users,
    title: "Developer Discovery",
    description:
      "A curated feed of developers matched to your stack, role and interests.",
  },
  {
    icon: UserPlus,
    title: "Connection Requests",
    description: "Send, review, accept or ignore requests with a single tap.",
  },
  {
    icon: MessagesSquare,
    title: "Real-time Chat",
    description:
      "Instant socket-powered messaging with your accepted connections.",
  },
  {
    icon: Mail,
    title: "AWS SES Emails",
    description:
      "Transactional email notifications delivered reliably at scale.",
  },
  {
    icon: AlarmClock,
    title: "Scheduled Reminders",
    description: "Cron-driven digests so you never miss a pending request.",
  },
  {
    icon: CreditCard,
    title: "Razorpay Premium",
    description: "Frictionless checkout for upgrading to a Premium membership.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    description:
      "A polished experience from ultrawide monitors down to phones.",
  },
  {
    icon: Lock,
    title: "Secure APIs",
    description:
      "Validated inputs, rate limiting and hardened endpoints by default.",
  },
];

/** Feature grid with hover-lift cards. */
export default function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <SectionHeading
        eyebrow="Features"
        title="Everything a developer network needs"
        description="Production-grade building blocks powering discovery, connections and conversations."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Reveal key={feature.title} delay={index * 0.05}>
            <article className="glass-card group h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-(--shadow-glow)">
              <span className="inline-flex size-11 items-center justify-center rounded-2xl border border-border bg-elevated text-primary transition-colors duration-300 group-hover:bg-(image:--gradient-brand) group-hover:text-primary-foreground">
                <feature.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold text-heading">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
