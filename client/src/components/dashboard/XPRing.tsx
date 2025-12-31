import { motion } from "framer-motion";

interface XPRingProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  rank: string;
}

export function XPRing({ level, currentXP, nextLevelXP, rank }: XPRingProps) {
  const percentage = Math.min((currentXP / nextLevelXP) * 100, 100);
  const radius = 80;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto">
      {/* Outer Glow Ring */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-2xl animate-pulse" />

      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 drop-shadow-[0_0_10px_rgba(0,243,255,0.3)]"
      >
        <circle
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <motion.circle
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{ strokeDasharray: circumference + ' ' + circumference }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="block text-4xl font-display font-black text-white tracking-tighter">
            LVL {level}
          </span>
          <span className="block text-sm text-primary font-bold uppercase tracking-widest mt-1">
            {rank}
          </span>
          <span className="block text-xs text-muted-foreground mt-2 font-mono">
            {currentXP} / {nextLevelXP} XP
          </span>
        </motion.div>
      </div>
    </div>
  );
}
