import { motion, AnimatePresence } from "motion/react";
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { AlertTriangle, Zap, Shield, Brain } from "lucide-react";
import { AudioManager } from "../components/AudioManager";
import { CustomCursor } from "../components/CustomCursor";

interface Scene {
  id: number;
  title: string;
  narration: string;
  choices: {
    text: string;
    consequence: string;
    nextScene: number | string; // number for next scene, "dashboard" or "ending"
    icon: any;
  }[];
}

const episodes: { [key: string]: Scene[] } = {
  "1": [
    {
      id: 1,
      title: "INFILTRATION PHASE",
      narration: "You've made it inside the National Reserve. Security cameras sweep the corridors every 30 seconds. The vault access terminal is 50 meters ahead, but armed guards patrol the route. Time is critical—the window closes in 3 minutes.",
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
      narration: "Your fingers dance across the keypad. The camera feeds flicker—you're in. But the system logged your intrusion. Security will notice in 90 seconds. The terminal is 20 meters ahead.",
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
      narration: "The service tunnel is dark and cramped. You hear footsteps above—guards are close. Ahead, you see two paths: one leads directly to the vault level, the other to the control room where you could disable alarms entirely.",
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
      narration: "The vault door looms before you. 8 tons of reinforced steel. Your team is in position. Police are 5 minutes out. This is it—the moment everything hinges on.",
      choices: [
        {
          text: "Use the thermal drill (4 minutes)",
          consequence: "Precise but time-consuming",
          nextScene: "ending/success",
          icon: Zap
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

export function Episode() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [currentScene, setCurrentScene] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");

  const episodeScenes = episodes[id || "1"] || episodes["1"];
  const scene = episodeScenes[currentScene];

  // Typewriter effect for narration
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
    }, 30);

    return () => clearInterval(timer);
  }, [currentScene]);

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setIsTransitioning(true);

    setTimeout(() => {
      const nextScene = scene.choices[choiceIndex].nextScene;
      
      if (typeof nextScene === "string") {
        if (nextScene.startsWith("ending/")) {
          navigate(`/${nextScene}`);
        } else {
          navigate(`/${nextScene}`);
        }
      } else {
        setCurrentScene(nextScene - 1);
        setSelectedChoice(null);
        setIsTransitioning(false);
      }
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-hidden">
      <CustomCursor />
      <AudioManager />
      
      {/* Alert background effect */}
      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, #c41e3a 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, #c41e3a 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, #c41e3a 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Episode indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 z-20"
      >
        <div className="text-[#c41e3a] text-sm font-mono uppercase tracking-widest">
          Episode {id} • Scene {currentScene + 1}
        </div>
      </motion.div>

      {/* Timer simulation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 right-8 z-20"
      >
        <div className="flex items-center gap-2 text-[#d4af37] font-mono">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ●
          </motion.div>
          <span>OPERATION ACTIVE</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl w-full">
          <AnimatePresence mode="wait">
            {!isTransitioning && (
              <motion.div
                key={currentScene}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Scene title */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl md:text-6xl font-bold text-[#c41e3a] mb-2 tracking-wider">
                    {scene.title}
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-[#c41e3a] to-transparent" />
                </motion.div>

                {/* Narration box */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-8 mb-12 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#c41e3a]" />
                  <p className="text-xl text-gray-300 leading-relaxed font-light">
                    {typewriterText}
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-2 h-6 bg-[#c41e3a] ml-1"
                    />
                  </p>
                </motion.div>

                {/* Choices */}
                <div className="space-y-4">
                  <p className="text-gray-500 text-sm uppercase tracking-widest mb-6">
                    Choose your action:
                  </p>
                  {scene.choices.map((choice, index) => {
                    const Icon = choice.icon;
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        onClick={() => handleChoice(index)}
                        disabled={selectedChoice !== null}
                        whileHover={{ scale: 1.02, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#141414] border border-[#2a2a2a] rounded-lg p-6 text-left hover:border-[#c41e3a] transition-all duration-300 disabled:opacity-50 relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#c41e3a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.8 }}
                        />
                        
                        <div className="relative z-10 flex items-start gap-4">
                          <div className="mt-1">
                            <Icon className="w-6 h-6 text-[#c41e3a]" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2 text-white">
                              {choice.text}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {choice.consequence}
                            </p>
                          </div>
                          <motion.div
                            className="text-[#c41e3a] opacity-0 group-hover:opacity-100"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {isTransitioning && (
              <motion.div
                key="transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-96"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-[#c41e3a] border-t-transparent rounded-full mb-6"
                />
                <p className="text-xl text-gray-400">Processing decision...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Glitch effect overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
        animate={{
          backgroundImage: [
            "linear-gradient(0deg, transparent 0%, #c41e3a 50%, transparent 100%)",
            "linear-gradient(180deg, transparent 0%, #c41e3a 50%, transparent 100%)",
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ backgroundSize: "100% 2px" }}
      />
    </div>
  );
}