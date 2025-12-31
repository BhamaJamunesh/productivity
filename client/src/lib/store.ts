import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { addDays, isAfter, startOfDay } from 'date-fns';
import { 
  type Quest, 
  type Mission, 
  type Hunter, 
  type InsertQuest, 
  type InsertMission, 
  RANKS 
} from '@shared/schema';

interface GameState {
  hunter: Hunter;
  quests: Quest[];
  missions: Mission[];
  
  // Actions
  createQuest: (quest: InsertQuest) => void;
  updateQuest: (id: string, updates: Partial<Quest>) => void;
  deleteQuest: (id: string) => void;
  completeQuest: (id: string) => void;
  
  createMission: (mission: InsertMission) => void;
  
  resetDailyQuests: () => void;
  addXp: (amount: number) => void;
  checkRankUp: () => boolean; // Returns true if ranked up
  checkDailyLogin: () => void;
}

const XP_PER_LEVEL_BASE = 100;
const XP_MULTIPLIER = 1.5;

// Initial Hunter State
const initialHunter: Hunter = {
  id: 'hunter-1',
  name: 'Initiate',
  level: 1,
  rank: 'Initiate',
  xp: 0,
  streak: 0,
  unlockedSkills: [],
  badges: [],
  lastLoginDate: new Date().toISOString(),
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      hunter: initialHunter,
      quests: [],
      missions: [],

      createQuest: (data) => set((state) => ({
        quests: [
          ...state.quests,
          {
            ...data,
            id: uuidv4(),
            completed: false,
            createdAt: new Date(),
            description: data.description ?? null,
            // Ensure type matches enum
            type: data.type as "daily" | "normal" | "weekly"
          } as Quest
        ]
      })),

      updateQuest: (id, updates) => set((state) => ({
        quests: state.quests.map((q) => q.id === id ? { ...q, ...updates } : q)
      })),

      deleteQuest: (id) => set((state) => ({
        quests: state.quests.filter((q) => q.id !== id)
      })),

      completeQuest: (id) => {
        const state = get();
        const quest = state.quests.find((q) => q.id === id);
        if (!quest || quest.completed) return;

        // Mark complete
        set((state) => ({
          quests: state.quests.map((q) => q.id === id ? { ...q, completed: true } : q)
        }));

        // Award XP
        state.addXp(quest.xp);
      },

      createMission: (data) => set((state) => ({
        missions: [
          ...state.missions,
          {
            ...data,
            id: uuidv4(),
            completed: false,
            bossQuestId: data.bossQuestId ?? null
          } as Mission
        ]
      })),

      resetDailyQuests: () => set((state) => {
        const today = new Date();
        const lastLogin = new Date(state.hunter.lastLoginDate || 0);
        
        // Only reset if it's a new day
        if (isAfter(startOfDay(today), startOfDay(lastLogin))) {
           return {
             quests: state.quests.map(q => 
               q.type === 'daily' ? { ...q, completed: false } : q
             )
           };
        }
        return {};
      }),

      addXp: (amount) => {
        set((state) => {
          let { xp, level, rank } = state.hunter;
          let newXp = xp + amount;
          let newLevel = level;
          
          // Simple leveling formula
          let xpNeeded = Math.floor(XP_PER_LEVEL_BASE * Math.pow(newLevel, XP_MULTIPLIER));
          
          while (newXp >= xpNeeded) {
            newXp -= xpNeeded;
            newLevel++;
            xpNeeded = Math.floor(XP_PER_LEVEL_BASE * Math.pow(newLevel, XP_MULTIPLIER));
          }

          // Rank update logic (every 10 levels)
          const rankIndex = Math.min(Math.floor((newLevel - 1) / 10), RANKS.length - 1);
          const newRank = RANKS[rankIndex];

          return {
            hunter: {
              ...state.hunter,
              xp: newXp,
              level: newLevel,
              rank: newRank
            }
          };
        });
      },

      checkRankUp: () => {
        // Logic handled in addXp, but this could trigger specific UI effects
        return false; 
      },

      checkDailyLogin: () => {
        set((state) => {
          const today = new Date();
          const lastLogin = new Date(state.hunter.lastLoginDate || 0);
          
          // If login is on a new day
          if (isAfter(startOfDay(today), startOfDay(lastLogin))) {
            const yesterday = addDays(today, -1);
            
            // Check if streak continues (logged in yesterday)
            // Simplified check: if last login was yesterday (or today before reset logic runs elsewhere)
            const isStreak = isAfter(lastLogin, startOfDay(yesterday));
            
            return {
              hunter: {
                ...state.hunter,
                lastLoginDate: today.toISOString(),
                streak: isStreak ? state.hunter.streak + 1 : 1
              }
            };
          }
          
          return {
             hunter: { ...state.hunter, lastLoginDate: today.toISOString() }
          };
        });
      }
    }),
    {
      name: 'hunter-ascension-storage',
    }
  )
);
