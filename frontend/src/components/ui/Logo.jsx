import { Code2 } from "lucide-react";

/** Wordmark used in the navbar and footer. */
export default function Logo({ fontSize, className }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary shadow-glow">
        <Code2 className="size-5 text-heading" aria-hidden="true" />
      </span>
      <span
        className={`font-semibold tracking-tight text-heading font-base ${fontSize}`}
      >
        TechDev<span className="text-primary">Tinder</span>
      </span>
    </span>
  );
}
