import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Brain, Code, MessageSquare, UserCheck, ArrowLeft, Zap, Star, Lock } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { AudioManager } from "../components/AudioManager";
import { CustomCursor } from "../components/CustomCursor";

interface Role {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  abilities: string[];
  exp: number;
  level: number;
  locked: boolean;
}

const roles: Role[] = [
  {
    id: "mastermind",
    name: "The Mastermind",
    title: "Strategic Genius",
    description: "You orchestrate every detail. The plan lives in your mind, and failure is not an option.",
    icon: Brain,
    color: "#c41e3a",
    abilities: ["Strategic Planning", "Risk Analysis", "Team Coordination"],
    exp: 15200,
    level: 12,
    locked: false,
  },
  {
    id: "hacker",
    name: "The Hacker",
    title: "Digital Ghost",
    description: "You control the digital realm. Security systems bend to your will, data flows through your fingers.",
    icon: Code,
    color: "#00ff88",
    abilities: ["System Breach", "Data Manipulation", "Electronic Warfare"],
    exp: 12500,
    level: 10,
    locked: false,
  },
  {
    id: "negotiator",
    name: "The Negotiator",
    title: "Silver Tongue",
    description: "Words are your weapon. You can talk your way into—or out of—any situation.",
    icon: MessageSquare,
    color: "#d4af37",
    abilities: ["Persuasion", "Crisis Management", "Psychological Warfare"],
    exp: 18900,
    level: 15,
    locked: false,
  },
  {
    id: "insider",
    name: "The Insider",
    title: "Hidden Asset",
    description: "You know the system from within. Every weakness, every routine, every secret passage.",
    icon: UserCheck,
    color: "#8b5cf6",
    abilities: ["Inside Knowledge", "Access Control", "Undercover Operations"],
    exp: 22100,
    level: 18,
    locked: false,
  }
];

