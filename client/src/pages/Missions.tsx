import { AppLayout } from "@/components/layout/AppLayout";
import { Lock, Map as MapIcon, Target } from "lucide-react";

export default function MissionsPage() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-display font-black text-white tracking-wider mb-2">
          MISSION CONTROL
        </h1>
        <p className="text-muted-foreground">Long-term operations and boss raids.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Placeholder Mission Cards - Feature stub for visual completeness */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="group relative bg-card/40 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-colors">
            {/* Mission Image/Banner Placeholder */}
            <div className="h-32 bg-gradient-to-br from-black to-gray-900 relative">
               <div className="absolute inset-0 bg-grid-white/[0.05]" />
               <div className="absolute bottom-4 left-4">
                 <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold uppercase border border-primary/20 rounded">
                    Rank B
                 </span>
               </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-display font-bold text-white mb-2">Operation: Cyber Dawn</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Complete 5 daily quests for 7 consecutive days to unlock the sector boss.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>2/5 Objectives</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[40%] bg-secondary shadow-[0_0_10px_var(--secondary)]" />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                   <Target className="w-4 h-4" />
                   <span>500 XP Reward</span>
                </div>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase rounded transition-colors">
                   View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Locked Mission */}
        <div className="relative bg-black/40 border border-white/5 rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center opacity-70">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=60')] opacity-10 bg-cover bg-center" />
           {/* Unsplash: abstract cyber grid */}
           
           <div className="relative z-10 bg-black/50 p-4 rounded-full border border-white/10 mb-4 backdrop-blur-sm">
             <Lock className="w-8 h-8 text-muted-foreground" />
           </div>
           <h3 className="relative z-10 text-xl font-display font-bold text-muted-foreground mb-2">Sector Locked</h3>
           <p className="relative z-10 text-sm text-muted-foreground/60 max-w-[200px]">
             Reach Level 5 to unlock higher difficulty operations.
           </p>
        </div>
      </div>
    </AppLayout>
  );
}
