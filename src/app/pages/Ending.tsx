import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Trophy, X, Clock, RotateCcw, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomCursor } from "../components/CustomCursor";

interface EndingData {
  title: string;
  subtitle: string;
  message: string;
  icon: any;
  color: string;
  stats: { label: string; value: string }[];
}

const endings: { [key: string]: EndingData } = {
  success: {
    title: "HEIST SUCCESSFUL",
    subtitle: "The Perfect Crime",
    message: "Against all odds, you pulled it off. The vault is empty, the team is clear, and the authorities have no leads. You've become a legend in the underground. The money is secure, the crew is safe, and your name will echo through history.",
    icon: Trophy,
    color: "#00ff88",
    stats: [
      { label: "Total Score", value: "100%" },
      { label: "Time Remaining", value: "00:47" },
      { label: "Team Status", value: "All Safe" },
      { label: "Evidence Left", value: "None" }
    ]
  },
  caught: {
    title: "OPERATION FAILED",
    subtitle: "Apprehended",
    message: "The alarm triggered. Red and blue lights flooded the corridors. Despite your best efforts, the authorities were one step ahead. The team scattered, but it wasn't enough. This isn't how it was supposed to end.",
    icon: X,
    color: "#c41e3a",
    stats: [
      { label: "Total Score", value: "34%" },
      { label: "Time Elapsed", value: "02:13" },
      { label: "Team Status", value: "Compromised" },
      { label: "Apprehended", value: "Yes" }
    ]
  },
  timeout: {
    title: "TIME EXPIRED",
    subtitle: "Window Closed",
    message: "The seconds ran out. Police sirens wailed in the distance, growing louder. The perfect plan fell apart as the clock hit zero. Sometimes, even the best strategies can't account for lost time.",
    icon: Clock,
    color: "#d4af37",
    stats: [
      { label: "Total Score", value: "67%" },
      { label: "Time Remaining", value: "00:00" },
      { label: "Team Status", value: "Evacuated" },
      { label: "Objective", value: "Failed" }
    ]
  }
};

export function Ending() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  
  const ending = endings[type || "success"] || endings.success;
  const Icon = ending.icon;

  // Generate particles for success
  useEffect(() => {
    if (type === "success") {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      setParticles(newParticles);
    }
  }, [type]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
      <CustomCursor />
      
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        style={{
          background: `radial-gradient(circle at center, ${ending.color} 0%, transparent 70%)`
        }}
      />

      {/* Particles (for success) */}
      {type === "success" && particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: ending.color
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -100]
          }}
          transition={{
            duration: 3,
            delay: particle.id * 0.05,
            repeat: Infinity
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.2 
          }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 blur-2xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: ending.color }}
            >
              <Icon className="w-32 h-32" />
            </motion.div>
            <Icon className="w-32 h-32 relative z-10" style={{ color: ending.color }} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h1 
            className="text-6xl md:text-8xl font-bold mb-4 tracking-wider"
            style={{ color: ending.color }}
          >
            {ending.title}
          </h1>
          <p className="text-2xl text-gray-500 italic">{ending.subtitle}</p>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-8 mb-12"
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            {ending.message}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {ending.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-4"
            >
              <div 
                className="text-3xl font-bold mb-2"
                style={{ color: ending.color }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/select-role")}
            className="px-8 py-4 bg-gradient-to-r from-[#c41e3a] to-[#8b1426] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#c41e3a]/30"
          >
            <RotateCcw className="w-5 h-5" />
            Try Different Role
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-[#1a1a1a] border border-[#2a2a2a] text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:border-[#c41e3a] transition-colors"
          >
            <Home className="w-5 h-5" />
            Main Menu
          </motion.button>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 text-gray-600 italic"
        >
          "{type === 'success' 
            ? 'The greatest heist is the one no one knows happened.' 
            : type === 'caught'
            ? 'Even legends make mistakes.'
            : 'Timing is everything in this game.'}"
        </motion.div>
      </div>

      {/* Dramatic lighting effects */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: ending.color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: ending.color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </div>
  );
}