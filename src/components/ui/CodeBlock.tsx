import { useState } from "react";

export default function CodeBlock({ code, label }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative my-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-3 py-1.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
          {label || "C"}
        </span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-200 transition hover:bg-slate-700 active:scale-95"
        >
          {copied ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <CopyIcon /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-3.5 text-[12.5px] leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
