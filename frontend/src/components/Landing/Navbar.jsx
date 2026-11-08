import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";

import { useNavigate, Link } from "react-router-dom";

import Logo from "../ui/Logo";
import Button from "../ui/Button";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Premium", href: "#premium" },
  { label: "Testimonials", href: "#testimonials" },
];

/** Sticky navigation bar that blurs its background once the page is scrolled. */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : ""
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a
          href="#hero"
          className="rounded-xl focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Logo />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3.5 py-1.5 rounded-md text-sm text-body transition-colors duration-300 hover:text-heading hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/login"
            className="rounded-md text-sm text-body transition-colors duration-300 hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Login
          </Link>
          {/* <Link
            to="/signup"
            className="rounded-md text-sm text-body transition-colors duration-300 hover:text-heading focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Sign Up
          </Link> */}
          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="flex size-10 items-center justify-center rounded-xl border border-border text-heading transition-colors duration-300 hover:border-primary/35 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:hidden"
        >
          {isMobileMenuOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm text-body hover:bg-surface hover:text-heading"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex gap-3 px-3">
                <Button
                  onClick={() => navigate("/login")}
                  href="#cta"
                  variant="secondary"
                  className="flex-1"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate("/signup")}
                  href="#cta"
                  className="flex-1"
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
