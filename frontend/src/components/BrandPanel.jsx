import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./ui/Logo";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 + i * 0.09,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const BrandPanel = () => {
  return (
    <aside className="hidden w-full flex-col justify-center lg:flex lg:w-[54%]">
      <motion.div initial="hidden" animate="show">
        <motion.div
          custom={0}
          variants={fadeUp}
          className="flex items-center gap-3"
        >
          <Link to="/">
            <Logo fontSize="text-lg" />
          </Link>
        </motion.div>

        <motion.h2
          custom={1}
          variants={fadeUp}
          className="mt-10 max-w-xl text-4xl font-semibold leading-[1.12] tracking-tight text-[#F8FAFC] xl:text-5xl"
        >
          Connect. Collaborate.{" "}
          <span className="bg-linear-to-r from-[#4F8CFF] via-[#7C5CFC] to-[#2DD4BF] bg-clip-text text-transparent">
            Grow Together.
          </span>
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="mt-5 max-w-md text-[15px] leading-relaxed text-[#CBD5E1]"
        >
          Discover developers, build meaningful connections, and grow your
          professional network.
        </motion.p>

        {/* product preview */}
        <div className="mt-12 max-w-lg space-y-4">
          <motion.div
            custom={3}
            variants={fadeUp}
            className="rounded-2xl border border-white/8 bg-[#121826]/80 p-4 shadow-xl shadow-black/30 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-[#4F8CFF] to-[#2DD4BF] text-sm font-semibold text-white">
                AK
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-[#F8FAFC]">
                    Aarav Kapoor
                  </p>
                  <span className="rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] font-medium text-[#F59E0B]">
                    Premium
                  </span>
                </div>
                <p className="truncate text-xs text-[#94A3B8]">
                  Full-stack Engineer · Bengaluru
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["React", "Node.js", "GraphQL", "AWS"].map((s) => (
                <span
                  key={s}
                  className="rounded-lg border border-white/8 bg-[#1B2436] px-2.5 py-1 text-[11px] font-medium text-[#CBD5E1]"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              custom={4}
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-[#1B2436]/80 p-4 shadow-lg shadow-black/20 backdrop-blur-sm"
            >
              <p className="text-xs font-medium text-[#94A3B8]">
                Connection request
              </p>
              <p className="mt-1.5 text-sm font-semibold text-[#F8FAFC]">
                Meera wants to connect
              </p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-lg bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] px-3 py-1.5 text-[11px] font-semibold text-white">
                  Accept
                </span>
                <span className="rounded-lg border border-white/8 px-3 py-1.5 text-[11px] font-medium text-[#94A3B8]">
                  Ignore
                </span>
              </div>
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-[#121826]/80 p-4 shadow-lg shadow-black/20 backdrop-blur-sm"
            >
              <p className="text-xs font-medium text-[#94A3B8]">Messages</p>
              <div className="mt-2.5 space-y-2">
                <p className="w-fit rounded-xl rounded-tl-sm bg-[#1B2436] px-3 py-1.5 text-[11px] text-[#CBD5E1]">
                  Ship the PR today?
                </p>
                <p className="ml-auto w-fit rounded-xl rounded-tr-sm bg-[#4F8CFF]/15 px-3 py-1.5 text-[11px] text-[#4F8CFF]">
                  On it 🚀
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            custom={6}
            variants={fadeUp}
            className="flex items-center gap-6 pt-2 text-xs text-[#94A3B8]"
          >
            <span>
              <strong className="text-[#F8FAFC]">12k+</strong> developers
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span>
              <strong className="text-[#F8FAFC]">40k+</strong> connections
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" /> Live
              now
            </span>
          </motion.div>
        </div>
      </motion.div>
    </aside>
  );
};

export default BrandPanel;
