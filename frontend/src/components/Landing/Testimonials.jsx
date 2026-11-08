import { Star } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import avatarOne from "../../assets/avatar-1.jpg";
import avatarTwo from "../../assets/avatar-2.jpg";
import avatarThree from "../../assets/avatar-3.jpg";

const testimonials = [
  {
    photo: avatarOne,
    name: "Ananya Rao",
    role: "Senior Full-Stack Engineer, Cloudpeak",
    quote:
      "I found two open-source collaborators in my first week. The discovery feed actually understands stacks instead of job titles.",
  },
  {
    photo: avatarTwo,
    name: "Daniel Okafor",
    role: "Backend Engineer, Northwind",
    quote:
      "Requests and chat feel instant, and Premium visibility got my profile in front of the right teams without any cold outreach.",
  },
  {
    photo: avatarThree,
    name: "Kenji Watanabe",
    role: "Platform Architect, Orbital",
    quote:
      "It's the first developer network that respects my time. Clean UI, no noise, and every conversation has been worth having.",
  },
];

/** Three testimonial cards with five-star ratings. */
export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <SectionHeading
        eyebrow="Testimonials"
        title="Loved by developers who ship"
        description="Real outcomes from engineers using TechDevTinder every week."
      />

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Reveal key={testimonial.name} delay={index * 0.08}>
            <figure className="glass-card h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-(--shadow-glow)">
              <div className="flex gap-1" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    className="size-4 fill-warning text-warning"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-body">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <img
                  src={testimonial.photo}
                  alt={`Portrait of ${testimonial.name}`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className="size-11 rounded-full object-cover"
                />
                <span>
                  <span className="block text-sm font-medium text-heading">
                    {testimonial.name}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
