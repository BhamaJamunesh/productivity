import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quest } from "@shared/schema";
import { Check, Trash2, Edit, ChevronDown, ChevronUp, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/lib/store";

interface QuestCardProps {
  quest: Quest;
  onEdit: (quest: Quest) => void;
}

const RARITY_COLORS = {
  Common: "border-gray-500 shadow-gray-500/10",
  Uncommon: "border-green-500 shadow-green-500/10",
  Rare: "border-blue-500 shadow-blue-500/10",
  Epic: "border-purple-500 shadow-purple-500/20",
  Legendary: "border-yellow-500 shadow-yellow-500/30",
};

const RARITY_TEXT = {
  Common: "text-gray-400",
  Uncommon: "text-green-400",
  Rare: "text-blue-400",
  Epic: "text-purple-400",
  Legendary: "text-yellow-400",
};

export function QuestCard({ quest, onEdit }: QuestCardProps) {
  const completeQuest = useGameStore((state) => state.completeQuest);
  const deleteQuest = useGameStore((state) => state.deleteQuest);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      completeQuest(quest.id);
    }, 500);
  };

  const isDaily = quest.type === "daily";
  const rarityColor = RARITY_COLORS[quest.rarity as keyof typeof RARITY_COLORS] || RARITY_COLORS.Common;
  const rarityTextColor = RARITY_TEXT[quest.rarity as keyof typeof RARITY_TEXT] || RARITY_TEXT.Common;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, scale: isCompleting ? 0.95 : 1 }}
      exit={{ opacity: 0, x: -50 }}
      className={cn(
        "relative group bg-card/40 backdrop-blur-sm border rounded-lg p-4 transition-all duration-300 hover:bg-card/60",
        rarityColor,
        isCompleting && "opacity-50 pointer-events-none"
      )}
    >
      {/* HUD Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 rounded-tl-sm" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 rounded-tr-sm" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 rounded-bl-sm" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 rounded-br-sm" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {isDaily && (
              <span className="px-1.5 py-0.5 rounded-sm bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
                Daily
              </span>
            )}
            <span className={cn("text-xs font-bold uppercase tracking-widest", rarityTextColor)}>
              {quest.rarity}
            </span>
          </div>
          
          <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors font-display">
            {quest.title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
           <div className="flex items-center gap-1 text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded border border-yellow-400/20">
             <Star className="w-3 h-3 fill-current" />
             <span className="text-xs font-bold">{quest.xp} XP</span>
           </div>
        </div>
      </div>

      {quest.description && (
        <div className="mt-2">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
          >
            {isExpanded ? "Hide Details" : "Show Details"}
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="pt-2 text-sm text-muted-foreground leading-relaxed">
                  {quest.description}
                </p>
                <div className="mt-3 pt-3 border-t border-white/5 flex justify-end gap-2">
                  <button 
                    onClick={() => onEdit(quest)}
                    className="p-1.5 hover:bg-white/10 rounded-md text-muted-foreground hover:text-white transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => deleteQuest(quest.id)}
                    className="p-1.5 hover:bg-red-500/10 rounded-md text-muted-foreground hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={handleComplete}
          disabled={isCompleting || quest.completed}
          className={cn(
            "w-full py-2 rounded font-bold uppercase tracking-wider text-sm transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden",
            quest.completed 
              ? "bg-green-500/20 text-green-400 cursor-default" 
              : "bg-primary/10 text-primary hover:bg-primary hover:text-black border border-primary/30"
          )}
        >
          {quest.completed ? (
            <>
              <Check className="w-4 h-4" /> Completed
            </>
          ) : (
            <>
              {isCompleting ? "Ascending..." : "Complete Quest"}
            </>
          )}
          {/* Shine effect */}
          {!quest.completed && !isCompleting && (
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
