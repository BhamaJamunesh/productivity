import { z } from "zod";
import { insertQuestSchema, insertMissionSchema, insertHunterSchema } from "./schema";

// API definition is minimal as we are using LocalStorage
// We explicitly export these to satisfy build requirements and provide type structures
export const api = {
  // Placeholder for any potential future server sync
  status: {
    method: "GET",
    path: "/api/status",
    responses: {
      200: z.object({ status: z.string() }),
    },
  },
};

// Helper function needed by some frontend templates
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
