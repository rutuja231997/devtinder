import { motion } from "motion/react";

const variantClasses = {
  primary:
    "bg-gradient-to-r from-primary to-secondary text-heading shadow-glow hover:brightness-110 hover:scale-[1.02]",
  secondary:
    "border border-border bg-surface/70 text-heading hover:border-primary/35 hover:bg-elevated",
  ghost: "text-body hover:text-heading",
};

const sizeClasses = {
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-[0.95rem]",
};

/** Reusable animated link-button built from scratch with Tailwind. */
export default function Button({
  onClick,
  type = "button",
  children,
  variant = "primary",
  size = "md",
  className = "",
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
