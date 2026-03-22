import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    let particleId = 0;
    let lastParticleTime = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const newPos = { x: e.clientX, y: e.clientY };
      setMousePosition(newPos);

      // Add trail position
      setTrailPositions((prev) => {
        const updated = [newPos, ...prev];
        return updated.slice(0, 15); // Keep last 15 positions
      });

      // Spawn particles on movement
      const now = Date.now();
      if (now - lastParticleTime > 10) {
        // Spawn particle every 10ms
        const newParticle: Particle = {
          id: particleId++,
          x: newPos.x,
          y: newPos.y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4 - 2, // Slight upward bias
          life: 1,
          size: Math.random() * 3 + 2,
        };
        setParticles((prev) => [...prev, newParticle]);
        lastParticleTime = now;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    // Particle animation loop
    const animationInterval = setInterval(() => {
      setParticles((prev) => {
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // Gravity
            life: p.life - 0.02,
          }))
          .filter((p) => p.life > 0);
      });
    }, 16); // ~60fps

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <>
      {/* Trail effect */}
      <svg className="fixed inset-0 pointer-events-none z-[9997]" style={{ width: "100vw", height: "100vh" }}>
        <defs>
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ccff" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Trail line */}
        {trailPositions.length > 1 && (
          <polyline
            points={trailPositions.map((p) => `${p.x},${p.y}`).join(" ")}
            stroke="url(#trailGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>

      {/* Particle system */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="fixed rounded-full pointer-events-none z-[9996]"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: `rgb(0, ${Math.floor(150 + particle.life * 105)}, 255)`,
            opacity: particle.life * 0.6,
            transform: `translate(-50%, -50%)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(0, 102, 255, ${particle.life * 0.8})`,
          }}
        />
      ))}

      {/* Cursor glow circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-[#0066ff] pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          width: isHovering ? 45 : 40,
          height: isHovering ? 45 : 40,
          boxShadow: isHovering
            ? "0 0 20px rgba(0, 102, 255, 0.8), inset 0 0 10px rgba(0, 102, 255, 0.6)"
            : "0 0 15px rgba(0, 102, 255, 0.6), inset 0 0 8px rgba(0, 102, 255, 0.4)",
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30,
        }}
      />

      {/* Outer pulsing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#00ccff] pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
          width: isHovering ? 65 : 60,
          height: isHovering ? 65 : 60,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00ffff] pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35,
        }}
      />

      {/* Animated secondary ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-dashed border-[#0066ff] pointer-events-none z-[9997]"
        animate={{
          x: mousePosition.x - 25,
          y: mousePosition.y - 25,
          width: isHovering ? 55 : 50,
          height: isHovering ? 55 : 50,
          opacity: [0.2, 0.5, 0.2],
          rotate: 360,
        }}
        transition={{
          opacity: { duration: 1.5, repeat: Infinity },
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          x: { type: "spring", stiffness: 500, damping: 28 },
          y: { type: "spring", stiffness: 500, damping: 28 },
        }}
      />
    </>
  );
}
