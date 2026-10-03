import { useState } from "react";

export default function Flashcard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      className="group h-32 w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-indigo-300 hover:shadow-md"
    >
      <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
        {flipped ? "Answer" : "Term"} · tap to flip
      </div>
      <div className="text-sm font-medium text-slate-800">{flipped ? back : front}</div>
    </button>
  );
}
