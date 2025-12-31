import { useGameStore } from "@/lib/store";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { XPRing } from "@/components/dashboard/XPRing";
import { QuestCard } from "@/components/quests/QuestCard";
import { CreateQuestDialog } from "@/components/quests/CreateQuestDialog";
import { motion } from "framer-motion";
import { Flame, Trophy, Target } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const hunter = useGameStore((state) => state.hunter);
  const quests = useGameStore((state) => state.quests);
  const checkDailyLogin = useGameStore((state) => state.checkDailyLogin);
  const resetDailyQuests = useGameStore((state) => state.resetDailyQuests);

  useEffect(() => {
    checkDailyLogin();
    resetDailyQuests();
  }, [checkDailyLogin, resetDailyQuests]);

  const activeQuests = quests.filter(q => !q.completed).slice(0, 3);
  const dailyQuests = quests.filter(q => q.type === 'daily');
  const dailyCompleted = dailyQuests.filter(q => q.completed).length;
  
  // Calculate next level XP (simple formula inverse from store)
  const XP_PER_LEVEL_BASE = 100;
  const XP_MULTIPLIER = 1.5;
  const nextLevelXP = Math.floor(XP_PER_LEVEL_BASE * Math.pow(hunter.level, XP_MULTIPLIER));

  return (
    <AppLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Hunter Stats */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/30 backdrop-blur-md rounded-2xl border border-white/5 p-6 relative overflow-hidden"
          >
            {/* Background decoration */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            
            <h2 className="text-xl font-display font-bold text-center mb-6 tracking-widest text-primary/80">HUNTER STATUS</h2>
            
            <XPRing 
              level={hunter.level} 
              currentXP={hunter.xp} 
              nextLevelXP={nextLevelXP} 
              rank={hunter.rank}
            />

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-black/40 rounded-lg p-3 border border-white/5 flex flex-col items-center">
                <Flame className="w-6 h-6 text-orange-500 mb-1" />
                <span className="text-2xl font-bold font-mono text-white">{hunter.streak}</span>
                <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Day Streak</span>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-white/5 flex flex-col items-center">
                <Trophy className="w-6 h-6 text-yellow-500 mb-1" />
                <span className="text-2xl font-bold font-mono text-white">{quests.filter(q => q.completed).length}</span>
                <span className="text-[10px] uppercase text-muted-foreground tracking-wider">Quests Done</span>
              </div>
            </div>
          </motion.div>

          <div className="bg-card/30 backdrop-blur-md rounded-xl border border-white/5 p-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" /> Daily Protocol
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{dailyCompleted} / {dailyQuests.length || 1}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-secondary shadow-[0_0_10px_var(--secondary)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${(dailyCompleted / (dailyQuests.length || 1)) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Active Quests */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-white tracking-wide">
                ACTIVE <span className="text-primary">QUESTS</span>
              </h1>
              <p className="text-muted-foreground">Priority assignments for today.</p>
            </div>
            <CreateQuestDialog />
          </div>

          <div className="space-y-4">
            {activeQuests.length > 0 ? (
              activeQuests.map((quest) => (
                <QuestCard 
                  key={quest.id} 
                  quest={quest} 
                  onEdit={() => {}} // Placeholder
                />
              ))
            ) : (
              <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-white/5">
                <p className="text-muted-foreground mb-4">No active assignments protocol loaded.</p>
                <CreateQuestDialog />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Link href="/quests" className="text-sm text-primary hover:text-primary/80 uppercase tracking-widest font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              View All Quests &rarr;
            </Link>
          </div>
        </div>

      </div>
    </AppLayout>
  );
}
