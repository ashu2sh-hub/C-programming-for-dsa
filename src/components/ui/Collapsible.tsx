import { useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export default function Collapsible({
  title,
  subtitle,
  defaultOpen = false,
  badge,
  tone = "indigo",
  rightSlot,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  tone?: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
  rightSlot?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const toneClasses: Record<string, string> = {
    indigo: "from-indigo-500 to-violet-500",
    emerald: "from-emerald-500 to-teal-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500",
    sky: "from-sky-500 to-cyan-500",
    violet: "from-violet-500 to-fuchsia-500",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:px-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "flex h-7 w-7 flex-none items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm",
              toneClasses[tone]
            )}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              className={cn("transition-transform duration-200", open && "rotate-90")}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="truncate text-sm font-semibold text-slate-800 sm:text-base">{title}</h4>
              {badge && (
                <span className="flex-none rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="mt-0.5 truncate text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>
        {rightSlot}
      </button>
      {open && <div className="border-t border-slate-100 px-4 pb-4 pt-3 sm:px-5">{children}</div>}
    </div>
  );
}
