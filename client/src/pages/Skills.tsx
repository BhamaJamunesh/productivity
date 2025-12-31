import { AppLayout } from "@/components/layout/AppLayout";
import { Zap, Hexagon, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Skill Tree Data
const skillNodes = [
  { id: 1, name: "Discipline", desc: "+10% XP from Daily Quests", unlocked: true, x: 50, y: 10 },
  { id: 2, name: "Focus", desc: "+5% Streak Bonus", unlocked: false, x: 30, y: 40 },
  { id: 3, name: "Vitality", desc: "Unlock Health Tracking", unlocked: false, x: 70, y: 40 },
  { id: 4, name: "Mastery", desc: "Unlock Epic Quests", unlocked: false, x: 50, y: 70 },
];

export default function SkillsPage() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-black text-white tracking-wider mb-2">
          NEURAL LINK
        </h1>
        <p className="text-muted-foreground">Upgrade your capabilities and unlock new features.</p>
      </div>

      <div className="relative h-[600px] bg-black/40 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-sm">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Connecting Lines (Visual only for now) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <line x1="50%" y1="15%" x2="30%" y2="40%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <line x1="50%" y1="15%" x2="70%" y2="40%" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
          <line x1="30%" y1="40%" x2="50%" y2="70%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="70%" y1="40%" x2="50%" y2="70%" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>

        {/* Nodes */}
        {skillNodes.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            <div className="group relative flex flex-col items-center">
              <div 
                className={cn(
                  "w-16 h-16 flex items-center justify-center rounded-full border-2 transition-all duration-300 relative z-10 cursor-pointer",
                  node.unlocked 
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_var(--primary)]" 
                    : "bg-black/80 border-white/10 text-muted-foreground hover:border-white/30"
                )}
              >
                {node.unlocked ? <Zap className="w-8 h-8" /> : <Lock className="w-6 h-6" />}
              </div>

              {/* Tooltip */}
              <div className="absolute top-20 bg-card border border-white/10 p-3 rounded-lg w-48 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
                <h4 className={cn("font-bold uppercase text-sm mb-1", node.unlocked ? "text-primary" : "text-white")}>
                  {node.name}
                </h4>
                <p className="text-[10px] text-muted-foreground leading-tight">{node.desc}</p>
                {!node.unlocked && (
                   <div className="mt-2 text-[10px] font-bold text-red-400">REQUIRES 5 SKILL POINTS</div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-6 left-6 p-4 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md">
           <p className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Available Points</p>
           <p className="text-2xl font-bold text-white font-mono">0</p>
        </div>
      </div>
    </AppLayout>
  );
}
