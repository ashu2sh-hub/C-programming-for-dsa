import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function Pointers() {
  return (
    <SectionShell
      index={6}
      emoji="🎯"
      title="Pointers"
      description="The single most important C concept for DSA. Pointers are what make linked lists, trees and graphs possible."
    >
      <TopicCard
        id="ptr-basics"
        tone="rose"
        title="What is a Pointer? Address (&) and Dereference (*)"
        defaultOpen
        whatIsIt="A pointer is a variable that stores a memory ADDRESS instead of a normal value — usually the address of another variable."
        simple="Every variable lives at some address in memory (like a house address). '&' means 'give me the address of'. A pointer variable stores that address. '*' (dereference) means 'go to that address and get/set the value there'."
        syntax={`type *pointerName;        // declare a pointer to 'type'
pointerName = &variable;  // store address of variable
*pointerName               // dereference: the value AT that address`}
        example={{
          code: `int x = 10;
int *p;        // p is a pointer to an int
p = &x;        // p now stores the address of x

printf("%d\\n", x);    // 10 (the value)
printf("%p\\n", p);    // e.g. 0x7ffee... (the address)
printf("%d\\n", *p);   // 10 (value AT the address p points to)

*p = 20;        // changes x itself, because *p IS x's memory
printf("%d\\n", x);    // 20`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>int *p;</code> — declares p as "pointer to int".</li>
              <li><code>p = &x;</code> — p now holds x's address, p "points to" x.</li>
              <li><code>*p</code> — dereferencing: follow the address stored in p and read/write the value there.</li>
              <li><code>*p = 20;</code> changes x's actual value, since *p and x refer to the same memory.</li>
            </ul>
          ),
        }}
        practice={{
          question: "If int y = 5, int *q = &y; then what does *q + 1 evaluate to?",
          answer: "6. *q dereferences q to get y's value (5), then +1 gives 6. (y itself is unchanged since we didn't assign back into *q.)",
        }}
        dsa="Pointers ARE how a linked list node 'points to' the next node, how a tree node points to its children, and how functions modify the caller's real data (e.g. updating a stack's top, or a linked list's head)."
      />

      <TopicCard
        id="ptr-functions-arrays"
        tone="rose"
        title="Pointers with Functions and Arrays"
        whatIsIt="Pointers let functions modify the caller's variables (seen in Functions section). Arrays and pointers are closely linked: an array name decays into a pointer to its first element."
        simple="Writing arr[i] is really just shorthand for *(arr + i) — 'go i steps past the start address and read the value'. That's why arrays and pointers feel interchangeable in C."
        syntax={`int arr[5];
int *p = arr;     // same as p = &arr[0]
p[i]               // same as arr[i]
*(p + i)           // same as arr[i]`}
        example={{
          code: `int arr[3] = {10, 20, 30};
int *p = arr;             // p points to arr[0]

for (int i = 0; i < 3; i++) {
    printf("%d ", *(p + i));   // same output as arr[i]
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>int *p = arr;</code> — no <code>&</code> needed; an array name already IS an address.</li>
              <li><code>*(p + i)</code> moves the pointer i positions forward (in units of int size) then dereferences.</li>
              <li>This is exactly why function parameters <code>int arr[]</code> and <code>int *arr</code> are interchangeable in C.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Given int *p = arr (arr = {5,6,7}), what does *(p+2) give?",
          answer: "7 — it's the same as arr[2].",
        }}
        dsa="Understanding arr == &arr[0] clarifies why passing arrays to functions is effectively passing a pointer, which is the backbone of array-based stack/queue/search/sort functions."
      />

      <TopicCard
        id="ptr-struct"
        tone="rose"
        title="Pointer-to-Structure"
        whatIsIt="A pointer that stores the address of a struct variable. Used constantly for linked list/tree nodes, since nodes link to each other via pointers to structs."
        simple="If a struct is a form with multiple fields (data, next), a pointer-to-structure is an arrow pointing at one specific filled-out form sitting in memory. The arrow symbol '->' is used to access fields through that arrow."
        syntax={`struct Node *p;     // pointer to a struct Node
p->data             // access member 'data' through pointer (shortcut for (*p).data)
p->next             // access member 'next' through pointer`}
        example={{
          code: `struct Node {
    int data;
    struct Node *next;
};

struct Node n1;
n1.data = 10;

struct Node *p = &n1;   // p points to n1
printf("%d\\n", p->data); // 10, same as (*p).data`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>struct Node *p = &n1;</code> — p now points to the struct variable n1.</li>
              <li><code>p-&gt;data</code> is shorthand for <code>(*p).data</code> — "go to what p points to, then get its data field".</li>
              <li>The arrow <code>-&gt;</code> is used ONLY with pointers to structs; use <code>.</code> for direct struct variables.</li>
            </ul>
          ),
        }}
        practice={{
          question: "If struct Node *head points to the first node, how do you access the data of the SECOND node?",
          answer: "head->next->data — follow 'next' once to reach the second node, then read its data.",
        }}
        dsa="This is THE pattern for traversing linked lists and trees: temp = temp->next (linked list), root->left / root->right (binary tree). You'll type head->data and curr->next constantly."
      />

      <Quiz
        title="🧪 Mini Quiz — Pointers"
        questions={[
          {
            q: "What does the '&' operator do?",
            options: [
              "Dereferences a pointer",
              "Gives the memory address of a variable",
              "Declares a new pointer",
              "Performs logical AND only",
            ],
            correct: 1,
            explain: "& (address-of) returns the memory address where a variable is stored.",
          },
          {
            q: "If struct Node *p; and p points to a node, how do you access its 'data' field?",
            options: ["p.data", "p->data", "*p[data]", "data->p"],
            correct: 1,
            explain: "Use -> when accessing struct members through a pointer.",
          },
          {
            q: "For int arr[5] and int *p = arr, what is *(p+2) equivalent to?",
            options: ["arr[2]", "arr[0]+2", "&arr[2]", "p+2"],
            correct: 0,
            explain: "Pointer arithmetic *(p+i) is exactly equivalent to arr[i].",
          },
        ]}
      />
    </SectionShell>
  );
}
