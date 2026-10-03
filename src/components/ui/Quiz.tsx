import { useState } from "react";
import { cn } from "../../utils/cn";

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export default function Quiz({ title, questions }: { title?: string; questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const select = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }));
  };

  const score = Object.keys(answers).filter((k) => answers[+k] === questions[+k].correct).length;
  const attempted = Object.keys(answers).length;

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-800">{title}</h3>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
            Score: {score}/{questions.length} ({attempted}/{questions.length} attempted)
          </span>
        </div>
      )}
      {questions.map((item, qIdx) => {
        const selected = answers[qIdx];
        const isAnswered = selected !== undefined;
        return (
          <div key={qIdx} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold text-slate-800">
              {qIdx + 1}. {item.q}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {item.options.map((opt, optIdx) => {
                const isCorrect = optIdx === item.correct;
                const isSelected = optIdx === selected;
                return (
                  <button
                    key={optIdx}
                    onClick={() => select(qIdx, optIdx)}
                    disabled={isAnswered}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-left text-sm transition",
                      !isAnswered && "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50",
                      isAnswered && isCorrect && "border-emerald-400 bg-emerald-50 text-emerald-800",
                      isAnswered && isSelected && !isCorrect && "border-rose-400 bg-rose-50 text-rose-800",
                      isAnswered && !isSelected && !isCorrect && "border-slate-200 text-slate-400"
                    )}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {isAnswered && (
              <p
                className={cn(
                  "mt-3 rounded-lg p-2.5 text-xs",
                  selected === item.correct
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-rose-50 text-rose-800"
                )}
              >
                {selected === item.correct ? "✅ Correct! " : "❌ Not quite. "}
                {item.explain}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
