import { useProgress } from "../../context/ProgressContext";
import { cn } from "../../utils/cn";

export default function MarkComplete({ id, label = "Mark as understood" }: { id: string; label?: string }) {
  const { isDone, toggle } = useProgress();
  const done = isDone(id);
  return (
    <button
      onClick={() => toggle(id)}
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition active:scale-95",
        done
          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
          : "border-slate-200 bg-white text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
      )}
    >
      <span
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full border text-[10px]",
          done ? "border-emerald-400 bg-emerald-400 text-white" : "border-slate-300"
        )}
      >
        {done ? "✓" : ""}
      </span>
      {done ? "Understood" : label}
    </button>
  );
}
