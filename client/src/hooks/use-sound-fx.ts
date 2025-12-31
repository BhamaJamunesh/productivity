import { useCallback } from 'react';

// Simple hook to manage sound effects (placeholders for now)
// In a real app, integrate Howler.js or Audio API
export function useSoundFx() {
  const play = useCallback((type: 'hover' | 'click' | 'complete' | 'level-up') => {
    // const audio = new Audio(`/sounds/${type}.mp3`);
    // audio.volume = 0.2;
    // audio.play().catch(() => {});
    // Commented out to prevent errors if assets don't exist
  }, []);

  return { play };
}
