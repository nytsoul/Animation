import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState, useMemo } from "react";
import { AudioManager } from "../components/AudioManager";
import { CustomCursor } from "../components/CustomCursor";

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: `${(i * 37) % 100}%`,
        y: `${(i * 17) % 58}%`,
        size: (i % 3) + 1,
        delay: (i % 7) * 0.45,
      })),
    [],
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: `${(i * 11) % 100}%`,
        delay: (i % 6) * 0.7,
        duration: 10 + (i % 5) * 2,
        size: 6 + (i % 4) * 2,
      })),
    [],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    // Simulate registration delay
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070a] text-white">
      <CustomCursor />
      <AudioManager />

      {/* Atmospheric sky backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,114,182,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.18),transparent_35%),linear-gradient(to_bottom,#2a1730_0%,#0a0a13_42%,#08070a_100%)]" />

      {/* Shooting fog layers */}
      <motion.div
        className="absolute inset-x-[-25%] top-[22%] h-52 bg-gradient-to-r from-transparent via-[#ffffff14] to-transparent blur-2xl"
        animate={{ x: ["-10%", "6%", "-10%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-x-[-20%] top-[34%] h-36 bg-gradient-to-r from-transparent via-[#ff9ca02b] to-transparent blur-2xl"
        animate={{ x: ["8%", "-8%", "8%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Moon and glow */}
      <motion.div
        className="absolute top-[9%] right-[11%] h-32 w-32 rounded-full bg-[#ffe8c5] shadow-[0_0_80px_rgba(255,220,190,0.65)]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Stars */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
            }}
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* Foreground petals */}
      <div className="absolute inset-0 overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-[-10%] rounded-[55%_45%_55%_45%] bg-[#ff7f9a] opacity-70 blur-[0.6px]"
            style={{
              left: petal.x,
              width: petal.size,
              height: petal.size * 1.4,
            }}
            animate={{
              y: ["0vh", "115vh"],
              x: [0, 18, -16, 12],
              rotate: [0, 120, 240],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              ease: "linear",
              delay: petal.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-30 flex min-h-screen items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Glowing card background */}
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#ff7f9a33] to-[#f5c95333] blur-2xl opacity-40" />

          {/* Main card */}
          <div className="rounded-2xl border border-[#ffffff22] bg-[#08070a99] backdrop-blur-xl px-8 py-10 shadow-2xl">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffd7e1] via-[#ff6f9a] to-[#f5c953]">
                JOIN OPERATION
              </h1>
              <p className="mt-2 text-sm text-[#c9bac3]">Recruit new agents for the vault mission</p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff7f9a44] to-[#f5c95344] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-xl border border-[#ffffff22] bg-[#0a0a1199] px-4 py-3 transition-all duration-300 group-hover:border-[#ff7f9a66] group-hover:bg-[#0f0a1499]">
                  <User className="h-5 w-5 text-[#ff7f9a] transition-all duration-300 group-hover:scale-110" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Agent name"
                    className="flex-1 border-none bg-transparent text-white placeholder-[#9a7a88] focus:outline-none"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#ff7f9a44] to-[#f5c95344] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-xl border border-[#ffffff22] bg-[#0a0a1199] px-4 py-3 transition-all duration-300 group-hover:border-[#ff7f9a66] group-hover:bg-[#0f0a1499]">
                  <Mail className="h-5 w-5 text-[#ff7f9a] transition-all duration-300 group-hover:scale-110" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Agent email"
                    className="flex-1 border-none bg-transparent text-white placeholder-[#9a7a88] focus:outline-none"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f5c95344] to-[#ff7f9a44] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-xl border border-[#ffffff22] bg-[#0a0a1199] px-4 py-3 transition-all duration-300 group-hover:border-[#f5c95366] group-hover:bg-[#0f0a1499]">
                  <Lock className="h-5 w-5 text-[#f5c953] transition-all duration-300 group-hover:scale-110" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Security code (min 8 chars)"
                    className="flex-1 border-none bg-transparent text-white placeholder-[#9a7a88] focus:outline-none"
                    required
                  />
                </div>
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#f5c95344] to-[#ff7f9a44] opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-xl border border-[#ffffff22] bg-[#0a0a1199] px-4 py-3 transition-all duration-300 group-hover:border-[#f5c95366] group-hover:bg-[#0f0a1499]">
                  <Lock className="h-5 w-5 text-[#f5c953] transition-all duration-300 group-hover:scale-110" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm security code"
                    className="flex-1 border-none bg-transparent text-white placeholder-[#9a7a88] focus:outline-none"
                    required
                  />
                </div>
              </motion.div>

              {/* Error message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-[#ff4d6a] bg-[#ff4d6a22] px-4 py-2 text-sm text-[#ff9ca0]"
                >
                  {error}
                </motion.div>
              )}

              {/* Terms checkbox */}
              <motion.label
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-start gap-2 cursor-pointer text-sm text-[#9a7a88]"
              >
                <input
                  type="checkbox"
                  className="mt-0.5 w-4 h-4 rounded border-[#ffffff22] bg-[#0a0a11] cursor-pointer"
                  defaultChecked
                />
                I agree to the{" "}
                <span className="text-[#ff7f9a] hover:text-[#f5c953] transition-colors">Terms of Service</span>
              </motion.label>

              {/* Submit Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#ff7f9a] to-[#f5c953] px-4 py-3 font-bold text-[#08070a] shadow-lg shadow-[#ff7f9a]/30 transition-all duration-300 hover:shadow-[#f5c953]/50 disabled:opacity-70"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#f5c953] to-[#ff7f9a]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 border-2 border-[#08070a] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      REGISTER
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </span>
              </motion.button>
            </form>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="my-6 flex items-center gap-3"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ffffff22]" />
              <span className="text-xs text-[#9a7a88]">OR</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ffffff22]" />
            </motion.div>

            {/* Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-center text-sm text-[#9a7a88]"
            >
              Already an agent?{" "}
              <button
                onClick={() => navigate("/login")}
                className="ml-1 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ff7f9a] to-[#f5c953] hover:from-[#f5c953] hover:to-[#ff7f9a] transition-all duration-300 cursor-pointer"
              >
                LOGIN
              </button>
            </motion.div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-10 -left-10 h-20 w-20 rounded-full bg-[#ff7f9a] blur-3xl opacity-20"
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-[#f5c953] blur-3xl opacity-15"
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.56)_100%)]" />
    </div>
  );
}
