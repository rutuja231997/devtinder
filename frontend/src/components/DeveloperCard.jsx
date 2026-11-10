import { motion } from "framer-motion";

const initials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");

function VerifiedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4.5 w-4.5 shrink-0 text-[#2DD4BF]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.2 2.4 2.3 4.6-4.8" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12.5 4.5 4.5L19 7" />
    </svg>
  );
}

/**
 * Premium developer profile card for the Feed.
 * Purely presentational — handlers are passed in from the feed logic.
 */

// Keep your existing imports for:
// initials, VerifiedIcon, CloseIcon, CheckIcon

export default function DeveloperCard({
  user,
  handleSendRequest,
  showActions = true,
}) {
  const {
    firstName,
    lastName,
    about,
    skills = [],
    photoUrl,
    role,
    location,
    isPremium,
  } = user || {};

  const fullName = `${firstName || ""} ${lastName || ""}`.trim();

  const subtitle = [role || "Software Developer", location]
    .filter(Boolean)
    .join(" · ");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      className="w-full rounded-[24px] border border-white/8 bg-[#121826] p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] sm:p-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`${fullName} profile photo`}
            loading="lazy"
            className="h-16 w-16 shrink-0 rounded-full object-cover sm:h-17 sm:w-17"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#4F8CFF] to-[#7C5CFC] text-xl font-semibold tracking-wide text-white sm:h-17 sm:w-17">
            {initials(fullName) || "DV"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-semibold tracking-tight text-[#F8FAFC] sm:text-[22px]">
              {fullName || "Unnamed Developer"}
            </h3>

            <VerifiedIcon />

            {isPremium && (
              <span className="rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#F59E0B]">
                Pro
              </span>
            )}
          </div>

          <p className="mt-1 truncate text-sm text-[#94A3B8] sm:text-[15px]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Bio */}
      {about && (
        <p className="mt-6 text-sm leading-relaxed text-[#CBD5E1] sm:text-[15px]">
          {about}
        </p>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/8 bg-[#1B2436] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] sm:px-4 sm:text-[13px]"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Actions */}
      {showActions && handleSendRequest && (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5">
          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSendRequest("ignored", user._id)}
            className="flex items-center justify-center gap-2 rounded-full border border-white/8 bg-transparent px-4 py-3 text-sm font-medium text-[#CBD5E1] transition-colors hover:border-white/20 hover:bg-white/4 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20 sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            <CloseIcon />
            Ignore
          </motion.button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSendRequest("interested", user._id)}
            className="flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] px-4 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(79,140,255,0.9)] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]/60 sm:px-6 sm:py-3.5 sm:text-[15px]"
          >
            <CheckIcon />
            Connect
          </motion.button>
        </div>
      )}
    </motion.article>
  );
}
