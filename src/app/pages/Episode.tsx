import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { AlertTriangle, Zap, Shield, Brain, Zap as ZapIcon, Target } from "lucide-react";
import { AudioManager } from "../components/AudioManager";
import { CustomCursor } from "../components/CustomCursor";

interface Scene {
  id: number;
  title: string;
  narration: string;
  character?: string;
  background: string;
  atmosphere: "normal" | "danger" | "stealth" | "hacking";
  choices: {
    text: string;
    consequence: string;
    nextScene: number | string;
    icon: any;
  }[];
}

const episodes: { [key: string]: Scene[] } = {
  "1": [
    {
      id: 1,
      title: "INFILTRATION PHASE",
      character: "Team Leader",
      narration: "You've made it inside the National Reserve. Security cameras sweep the corridors every 30 seconds. The vault access terminal is 50 meters ahead, but armed guards patrol the route. Time is critical—the window closes in 3 minutes.",
      background: "vault-corridor",
      atmosphere: "danger",
      choices: [
        {
          text: "Hack the camera system remotely",
          consequence: "Gain 2 minutes, but risk detection",
          nextScene: 2,
          icon: Zap
        },
        {
          text: "Use the service tunnels",
          consequence: "Slower but safer approach",
          nextScene: 3,
          icon: Shield
        }
      ]
    },
    {
      id: 2,
      title: "SYSTEM BREACH",
      character: "Hacker",
      narration: "Your fingers dance across the keypad. The camera feeds flicker—you're in. But the system logged your intrusion. Security will notice in 90 seconds. The terminal is 20 meters ahead.",
      background: "control-room",
      atmosphere: "hacking",
      choices: [
        {
          text: "Sprint to the terminal",
          consequence: "Fast but exposed",
          nextScene: "dashboard",
          icon: Zap
        },
        {
          text: "Create a diversion with the alarm system",
          consequence: "Draw guards away",
          nextScene: "dashboard",
          icon: Brain
        }
      ]
    },
    {
      id: 3,
      title: "UNDERGROUND ROUTE",
      character: "Stealth Expert",
      narration: "The service tunnel is dark and cramped. You hear footsteps above—guards are close. Ahead, you see two paths: one leads directly to the vault level, the other to the control room where you could disable alarms entirely.",
      background: "tunnel",
      atmosphere: "stealth",
      choices: [
        {
          text: "Go straight to the vault",
          consequence: "Direct but alarms stay active",
          nextScene: "dashboard",
          icon: Shield
        },
        {
          text: "Detour to control room",
          consequence: "Safer long-term, but uses time",
          nextScene: "dashboard",
          icon: Brain
        }
      ]
    }
  ],
  "2": [
    {
      id: 1,
      title: "THE VAULT",
      character: "Team Leader",
      narration: "The vault door looms before you. 8 tons of reinforced steel. Your team is in position. Police are 5 minutes out. This is it—the moment everything hinges on.",
      background: "vault-door",
      atmosphere: "danger",
      choices: [
        {
          text: "Use the thermal drill (4 minutes)",
          consequence: "Precise but time-consuming",
          nextScene: "ending/success",
          icon: ZapIcon
        },
        {
          text: "Override with master codes (30 seconds)",
          consequence: "Fast but might trigger lockdown",
          nextScene: "ending/caught",
          icon: AlertTriangle
        }
      ]
    }
  ]
};

