import type { ReactNode } from "react";
import SectionShell from "../components/ui/SectionShell";

export default function Intro() {
  return (
    <SectionShell
      index={1}
      emoji="🚀"
      title="C for DSA — Introduction"
      description="A focused, no-fluff crash course: only the C you need to understand and write your Data Structures & Algorithms lab programs."
    >
      <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 p-5 sm:p-6">
        <p className="text-base font-semibold text-indigo-900 sm:text-lg">
          ✅ After completing this guide, you should be able to understand and write the C programs
          required for your DSA syllabus.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card emoji="🎯" title="What this guide IS">
          A tight path through exactly the C features that show up in arrays, linked lists, stacks,
          queues, searching, sorting, trees, BST, BFS/DFS and MST programs.
        </Card>
        <Card emoji="🚫" title="What this guide is NOT">
          Not a full C textbook. No file handling, advanced strings, bit tricks, unions, function
          pointers, or deep preprocessor topics — none of that is needed for DSA lab work.
        </Card>
        <Card emoji="⏱️" title="Time required">
          Designed to be read & practiced in <strong>1–2 hours</strong>. Go section by section, try the
          practice questions, and don't skip the "used in DSA" callouts.
        </Card>
        <Card emoji="🧭" title="How to use it">
          Use the sidebar to jump between sections. Click cards to expand them. Mark topics
          "Understood" to track your progress — it's saved in your browser.
        </Card>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-500">
          Why learn C before DSA?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700">
          Data Structures & Algorithms are usually taught using C because C gives you{" "}
          <strong>direct control over memory</strong> — through pointers and{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">malloc()</code>. This
          control is exactly what you need to build linked lists, trees, and graphs by hand, node by
          node. Every C concept in this guide exists because some DSA structure or algorithm needs it:
        </p>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <li>📦 Arrays → Searching, Sorting, Stack/Queue (array based)</li>
          <li>🔗 Pointers → Linked Lists, Trees, Graphs</li>
          <li>🧩 Structures → Nodes (list node, tree node)</li>
          <li>🧠 malloc()/free() → Creating nodes dynamically</li>
          <li>🔁 Recursion → Tree traversal, Merge/Quick sort, DFS</li>
          <li>⚙️ Functions → Every DSA operation (push, pop, insert...)</li>
        </ul>
      </div>
    </SectionShell>
  );
}

function Card({ emoji, title, children }: { emoji: string; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-1 flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      </div>
      <p className="text-sm text-slate-600">{children}</p>
    </div>
  );
}
