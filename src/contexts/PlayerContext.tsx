import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

interface PlayerContextType {
  data: {
    playerName: string;
    score: number;
    achievements: string[];
  };
  setData: (newData: { playerName: string; score: number; achievements: string[] }) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<{
    playerName: string;
    score: number;
    achievements: string[];
  }>({
    playerName: '',
    score: 0,
    achievements: [],
  });

  return <PlayerContext.Provider value={{ data, setData }}>{children}</PlayerContext.Provider>;
}

export function usePlayerContext() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext deve ser usado dentro de um PlayerProvider');
  }
  return context;
}
