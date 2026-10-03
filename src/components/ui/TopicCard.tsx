import type { ReactNode } from "react";
import Collapsible from "./Collapsible";
import CodeBlock from "./CodeBlock";
import Reveal from "./Reveal";
import MarkComplete from "./MarkComplete";

export interface TopicCardProps {
  id: string;
  title: string;
  badge?: string;
  tone?: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
  defaultOpen?: boolean;
  whatIsIt: ReactNode;
  simple: ReactNode;
  syntax?: string;
  example?: { code: string; explain: ReactNode };
  practice?: { question: string; answer: ReactNode };
  dsa: ReactNode;
}

export default function TopicCard({
  id,
  title,
  badge,
  tone = "indigo",
  defaultOpen,
  whatIsIt,
  simple,
  syntax,
  example,
  practice,
  dsa,
}: TopicCardProps) {
  return (
    <Collapsible title={title} badge={badge} tone={tone} defaultOpen={defaultOpen}>
      <div className="space-y-4">
        <Block num="1" label="What is it?">
          {whatIsIt}
        </Block>
        <Block num="2" label="In simple English">
          {simple}
        </Block>
        {syntax && (
          <Block num="3" label="Syntax">
            <CodeBlock code={syntax} label="syntax" />
          </Block>
        )}
        {example && (
          <Block num="4 & 5" label="Example + line-by-line">
            <CodeBlock code={example.code} label="example.c" />
            <div className="mt-2 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">{example.explain}</div>
          </Block>
        )}
        {practice && (
          <Block num="6" label="Practice">
            <Reveal question={practice.question}>{practice.answer}</Reveal>
          </Block>
        )}
        <Block num="7" label="Used in DSA">
          <div className="rounded-lg border border-indigo-100 bg-indigo-50/70 p-3 text-sm text-indigo-900">
            🔗 {dsa}
          </div>
        </Block>
        <div className="flex justify-end pt-1">
          <MarkComplete id={id} />
        </div>
      </div>
    </Collapsible>
  );
}

function Block({ num, label, children }: { num: string; label: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-800 px-1 text-[10px] font-bold text-white">
          {num}
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</span>
      </div>
      <div className="text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}
