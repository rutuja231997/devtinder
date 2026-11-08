import { UserCircle2, Search, Send, MessagesSquare } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const steps = [
  {
    icon: UserCircle2,
    title: "Create your developer profile",
    description: "Add your stack, experience and what you want to build next.",
  },
  {
    icon: Search,
    title: "Discover matching developers",
    description: "Browse a feed tuned to your skills, interests and location.",
  },
  {
    icon: Send,
    title: "Send connection requests",
    description: "Reach out to the people you'd genuinely like to work with.",
  },
  {
    icon: MessagesSquare,
    title: "Start chatting once connected",
    description: "Premium members can message any developer instantly.",
  },
];

/** Vertical 4-step timeline. */
export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <SectionHeading
        eyebrow="How it works"
        title="From profile to project in four steps"
        description="A short, deliberate flow that keeps conversations meaningful."
      />

      <ol className="relative mt-14 ml-6 space-y-8 border-l border-border pl-8 sm:ml-10">
        {steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 0.08} className="group">
              <span className="absolute -left-5.5 flex size-11 items-center justify-center rounded-2xl border border-border bg-elevated text-primary shadow-soft transition-colors duration-300 group-hover:bg-(image:--gradient-brand) group-hover:text-primary-foreground">
                <step.icon className="size-5" aria-hidden="true" />
              </span>
              <div className="glass-card rounded-3xl p-6 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-(--shadow-glow)">
                <p className="text-xs font-medium tracking-wide text-accent uppercase">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-heading">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
