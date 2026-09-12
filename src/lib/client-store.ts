import { create } from "zustand";
import { persist } from "zustand/middleware";

type ClientStore = {
  running: boolean;
  lastSync: string | null;
  setRunning: (v: boolean) => void;
  markSync: () => void;
};

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      running: false,
      lastSync: null,
      setRunning: (running) => set({ running }),
      markSync: () => set({ lastSync: new Date().toISOString() }),
    }),
    { name: "fluxskin-client" },
  ),
);
