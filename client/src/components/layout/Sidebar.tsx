import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  Sword, 
  Map, 
  Target, 
  Settings, 
  User, 
  Zap,
  LayoutDashboard
} from "lucide-react";
import { useGameStore } from "@/lib/store";

export function Sidebar() {
  const [location] = useLocation();
  const hunter = useGameStore(state => state.hunter);

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Quests", icon: Sword, href: "/quests" },
    { name: "Missions", icon: Map, href: "/missions" },
    { name: "Skills", icon: Zap, href: "/skills" },
    { name: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-background/95 border-r border-white/5 backdrop-blur-xl z-50 flex flex-col justify-between hidden sm:flex">
      <div>
        <div className="h-16 flex items-center justify-center md:justify-start md:px-6 border-b border-white/5">
          <Shield className="w-8 h-8 text-primary animate-pulse" />
          <span className="ml-3 font-display font-bold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary hidden md:block">
            HUNTER
          </span>
        </div>

        <nav className="mt-8 space-y-2 px-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <div 
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group relative overflow-hidden",
                    isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_var(--primary)]" />
                  )}
                  <item.icon className={cn("w-5 h-5 md:mr-3 transition-colors", isActive && "text-primary drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]")} />
                  <span className="hidden md:block font-medium">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-white/5">
        <div className="bg-card/50 rounded-lg p-3 border border-white/5 hidden md:block">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Current Rank</p>
          <p className="text-sm font-bold text-primary">{hunter.rank}</p>
          <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${(hunter.xp % 1000) / 10}%` }} // Simplified XP visual
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