export function CharacterSelect() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const petals = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: `${(i * 13) % 100}%`,
        delay: (i % 6) * 0.7,
        duration: 12 + (i % 5) * 3,
        size: 5 + (i % 4) * 2,
      })),
    [],
  );

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener("resize", checkScrollPosition);
    return () => window.removeEventListener("resize", checkScrollPosition);
  }, []);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 500;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScrollPosition, 300);
    }
  };

  const handleSelectRole = (roleId: string) => {
    if (roles.find(r => r.id === roleId)?.locked) return;
    setSelectedRole(roleId);
    setTimeout(() => {
      localStorage.setItem("selectedRole", roleId);
      navigate("/episode/1");
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#08070a] text-white">
      <CustomCursor />
      <AudioManager />

      {/* Atmospheric sky backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(244,114,182,0.22),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(250,204,21,0.18),transparent_35%),linear-gradient(to_bottom,#2a1730_0%,#0a0a13_42%,#08070a_100%)]" />

      {/* Shooting fog layers */}
      <motion.div
        className="absolute inset-x-[-25%] top-[15%] h-64 bg-gradient-to-r from-transparent via-[#ffffff14] to-transparent blur-2xl"
        animate={{ x: ["-10%", "6%", "-10%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Foreground petals */}
      <div className="absolute inset-0 overflow-hidden">
        {petals.map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute top-[-10%] rounded-[55%_45%_55%_45%] bg-[#ff7f9a] opacity-60 blur-[0.6px]"
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

      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/login")}
        className="absolute top-8 left-8 z-20 flex items-center gap-2 text-gray-300 hover:text-[#ff7f9a] transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </motion.button>

      {/* Content */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <Zap className="h-8 w-8 text-[#ff7f9a]" />
            <h1 className="text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#ffd7e1] via-[#ff6f9a] to-[#f5c953] md:text-6xl">
              CHOOSE YOUR SPECIALIST
            </h1>
            <Zap className="h-8 w-8 text-[#f5c953]" />
          </div>
          <p className="mt-3 text-lg text-[#d4c5ce]">
            Select a role and master its unique abilities. Your choice defines your path.
          </p>
        </motion.div>

        {/* Scrollable container */}
        <div className="relative w-full max-w-full xl:max-w-7xl mx-auto">
          {/* Scroll indicators */}
          {canScrollLeft && (
            <motion.button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#08070a] to-transparent p-3 text-[#ff7f9a] hover:text-[#f5c953] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              ← 
            </motion.button>
          )}

          {canScrollRight && (
            <motion.button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-gradient-to-l from-[#08070a] to-transparent p-3 text-[#ff7f9a] hover:text-[#f5c953] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              →
            </motion.button>
          )}

          {/* Cards container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="flex gap-12 overflow-x-auto scroll-smooth px-12 pb-6"
            style={{ scrollBehavior: "smooth", scrollbarWidth: "none" }}
          >
            {roles.map((role, index) => {
              const Icon = role.icon;
              const isHovered = hoveredRole === role.id;
              const isSelected = selectedRole === role.id;
              const isLocked = role.locked;

              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  onHoverStart={() => !isLocked && setHoveredRole(role.id)}
                  onHoverEnd={() => setHoveredRole(null)}
                  onClick={() => handleSelectRole(role.id)}
                  className={`relative flex-shrink-0 cursor-pointer w-96 ${isLocked ? "opacity-60" : ""}`}
                >
                  {/* Outer glow */}
                  <motion.div
                    className="absolute -inset-3 rounded-3xl blur-2xl opacity-0 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at center, ${role.color}40, transparent)`,
                    }}
                    animate={isHovered && !isLocked ? { opacity: 1 } : { opacity: 0 }}
                  />

                  {/* Main card */}
                  <motion.div
                    className="relative h-full overflow-hidden rounded-2xl bg-[#08070a99] backdrop-blur-xl p-8 transition-all duration-300"
                    whileHover={!isLocked ? { scale: 1.05, y: -12 } : {}}
                    animate={isSelected ? { borderColor: role.color } : {}}
                  >
                    {/* Animated Game Border */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                      {/* Border glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          border: `2px solid ${role.color}`,
                        }}
                        animate={isHovered && !isLocked ? {
                          boxShadow: [
                            `0 0 10px ${role.color}40, inset 0 0 10px ${role.color}20`,
                            `0 0 20px ${role.color}60, inset 0 0 20px ${role.color}40`,
                            `0 0 10px ${role.color}40, inset 0 0 10px ${role.color}20`,
                          ]
                        } : {
                          boxShadow: `0 0 5px ${role.color}20, inset 0 0 5px ${role.color}10`
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Running light effect - top */}
                      <motion.div
                        className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent"
                        style={{ color: role.color }}
                        animate={!isLocked ? {
                          x: ["-100%", "100%"],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />

                      {/* Running light effect - right */}
                      <motion.div
                        className="absolute top-0 bottom-0 right-0 w-0.5 bg-gradient-to-b from-transparent via-current to-transparent"
                        style={{ color: role.color }}
                        animate={!isLocked ? {
                          y: ["-100%", "100%"],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 0.75,
                        }}
                      />

                      {/* Running light effect - bottom */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-current to-transparent"
                        style={{ color: role.color }}
                        animate={!isLocked ? {
                          x: ["100%", "-100%"],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 1.5,
                        }}
                      />

                      {/* Running light effect - left */}
                      <motion.div
                        className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-t from-transparent via-current to-transparent"
                        style={{ color: role.color }}
                        animate={!isLocked ? {
                          y: ["100%", "-100%"],
                        } : {}}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 2.25,
                        }}
                      />

                      {/* Corner glow points */}
                      {[
                        { top: 0, left: 0 },
                        { top: 0, right: 0 },
                        { bottom: 0, left: 0 },
                        { bottom: 0, right: 0 },
                      ].map((pos, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-3 h-3 rounded-full"
                          style={{
                            background: role.color,
                            ...pos,
                          }}
                          animate={isHovered && !isLocked ? {
                            scale: [1, 1.8, 1],
                            opacity: [0.3, 1, 0.3],
                          } : {
                            scale: 1,
                            opacity: 0.2,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </div>
                    {/* Particle effect */}
                    {isHovered && !isLocked && (
                      <>
                        {[...Array(15)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full"
                            style={{
                              background: role.color,
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                            }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0, 2, 0],
                              y: [0, -40],
                            }}
                            transition={{
                              duration: 1.8,
                              delay: i * 0.08,
                              repeat: Infinity,
                            }}
                          />
                        ))}
                      </>
                    )}

                    {/* Level badge */}
                    <motion.div
                      className="absolute top-4 right-4 rounded-full border border-[#ffffff22] bg-[#0a0a11aa] px-3 py-1 backdrop-blur-md"
                      whileHover={!isLocked ? { scale: 1.1 } : {}}
                    >
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4" style={{ color: role.color }} />
                        <span className="text-sm font-bold">LV {role.level}</span>
                      </div>
                    </motion.div>

                    {/* Lock indicator */}
                    {isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#000000aa] backdrop-blur-sm rounded-2xl">
                        <Lock className="h-12 w-12 text-gray-500" />
                      </div>
                    )}

                    {/* Icon */}
                    <motion.div
                      className="mb-6 relative"
                      whileHover={!isLocked ? { scale: 1.15, rotate: 8 } : {}}
                    >
                      <motion.div
                        className="absolute inset-0 blur-2xl opacity-40"
                        animate={isHovered && !isLocked ? { scale: [1, 1.4, 1] } : {}}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ color: role.color }}
                      >
                        <Icon className="h-24 w-24" />
                      </motion.div>
                      <Icon className="relative z-10 h-24 w-24" style={{ color: role.color }} />
                    </motion.div>

                    {/* Title */}
                    <h3
                      className="mb-2 text-2xl font-bold transition-colors duration-300"
                      style={{ color: isHovered && !isLocked ? role.color : "#e8e8e8" }}
                    >
                      {role.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="mb-4 text-sm uppercase tracking-widest text-[#c9bac3]">
                      {role.title}
                    </p>

                    {/* Description */}
                    <p className="mb-6 text-sm leading-relaxed text-[#b8a8b8]">
                      {role.description}
                    </p>

                    {/* Experience bar */}
                    <div className="mb-6">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs uppercase tracking-wider text-gray-500">Experience</span>
                        <span
                          className="text-xs font-bold"
                          style={{ color: role.color }}
                        >
                          {role.exp.toLocaleString()} XP
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-full bg-[#0a0a11] h-2">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${role.color}, ${role.color}44)`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(role.exp % 1000) / 10}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>

                    {/* Abilities */}
                    <div className="mb-6 space-y-2 border-t border-[#ffffff11] pt-4">
                      <p className="text-xs uppercase tracking-wider text-gray-600">
                        Core Abilities
                      </p>
                      {role.abilities.map((ability, i) => (
                        <motion.div
                          key={ability}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.15 + i * 0.08 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="h-1.5 w-1.5 rounded-full flex-shrink-0"
                            style={{ background: role.color }}
                            animate={isHovered && !isLocked ? { scale: [1, 1.6, 1] } : {}}
                            transition={{
                              duration: 1,
                              delay: i * 0.25,
                              repeat: Infinity,
                            }}
                          />
                          <span className="text-xs text-gray-400">{ability}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Select button */}
                    <motion.button
                      whileHover={!isLocked ? { scale: 1.02 } : {}}
                      whileTap={!isLocked ? { scale: 0.98 } : {}}
                      disabled={isLocked}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r py-3 font-bold text-[#08070a] shadow-lg transition-all duration-300"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${role.color}, ${role.color}dd)`,
                      }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${role.color}dd, ${role.color})`,
                        }}
                        initial={{ x: "-100%" }}
                        whileHover={!isLocked ? { x: "100%" } : {}}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative z-10">
                        {isSelected ? "✓ SELECTED" : isLocked ? "LOCKED" : "SELECT ROLE"}
                      </span>
                    </motion.button>

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                      animate={isHovered && !isLocked ? { opacity: [0, 0.1, 0] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12 text-center text-sm text-[#9a8a95]"
        >
          Scroll to explore • Click to select your destiny
        </motion.p>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.56)_100%)]" />
    </div>
  );
}