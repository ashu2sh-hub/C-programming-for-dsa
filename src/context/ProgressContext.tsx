import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const STORAGE_KEY = "c-for-dsa-progress-v1";

interface ProgressContextValue {
  done: Record<string, boolean>;
  toggle: (id: string) => void;
  isDone: (id: string) => boolean;
  percent: (ids: string[]) => number;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      /* ignore */
    }
  }, [done]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      done,
      toggle: (id: string) => setDone((d) => ({ ...d, [id]: !d[id] })),
      isDone: (id: string) => !!done[id],
      percent: (ids: string[]) => {
        if (ids.length === 0) return 0;
        const n = ids.filter((id) => done[id]).length;
        return Math.round((n / ids.length) * 100);
      },
    }),
    [done]
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
