import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { 
  Shield, 
  AlertTriangle, 
  Users, 
  Clock, 
  Radio,
  Lock,
  CheckCircle2,
  Activity,
  MapPin,
  Zap,
  Eye,
  Radar
} from "lucide-react";
import { CustomCursor } from "../components/CustomCursor";

interface TeamMember {
  name: string;
  role: string;
  status: "active" | "compromised" | "offline";
  location: string;
}

interface Alert {
  id: number;
  type: "warning" | "danger" | "info";
  message: string;
  time: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(180); // 3 minutes
  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, type: "info", message: "Vault access terminal reached", time: "00:00" },
    { id: 2, type: "warning", message: "Security protocol deviation detected", time: "00:15" }
  ]);

  const [teamMembers] = useState<TeamMember[]>([
    { name: "Sentinel", role: "Lookout", status: "active", location: "Rooftop" },
    { name: "Phoenix", role: "Tech Ops", status: "active", location: "Server Room" },
    { name: "Ghost", role: "Inside Man", status: "active", location: "Vault Level" },
    { name: "Oracle", role: "Coordinator", status: "active", location: "Command" },
  ]);

  const [vaultProgress, setVaultProgress] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(35);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          navigate("/ending/timeout");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Vault progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setVaultProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate("/ending/success"), 1000);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [navigate]);

  // Random alerts
  useEffect(() => {
    const messages = [
      { type: "warning" as const, message: "Guard patrol approaching sector B" },
      { type: "info" as const, message: "Camera loop successful" },
      { type: "danger" as const, message: "Motion sensor triggered" },
      { type: "info" as const, message: "Backup generator online" },
    ];

    const interval = setInterval(() => {
      if (alerts.length < 6) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const minutes = Math.floor((180 - timer) / 60);
        const seconds = (180 - timer) % 60;
        const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        setAlerts((prev) => [
          ...prev,
          {
            id: Date.now(),
            ...randomMessage,
            time: timeStr
          }
        ].slice(-6));
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [timer, alerts.length]);

  // Security level simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityLevel((prev) => {
        const change = Math.random() * 10 - 3;
        return Math.max(0, Math.min(100, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#0a0a0a] to-[#000a0a] p-6 overflow-hidden relative">
      <CustomCursor />
      
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#c41e3a]/20 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-[#8b5cf6]/20 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-2"
            >
              <Radar className="w-8 h-8 text-[#c41e3a] animate-spin" style={{ animationDuration: '3s' }} />
              <h1 className="text-5xl font-black bg-gradient-to-r from-[#c41e3a] via-[#d4af37] to-[#c41e3a] bg-clip-text text-transparent">
                OPERATION NEXUS
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg ml-11"
            >
              Advanced Heist Command & Control
            </motion.p>
          </div>
          
          {/* Main timer - Enhanced */}
          <motion.div
            animate={{ 
              scale: timer < 30 ? [1, 1.08, 1] : 1,
            }}
            transition={{ duration: 0.5, repeat: timer < 30 ? Infinity : 0 }}
            className="text-center"
          >
            <motion.div
              className="px-8 py-4 rounded-2xl border-2 backdrop-blur-xl"
              style={{
                borderColor: timer < 30 ? "#c41e3a" : "#d4af37",
                background: timer < 30 
                  ? "linear-gradient(135deg, rgba(196, 30, 58, 0.1), rgba(212, 175, 55, 0.05))"
                  : "linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 58, 0.05))"
              }}
              animate={{
                boxShadow: timer < 30 
                  ? ["0 0 20px rgba(196, 30, 58, 0.5)", "0 0 40px rgba(196, 30, 58, 0.8)", "0 0 20px rgba(196, 30, 58, 0.5)"]
                  : ["0 0 10px rgba(212, 175, 55, 0.3)", "0 0 20px rgba(212, 175, 55, 0.5)", "0 0 10px rgba(212, 175, 55, 0.3)"]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="text-xs text-gray-400 font-semibold tracking-widest mb-1">⏱️ TIME REMAINING</div>
              <motion.div
                className="text-6xl font-black font-mono"
                style={{
                  color: timer < 30 ? "#c41e3a" : "#d4af37"
                }}
              >
                {formatTime(timer)}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="h-1.5 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-[#c41e3a] via-[#d4af37] to-[#8b5cf6]"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Main grid - 2x2 layout with better spacing */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 relative z-10 mb-6">
        {/* Vault progress - Full width top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="xl:col-span-2 group"
        >
          <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#c41e3a]/30 rounded-2xl overflow-hidden backdrop-blur-xl p-8 shadow-2xl hover:border-[#c41e3a]/60 transition-all duration-500">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/5 to-transparent rounded-2xl" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Lock className="w-8 h-8 text-[#d4af37]" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-black">VAULT BREACH</h2>
                <p className="text-gray-400 text-sm">Progress towards target</p>
              </div>
            </div>
            
            {/* Enhanced progress bar */}
            <div className="relative mb-8">
              <div className="relative h-12 bg-gradient-to-r from-[#0a0a1a] to-[#1a1a2e] rounded-xl overflow-hidden border border-[#2a2a4a]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-xl"
                  style={{
                    background: "linear-gradient(90deg, #c41e3a 0%, #ff4d6a 50%, #d4af37 100%)"
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${vaultProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-40"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)"
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center text-lg font-black font-mono"
                  animate={{ color: vaultProgress > 50 ? "#d4af37" : "#00ff88" }}
                >
                  {Math.floor(vaultProgress)}%
                </motion.div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-gradient-to-br from-[#00ff88]/10 to-transparent border border-[#00ff88]/30 rounded-xl p-4 text-center"
              >
                <motion.div className="text-4xl font-black text-[#00ff88] mb-1">
                  {Math.floor(vaultProgress / 25)}
                </motion.div>
                <div className="text-xs text-gray-400 font-semibold tracking-widest">LOCKS BYPASSED</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/30 rounded-xl p-4 text-center"
              >
                <motion.div className="text-4xl font-black text-[#d4af37] mb-1">
                  {4 - Math.floor(vaultProgress / 25)}
                </motion.div>
                <div className="text-xs text-gray-400 font-semibold tracking-widest">LOCKS REMAIN</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-[#8b5cf6]/10 to-transparent border border-[#8b5cf6]/30 rounded-xl p-4 text-center"
              >
                <motion.div className="text-4xl font-black text-[#8b5cf6] mb-1">
                  {Math.floor(180 - timer)}s
                </motion.div>
                <div className="text-xs text-gray-400 font-semibold tracking-widest">ELAPSED TIME</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Security level - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="group"
        >
          <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#d4af37]/30 rounded-2xl overflow-hidden backdrop-blur-xl p-6 shadow-2xl hover:border-[#d4af37]/60 transition-all duration-500 h-full">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-2xl" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className={`w-8 h-8 ${securityLevel > 70 ? "text-[#c41e3a]" : "text-[#00ff88]"}`} />
              </motion.div>
              <div>
                <h2 className="text-2xl font-black">THREAT LEVEL</h2>
              </div>
            </div>
            
            <div className="relative mb-6">
              <div className="relative h-8 bg-gradient-to-r from-[#0a0a1a] to-[#1a1a2e] rounded-lg overflow-hidden border border-[#2a2a4a]">
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background: securityLevel > 70 
                      ? "linear-gradient(to right, #c41e3a, #ff4d6a)"
                      : securityLevel > 40
                      ? "linear-gradient(to right, #d4af37, #ffcc66)"
                      : "linear-gradient(to right, #00ff88, #00cc66)"
                  }}
                  animate={{ width: `${securityLevel}%` }}
                />
              </div>
            </div>

            <motion.div
              className="text-5xl font-black font-mono mb-4"
              animate={{ 
                color: securityLevel > 70 ? "#c41e3a" : securityLevel > 40 ? "#d4af37" : "#00ff88"
              }}
            >
              {Math.floor(securityLevel)}%
            </motion.div>

            <motion.div
              key={`status-${Math.floor(securityLevel / 10)}`}
              initial={{ opacity: 0}}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
              style={{
                background: securityLevel > 70
                  ? "rgba(196, 30, 58, 0.1)"
                  : securityLevel > 40
                  ? "rgba(212, 175, 55, 0.1)"
                  : "rgba(0, 255, 136, 0.1)"
              }}
            >
              <Activity className="w-4 h-4" />
              <span className="text-gray-300 font-semibold">
                {securityLevel > 70 ? "🔴 CRITICAL" : 
                 securityLevel > 40 ? "🟡 ELEVATED" : 
                 "🟢 SAFE"}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floor plan / Map - Full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
        className="group relative z-10"
      >
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#8b5cf6]/30 rounded-2xl overflow-hidden backdrop-blur-xl p-8 shadow-2xl hover:border-[#8b5cf6]/60 transition-all duration-500">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/5 to-transparent rounded-2xl" />
          </div>

          <div className="flex items-center gap-3 mb-6 relative z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Eye className="w-8 h-8 text-[#8b5cf6]" />
            </motion.div>
            <div>
              <h2 className="text-3xl font-black">TACTICAL MAP</h2>
              <p className="text-gray-400 text-sm">Real-time position tracking</p>
            </div>
          </div>

          <div className="relative aspect-video bg-gradient-to-br from-[#0a0a1a] to-[#1a1a2e] rounded-xl overflow-hidden border border-[#2a2a4a]">
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: 'linear-gradient(#8b5cf6 1px, transparent 1px), linear-gradient(90deg, #8b5cf6 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }} />

            {/* Scanning effect */}
            <motion.div
              className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent"
              animate={{ y: ["0%", "100%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            {/* Vault location - Enhanced */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="relative w-20 h-20 rounded-lg border-3 border-[#d4af37] flex items-center justify-center"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.2)",
                    "0 0 40px rgba(212, 175, 55, 0.7), inset 0 0 30px rgba(212, 175, 55, 0.3)",
                    "0 0 20px rgba(212, 175, 55, 0.4), inset 0 0 20px rgba(212, 175, 55, 0.2)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-10 h-10 text-[#d4af37]" />
              </motion.div>
            </motion.div>

            {/* Team positions - Enhanced */}
            {teamMembers.map((member, index) => {
              const positions = [
                { top: "20%", left: "80%" },
                { top: "40%", left: "20%" },
                { top: "60%", left: "60%" },
                { top: "80%", left: "30%" }
              ];
              
              return (
                <motion.div
                  key={member.name}
                  className="absolute group/member"
                  style={positions[index]}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.4
                  }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full cursor-pointer relative"
                    style={{
                      background: member.status === "active" 
                        ? "radial-gradient(circle, #00ff88, #00cc66)"
                        : "radial-gradient(circle, #c41e3a, #ff4d6a)"
                    }}
                    animate={{
                      boxShadow: member.status === "active"
                        ? ["0 0 10px rgba(0, 255, 136, 0.6)", "0 0 20px rgba(0, 255, 136, 0.9)"]
                        : ["0 0 10px rgba(196, 30, 58, 0.6)", "0 0 20px rgba(196, 30, 58, 0.9)"]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      whileHover={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#0a0a1a] border border-[#8b5cf6] rounded-lg px-3 py-2 text-xs whitespace-nowrap pointer-events-none z-50"
                    >
                      <div className="font-bold text-[#d4af37]">{member.name}</div>
                      <div className="text-gray-400 text-xs">{member.role}</div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
      {/* Bottom row - Team & Alerts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative z-10">
        {/* Team status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="group"
        >
          <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#00ff88]/30 rounded-2xl overflow-hidden backdrop-blur-xl p-8 shadow-2xl hover:border-[#00ff88]/60 transition-all duration-500">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 to-transparent rounded-2xl" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <motion.div
                animate={{ 
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Users className="w-8 h-8 text-[#00ff88]" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-black">TEAM STATUS</h2>
                <p className="text-gray-400 text-sm">{teamMembers.filter(m => m.status === "active").length} operators active</p>
              </div>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.08 }}
                  whileHover={{ x: 4 }}
                  className="bg-gradient-to-r from-[#0a0a1a]/50 to-[#1a1a2e]/50 hover:from-[#00ff88]/10 hover:to-[#1a1a2e]/50 rounded-xl p-4 border border-[#1a2a3a] hover:border-[#00ff88]/30 transition-all duration-300 cursor-pointer group/card"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-3 h-3 rounded-full ${
                          member.status === "active" ? "bg-[#00ff88]" : "bg-[#c41e3a]"
                        }`}
                        animate={{ 
                          opacity: [0.4, 1, 0.4],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="font-black text-lg text-white group-hover/card:text-[#00ff88] transition-colors">{member.name}</span>
                    </div>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#00ff88]" />
                    </motion.div>
                  </div>
                  <div className="ml-6 text-sm text-gray-400 font-semibold">{member.role}</div>
                  <div className="ml-6 text-xs text-gray-500 flex items-center gap-2 mt-2">
                    <Radio className="w-3 h-3 text-[#d4af37]" />
                    <span>{member.location}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Alerts feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="group"
        >
          <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border border-[#d4af37]/30 rounded-2xl overflow-hidden backdrop-blur-xl p-8 shadow-2xl hover:border-[#d4af37]/60 transition-all duration-500 h-full flex flex-col">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent rounded-2xl" />
            </div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <AlertTriangle className="w-8 h-8 text-[#d4af37]" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-black">LIVE ALERTS</h2>
                <p className="text-gray-400 text-sm">{alerts.length} active notifications</p>
              </div>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto pr-3 custom-scrollbar">
              {alerts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-center h-32 text-gray-500 text-sm"
                >
                  <span>✓ All systems nominal</span>
                </motion.div>
              ) : (
                alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    className={`bg-gradient-to-r rounded-lg p-4 border-l-4 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:shadow-lg ${
                      alert.type === "danger" 
                        ? "from-[#c41e3a]/20 to-transparent border-[#c41e3a]" :
                      alert.type === "warning" 
                        ? "from-[#d4af37]/20 to-transparent border-[#d4af37]" :
                        "from-[#00ff88]/20 to-transparent border-[#00ff88]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-100">{alert.message}</p>
                      </div>
                      <span className="text-xs font-mono text-gray-400 whitespace-nowrap font-bold">{alert.time}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}