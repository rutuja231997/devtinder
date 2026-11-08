import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "How does matching work?",
    answer:
      "Your profile skills, experience level and interests are compared against every other developer on the platform. The discovery feed then surfaces the people whose stack and goals overlap most with yours.",
  },
  {
    question: "What is Premium?",
    answer:
      "Premium is a paid membership that unlocks unlimited messaging, a verified premium badge, priority visibility in the discovery feed and richer networking tools. It is billed monthly through Razorpay.",
  },
  {
    question: "Can I message anyone?",
    answer:
      "Regular members can chat with developers who accepted their connection request. Premium members can start a conversation with any developer instantly, no request required.",
  },
  {
    question: "How secure is my account?",
    answer:
      "Accounts are protected with hashed passwords and JWT-based authentication, every API route is validated and authorized server-side, and all traffic is encrypted in transit.",
  },
];

/** Accessible accordion FAQ built without any UI library. */
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-8"
    >
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />

      <div className="mt-12 space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <Reveal key={faq.question} delay={index * 0.05}>
              <div
                className={`glass-card overflow-hidden rounded-2xl transition-colors duration-300 hover:border-primary/35 ${
                  isOpen ? "border-primary/35" : ""
                }`}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-heading transition-colors duration-300 hover:bg-elevated/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
