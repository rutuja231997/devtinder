/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { addUser } from "../utils/userSlice";

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-[#94A3B8] uppercase">
        {label}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-xs text-[#94A3B8]">{hint}</span>
      )}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-[rgba(255,255,255,0.08)] bg-[#0A0F1F] px-3.5 py-2.5 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8]/70 outline-none transition-colors focus:border-[#4F8CFF]/70 focus:ring-2 focus:ring-[#4F8CFF]/20";

export default function EditProfileModal({ open, user, onClose, onSave }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && user) {
      setForm({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        age: user?.age || 0,
        gender: user?.gender || "",
        role: user?.role || "",
        about: user?.about || "",
        skills: user?.skills || "",
        photoUrl: user?.photoUrl || "",
        contact: user?.contact || "",
      });

      setError("");
    }
  }, [open, user]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, loading]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        conatct: form.contact?.trim() || null,
        skills: String(form.skills || "")
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };

      const response = await axiosInstance.patch(`/profile/update`, payload, {
        withCredentials: true,
      });

      dispatch(addUser(response.data.user));

      // Notify parent if it needs to perform additional updates.
      onSave?.(response.data.user);

      onClose();
    } catch (err) {
      console.error(err?.response?.data?.message || err.message);

      setError(
        err?.response?.data?.message ||
          "Unable to update your profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !loading && onClose()}
            className="absolute inset-0 bg-[#0A0F1F]/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Edit profile"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#1B2436] shadow-[0_40px_80px_-40px_rgba(0,0,0,1)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[rgba(255,255,255,0.08)] px-6 py-5">
              <div>
                <h3 className="text-base font-semibold text-[#F8FAFC]">
                  Edit Profile
                </h3>
                <p className="mt-0.5 text-xs text-[#94A3B8]">
                  Update how other developers see you.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                aria-label="Close"
                className="rounded-lg p-1.5 text-[#94A3B8] transition-colors hover:bg-[#121826] hover:text-[#F8FAFC] disabled:opacity-50"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M6.2 4.8 10 8.6l3.8-3.8 1.4 1.4L11.4 10l3.8 3.8-1.4 1.4L10 11.4l-3.8 3.8-1.4-1.4L8.6 10 4.8 6.2z" />
                </svg>
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-h-[65vh] overflow-y-auto px-6 py-5"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="First name">
                  <input
                    name="firstName"
                    type="text"
                    className={inputClass}
                    value={form.firstName || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Last name">
                  <input
                    name="lastName"
                    type="text"
                    className={inputClass}
                    value={form.lastName || ""}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4">
                <Field label="Email">
                  <input
                    type="email"
                    name="email"
                    className={inputClass}
                    value={form.email || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Age">
                  <input
                    type="number"
                    name="age"
                    min="0"
                    className={inputClass}
                    value={form.age ?? ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Gender">
                  <input
                    name="gender"
                    className={inputClass}
                    value={form.gender || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Role">
                  <input
                    name="role"
                    className={inputClass}
                    value={form.role || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Photo URL">
                  <input
                    type="url"
                    name="photoUrl"
                    placeholder="https://…"
                    className={inputClass}
                    value={form.photoUrl || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Contact">
                  <input
                    type="text"
                    name="contact"
                    className={inputClass}
                    value={form.contact || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="About">
                  <textarea
                    name="about"
                    rows={4}
                    className={`${inputClass} resize-none`}
                    value={form.about || ""}
                    onChange={handleChange}
                  />
                </Field>

                <Field label="Skills" hint="Separate skills with commas.">
                  <input
                    type="text"
                    name="skills"
                    className={inputClass}
                    placeholder="React, Node.js, MongoDB"
                    value={form.skills || ""}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-4 text-sm font-medium text-red-400"
                >
                  {error}
                </p>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-xl border border-[rgba(255,255,255,0.08)] px-4 py-2.5 text-sm font-medium text-[#CBD5E1] transition-colors hover:bg-[#121826] disabled:opacity-50"
                >
                  Cancel
                </button>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={{ scale: 0.985 }}
                  className="rounded-xl bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] shadow-[0_12px_30px_-14px_rgba(79,140,255,0.8)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save changes"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
