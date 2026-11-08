import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import Button from "../ui/Button";
import HeroPreview from "./HeroPreview";

/** Above-the-fold hero with headline, CTAs and the app preview. */
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40"
    >
      {/* Soft gradient glow behind the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-130 w-205 -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-20 px-5 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-xs text-body backdrop-blur-md"
          >
            <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
            Professional networking, built for developers
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-6 text-4xl font-semibold tracking-tight text-heading sm:text-6xl sm:leading-[1.05]"
          >
            Find. Connect.
            <br />
            <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Build Together.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-body sm:text-lg"
          >
            TechDevTinder is the professional network where software developers
            discover peers by stack and interest, send connection requests, and
            start real conversations that turn into projects, teams and
            open-source collaborations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Button href="#cta" size="lg">
              Get Started <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="#dashboard" size="lg" variant="secondary">
              Explore Developers
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 text-sm text-muted-foreground"
          >
            Free forever plan · No credit card required
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>
  );
}
