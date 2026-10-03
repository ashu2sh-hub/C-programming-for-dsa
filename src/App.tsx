import { useMemo, useState } from "react";
import { ProgressProvider, useProgress } from "./context/ProgressContext";
import { cn } from "./utils/cn";

import Intro from "./sections/Intro";
import Roadmap from "./sections/Roadmap";
import Fundamentals from "./sections/Fundamentals";
import Arrays from "./sections/Arrays";
import Functions from "./sections/Functions";
import Pointers from "./sections/Pointers";
import Structures from "./sections/Structures";
import DynamicMemory from "./sections/DynamicMemory";
import Recursion from "./sections/Recursion";
import Patterns from "./sections/Patterns";
import Examples from "./sections/Examples";
import CheatSheet from "./sections/CheatSheet";
import QuizFinal from "./sections/QuizFinal";

const TOTAL_TRACKABLE_TOPICS = 49;

const NAV = [
  { id: "intro", label: "Introduction", emoji: "🚀", Comp: Intro },
  { id: "roadmap", label: "Roadmap", emoji: "🗺️", Comp: Roadmap },
  { id: "fundamentals", label: "C Fundamentals", emoji: "🧱", Comp: Fundamentals },
  { id: "arrays", label: "Arrays", emoji: "📦", Comp: Arrays },
  { id: "functions", label: "Functions", emoji: "⚙️", Comp: Functions },
  { id: "pointers", label: "Pointers", emoji: "🎯", Comp: Pointers },
  { id: "structures", label: "Structures", emoji: "🧩", Comp: Structures },
  { id: "dma", label: "Dynamic Memory", emoji: "🧠", Comp: DynamicMemory },
  { id: "recursion", label: "Recursion", emoji: "🔁", Comp: Recursion },
  { id: "patterns", label: "DSA Patterns", emoji: "🧭", Comp: Patterns },
  { id: "examples", label: "DSA Programs", emoji: "🏗️", Comp: Examples },
  { id: "cheatsheet", label: "Cheat Sheet", emoji: "📋", Comp: CheatSheet },
  { id: "quiz", label: "Final Quiz", emoji: "🏁", Comp: QuizFinal },
] as const;

export default function App() {
  return (
    <ProgressProvider>
      <Shell />
    </ProgressProvider>
  );
}

function Shell() {
  const [active, setActive] = useState<string>(NAV[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { done } = useProgress();

  const percent = useMemo(() => {
    const n = Object.values(done).filter(Boolean).length;
    return Math.min(100, Math.round((n / TOTAL_TRACKABLE_TOPICS) * 100));
  }, [done]);

  const ActiveComp = NAV.find((n) => n.id === active)!.Comp;

  const goTo = (id: string) => {
    setActive(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-slate-200 text-slate-600 lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-base shadow-sm">
            💻
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-extrabold text-slate-900 sm:text-base">
              C for DSA — Crash Course
            </p>
            <p className="hidden truncate text-[11px] text-slate-500 sm:block">
              Only what you need for your Data Structures & Algorithms lab
            </p>
          </div>
          <div className="hidden w-40 flex-none items-center gap-2 sm:flex">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="w-9 flex-none text-right text-xs font-bold text-slate-600">{percent}%</span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-20 w-72 flex-none overflow-y-auto border-r border-slate-200 bg-white pt-16 transition-transform lg:static lg:z-auto lg:block lg:translate-x-0 lg:pt-6",
            mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          )}
        >
          <nav className="space-y-1 p-3">
            {NAV.map((item, i) => (
              <button
                key={item.id}
                onClick={() => goTo(item.id)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition",
                  active === item.id
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 flex-none items-center justify-center rounded-full text-[10px] font-bold",
                    active === item.id ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {i + 1}
                </span>
                <span>{item.emoji}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mx-3 mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:hidden">
            <div className="mb-1 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Progress</span>
              <span>{percent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-10 bg-slate-900/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="min-h-[calc(100vh-57px)] flex-1">
          <ActiveComp />

          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 pb-16 sm:px-6">
            <NavButton
              dir="prev"
              nav={NAV}
              active={active}
              onGo={goTo}
            />
            <NavButton
              dir="next"
              nav={NAV}
              active={active}
              onGo={goTo}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

function NavButton({
  dir,
  nav,
  active,
  onGo,
}: {
  dir: "prev" | "next";
  nav: readonly { id: string; label: string; emoji: string }[];
  active: string;
  onGo: (id: string) => void;
}) {
  const idx = nav.findIndex((n) => n.id === active);
  const targetIdx = dir === "prev" ? idx - 1 : idx + 1;
  const target = nav[targetIdx];
  if (!target) return <div />;
  return (
    <button
      onClick={() => onGo(target.id)}
      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:border-indigo-300 hover:text-indigo-600"
    >
      {dir === "prev" ? (
        <>
          <span>←</span> {target.emoji} {target.label}
        </>
      ) : (
        <>
          {target.emoji} {target.label} <span>→</span>
        </>
      )}
    </button>
  );
}
