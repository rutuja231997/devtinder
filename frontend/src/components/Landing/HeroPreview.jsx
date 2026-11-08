import { motion } from "motion/react";
import { BadgeCheck, Bell, Check, Crown, MessageCircle, X } from "lucide-react";

const skills = ["React", "Node.js", "TypeScript", "AWS"];

/** Floating glassmorphic app preview shown on the right side of the hero. */
export default function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-lg">
      {/* Soft glowing background */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 -z-10 rounded-full bg-linear-to-tr from-primary/25 via-secondary/20 to-accent/20 blur-3xl"
      />

      {/* Main developer profile card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass-card rounded-3xl p-6"
      >
        <div className="flex items-center gap-4">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary text-lg font-semibold text-heading">
            AR
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 font-semibold text-heading">
              Ananya Rao
              <BadgeCheck className="size-4 text-accent" aria-hidden="true" />
            </p>
            <p className="truncate text-sm text-muted-foreground">
              Senior Full-Stack Engineer · Bengaluru
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-body/90">
          Building distributed systems and design tooling. Looking for
          collaborators on open-source developer infrastructure.
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-border bg-elevated px-3 py-1 text-xs text-body"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-border bg-surface py-2.5 text-sm text-muted-foreground transition-colors hover:text-heading"
          >
            <X className="size-4" aria-hidden="true" /> Ignore
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-primary to-secondary py-2.5 text-sm font-medium text-heading"
          >
            <Check className="size-4" aria-hidden="true" /> Connect
          </button>
        </div>
      </motion.div>

      {/* Floating chat preview */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
        className="glass-card absolute -bottom-36 left-0 hidden w-60 rounded-2xl p-4 sm:block sm:-left-16"
      >
        <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <MessageCircle className="size-3.5 text-accent" aria-hidden="true" />{" "}
          Chat · Marco
        </p>
        <p className="mt-3 w-fit rounded-2xl rounded-bl-sm bg-elevated px-3 py-2 text-xs text-body">
          Loved your CLI tool, want to pair on it?
        </p>
        <p className="mt-2 ml-auto w-fit rounded-2xl rounded-br-sm bg-primary/25 px-3 py-2 text-xs text-heading">
          Absolutely — let's ship it 🚀
        </p>
      </motion.div>

      {/* Floating notification */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
        className="glass-card absolute -top-10 -right-4 hidden items-center gap-3 rounded-2xl p-3 sm:flex sm:-right-10"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-success/15">
          <Bell className="size-4 text-success" aria-hidden="true" />
        </span>
        <span className="text-xs text-body">
          <strong className="font-semibold text-heading">3 new</strong>{" "}
          connection requests
        </span>
      </motion.div>

      {/* Premium badge */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 6.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="glass-card absolute -bottom-14 right-0 hidden items-center gap-2 rounded-2xl px-3 py-2 sm:flex sm:-right-8"
      >
        <Crown className="size-4 text-warning" aria-hidden="true" />
        <span className="text-xs font-medium text-heading">Premium member</span>
      </motion.div>
    </div>
  );
}
