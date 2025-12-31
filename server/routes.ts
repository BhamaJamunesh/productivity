import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Minimal route to verify server status
  app.get("/api/status", async (req, res) => {
    const status = await storage.getStatus();
    res.json(status);
  });

  return httpServer;
}
