import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function Recursion() {
  return (
    <SectionShell
      index={9}
      emoji="🔁"
      title="Recursion"
      description="A function that calls itself. Essential for tree traversal, DFS, and divide-and-conquer sorting algorithms."
    >
      <TopicCard
        id="recursion-basics"
        tone="rose"
        title="Base Case, Recursive Case, Tracing"
        defaultOpen
        whatIsIt="Recursion is when a function calls itself to solve a smaller version of the same problem. Every recursive function needs a base case (a simple condition where it stops) and a recursive case (where it calls itself with a smaller input)."
        simple="Imagine Russian nesting dolls: to open the whole set, you open one doll, find a smaller one inside, open that too... until you reach the smallest doll that doesn't open any further (the base case). Without a base case, you'd open dolls forever — this is an infinite recursion / stack overflow."
        syntax={`returnType functionName(parameters) {
    if (base_condition) {
        return base_value;        // BASE CASE - stops recursion
    }
    return someWork(functionName(smaller_parameters)); // RECURSIVE CASE
}`}
        example={{
          code: `int factorial(int n) {
    if (n == 0)             // base case
        return 1;
    return n * factorial(n - 1);  // recursive case
}
// factorial(4) -> 4 * factorial(3)
//              -> 4 * (3 * factorial(2))
//              -> 4 * (3 * (2 * factorial(1)))
//              -> 4 * (3 * (2 * (1 * factorial(0))))
//              -> 4 * 3 * 2 * 1 * 1 = 24`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>if (n == 0) return 1;</code> — the base case. Without it, the function would call itself forever.</li>
              <li><code>n * factorial(n - 1)</code> — the recursive case: solve a SMALLER problem (n-1) and combine it with current work.</li>
              <li>Each call waits (is "paused") for the inner call to finish before it can compute its own result — these paused calls stack up in memory (the "call stack").</li>
            </ul>
          ),
        }}
        practice={{
          question: "Trace: what does sum(3) return, given int sum(int n) { if (n==0) return 0; return n + sum(n-1); }",
          answer: "sum(3) = 3 + sum(2) = 3 + (2 + sum(1)) = 3 + (2 + (1 + sum(0))) = 3 + 2 + 1 + 0 = 6.",
        }}
        dsa="Recursion is the natural way to: traverse a tree (visit left subtree, visit right subtree), perform DFS on a graph (visit a node, recurse into unvisited neighbors), and implement Merge Sort / Quick Sort (split, recurse, combine). Many DSA problems are far simpler with recursion than loops."
      />

      <Quiz
        title="🧪 Mini Quiz — Recursion"
        questions={[
          {
            q: "What happens if a recursive function has NO base case?",
            options: [
              "It runs faster",
              "It calls itself forever, eventually crashing (stack overflow)",
              "It automatically stops after 10 calls",
              "Nothing, it's fine",
            ],
            correct: 1,
            explain: "Without a terminating base case, recursive calls never stop, exhausting the call stack and crashing the program.",
          },
          {
            q: "In tree traversal, why is recursion a natural fit?",
            options: [
              "Trees cannot be traversed with loops at all",
              "A tree is defined in terms of smaller trees (subtrees), matching recursion's 'smaller version of the problem' idea",
              "Recursion is always faster than loops",
              "It's unrelated to trees",
            ],
            correct: 1,
            explain: "Each subtree is itself a tree, so processing 'visit root, recurse left subtree, recurse right subtree' maps perfectly onto recursion.",
          },
        ]}
      />
    </SectionShell>
  );
}
