import { motion } from "motion/react";
import { Check, Crown, Minus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import Button from "../ui/Button";

const comparison = [
  { label: "Unlimited Messaging", regular: false, premium: true },
  { label: "Premium Badge", regular: false, premium: true },
  { label: "Priority Visibility", regular: false, premium: true },
  { label: "Better Networking", regular: false, premium: true },
  { label: "Developer Discovery", regular: true, premium: true },
  { label: "Connection Requests", regular: true, premium: true },
];

function PlanRow({ label, included }) {
  return (
    <li className="flex items-center gap-3 py-2.5 text-sm">
      {included ? (
        <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
      ) : (
        <Minus
          className="size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <span
        className={
          included ? "text-body" : "text-muted-foreground line-through"
        }
      >
        {label}
      </span>
    </li>
  );
}

/** Regular vs Premium pricing comparison. */
export default function Premium() {
  return (
    <section
      id="premium"
      className="mx-auto max-w-5xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <SectionHeading
        eyebrow="Premium"
        title="Network without limits"
        description="Start free, upgrade when you want to reach every developer on the platform."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        <Reveal>
          <article className="glass-card h-full rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-(--shadow-glow)">
            <h3 className="text-lg font-semibold text-heading">Regular</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              For getting started
            </p>
            <p className="mt-6 text-4xl font-semibold text-heading">
              ₹0
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / forever
              </span>
            </p>
            <ul className="mt-6 border-t border-border pt-4">
              {comparison.map((row) => (
                <PlanRow
                  key={row.label}
                  label={row.label}
                  included={row.regular}
                />
              ))}
            </ul>
            <Button
              href="#cta"
              variant="secondary"
              size="lg"
              className="mt-8 w-full"
            >
              Continue Free
            </Button>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.article
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="group relative h-full rounded-3xl border border-primary/40 bg-surface/80 p-8 shadow-glow backdrop-blur-xl transition-all duration-300 hover:border-primary/70"
          >
            <span className="absolute -top-3 right-8 flex items-center gap-1.5 rounded-full bg-linear-to-r from-primary to-secondary px-3 py-1 text-xs font-medium text-heading transition-transform duration-300 group-hover:scale-105">
              <Crown className="size-3.5" aria-hidden="true" /> Most popular
            </span>
            <h3 className="text-lg font-semibold text-heading">Premium</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              For serious networkers
            </p>
            <p className="mt-6 text-4xl font-semibold text-heading">
              ₹499
              <span className="text-base font-normal text-muted-foreground">
                {" "}
                / month
              </span>
            </p>
            <ul className="mt-6 border-t border-border pt-4">
              {comparison.map((row) => (
                <PlanRow
                  key={row.label}
                  label={row.label}
                  included={row.premium}
                />
              ))}
            </ul>
            <Button href="#cta" size="lg" className="mt-8 w-full">
              Upgrade to Premium
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Secure checkout powered by Razorpay
            </p>
          </motion.article>
        </Reveal>
      </div>
    </section>
  );
}
