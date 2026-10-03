import { useState, type ReactNode } from "react";

export default function Reveal({
  question,
  children,
  buttonLabel = "Show answer",
}: {
  question: ReactNode;
  children: ReactNode;
  buttonLabel?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/60 p-3.5">
      <p className="text-sm font-medium text-amber-900">🧩 {question}</p>
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="mt-2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 active:scale-95"
        >
          {buttonLabel}
        </button>
      ) : (
        <div className="mt-2 rounded-lg bg-white p-3 text-sm text-slate-700 ring-1 ring-amber-200">
          {children}
        </div>
      )}
    </div>
  );
}
