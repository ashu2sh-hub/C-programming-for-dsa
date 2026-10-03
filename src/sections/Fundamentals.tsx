import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function Fundamentals() {
  return (
    <SectionShell
      index={3}
      emoji="🧱"
      title="C Fundamentals"
      description="The absolute basics: how a C program is shaped, how to store data, talk to the user, and control the flow of execution."
    >
      <TopicCard
        id="f-structure"
        tone="indigo"
        title="1. Basic C Program Structure"
        defaultOpen
        whatIsIt={
          <>
            Every C program needs a starting point. That starting point is a special function called{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">main()</code>. The program also
            needs to "borrow" ready-made tools using{" "}
            <code className="rounded bg-slate-100 px-1 py-0.5 font-mono">#include</code>.
          </>
        }
        simple="Think of a C program like a recipe: #include brings in your kitchen tools, main() is where cooking (execution) actually starts, each statement is one cooking step ending with a semicolon, and comments are sticky notes for humans that the computer ignores."
        syntax={`#include <stdio.h>      // bring in input/output tools

int main() {
    // statement(s) go here
    return 0;            // tells OS the program ended fine
}`}
        example={{
          code: `#include <stdio.h>   // needed for printf

int main() {
    printf("Hello DSA!\\n");  // print text, \\n = new line
    return 0;                 // end program
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>#include &lt;stdio.h&gt;</code> — loads the Standard Input/Output library so we can use printf/scanf.</li>
              <li><code>int main()</code> — execution always begins here; <code>int</code> means it returns a whole number to the OS.</li>
              <li><code>printf(...)</code> — a statement; every statement ends with <code>;</code></li>
              <li><code>return 0;</code> — 0 means "program finished successfully".</li>
              <li>Text after <code>//</code> is a comment — ignored by the compiler, written for humans.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Write the smallest valid C program that prints \"DSA\" on one line.",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`#include <stdio.h>
int main() {
    printf("DSA\\n");
    return 0;
}`}</pre>
          ),
        }}
        dsa="Every single DSA program you write (stack, queue, linked list, sorting...) sits inside this exact same skeleton — main() is where you'll call functions like push(), insert(), bubbleSort(), etc."
      />

      <TopicCard
        id="f-variables"
        tone="indigo"
        title="2. Variables & Data Types"
        whatIsIt="A variable is a named box in memory that stores a value. A data type tells C what kind of value the box can hold (a whole number, a decimal, a character...)."
        simple="You can't put a value anywhere without first saying what 'kind' of box you need. int → whole numbers, float → decimal numbers, char → a single character."
        syntax={`type name;              // declaration
type name = value;      // declaration + initialization
const type NAME = value; // a constant (cannot change)`}
        example={{
          code: `int size = 5;        // whole number: size of array
float price = 10.5;  // decimal number
char grade = 'A';    // single character (note: single quotes)
const int MAX = 100; // constant, cannot be changed later`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>int size = 5;</code> declares an int variable named size and stores 5 in it.</li>
              <li><code>float price = 10.5;</code> stores a decimal value.</li>
              <li><code>char grade = 'A';</code> stores exactly one character — single quotes are required.</li>
              <li><code>const int MAX = 100;</code> — once set, MAX can never be reassigned.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Declare a constant called ARR_SIZE with value 10, and an int variable 'count' initialized to 0.",
          answer: <code className="font-mono text-xs">const int ARR_SIZE = 10;{"\n"}int count = 0;</code>,
        }}
        dsa={
          <>
            Almost every DSA program declares variables like <code>int arr[SIZE]</code>,{" "}
            <code>int top = -1</code> (stack), <code>int front, rear</code> (queue),{" "}
            <code>int n</code> (number of elements) — all built from <code>int</code>/<code>float</code>/<code>char</code>.
          </>
        }
      />

      <TopicCard
        id="f-io"
        tone="indigo"
        title="3. Input / Output — printf() & scanf()"
        whatIsIt={
          <>
            <code>printf()</code> displays output on the screen. <code>scanf()</code> reads input typed
            by the user into variables.
          </>
        }
        simple="printf = 'print formatted text'. scanf = 'scan formatted input'. Format specifiers like %d, %f, %c tell C what type of value to print/read. scanf needs & (address-of) so it knows WHERE in memory to store the typed value."
        syntax={`printf("text %d text", variable);     // output
scanf("%d", &variable);                // input (note the &)`}
        example={{
          code: `#include <stdio.h>
int main() {
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);              // & gives address of n
    printf("You entered: %d\\n", n);
    return 0;
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>%d</code> = int, <code>%f</code> = float, <code>%c</code> = char specifiers.</li>
              <li><code>scanf("%d", &n)</code> — without <code>&</code>, scanf wouldn't know the memory address to write into, so the input would be lost.</li>
              <li><code>printf("%d", n)</code> — here we pass the value <code>n</code> directly (no & needed for printing).</li>
            </ul>
          ),
        }}
        practice={{
          question: "Write code to read a float called 'price' from the user and print it back with 2 lines of context.",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`float price;
scanf("%f", &price);
printf("Price = %f\\n", price);`}</pre>
          ),
        }}
        dsa="You use scanf() constantly in DSA lab programs to read array size, array elements, the value to search/insert/delete, and menu choices in menu-driven programs."
      />

      <TopicCard
        id="f-operators"
        tone="indigo"
        title="4. Operators"
        whatIsIt="Symbols that perform actions on variables/values: arithmetic (math), relational (comparison), logical (combine conditions), assignment (store), increment/decrement (step by 1)."
        simple="Think of operators as verbs in a sentence — they DO something with your variables: add them, compare them, or step them forward."
        syntax={`+ - * / %        // arithmetic
== != > < >= <=   // relational (comparison) -> gives 1(true)/0(false)
&& || !           // logical AND / OR / NOT
=  += -= *= /=    // assignment
++ --             // increment / decrement`}
        example={{
          code: `int a = 7, b = 2;
int sum = a + b;      // 9
int rem = a % b;      // 1 (remainder - very common in DSA!)
int isEqual = (a == b); // 0 (false)
int both = (a > 5 && b < 5); // 1 (true)
a++;                   // a becomes 8
a += 3;                // a becomes 11`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>%</code> gives the remainder — used to detect even/odd, circular queue wrap-around, hashing.</li>
              <li><code>==</code> compares equality; <code>=</code> assigns. Mixing them up is the #1 beginner bug.</li>
              <li><code>&&</code>/<code>||</code> combine conditions, e.g. checking array bounds: <code>i &gt;= 0 && i &lt; n</code>.</li>
              <li><code>i++</code> is shorthand for <code>i = i + 1</code> — the engine of every loop.</li>
            </ul>
          ),
        }}
        practice={{
          question: "What does (rear + 1) % size compute, and where have you seen % before?",
          answer: "It computes the next index and 'wraps it around' back to 0 once it crosses size-1. This exact expression is used to move the rear pointer in a Circular Queue.",
        }}
        dsa={
          <>
            <code>(rear+1) % size</code> → circular queue wrap-around. <code>mid = (low+high)/2</code> →
            binary search. <code>arr[i] &gt; arr[j]</code> → sorting comparisons.{" "}
            <code>i &lt; n</code> → loop/array-bound conditions everywhere.
          </>
        }
      />

      <TopicCard
        id="f-decisions"
        tone="indigo"
        title="5. Decision Making — if / else / switch"
        whatIsIt="Statements that let the program choose between different paths of execution based on a condition."
        simple="if = 'if this is true, do this'. else = 'otherwise do that'. else-if chains multiple conditions. switch picks one case out of many fixed values — perfect for menus."
        syntax={`if (condition) {
    // runs if true
} else if (condition2) {
    // runs if condition false, condition2 true
} else {
    // runs if all above are false
}

switch (choice) {
    case 1: /* code */ break;
    case 2: /* code */ break;
    default: /* code */
}`}
        example={{
          code: `int choice = 2;
switch (choice) {
    case 1:
        printf("Insert\\n");
        break;
    case 2:
        printf("Delete\\n");
        break;
    default:
        printf("Invalid choice\\n");
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>switch(choice)</code> jumps straight to the matching <code>case</code>.</li>
              <li><code>break;</code> stops it from "falling through" into the next case — easy to forget!</li>
              <li><code>default:</code> runs when no case matches — great for catching invalid menu input.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Write an if-else that prints 'Stack Overflow' if top == size-1, else 'Pushed'.",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`if (top == size - 1)
    printf("Stack Overflow");
else
    printf("Pushed");`}</pre>
          ),
        }}
        dsa="if-checks guard EVERY DSA operation: 'is stack full/empty before push/pop?', 'is queue full/empty?', 'did we find the key?'. switch builds the menu-driven programs your lab expects (1. Insert 2. Delete 3. Display 4. Exit)."
      />

      <TopicCard
        id="f-loops"
        tone="indigo"
        title="6. Loops — for / while / do-while"
        whatIsIt="Loops repeat a block of code multiple times instead of writing it again and again."
        simple="for = use when you know how many times to repeat (e.g. traverse an array of n items). while = repeat while a condition stays true, checked before each run. do-while = like while, but runs the body at least once before checking."
        syntax={`for (init; condition; update) { /* body */ }

while (condition) { /* body */ }

do { /* body */ } while (condition);

break;     // exit the loop immediately
continue;  // skip to next iteration`}
        example={{
          code: `int arr[5] = {10, 20, 30, 40, 50};
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);   // traverse the array
}
printf("\\n");

int n = 5;
while (n > 0) {
    printf("%d ", n);
    n--;                      // n-- avoids infinite loop
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>for (int i = 0; i &lt; 5; i++)</code> — init i=0 once, keep going while i&lt;5, do i++ after each round.</li>
              <li><code>arr[i]</code> accesses the element at index i — this IS array traversal.</li>
              <li><code>while(n &gt; 0)</code> checks condition first — if false immediately, the body never runs.</li>
              <li>Forgetting to update the loop variable (like n--) causes an <strong>infinite loop</strong>.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Write a for loop that prints numbers 1 to n, skipping multiples of 3 (use continue).",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`for (int i = 1; i <= n; i++) {
    if (i % 3 == 0) continue;
    printf("%d ", i);
}`}</pre>
          ),
        }}
        dsa="Loops are the heartbeat of DSA: traversing arrays/linked lists, the comparison passes in Bubble/Selection/Insertion sort, scanning in Linear Search, the halving steps in Binary Search, and visiting every adjacent node in BFS/DFS."
      />

      <Quiz
        title="🧪 Mini Quiz — C Fundamentals"
        questions={[
          {
            q: "What does scanf(\"%d\", &n) use '&' for?",
            options: [
              "To make n a float",
              "To get the memory address of n so scanf can store the value there",
              "It's a typo, & is optional",
              "To multiply n by itself",
            ],
            correct: 1,
            explain: "scanf needs the address of the variable (not its value) so it knows where to write the input.",
          },
          {
            q: "Which loop guarantees the body runs at least once?",
            options: ["for", "while", "do-while", "switch"],
            correct: 2,
            explain: "do-while checks the condition AFTER running the body once.",
          },
          {
            q: "What does (rear + 1) % size typically implement?",
            options: ["Binary search midpoint", "Circular wrap-around of an index", "Swapping two values", "A comment"],
            correct: 1,
            explain: "The modulus operator wraps the index back to 0 after reaching size-1 — used in circular queues.",
          },
        ]}
      />
    </SectionShell>
  );
}
