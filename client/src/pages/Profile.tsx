import { AppLayout } from "@/components/layout/AppLayout";
import { useGameStore } from "@/lib/store";
import { format } from "date-fns";
import { User, Shield, Clock, Award } from "lucide-react";

export default function ProfilePage() {
  const hunter = useGameStore((state) => state.hunter);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="relative mb-20">
          {/* Banner */}
          <div className="h-48 rounded-2xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=60')] opacity-20 bg-cover bg-center" />
            {/* Unsplash: digital abstract network */}
          </div>

          {/* Avatar */}
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <div className="w-32 h-32 rounded-2xl bg-black border-2 border-primary shadow-[0_0_20px_rgba(0,243,255,0.3)] flex items-center justify-center relative overflow-hidden group">
              <User className="w-12 h-12 text-primary/50 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-50" />
            </div>
            
            <div className="mb-4">
              <h1 className="text-4xl font-display font-bold text-white uppercase tracking-wider">{hunter.name}</h1>
              <p className="text-primary font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Rank: {hunter.rank}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-white border-b border-white/10 pb-2">
              Hunter Statistics
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card/30 border border-white/5 p-4 rounded-xl">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Total XP</p>
                 <p className="text-2xl font-mono text-white">{hunter.xp}</p>
              </div>
              <div className="bg-card/30 border border-white/5 p-4 rounded-xl">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Current Level</p>
                 <p className="text-2xl font-mono text-white">{hunter.level}</p>
              </div>
              <div className="bg-card/30 border border-white/5 p-4 rounded-xl">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Login Streak</p>
                 <p className="text-2xl font-mono text-primary">{hunter.streak} Days</p>
              </div>
              <div className="bg-card/30 border border-white/5 p-4 rounded-xl">
                 <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Joined</p>
                 <p className="text-lg font-mono text-white">
                   {hunter.createdAt ? format(new Date(hunter.createdAt), 'MMM yyyy') : 'N/A'}
                 </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-white border-b border-white/10 pb-2">
              Achievements
            </h2>

            {hunter.badges && hunter.badges.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {hunter.badges.map((badge, idx) => (
                  <div key={idx} className="aspect-square bg-card/30 border border-white/5 rounded-xl flex items-center justify-center group relative cursor-help">
                    <Award className="w-8 h-8 text-yellow-500 drop-shadow-lg" />
                    <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center bg-white/5 rounded-xl border border-dashed border-white/10">
                <p className="text-sm text-muted-foreground">No badges earned yet. Complete missions to earn recognition.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
