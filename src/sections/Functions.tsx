import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function Functions() {
  return (
    <SectionShell
      index={5}
      emoji="⚙️"
      title="Functions"
      description="Functions let you package a DSA operation (push, pop, search, sort...) into a reusable, named block of code."
    >
      <TopicCard
        id="fn-basics"
        tone="amber"
        title="Declaration, Definition, Parameters, Return, Calling"
        defaultOpen
        whatIsIt="A function is a named block of code that performs a task. You declare its signature, define its body, optionally take parameters (inputs), optionally return a value (output), and call it by name to run it."
        simple="A function is like a mini-recipe with a name. 'Parameters' are the ingredients you hand it. 'Return value' is the dish it hands back. 'Calling' the function means asking it to actually cook."
        syntax={`returnType functionName(type param1, type param2) {
    // body
    return value;   // skip if returnType is void
}

// Declaration (prototype) - tells compiler the function exists
returnType functionName(type, type);

// Calling
functionName(arg1, arg2);`}
        example={{
          code: `#include <stdio.h>

int add(int a, int b);      // declaration (prototype)

int main() {
    int result = add(3, 4);  // calling
    printf("%d\\n", result);  // 7
    return 0;
}

int add(int a, int b) {     // definition
    return a + b;
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>int add(int a, int b);</code> is the prototype — lets main() know add() exists before it's fully written below.</li>
              <li><code>a</code> and <code>b</code> are parameters — local copies of whatever values are passed in.</li>
              <li><code>return a + b;</code> sends the sum back to wherever the function was called.</li>
              <li><code>add(3, 4)</code> is the function call — 3 and 4 are the arguments.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Write a function 'isEven' that takes an int and returns 1 if even, 0 if odd.",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`int isEven(int n) {
    return (n % 2 == 0);
}`}</pre>
          ),
        }}
        dsa="Every DSA operation becomes a function: push(), pop(), enqueue(), dequeue(), insert(), delete(), search(), sort(), traverse(), bfs(), dfs() — breaking a big program into small, testable pieces."
      />

      <TopicCard
        id="fn-pass-by-value-pointer"
        tone="amber"
        title="Pass-by-Value vs Using Pointers to Modify Data"
        whatIsIt="By default, C copies the VALUE of an argument into the function (pass-by-value) — so changes inside the function do NOT affect the original variable. To actually modify the caller's variable, you must pass its ADDRESS (a pointer)."
        simple="Pass-by-value is like giving someone a photocopy of your notes — they can scribble on it all they want, your original stays clean. Passing a pointer is like giving them the actual original notebook — now their edits are real changes."
        syntax={`void f(int x) { x = 100; }        // pass-by-value: no effect outside
void f(int *x) { *x = 100; }      // pass-by-pointer: changes original
f(&variable);                      // must pass the address`}
        example={{
          code: `void wontChange(int x) {
    x = 99;              // only changes the local copy
}
void willChange(int *x) {
    *x = 99;             // changes the ORIGINAL variable
}

int main() {
    int a = 5;
    wontChange(a);        // a is still 5
    willChange(&a);        // a becomes 99
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>wontChange(int x)</code> receives a copy — modifying x has zero effect on main's a.</li>
              <li><code>willChange(int *x)</code> receives the ADDRESS of a. <code>*x = 99</code> goes to that address and changes the real value.</li>
              <li>Calling <code>willChange(&a)</code> — we pass <code>&a</code> (address of a), not <code>a</code> itself.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Write a 'swap' function using pointers that swaps two integers.",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
// call: swap(&x, &y);`}</pre>
          ),
        }}
        dsa="This is CRITICAL for DSA: push(int arr[], int *top, int val) must modify the real 'top' variable. Functions that insert into a linked list often need to change the head pointer itself, which requires passing a pointer to the pointer."
      />

      <Quiz
        title="🧪 Mini Quiz — Functions"
        questions={[
          {
            q: "In C, function arguments are passed by value by default. This means:",
            options: [
              "The original variable is always changed",
              "A copy of the value is given to the function",
              "Only arrays can be passed",
              "The function can't use the value at all",
            ],
            correct: 1,
            explain: "Pass-by-value copies the value; changes inside the function don't reach the caller's variable.",
          },
          {
            q: "To let a function modify a variable declared in main(), you should:",
            options: [
              "Pass the variable normally",
              "Pass the address of the variable (a pointer)",
              "Make the variable global only",
              "It's impossible in C",
            ],
            correct: 1,
            explain: "Passing &variable lets the function dereference the pointer and modify the real memory location.",
          },
        ]}
      />
    </SectionShell>
  );
}
