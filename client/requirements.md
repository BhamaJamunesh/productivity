## Packages
framer-motion | Essential for complex animations (Rank Up, XP ring, Quest completion FX)
lucide-react | Iconography
date-fns | Date formatting and manipulation for daily resets
clsx | Class name utility
tailwind-merge | Class name utility
zustand | State management for complex client-side store (Hunter/Quests/Missions)
recharts | Analytics charts for XP and completion history

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["'Orbitron', sans-serif"],
  body: ["'Rajdhani', sans-serif"],
}
Client-only architecture: All data persisted in localStorage via Zustand persist middleware.
No backend API calls needed for core functionality.
