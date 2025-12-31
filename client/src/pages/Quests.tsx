import { AppLayout } from "@/components/layout/AppLayout";
import { useGameStore } from "@/lib/store";
import { QuestCard } from "@/components/quests/QuestCard";
import { CreateQuestDialog } from "@/components/quests/CreateQuestDialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";

export default function QuestsPage() {
  const quests = useGameStore((state) => state.quests);
  const [filter, setFilter] = useState("all");

  const filteredQuests = quests.filter(q => {
    if (filter === "all") return !q.completed;
    if (filter === "completed") return q.completed;
    if (filter === "daily") return q.type === "daily" && !q.completed;
    return true;
  });

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 tracking-wider mb-2">
            QUEST BOARD
          </h1>
          <p className="text-muted-foreground">Manage your assignments and track progress.</p>
        </div>
        <CreateQuestDialog />
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-card/50 border border-white/10 p-1 mb-6 w-full md:w-auto">
          <TabsTrigger value="active" onClick={() => setFilter("all")} className="flex-1 md:flex-none uppercase tracking-wider font-bold text-xs data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
            Active
          </TabsTrigger>
          <TabsTrigger value="daily" onClick={() => setFilter("daily")} className="flex-1 md:flex-none uppercase tracking-wider font-bold text-xs data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Dailies
          </TabsTrigger>
          <TabsTrigger value="completed" onClick={() => setFilter("completed")} className="flex-1 md:flex-none uppercase tracking-wider font-bold text-xs data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            Completed
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredQuests.length > 0 ? (
              filteredQuests.map((quest) => (
                <motion.div
                  key={quest.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <QuestCard 
                    quest={quest} 
                    onEdit={() => {}}
                  />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-muted-foreground bg-card/20 rounded-xl border border-dashed border-white/10">
                <p>No quests found in this category.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </Tabs>
    </AppLayout>
  );
}
