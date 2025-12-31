import { type Quest, type Mission, type Hunter } from "@shared/schema";

// MemStorage is sufficient as we are not using the backend for data in this version.
// The frontend handles all persistence via LocalStorage.

export interface IStorage {
  // Minimal interface to satisfy server requirements
  getStatus(): Promise<{ status: string }>;
}

export class MemStorage implements IStorage {
  constructor() {}

  async getStatus(): Promise<{ status: string }> {
    return { status: "operational" };
  }
}

export const storage = new MemStorage();
