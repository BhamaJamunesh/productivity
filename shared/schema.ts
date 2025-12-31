import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Although we use LocalStorage, these definitions provide the types for the frontend

export const quests = pgTable("quests", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  rarity: text("rarity").notNull(), // common, uncommon, rare, epic, legendary
  xp: integer("xp").notNull(),
  completed: boolean("completed").default(false).notNull(),
  type: text("type").notNull(), // daily, normal, weekly
  createdAt: timestamp("created_at").defaultNow(),
});

export const missions = pgTable("missions", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  difficulty: text("difficulty").notNull(), // D, C, B, A, S
  questIds: text("quest_ids").array().notNull(),
  bossQuestId: text("boss_quest_id"),
  completed: boolean("completed").default(false).notNull(),
});

export const hunter = pgTable("hunter", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  level: integer("level").default(1).notNull(),
  rank: text("rank").default("Initiate").notNull(),
  xp: integer("xp").default(0).notNull(),
  streak: integer("streak").default(0).notNull(),
  unlockedSkills: text("unlocked_skills").array().default([]).notNull(),
  badges: text("badges").array().default([]).notNull(),
  lastLoginDate: text("last_login_date"),
});

// Zod Schemas
export const insertQuestSchema = createInsertSchema(quests);
export const insertMissionSchema = createInsertSchema(missions);
export const insertHunterSchema = createInsertSchema(hunter);

// Types
export type Quest = typeof quests.$inferSelect;
export type InsertQuest = z.infer<typeof insertQuestSchema>;
export type Mission = typeof missions.$inferSelect;
export type InsertMission = z.infer<typeof insertMissionSchema>;
export type Hunter = typeof hunter.$inferSelect;
export type InsertHunter = z.infer<typeof insertHunterSchema>;

// Enums for frontend usage
export const RARITY_LEVELS = ["Common", "Uncommon", "Rare", "Epic", "Legendary"] as const;
export const QUEST_TYPES = ["daily", "normal", "weekly"] as const;
export const RANKS = ["Initiate", "Pathfinder", "Warden", "Executor", "Ascendant", "Sovereign"] as const;
