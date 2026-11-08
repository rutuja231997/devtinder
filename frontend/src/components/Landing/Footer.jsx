import { FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "../ui/Logo";

const footerColumns = [
  {
    title: "Navigation",
    links: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Premium", href: "#premium" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#features" },
      { label: "API Reference", href: "#features" },
      { label: "Changelog", href: "#features" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Privacy Policy", href: "#top" },
      { label: "Terms", href: "#top" },
      { label: "Contact", href: "#top" },
    ],
  },
];

/** Site footer with navigation, resources and social links. */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The professional network where software developers discover peers,
              connect and build together.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#top"
                aria-label="GitHub"
                className="flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-heading"
              >
                <FaGithub className="size-4" aria-hidden="true" />
              </a>
              <a
                href="#top"
                aria-label="LinkedIn"
                className="flex size-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-heading"
              >
                <FaLinkedin className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-semibold text-heading">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-heading"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} TechDevTinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
