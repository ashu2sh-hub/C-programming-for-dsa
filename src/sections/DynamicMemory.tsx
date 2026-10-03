import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function DynamicMemory() {
  return (
    <SectionShell
      index={8}
      emoji="🧠"
      title="Dynamic Memory Allocation"
      description="How to create new nodes 'on demand' while the program is running — the engine behind linked lists and trees."
    >
      <TopicCard
        id="dma-basics"
        tone="rose"
        title="malloc(), free(), NULL"
        defaultOpen
        whatIsIt="malloc() asks the operating system for a chunk of memory at runtime and returns a pointer to it. free() gives that memory back when you're done. NULL represents 'no valid address'."
        simple="Normal variables are fixed in number and size — decided before the program runs. But in a linked list, you don't know in advance how many nodes you'll need! malloc() lets you say 'give me space for ONE MORE node, right now', as many times as needed, while the program runs."
        syntax={`type *p = (type *) malloc(sizeof(type));  // allocate memory for one 'type'
free(p);                                    // release memory back
p = NULL;                                   // good practice after free

// calloc (like malloc, but zero-initializes memory)
type *p = (type *) calloc(n, sizeof(type)); // allocate n elements, all set to 0`}
        example={{
          code: `struct Node {
    int data;
    struct Node *next;
};

struct Node *p = (struct Node *) malloc(sizeof(struct Node));
if (p == NULL) {
    printf("Memory allocation failed\\n");
} else {
    p->data = 10;
    p->next = NULL;
    printf("%d\\n", p->data);   // 10
    free(p);                     // release memory
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>sizeof(struct Node)</code> tells malloc exactly how many bytes one Node needs.</li>
              <li><code>malloc(...)</code> returns a generic pointer, which we cast to <code>struct Node *</code>.</li>
              <li>ALWAYS check <code>if (p == NULL)</code> — malloc fails and returns NULL if memory is unavailable.</li>
              <li><code>free(p)</code> returns the memory to the system once we no longer need this node — prevents memory leaks.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why is 'malloc' needed instead of just declaring 'struct Node n1;' every time we need a new linked list node?",
          answer: "A normal variable like 'struct Node n1' is a fixed, named, local variable — you can't create an unknown number of them at runtime, and it may disappear once the function ends. malloc() creates memory on the 'heap' that persists until you explicitly free it and lets you create as many nodes as the program needs while running.",
        }}
        dsa="malloc() is used every single time you insert a new node into a linked list, create a new tree node, or create a new vertex/edge structure in graphs — it's the #1 reason DMA exists in your syllabus."
      />

      <Quiz
        title="🧪 Mini Quiz — Dynamic Memory"
        questions={[
          {
            q: "What does malloc(sizeof(struct Node)) do?",
            options: [
              "Deletes a node",
              "Reserves enough memory at runtime to hold one struct Node, and returns a pointer to it",
              "Creates a global struct Node variable",
              "Only works on arrays",
            ],
            correct: 1,
            explain: "malloc() dynamically reserves the requested number of bytes and returns a pointer to that memory block.",
          },
          {
            q: "Why should you always check 'if (p == NULL)' after malloc()?",
            options: [
              "To make the code longer",
              "malloc returns NULL if memory allocation fails, and using a NULL pointer crashes the program",
              "NULL checks are optional and never needed",
              "malloc never fails",
            ],
            correct: 1,
            explain: "Dereferencing a NULL pointer causes undefined behavior/crash, so checking for allocation failure is good practice.",
          },
          {
            q: "What does free(p) do?",
            options: ["Deletes the pointer variable p itself", "Releases the memory p points to, back to the system", "Sets p to 0", "Nothing in C"],
            correct: 1,
            explain: "free() returns the dynamically allocated memory to the system so it can be reused, preventing memory leaks.",
          },
        ]}
      />
    </SectionShell>
  );
}
