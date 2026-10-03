import type { ReactNode } from "react";
import Collapsible from "./Collapsible";
import CodeBlock from "./CodeBlock";
import MarkComplete from "./MarkComplete";

export interface ExampleCardProps {
  id: string;
  title: string;
  badge?: string;
  tone?: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
  idea: ReactNode;
  concepts: string[];
  code: string;
  explain: ReactNode;
  dryrun: ReactNode;
  variables: ReactNode;
  complexity: { time: string; space: string };
}

export default function ExampleCard({
  id,
  title,
  badge,
  tone = "sky",
  idea,
  concepts,
  code,
  explain,
  dryrun,
  variables,
  complexity,
}: ExampleCardProps) {
  return (
    <Collapsible title={title} badge={badge} tone={tone}>
      <div className="space-y-4">
        <Block label="💡 Idea">{idea}</Block>
        <Block label="🧠 C concepts used">
          <div className="flex flex-wrap gap-1.5">
            {concepts.map((c) => (
              <span
                key={c}
                className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {c}
              </span>
            ))}
          </div>
        </Block>
        <Block label="👨‍💻 Code">
          <CodeBlock code={code} label={`${title}.c`} />
        </Block>
        <Block label="📖 Explanation">{explain}</Block>
        <Block label="🔍 Dry run example">{dryrun}</Block>
        <Block label="📌 Important variables">{variables}</Block>
        <Block label="⏱ Complexity">
          <div className="flex gap-2">
            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              Time: {complexity.time}
            </span>
            <span className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
              Space: {complexity.space}
            </span>
          </div>
        </Block>
        <div className="flex justify-end pt-1">
          <MarkComplete id={id} label="Mark this program as practiced" />
        </div>
      </div>
    </Collapsible>
  );
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}
