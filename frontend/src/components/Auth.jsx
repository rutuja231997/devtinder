import FormInput from "./Form/FormInput";

import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CircleAlert } from "lucide-react";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

import { motion, AnimatePresence } from "framer-motion";

import BrandPanel from "./BrandPanel";
import Logo from "./ui/Logo";

const Auth = ({ isLogin = true }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post(
        `${isLogin ? "login" : "signup"}`,
        formData,
        { withCredentials: true },
      );

      console.log(response.data);
      console.log(response.data.user);
      console.log(response.data.messages);

      dispatch(addUser(response.data.user));

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0A0F1F]">
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute -top-40 -left-32 h-130 w-130 rounded-full bg-[#4F8CFF]/16 blur-[140px]" />
        <div className="absolute -bottom-48 right-[-10%] h-140 w-140 rounded-full bg-[#7C5CFC]/14 blur-[150px]" />
        <div className="absolute top-1/3 left-1/2 h-80 w-[320px] -translate-x-1/2 rounded-full bg-[#2DD4BF]/8 blur-[130px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center gap-12 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:gap-16 lg:px-10">
        <BrandPanel />

        <div className="flex w-full justify-center lg:w-[46%] lg:justify-end">
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-115 rounded-3xl border border-white/10 bg-[#121826]/90 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 sm:p-9"
          >
            {/* mobile logo */}

            <Link to="/">
              <Logo fontSize="text-base" className="lg:hidden mb-7" />
            </Link>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "signup"}
                initial={{ opacity: 0, x: isLogin ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 10 : -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <header className="mb-7">
                  <h1 className="text-[26px] font-semibold tracking-tight text-[#F8FAFC] sm:text-3xl">
                    {isLogin ? "Welcome back" : "Create your account"}
                  </h1>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                    {isLogin
                      ? "Sign in to continue building your developer network."
                      : "Join TechDevTinder and start connecting with developers."}
                  </p>
                </header>

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-5"
                >
                  {!isLogin && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <FormInput
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Ada"
                        autoComplete="given-name"
                      />
                      <FormInput
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Lovelace"
                        autoComplete="family-name"
                      />
                    </div>
                  )}

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />

                  <FormInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                    rightSlot={
                      isLogin ? (
                        <button
                          type="button"
                          className="text-xs font-medium text-[#4F8CFF] transition-colors duration-200 hover:text-[#7C5CFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]/40 rounded"
                        >
                          Forgot password?
                        </button>
                      ) : null
                    }
                  />

                  <AnimatePresence>
                    {error && (
                      <motion.div
                        role="alert"
                        initial={{ opacity: 0, y: -6, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -6, height: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                          <CircleAlert className="h-6 w-6" />
                          <span className="leading-relaxed">{error}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.01 }}
                    whileTap={{ scale: loading ? 1 : 0.99 }}
                    className="mt-1 h-12 w-full rounded-xl bg-linear-to-r from-[#4F8CFF] to-[#7C5CFC] text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/20 transition-all duration-300 hover:brightness-110 hover:shadow-xl hover:shadow-[#4F8CFF]/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121826] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading
                      ? "Please wait…"
                      : isLogin
                        ? "Login"
                        : "Create Account"}
                  </motion.button>
                </form>

                <p className="mt-7 text-center text-sm text-[#94A3B8]">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <Link
                    to={isLogin ? "/signup" : "/login"}
                    className="font-medium text-[#4F8CFF] transition-colors duration-200 hover:text-[#7C5CFC]"
                  >
                    {isLogin ? "Sign Up" : "Login"}
                  </Link>
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </div>
      </div>
    </main>
  );
};

export default Auth;
