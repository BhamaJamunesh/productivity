import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      <Sidebar />
      <main className="sm:pl-20 md:pl-64 min-h-screen pb-20 sm:pb-0 transition-all duration-300">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in duration-500">
          {children}
        </div>
      </main>
      <MobileNav />
    </div>
  );
}
