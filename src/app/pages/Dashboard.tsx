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
  MapPin
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
    <div className="min-h-screen bg-[#0a0a0a] p-6">
      <CustomCursor />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-[#c41e3a] mb-1">
              OPERATION CONTROL
            </h1>
            <p className="text-gray-500">Live Heist Monitoring System</p>
          </div>
          
          {/* Main timer */}
          <motion.div
            animate={{ 
              scale: timer < 30 ? [1, 1.05, 1] : 1,
              color: timer < 30 ? "#c41e3a" : "#d4af37"
            }}
            transition={{ duration: 0.5, repeat: timer < 30 ? Infinity : 0 }}
            className="text-center"
          >
            <div className="text-sm text-gray-500 mb-1">TIME REMAINING</div>
            <div className="text-5xl font-mono font-bold">
              {formatTime(timer)}
            </div>
          </motion.div>
        </div>
        
        <div className="h-1 bg-gradient-to-r from-[#c41e3a] via-[#d4af37] to-[#c41e3a] rounded" />
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Vault & Security */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vault progress */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-[#d4af37]" />
              <h2 className="text-2xl font-bold">Vault Breach Progress</h2>
            </div>
            
            <div className="relative h-8 bg-[#0a0a0a] rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#c41e3a] to-[#ff4d6a]"
                initial={{ width: 0 }}
                animate={{ width: `${vaultProgress}%` }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-sm font-mono font-bold">
                {Math.floor(vaultProgress)}%
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#00ff88]">
                  {Math.floor(vaultProgress / 25)}
                </div>
                <div className="text-xs text-gray-500">Locks Bypassed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#d4af37]">
                  {4 - Math.floor(vaultProgress / 25)}
                </div>
                <div className="text-xs text-gray-500">Locks Remaining</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#8b5cf6]">
                  {Math.floor(180 - timer)}s
                </div>
                <div className="text-xs text-gray-500">Elapsed</div>
              </div>
            </div>
          </motion.div>

          {/* Security level */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className={`w-6 h-6 ${securityLevel > 70 ? "text-[#c41e3a]" : "text-[#00ff88]"}`} />
              <h2 className="text-2xl font-bold">Security Threat Level</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="relative h-6 bg-[#0a0a0a] rounded-full overflow-hidden">
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
                className="text-3xl font-bold font-mono"
                animate={{ 
                  color: securityLevel > 70 ? "#c41e3a" : securityLevel > 40 ? "#d4af37" : "#00ff88"
                }}
              >
                {Math.floor(securityLevel)}%
              </motion.div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <Activity className="w-4 h-4" />
              <span className="text-gray-500">
                {securityLevel > 70 ? "HIGH ALERT - Guards active" : 
                 securityLevel > 40 ? "ELEVATED - Increased patrols" : 
                 "NOMINAL - Systems stable"}
              </span>
            </div>
          </motion.div>

          {/* Floor plan / Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-[#8b5cf6]" />
              <h2 className="text-2xl font-bold">Floor Plan</h2>
            </div>

            <div className="relative aspect-video bg-[#0a0a0a] rounded-lg overflow-hidden">
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'linear-gradient(#c41e3a 1px, transparent 1px), linear-gradient(90deg, #c41e3a 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }} />

              {/* Vault location */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-16 h-16 -translate-x-1/2 -translate-y-1/2"
                animate={{ 
                  boxShadow: [
                    "0 0 20px #d4af37",
                    "0 0 40px #d4af37",
                    "0 0 20px #d4af37",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-full h-full border-4 border-[#d4af37] rounded-lg flex items-center justify-center">
                  <Lock className="w-8 h-8 text-[#d4af37]" />
                </div>
              </motion.div>

              {/* Team positions */}
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
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      ...positions[index],
                      background: member.status === "active" ? "#00ff88" : "#c41e3a"
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                  />
                );
              })}

              {/* Scanner effect */}
              <motion.div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent opacity-50"
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>
        </div>

        {/* Right column - Team & Alerts */}
        <div className="space-y-6">
          {/* Team status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-[#00ff88]" />
              <h2 className="text-2xl font-bold">Team Status</h2>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#0a0a0a] rounded-lg p-3 border border-[#1a1a1a]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          member.status === "active" ? "bg-[#00ff88]" : "bg-[#c41e3a]"
                        }`}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="font-semibold text-sm">{member.name}</span>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                  </div>
                  <div className="text-xs text-gray-500">{member.role}</div>
                  <div className="text-xs text-gray-600 flex items-center gap-1 mt-1">
                    <Radio className="w-3 h-3" />
                    {member.location}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Alerts feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#2a2a2a] rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-[#d4af37]" />
              <h2 className="text-2xl font-bold">Live Alerts</h2>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`bg-[#0a0a0a] rounded p-3 border-l-4 ${
                    alert.type === "danger" ? "border-[#c41e3a]" :
                    alert.type === "warning" ? "border-[#d4af37]" :
                    "border-[#00ff88]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm flex-1">{alert.message}</p>
                    <span className="text-xs text-gray-600 font-mono">{alert.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}