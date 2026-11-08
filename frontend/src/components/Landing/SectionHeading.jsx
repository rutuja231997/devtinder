import Reveal from "./Reveal";

/** Shared eyebrow + title + description block used by most sections. */
export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center rounded-full border border-border bg-surface/60 px-3 py-1 text-xs font-medium tracking-wide text-accent uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-heading sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-body/90">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
