import SectionShell from "../components/ui/SectionShell";

const steps = [
  { t: "C Fundamentals", d: "main(), variables, I/O, operators, if/else, loops", emoji: "🧱" },
  { t: "Arrays", d: "The base for searching, sorting, stacks, queues", emoji: "📦" },
  { t: "Functions", d: "Package DSA operations: push(), pop(), insert()...", emoji: "⚙️" },
  { t: "Pointers", d: "The key to linked structures: lists, trees, graphs", emoji: "🎯" },
  { t: "Structures", d: "Build a 'node': data + pointer(s) to next node", emoji: "🧩" },
  { t: "Dynamic Memory", d: "malloc() to create nodes on the fly, free() to release", emoji: "🧠" },
  { t: "Recursion", d: "Needed for tree traversal, DFS, merge/quick sort", emoji: "🔁" },
  { t: "DSA Patterns", d: "Menus, front/rear, top, linking nodes, swapping", emoji: "🧭" },
  { t: "DSA Programs", d: "Stacks, Queues, Lists, Sorting, Trees, BFS/DFS, MST", emoji: "🏗️" },
];

export default function Roadmap() {
  return (
    <SectionShell
      index={2}
      emoji="🗺️"
      title="Learning Roadmap"
      description="This is the exact order we'll follow. Each step unlocks the next — C fundamentals build up to full DSA programs."
    >
      <div className="relative">
        <div className="absolute bottom-4 left-5 top-4 hidden w-0.5 bg-gradient-to-b from-indigo-300 via-violet-300 to-emerald-300 sm:block" />
        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={s.t} className="relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:pl-4">
              <div className="z-10 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-base font-bold text-white shadow">
                {i + 1}
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm font-bold text-slate-800 sm:text-base">
                  <span>{s.emoji}</span> {s.t}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="text-sm font-bold text-emerald-800">💪 Study tip</h3>
        <p className="mt-1 text-sm text-emerald-900">
          Don't just read the code — re-type every example by hand on paper or in an editor. DSA is
          learned by tracing variables step-by-step, not by memorizing.
        </p>
      </div>
    </SectionShell>
  );
}
