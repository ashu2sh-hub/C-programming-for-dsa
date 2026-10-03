import { useState } from "react";
import SectionShell from "../components/ui/SectionShell";
import { cn } from "../utils/cn";
import ArraySearch from "./examples/ArraySearch";
import Sorting from "./examples/Sorting";
import StacksQueues from "./examples/StacksQueues";
import LinkedLists from "./examples/LinkedLists";
import Trees from "./examples/Trees";
import Graphs from "./examples/Graphs";

const tabs = [
  { id: "array", label: "📦 Arrays & Searching", Comp: ArraySearch },
  { id: "sort", label: "🔃 Sorting", Comp: Sorting },
  { id: "sq", label: "📥 Stacks & Queues", Comp: StacksQueues },
  { id: "ll", label: "🔗 Linked Lists", Comp: LinkedLists },
  { id: "tree", label: "🌳 Trees & BST", Comp: Trees },
  { id: "graph", label: "🕸️ Graphs & MST", Comp: Graphs },
];

export default function Examples() {
  const [active, setActive] = useState(tabs[0].id);
  const ActiveComp = tabs.find((t) => t.id === active)!.Comp;

  return (
    <SectionShell
      index={11}
      emoji="🏗️"
      title="DSA Program Examples"
      description="24 lab-ready C programs, each explained with the idea, concepts used, full code, a dry run, key variables, and complexity. Pick a category below."
    >
      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-xl px-3 py-2 text-xs font-semibold transition sm:text-sm",
              active === t.id
                ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ActiveComp />
    </SectionShell>
  );
}
