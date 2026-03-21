import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Lock, Target, Zap as ZapIcon } from "lucide-react";
import { AudioManager } from "../components/AudioManager";
import { CustomCursor } from "../components/CustomCursor";

interface Role {
  id: string;
  name: string;
  subtitle: string;
  icon: any;
  color: string;
  borderColor: string;
  glowR: number;
  glowG: number;
  glowB: number;
  abilities?: string[];
}

export function Landing() {
  const navigate = useNavigate();

  const roles: Role[] = [
    {
      id: "strategist",
      name: "THE STRATEGIST",
      subtitle: "Mastermind the Plan",
      icon: "🎯",
      color: "#ff4444",
      borderColor: "#ff4444",
      glowR: 255,
      glowG: 68,
      glowB: 68,
      abilities: ["Strategic Planning", "Risk Analysis", "Team Leadership"],
    },
    {
      id: "hacker",
      name: "THE HACKER",
      subtitle: "Crack the Security",
      icon: "⚡",
      color: "#ffaa00",
      borderColor: "#ff8800",
      glowR: 255,
      glowG: 136,
      glowB: 0,
      abilities: ["System Access", "Encryption Breaking", "Tech Mastery"],
    },
    {
      id: "insider",
      name: "THE INSIDER",
      subtitle: "Operate from Within",
      icon: "🕵️",
      color: "#ff4444",
      borderColor: "#ff4444",
      glowR: 255,
      glowG: 68,
      glowB: 68,
      abilities: ["Internal Intel", "Deception", "Social Engineering"],
    },
  ];

  const features = [
    {
      icon: "🎬",
      title: "DYNAMIC STORYLINES",
      description: "Your Choices. Your Consequences.",
    },
    {
      icon: "⚡",
      title: "HIGH STAKES HEIST",
      description: "Think Fast. Act Smart.",
    },
    {
      icon: "💾",
      title: "PROGRESS SAVED",
      description: "Resume & Conquer.",
    },
  ];


  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      <CustomCursor />
      <AudioManager />

      {/* Dark industrial background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1410] via-[#0f0a08] to-[#000000]" />

      {/* Industrial texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(255,100,0,0.03) 0px, rgba(255,100,0,0.03) 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 4px, 4px 100%",
          }}
        />
      </div>

      {/* Glowing background elements */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ff4444] rounded-full blur-[150px] opacity-10"
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#ff8800] rounded-full blur-[150px] opacity-5"
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Smoke effect overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.1)] to-transparent"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20">
        {/* Masked figure with glowing eyes - Top Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 flex flex-col items-center"
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute w-80 h-80 border-2 border-[#ff4444] rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main mask head */}
          <div className="relative w-32 h-40 flex items-center justify-center z-10">
            {/* Head base */}
            <motion.div
              className="absolute w-28 h-32 rounded-full bg-gradient-to-b from-[#333] to-[#111]"
              style={{ boxShadow: "0 0 40px rgba(255, 68, 68, 0.5)" }}
            />

            {/* Left eye */}
            <motion.div
              className="absolute left-6 top-12 w-8 h-8 rounded-full bg-[#ff4444]"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 10px rgba(255, 68, 68, 0.8)",
                  "0 0 30px rgba(255, 68, 68, 1)",
                  "0 0 10px rgba(255, 68, 68, 0.8)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Right eye */}
            <motion.div
              className="absolute right-6 top-12 w-8 h-8 rounded-full bg-[#ff4444]"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 10px rgba(255, 68, 68, 0.8)",
                  "0 0 30px rgba(255, 68, 68, 1)",
                  "0 0 10px rgba(255, 68, 68, 0.8)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />

            {/* Crown spikes */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-[#ff4444] to-[#ff8800]"
                  animate={{ height: [16, 24, 16] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Title - SHADOW PROTOCOL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 text-center"
        >
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-2"
            style={{
              textShadow: "0 0 20px rgba(255, 68, 68, 0.8)",
            }}
          >
            SHADOW
          </h1>
          <h1
            className="text-5xl md:text-7xl font-bold text-[#ff4444]"
            style={{
              textShadow: "0 0 30px rgba(255, 68, 68, 1)",
            }}
          >
            PROTOCOL
          </h1>
        </motion.div>

        {/* Mission briefing */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center text-[#ff8800] text-lg mb-12 max-w-2xl mx-auto"
        >
          YOU'VE BEEN SELECTED FOR A COVERT MISSION
        </motion.p>

        {/* Role selection cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-5xl mx-auto w-full"
        >
          {roles.map((role, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(255, 68, 68, 0.6)",
              }}
              className="group cursor-pointer"
            >
              <div className="relative border-2 rounded-lg p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#ff4444] border-[#ff4444] bg-[#1a1410]/60">
                {/* Scanlines effect */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none rounded-lg"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
                    backgroundSize: "100% 4px",
                  }}
                />

                {/* Portrait area with glow */}
                <div
                  className="relative w-full h-32 rounded mb-4 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#222] to-[#111]"
                  style={{
                    boxShadow: `inset 0 0 20px rgba(${role.glowR}, ${role.glowG}, ${role.glowB}, 0.3)`,
                  }}
                >
                  <div className="text-5xl opacity-60">{role.icon}</div>
                </div>

                {/* Card content */}
                <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>
                <p className="text-sm text-[#ff8800] mb-4">{role.subtitle}</p>

                {/* Abilities */}
                <div className="space-y-1 text-xs text-gray-400">
                  {role.abilities &&
                    role.abilities.map((ability, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <motion.div
                          className="w-1 h-1 rounded-full bg-[#ff4444]"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                        <span>{ability}</span>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature boxes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto w-full"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="border border-[#333] rounded-lg p-6 backdrop-blur-sm bg-[#1a1410]/40 hover:border-[#ff4444] transition-colors"
            >
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff4444] to-[#ff8800] px-8 py-3 font-bold text-white shadow-lg shadow-[#ff4444]/50"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ff8800] to-[#ff4444]"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">ENTER THE OPERATION</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/select-role")}
            className="relative rounded-lg border-2 border-[#ff4444] px-8 py-3 font-bold text-[#ff4444] hover:bg-[#ff4444]/10 transition-colors"
          >
            CHOOSE YOUR ROLE
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-3">
        <motion.div
          className="h-1 w-full bg-gradient-to-r from-transparent via-[#ff4444] to-transparent"
          animate={{ y: [0, "100vh", 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
    </div>
  );
}