import SectionShell from "../components/ui/SectionShell";
import CodeBlock from "../components/ui/CodeBlock";

const blocks: { title: string; code: string }[] = [
  {
    title: "Program Skeleton & Keywords",
    code: `#include <stdio.h>
#include <stdlib.h>   // for malloc, free

int main() {
    // statements...
    return 0;
}

// Keywords you'll actually use: int float char void struct
// if else switch case break default for while do return
// sizeof NULL const`,
  },
  {
    title: "printf / scanf",
    code: `printf("%d %f %c\\n", intVal, floatVal, charVal);
scanf("%d", &intVal);     // always use & with scanf (except arrays/strings)
// %d int   %f float   %c char   %s string   %p pointer`,
  },
  {
    title: "Operators",
    code: `+ - * / %        // arithmetic (% = remainder)
== != < > <= >=   // relational
&& || !           // logical
= += -= *= /=     // assignment
++  --            // increment / decrement`,
  },
  {
    title: "Decisions & Loops",
    code: `if (cond) { } else if (cond2) { } else { }

switch (x) { case 1: ...; break; default: ...; }

for (int i = 0; i < n; i++) { }
while (cond) { }
do { } while (cond);
break;     // exit loop
continue;  // skip to next iteration`,
  },
  {
    title: "Functions",
    code: `returnType name(type p1, type p2) {
    return value;
}
name(arg1, arg2);                 // call

void modify(int *x) { *x = 10; }  // pass pointer to MODIFY caller's variable
modify(&a);`,
  },
  {
    title: "Arrays",
    code: `int a[5];
int a[5] = {1,2,3,4,5};
a[i]                              // access (0-indexed)

int b[2][3] = {{1,2,3},{4,5,6}};  // 2-D
b[i][j]

void f(int arr[], int n) { ... }  // array param needs size too`,
  },
  {
    title: "Pointers",
    code: `int x = 5;
int *p = &x;     // p holds address of x
*p                // dereference: value at that address
*p = 10;          // changes x itself

int arr[3];
int *q = arr;     // array name decays to pointer to arr[0]
*(q + i) == arr[i]

struct Node *n;
n->data           // same as (*n).data`,
  },
  {
    title: "Structures / Node Pattern",
    code: `struct Node {
    int data;
    struct Node *next;     // self-referencing via POINTER
};
struct Node n1;
n1.data = 5;                 // dot for direct variable
struct Node *p = &n1;
p->data;                     // arrow through pointer`,
  },
  {
    title: "malloc / free",
    code: `struct Node *p = (struct Node *) malloc(sizeof(struct Node));
if (p == NULL) { /* allocation failed */ }
p->data = 10;
p->next = NULL;
free(p);           // release memory when done
p = NULL;          // good practice`,
  },
  {
    title: "Recursion",
    code: `int fact(int n) {
    if (n == 0) return 1;        // base case
    return n * fact(n - 1);       // recursive case
}`,
  },
  {
    title: "Common DSA Patterns",
    code: `int top = -1;                         // empty stack
arr[++top] = val;                      // push
val = arr[top--];                      // pop

int front = -1, rear = -1;             // empty queue
int t = a; a = b; b = t;               // swap

struct Node *temp = head;              // traversal
while (temp != NULL) { ...; temp = temp->next; }

struct Node *nn = malloc(sizeof(struct Node)); // new node
nn->data = val; nn->next = NULL;

do {                                    // menu-driven skeleton
    scanf("%d", &choice);
    switch (choice) { case 1: ...; break; }
} while (choice != EXIT);`,
  },
];

export default function CheatSheet() {
  return (
    <SectionShell
      index={12}
      emoji="📋"
      title="C for DSA — Cheat Sheet"
      description="A compact, scrollable reference. Bookmark this page before your lab exam — every syntax pattern you need is here."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h3 className="mb-1 text-sm font-bold text-slate-800">{b.title}</h3>
            <CodeBlock code={b.code} label={b.title} />
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
