import type { ReactNode } from "react";

export default function SectionShell({
  index,
  title,
  emoji,
  description,
  children,
}: {
  index: number;
  title: string;
  emoji: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
          Section {index}
        </span>
        <h2 className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          <span>{emoji}</span> {title}
        </h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">{description}</p>}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
