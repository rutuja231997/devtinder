import { motion } from "framer-motion";

function initialsOf(firstName, lastName) {
  return (
    `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase() ||
    "DV"
  );
}

function isValidPhoto(url) {
  return typeof url === "string" && /^https?:\/\//.test(url.trim());
}

export default function ProfileCard({ user, onEdit }) {
  const {
    firstName,
    lastName,
    role,
    photoUrl,
    about,
    skills = [],
    verified,
  } = user;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#1B2436] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[#4F8CFF]/12 via-[#7C5CFC]/8 to-transparent" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start gap-5">
          {isValidPhoto(photoUrl) ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="h-20 w-20 shrink-0 rounded-2xl object-cover ring-1 ring-[rgba(255,255,255,0.12)] sm:h-24 sm:w-24"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#4F8CFF] to-[#7C5CFC] text-2xl font-semibold tracking-wide text-[#F8FAFC] ring-1 ring-[rgba(255,255,255,0.12)] sm:h-20 sm:w-20">
              {initialsOf(firstName, lastName)}
            </div>
          )}

          <div className="min-w-0 pt-1">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-xl font-semibold text-[#F8FAFC] sm:text-2xl">
                {firstName} {lastName}
              </h2>
              {verified && (
                <span
                  title="Verified developer"
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2DD4BF]/15 text-[#2DD4BF]"
                >
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-[#94A3B8]">{role}</p>
          </div>
        </div>

        {about && (
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-[#CBD5E1]">
            {about}
          </p>
        )}

        {skills.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-[#121826] px-3 py-1 text-xs font-medium text-[#CBD5E1]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {onEdit && (
          <div className="mt-7 border-t border-[rgba(255,255,255,0.08)] pt-6">
            <motion.button
              type="button"
              onClick={onEdit}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.985 }}
              className="mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] px-5 py-3 text-sm font-semibold text-[#F8FAFC] shadow-[0_12px_30px_-12px_rgba(79,140,255,0.7)] transition-shadow hover:shadow-[0_16px_36px_-12px_rgba(124,92,252,0.75)]"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M13.6 2.9a1.6 1.6 0 012.3 2.3l-.8.8-2.3-2.3.8-.8zM11.6 4.9l2.3 2.3-7.1 7.1-3 .8.8-3 7-7.2z" />
              </svg>
              Edit Profile
            </motion.button>
          </div>
        )}
      </div>
    </motion.section>
  );
}