// Advanced cinematic scene background with parallax, effects, and particle systems
const SceneBackground = ({ atmosphere, background }: { atmosphere: string; background: string }) => {
  // Background color configuration for different scenes
  const getBackgroundConfig = () => {
    switch (background) {
      case "vault-corridor":
        return {
          colors: {
            base: "from-[#1a0a0a] via-[#2a1a1a] to-[#0f0505]",
            overlay: "#ff4444",
            accent: "#d4af37",
          },
          architectureColor: "#663333",
          gridColor: "#444444",
        };
      case "control-room":
        return {
          colors: {
            base: "from-[#0a1a2a] via-[#1a2a3a] to-[#050a0f]",
            overlay: "#0066ff",
            accent: "#00ff88",
          },
          architectureColor: "#1a3a4a",
          gridColor: "#0a2a3a",
        };
      case "tunnel":
        return {
          colors: {
            base: "from-[#0a0a0a] via-[#1a1010] to-[#050505]",
            overlay: "#00ff88",
            accent: "#00ff88",
          },
          architectureColor: "#2a2a2a",
          gridColor: "#1a1a1a",
        };
      case "vault-door":
        return {
          colors: {
            base: "from-[#1a0a0a] via-[#2a1010] to-[#0f0505]",
            overlay: "#ffaa00",
            accent: "#ff6600",
          },
          architectureColor: "#552200",
          gridColor: "#664433",
        };
      default:
        return {
          colors: {
            base: "from-[#1a1a1a] via-[#0a0a0a] to-[#000000]",
            overlay: "#444444",
            accent: "#666666",
          },
          architectureColor: "#333333",
          gridColor: "#222222",
        };
    }
  };

  const config = getBackgroundConfig();

  // Parallax layers that move independently
  const ParallaxLayers = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep background layer (slowest movement) */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${config.colors.base} opacity-100`}
        initial={{ y: 0 }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Mid-layer parallax */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            ${config.colors.overlay}10 0px,
            ${config.colors.overlay}05 100px,
            ${config.colors.overlay}10 200px
          )`,
          backgroundSize: "200px 100%",
        }}
        animate={{ x: [-200, 0, -200] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Foreground depth layer (fastest movement) */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            ${config.colors.accent}05 0px,
            transparent 50px,
            ${config.colors.accent}05 100px
          )`,
        }}
        animate={{ y: [0, -50, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );

  // SVG-based architectural elements
  const ArchitectureElements = () => (
    <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
      {/* Beams */}
      <g stroke={config.architectureColor} strokeWidth="2" opacity="0.4">
        <line x1="0" y1="100" x2="100%" y2="100" />
        <line x1="0" y1="200" x2="100%" y2="200" />
        <line x1="0" y1="400" x2="100%" y2="400" />
        <line x1="0" y1="600" x2="100%" y2="600" />
      </g>

      {/* Vertical pipes */}
      <g stroke={config.architectureColor} strokeWidth="1.5" opacity="0.3">
        <line x1="10%" y1="0" x2="10%" y2="100%" />
        <line x1="25%" y1="0" x2="25%" y2="100%" />
        <line x1="50%" y1="0" x2="50%" y2="100%" />
        <line x1="75%" y1="0" x2="75%" y2="100%" />
        <line x1="90%" y1="0" x2="90%" y2="100%" />
      </g>

      {/* Corner brackets */}
      <g stroke={config.architectureColor} strokeWidth="2" fill="none" opacity="0.4">
        <path d="M 0,0 L 50,0 L 50,50 M 0,0 L 0,50" />
        <path d="M calc(100% - 50),0 L 100%,0 L 100%,50 M calc(100% - 50),0 L calc(100% - 50),50" />
      </g>
    </svg>
  );

  // Dynamic gradient overlay that changes based on atmosphere
  const DynamicGradientOverlay = () => {
    const getOverlayAnimation = () => {
      switch (atmosphere) {
        case "danger":
          return {
            colors: ["rgba(255, 68, 68, 0.1)", "rgba(255, 68, 68, 0.25)", "rgba(255, 68, 68, 0.1)"],
            duration: 2,
          };
        case "hacking":
          return {
            colors: ["rgba(0, 102, 255, 0.05)", "rgba(0, 102, 255, 0.2)", "rgba(0, 102, 255, 0.05)"],
            duration: 2.5,
          };
        case "stealth":
          return {
            colors: ["rgba(0, 255, 136, 0.03)", "rgba(0, 255, 136, 0.15)", "rgba(0, 255, 136, 0.03)"],
            duration: 3,
          };
        default:
          return {
            colors: ["rgba(100, 100, 100, 0.05)", "rgba(100, 100, 100, 0.15)", "rgba(100, 100, 100, 0.05)"],
            duration: 3,
          };
      }
    };

    const overlay = getOverlayAnimation();

    return (
      <motion.div
        className="absolute inset-0"
        animate={{
          background: overlay.colors,
        }}
        transition={{ duration: overlay.duration, repeat: Infinity, ease: "easeInOut" }}
      />
    );
  };

  // Lens flare effect
  const LensFlare = () => (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${config.colors.overlay}40 0%, transparent 70%)`,
          left: "20%",
          top: "-150px",
        }}
        animate={{
          x: [-200, 400, -200],
          y: [-100, 200, -100],
          opacity: [0, 0.6, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full blur-2xl"
        style={{
          background: `radial-gradient(circle, ${config.colors.accent}30 0%, transparent 70%)`,
          right: "15%",
          bottom: "-100px",
        }}
        animate={{
          x: [200, -400, 200],
          y: [100, -200, 100],
          opacity: [0, 0.4, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.div>
  );

  // God rays (light rays) effect for atmospheric lighting
  const GodRays = () => (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute origin-top"
          style={{
            width: "2px",
            height: "100%",
            background: `linear-gradient(to bottom, ${config.colors.accent}40, transparent)`,
            left: `${25 + i * 20}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );

  // Chromatic aberration effect during transitions
  const ChromaticAberration = () => {
    const isActive = atmosphere === "danger";

    return (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isActive ? [0, 0.15, 0] : 0,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,0,0,0.1) 0%, rgba(0,255,0,0.1) 50%, rgba(0,0,255,0.1) 100%)",
            mixBlendMode: "multiply",
          }}
        />
      </motion.div>
    );
  };

  // Bloom/glow effect on important elements
  const BloomEffect = () => (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-full h-96 blur-3xl"
        style={{
          background: `radial-gradient(ellipse at center, ${config.colors.overlay}20 0%, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );

  // Screen distortion during action sequences
  const ScreenDistortion = () => {
    const isIntense = atmosphere === "danger" || atmosphere === "hacking";

    return (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isIntense ? [0, 0.08, 0] : 0,
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3CfilterxmlAttributes='id=distortion'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='2' result='noise' /%3E%3CfeDisplacementMap in='SourceGraphic' in2='noise' scale='2' /%3E%3C/filter%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
    );
  };

  // Particle systems based on atmosphere
  const ParticleSystem = () => {
    const getParticleConfig = () => {
      switch (atmosphere) {
        case "danger":
          return {
            count: 20,
            color: "#ff6666",
            type: "spark",
            speed: 4,
          };
        case "hacking":
          return {
            count: 15,
            color: "#0066ff",
            type: "code",
            speed: 3,
          };
        case "stealth":
          return {
            count: 25,
            color: "#00ff88",
            type: "dust",
            speed: 2,
          };
        default:
          return {
            count: 10,
            color: "#888888",
            type: "generic",
            speed: 2.5,
          };
      }
    };

    const config = getParticleConfig();

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(config.count)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {config.type === "spark" && (
              <motion.div
                className="w-1 h-1 bg-[#ff6666] rounded-full"
                animate={{
                  y: [0, -150 - Math.random() * 100],
                  x: [-50 + Math.random() * 100, -50 + Math.random() * 100],
                  opacity: [1, 0],
                  scale: [1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            )}

            {config.type === "dust" && (
              <motion.div
                className="w-0.5 h-0.5 bg-[#00ff88] rounded-full opacity-60"
                animate={{
                  y: [0, 100 + Math.random() * 100],
                  x: [-30 + Math.random() * 60, -30 + Math.random() * 60],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "easeInOut",
                }}
              />
            )}

            {config.type === "code" && (
              <motion.div
                className="text-[#0066ff] text-xs opacity-60 font-mono"
                animate={{
                  y: [0, -100 - Math.random() * 50],
                  opacity: [0.8, 0],
                  rotateZ: [0, 360],
                }}
                transition={{
                  duration: 2.5 + Math.random() * 1,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {Math.random() > 0.5 ? "0" : "1"}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    );
  };

  // Animated grid overlay with wave effects
  const AnimatedGrid = () => {
    const showGrid = atmosphere === "hacking" || atmosphere === "stealth";

    return showGrid ? (
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        animate={{
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          backgroundImage: `
            linear-gradient(0deg, ${config.gridColor}40 1px, transparent 1px),
            linear-gradient(90deg, ${config.gridColor}40 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      >
        {/* Wave effect overlay */}
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0 0", "0 50px"],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: `linear-gradient(90deg, ${config.colors.overlay}20 0%, transparent 10%, transparent 90%, ${config.colors.overlay}20 100%)`,
            backgroundSize: "100% 100%",
          }}
        />
      </motion.div>
    ) : null;
  };

  // Flickering neon elements
  const FlickeringNeon = () => {
    const showNeon = atmosphere === "hacking" || atmosphere === "danger";

    return showNeon ? (
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent"
            style={{
              width: "30%",
              left: `${20 + i * 25}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3, 0, 0.5],
            }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    ) : null;
  };

  // Fog/mist rolling animations
  const FogEffect = () => {
    const getFogConfig = () => {
      switch (atmosphere) {
        case "danger":
          return { opacity: 0.15, color: "#ff4444", duration: 4 };
        case "stealth":
          return { opacity: 0.25, color: "#00ff88", duration: 5 };
        case "hacking":
          return { opacity: 0.1, color: "#0066ff", duration: 4.5 };
        default:
          return { opacity: 0.08, color: "#666666", duration: 4 };
      }
    };

    const fogConfig = getFogConfig();

    return (
      <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(ellipse at ${50 + i * 30}% 50%, ${fogConfig.color}${Math.round(
                fogConfig.opacity * 255
              ).toString(16)}, transparent)`,
            }}
            animate={{
              x: [-200, 200, -200],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: fogConfig.duration + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    );
  };

  // Screen shake for intense moments
  const ScreenShake = () => {
    const shouldShake = atmosphere === "danger";

    return shouldShake ? (
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: [0, -2, 2, -2, 2, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      />
    ) : null;
  };

  // Light bloom spreading from center
  const LightBloom = () => (
    <motion.div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${config.colors.accent}15 0%, transparent 70%)`,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          scale: [0.6, 1.4, 0.6],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base parallax layers */}
      <ParallaxLayers />

      {/* SVG architectural elements */}
      <ArchitectureElements />

      {/* Dynamic gradient overlay */}
      <DynamicGradientOverlay />

      {/* Lens flare effect */}
      <LensFlare />

      {/* God rays */}
      <GodRays />

      {/* Chromatic aberration */}
      <ChromaticAberration />

      {/* Bloom effect */}
      <BloomEffect />

      {/* Screen distortion */}
      <ScreenDistortion />

      {/* Particle systems */}
      <ParticleSystem />

      {/* Animated grid */}
      <AnimatedGrid />

      {/* Flickering neon */}
      <FlickeringNeon />

      {/* Fog/mist effect */}
      <FogEffect />

      {/* Screen shake */}
      <ScreenShake />

      {/* Light bloom */}
      <LightBloom />
    </div>
  );
};

// Character portrait based on scene
const CharacterPortrait = ({ character, atmosphere }: { character?: string; atmosphere: string }) => {
  const getCharacterColor = () => {
    switch (character) {
      case "Hacker":
        return "border-[#0066ff]";
      case "Stealth Expert":
        return "border-[#00ff88]";
      case "Team Leader":
        return "border-[#ff4444]";
      default:
        return "border-[#d4af37]";
    }
  };

  const getCharacterEmoji = () => {
    switch (character) {
      case "Hacker":
        return "👨‍💻";
      case "Stealth Expert":
        return "🥷";
      case "Team Leader":
        return "👔";
      default:
        return "🎭";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative w-40 h-56 rounded-lg border-4 ${getCharacterColor()} overflow-hidden bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a]`}
    >
      {/* Character glow */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: `radial-gradient(circle at center, ${getCharacterColor() === "border-[#0066ff]" ? "#0066ff" : getCharacterColor() === "border-[#00ff88]" ? "#00ff88" : "#ff4444"} 0%, transparent 70%)`,
        }}
      />

      {/* Character representation */}
      <div className="absolute inset-0 flex items-center justify-center text-6xl">
        {getCharacterEmoji()}
      </div>

      {/* Name plate */}
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black to-transparent p-4 text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-white font-bold text-sm uppercase tracking-wider">{character}</p>
      </motion.div>

      {/* Scanlines effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 4px",
        }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export function Episode() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [timeWarning, setTimeWarning] = useState(false);

  const episodeScenes = episodes[id || "1"] || episodes["1"];
  const scene = episodeScenes[currentScene];

  // Typewriter effect
  useEffect(() => {
    setTypewriterText("");
    let index = 0;
    const text = scene.narration;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setTypewriterText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [currentScene, scene.narration]);

  // Time warning animation
  useEffect(() => {
    setTimeWarning(false);
    const timer = setTimeout(() => setTimeWarning(true), 2000);
    return () => clearTimeout(timer);
  }, [currentScene]);

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setIsTransitioning(true);

    setTimeout(() => {
      const nextScene = scene.choices[choiceIndex].nextScene;
      
      if (typeof nextScene === "string") {
        navigate(`/${nextScene}`);
      } else {
        setCurrentScene(nextScene - 1);
        setSelectedChoice(null);
        setIsTransitioning(false);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      <CustomCursor />
      <AudioManager />

      {/* Scene background */}
      <SceneBackground atmosphere={scene.atmosphere as any} background={scene.background} />

      {/* Overlay darkening */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Top indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-8 left-8 z-20 font-mono text-sm"
        >
          <div className="text-[#ff4444] mb-2">▶ EPISODE {id} - SCENE {currentScene + 1}</div>
          <div className="text-[#d4af37]">Mission Status: ACTIVE</div>
        </motion.div>

        {/* Time warning */}
        <AnimatePresence>
          {timeWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-8 right-8 z-20"
            >
              <motion.div
                animate={{ boxShadow: ["0 0 10px #ff4444", "0 0 30px #ff4444", "0 0 10px #ff4444"] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="border-2 border-[#ff4444] rounded px-4 py-2 text-[#ff4444] font-mono text-sm"
              >
                ⚠ TIME CRITICAL
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <motion.div
              key={currentScene}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl w-full"
            >
              {/* Main scene composition */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-12">
                {/* Character portrait */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-1 flex justify-center"
                >
                  <CharacterPortrait character={scene.character} atmosphere={scene.atmosphere} />
                </motion.div>

                {/* Scene content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  {/* Title */}
                  <h1 className="text-5xl md:text-6xl font-black mb-6 text-white uppercase tracking-wider" style={{
                    textShadow: "0 0 20px rgba(255,68,68,0.5), 0 0 40px rgba(255,68,68,0.3)"
                  }}>
                    {scene.title}
                  </h1>

                  {/* Divider */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1 bg-gradient-to-r from-[#ff4444] via-[#d4af37] to-transparent mb-8 max-w-xs"
                  />

                  {/* Narration */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-black/80 to-black/40 border border-[#ff4444]/30 rounded-lg p-8 backdrop-blur-sm relative overflow-hidden"
                  >
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#ff4444] to-transparent" />

                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                      {typewriterText}
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="inline-block w-1 h-6 bg-[#ff4444] ml-2"
                      />
                    </p>
                  </motion.div>
                </motion.div>
              </div>

              {/* Choices */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="space-y-4"
              >
                <div className="text-gray-400 text-sm uppercase tracking-[0.2em] font-mono mb-6">
                  ▼ Select your action:
                </div>

                {scene.choices.map((choice, index) => {
                  const Icon = choice.icon;
                  return (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.3 + index * 0.12 }}
                      onClick={() => handleChoice(index)}
                      disabled={selectedChoice !== null}
                      whileHover={{ scale: 1.02, x: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-black/60 to-black/30 border border-[#ff4444]/50 hover:border-[#ff4444] rounded-lg p-6 text-left transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#ff4444]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8 }}
                      />

                      <div className="relative z-10 flex items-start gap-4">
                        <motion.div
                          className="mt-0.5 text-[#ff4444] flex-shrink-0"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: selectedChoice !== null ? Infinity : index * 0.1,
                          }}
                        >
                          <Icon className="w-6 h-6" />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#ff4444] transition-colors">
                            {choice.text}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {choice.consequence}
                          </p>
                        </div>

                        <motion.div
                          className="text-[#ff4444] text-2xl flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ x: [0, 8, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                        >
                          ➜
                        </motion.div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          )}

          {isTransitioning && (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-96 w-full"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                ⚙️
              </motion.div>
              <motion.div
                animate={{ width: [0, 200, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1 bg-gradient-to-r from-[#ff4444] to-[#d4af37] mb-6"
              />
              <p className="text-[#ff4444] text-lg font-mono tracking-widest">EXECUTING DECISION...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Cinematic vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-5 mix-blend-overlay"
        animate={{
          backgroundPosition: ["0px 0px", "0px 10px"],
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, #ff4444 2px, #ff4444 4px)",
        }}
      />
    </div>
  );
}