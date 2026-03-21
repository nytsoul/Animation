import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

export function AudioManager() {
  const [isMuted, setIsMuted] = useState(false);
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndicator(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    setShowIndicator(true);
    setTimeout(() => setShowIndicator(false), 2000);
  };

  return (
    <>
      {/* Audio control button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-full flex items-center justify-center hover:border-[#c41e3a] transition-all group shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-gray-500 group-hover:text-[#c41e3a]" />
        ) : (
          <Volume2 className="w-6 h-6 text-[#c41e3a]" />
        )}
        
        {/* Pulse effect when unmuted */}
        {!isMuted && (
          <motion.div
            className="absolute inset-0 border-2 border-[#c41e3a] rounded-full"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        )}
      </motion.button>

      {/* Sound indicator */}
      <AnimatePresence>
        {showIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-28 right-8 z-50 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-[#c41e3a]" />
            <span className="text-sm text-gray-400">
              {isMuted ? "Sound effects muted" : "Immersive audio enabled"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
