import { motion } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { Trophy, X, Clock, RotateCcw, Home, Share2, Zap, Crown, Shield, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CustomCursor } from "../components/CustomCursor";

interface EndingData {
  title: string;
  subtitle: string;
  message: string;
  icon: any;
  color: string;
  stats: { label: string; value: string }[];
  achievements?: { name: string; description: string; icon: any }[];
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
    ],
    achievements: [
      { name: "Silent Shadow", description: "Completed without triggering alarms", icon: Shield },
      { name: "Perfect Timing", description: "Beat the clock with time to spare", icon: Zap },
      { name: "Team Intact", description: "No casualties or compromises", icon: Crown },
      { name: "Clean Escape", description: "Left zero evidence behind", icon: Trophy }
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
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);
  const [moneyCounter, setMoneyCounter] = useState(0);
  const [showTeam, setShowTeam] = useState(false);
  
  const ending = endings[type || "success"] || endings.success;
  const Icon = ending.icon;

  // Generate particles for success
  useEffect(() => {
    if (type === "success") {
      // Regular particles
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100
      }));
      setParticles(newParticles);

      // Confetti particles
      const newConfetti = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        delay: Math.random() * 0.5
      }));
      setConfetti(newConfetti);

      // Money counter animation
      const duration = 3;
      const target = 50000000;
      const startTime = Date.now();
      
      const timer = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        setMoneyCounter(Math.floor(target * progress));
        
        if (progress >= 1) {
          clearInterval(timer);
          setShowTeam(true);
        }
      }, 50);

      return () => clearInterval(timer);
    }
  }, [type]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0a0a0a] to-[#1a0505] overflow-hidden flex items-center justify-center">
      <CustomCursor />
      
      {/* Background effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        style={{
          background: `radial-gradient(circle at center, ${ending.color} 0%, transparent 70%)`
        }}
      />

      {/* Animated background blobs - Success only */}
      {type === "success" && (
        <>
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#00ff88]/20 to-transparent rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-l from-[#00ff88]/20 to-transparent rounded-full blur-3xl"
            animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      {/* Confetti particles (for success) */}
      {type === "success" && confetti.map((conf) => (
        <motion.div
          key={conf.id}
          className="absolute w-1.5 h-1.5"
          style={{
            left: `${conf.x}%`,
            top: `${conf.y}%`,
            background: ["#00ff88", "#d4af37", "#8b5cf6", "#c41e3a"][Math.floor(Math.random() * 4)],
            borderRadius: Math.random() > 0.5 ? "50%" : "0%"
          }}
          initial={{ opacity: 1, scale: 1, rotate: 0 }}
          animate={{
            opacity: [1, 0],
            y: [conf.y, conf.y + 100],
            rotate: [0, 360],
            x: conf.x + (Math.random() - 0.5) * 30
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: conf.delay,
            ease: "easeIn"
          }}
        />
      ))}

      {/* Original particles */}
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
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
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
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="absolute inset-0 blur-2xl opacity-60"
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: ending.color }}
            >
              <Icon className="w-32 h-32" />
            </motion.div>
            <motion.div
              className="relative z-10"
              animate={type === "success" ? { rotate: [0, 5, -5, 0] } : {}}
              transition={{ duration: 3, repeat: type === "success" ? Infinity : 0 }}
            >
              <Icon className="w-32 h-32" style={{ color: ending.color }} />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-4 tracking-wider bg-gradient-to-r from-[#00ff88] via-[#d4af37] to-[#00ff88] bg-clip-text text-transparent"
            style={type !== "success" ? { color: ending.color } : {}}
            animate={type === "success" ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 2, repeat: type === "success" ? Infinity : 0 }}
          >
            {ending.title}
          </motion.h1>
          <motion.p 
            className="text-2xl text-gray-400 italic"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {ending.subtitle}
          </motion.p>
        </motion.div>

        {/* Money earned counter - Success only */}
        {type === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8 bg-gradient-to-r from-[#00ff88]/20 to-[#d4af37]/20 border-2 border-[#00ff88]/50 rounded-xl p-6"
          >
            <div className="text-gray-400 text-sm mb-2 font-semibold">TOTAL HAUL</div>
            <motion.div 
              className="text-5xl font-black text-[#d4af37]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1 }}
            >
              ${(moneyCounter / 1000000).toFixed(1)}M
            </motion.div>
          </motion.div>
        )}

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`rounded-lg p-8 mb-12 backdrop-blur-xl border ${
            type === "success"
              ? "bg-gradient-to-br from-[#00ff88]/10 to-transparent border-[#00ff88]/30 hover:border-[#00ff88]/60"
              : "bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#2a2a2a]"
          } transition-all duration-500`}
          whileHover={type === "success" ? { scale: 1.02 } : {}}
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            {ending.message}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {ending.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: type === "success" ? 1.08 : 1, y: type === "success" ? -5 : 0 }}
              className={`rounded-lg p-4 backdrop-blur-sm cursor-pointer transition-all duration-300 ${
                type === "success"
                  ? "bg-gradient-to-br from-[#00ff88]/15 to-transparent border border-[#00ff88]/30 hover:border-[#00ff88]/60 hover:shadow-lg hover:shadow-[#00ff88]/20"
                  : "bg-[#1a1a1a] border border-[#2a2a2a]"
              }`}
            >
              <motion.div 
                className="text-3xl font-black mb-2"
                style={{ color: ending.color }}
                animate={type === "success" ? { scale: [1, 1.1, 1] } : {}}
                transition={{ delay: 0.9 + index * 0.1, duration: 1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-500 font-semibold">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements - Success only */}
        {type === "success" && ending.achievements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-12"
          >
            <h3 className="text-2xl font-black mb-6 text-[#d4af37]">🏆 ACHIEVEMENTS UNLOCKED</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ending.achievements.map((achievement, index) => {
                const AchIcon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.name}
                    initial={{ opacity: 0, scale: 0, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 1.2 + index * 0.15,
                      type: "spring",
                      stiffness: 150,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -8,
                      boxShadow: "0 20px 40px rgba(0, 255, 136, 0.3)"
                    }}
                    className="bg-gradient-to-br from-[#00ff88]/20 to-[#8b5cf6]/10 border-2 border-[#00ff88]/40 hover:border-[#00ff88]/80 rounded-lg p-5 backdrop-blur-sm transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                        transition={{ delay: 1.3 + index * 0.15, duration: 2, repeat: Infinity }}
                        className="text-[#d4af37] flex-shrink-0"
                      >
                        <AchIcon className="w-6 h-6" />
                      </motion.div>
                      <div className="text-left">
                        <div className="font-black text-[#00ff88] group-hover:scale-110 transition-transform">{achievement.name}</div>
                        <div className="text-sm text-gray-400 mt-1">{achievement.description}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          {type === "success" && (
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert("Share feature coming soon!")}
              className="px-8 py-4 bg-gradient-to-r from-[#8b5cf6] to-[#6366f1] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#8b5cf6]/40 hover:shadow-xl hover:shadow-[#8b5cf6]/60 transition-all duration-300"
            >
              <Share2 className="w-5 h-5" />
              Share Victory
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/select-role")}
            className="px-8 py-4 bg-gradient-to-r from-[#c41e3a] to-[#8b1426] text-white font-bold rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-[#c41e3a]/30 hover:shadow-xl hover:shadow-[#c41e3a]/60 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5" />
            Try Different Role
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className={`px-8 py-4 font-bold rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              type === "success"
                ? "bg-gradient-to-r from-[#00ff88]/20 to-[#00ff88]/10 border-2 border-[#00ff88]/40 text-[#00ff88] hover:border-[#00ff88]/80 hover:shadow-lg hover:shadow-[#00ff88]/20"
                : "bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:border-[#c41e3a]"
            }`}
          >
            <Home className="w-5 h-5" />
            Main Menu
          </motion.button>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="mt-8 text-gray-500 italic text-lg max-w-2xl mx-auto"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            "{type === 'success' 
              ? 'The greatest heist is the one no one knows happened.' 
              : type === 'caught'
              ? 'Even legends make mistakes.'
              : 'Timing is everything in this game.'}"
          </motion.p>
        </motion.div>

        {/* Dramatic lighting effects */}
        {type === "success" && (
          <>
            <motion.div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1.5"
              style={{ background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </>
        )}
      </div>
    </div>
  );
}