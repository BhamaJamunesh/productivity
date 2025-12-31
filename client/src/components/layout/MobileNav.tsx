import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  Sword, 
  Map, 
  Zap,
  LayoutDashboard,
  User
} from "lucide-react";

export function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { name: "Dash", icon: LayoutDashboard, href: "/" },
    { name: "Quests", icon: Sword, href: "/quests" },
    { name: "Missions", icon: Map, href: "/missions" },
    { name: "Skills", icon: Zap, href: "/skills" },
    { name: "Profile", icon: User, href: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-background/95 backdrop-blur-xl border-t border-white/10 z-50 flex items-center justify-around sm:hidden px-2">
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.name} href={item.href}>
            <div className={cn(
              "flex flex-col items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all",
              isActive ? "text-primary" : "text-muted-foreground hover:text-white"
            )}>
              <item.icon className={cn("w-5 h-5", isActive && "drop-shadow-[0_0_5px_var(--primary)]")} />
              <span className="text-[10px] mt-1 font-medium">{item.name}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
