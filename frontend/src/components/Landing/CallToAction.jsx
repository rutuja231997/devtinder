import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Button from "../ui/Button";

/** Closing call-to-action band with a soft gradient background. */
export default function CallToAction() {
  return (
    <section
      id="cta"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-linear-to-br from-primary/20 via-secondary/15 to-accent/15 px-6 py-16 text-center sm:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 size-105 -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
          />
          <h2 className="relative mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-heading sm:text-[2.6rem] sm:leading-[1.1]">
            Start building meaningful developer connections today.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base text-body">
            Join thousands of engineers finding collaborators, mentors and
            teammates on TechDevTinder.
          </p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <Button href="#hero" size="lg">
              Create Free Account{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button href="#dashboard" size="lg" variant="secondary">
              Explore Platform
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
