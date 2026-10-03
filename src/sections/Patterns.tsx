import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import CodeBlock from "../components/ui/CodeBlock";

export default function Patterns() {
  return (
    <SectionShell
      index={10}
      emoji="🧭"
      title="DSA Programming Patterns in C"
      description="These are the small recurring 'moves' that show up in almost every DSA lab program. Recognize them and the big programs stop looking scary."
    >
      <TopicCard
        id="pat-menu"
        tone="indigo"
        title="Menu-Driven Programs"
        defaultOpen
        whatIsIt="A program that shows a list of options in a loop and lets the user repeatedly pick operations using switch, until they choose 'Exit'."
        simple="Almost every DSA lab program needs to let the user test insert, delete, display, etc. without restarting the program. A do-while loop + switch is the standard combo for this."
        syntax={`int choice;
do {
    printf("1.Insert 2.Delete 3.Display 4.Exit\\n");
    scanf("%d", &choice);
    switch (choice) {
        case 1: /* insert */ break;
        case 2: /* delete */ break;
        case 3: /* display */ break;
        case 4: printf("Bye\\n"); break;
        default: printf("Invalid\\n");
    }
} while (choice != 4);`}
        example={{
          code: `int choice;
do {
    printf("\\n1.Push 2.Pop 3.Display 4.Exit\\nEnter choice: ");
    scanf("%d", &choice);
    switch (choice) {
        case 1: push(); break;
        case 2: pop(); break;
        case 3: display(); break;
        case 4: printf("Exiting\\n"); break;
        default: printf("Invalid choice\\n");
    }
} while (choice != 4);`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>do-while</code> ensures the menu is shown at least once, before any check happens.</li>
              <li><code>switch(choice)</code> routes to the correct operation based on user input.</li>
              <li>The loop repeats until the user enters 4 (Exit), which breaks the <code>while (choice != 4)</code> condition.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why is do-while preferred over while for a menu, instead of for a simple traversal loop?",
          answer: "We want to DISPLAY the menu and read a choice at least once before ever checking the exit condition — while would need the condition checked first, which is awkward since 'choice' doesn't have a value yet.",
        }}
        dsa="Virtually every lab program (Stack, Queue, Linked List, BST...) is wrapped in exactly this menu-driven pattern so you can test every operation interactively."
      />

      <TopicCard
        id="pat-topfrontrear"
        tone="emerald"
        title="Maintaining top (Stack) and front/rear (Queue)"
        whatIsIt="Index variables that track the 'active ends' of an array-based stack or queue, so you always know where to insert/remove next."
        simple="top tells you the index of the most recently pushed element in a stack (stack grows/shrinks from one end only). front and rear track the two ends of a queue, since elements are added at rear and removed from front."
        syntax={`int top = -1;              // empty stack
arr[++top] = val;          // push: increment top, then insert
val = arr[top--];          // pop: read top, then decrement

int front = -1, rear = -1; // empty queue
arr[++rear] = val;          // enqueue at rear
val = arr[front++];         // dequeue from front`}
        example={{
          code: `int stack[5], top = -1;

// push(10)
top = top + 1;      // top becomes 0
stack[top] = 10;

// push(20)
top = top + 1;      // top becomes 1
stack[top] = 20;

// pop()
int removed = stack[top];  // 20
top = top - 1;               // top becomes 0`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>top = -1</code> is the universal signal for "stack is empty".</li>
              <li>push always increments top FIRST, then stores — so top always points at the last valid element.</li>
              <li>pop reads the value at top FIRST, then decrements — removing it logically without erasing memory.</li>
              <li>Queue is similar, but uses two separate pointers since insertion and removal happen at opposite ends.</li>
            </ul>
          ),
        }}
        practice={{
          question: "How do you check if a stack with size 5 is FULL, using 'top'?",
          answer: "if (top == size - 1) → stack is full (e.g. top == 4 for size 5).",
        }}
        dsa="top is the single most important variable in every array-based Stack program. front/rear are the two most important variables in every array-based Queue program — you'll initialize, check, and update them in almost every function."
      />

      <TopicCard
        id="pat-nodes"
        tone="amber"
        title="Creating & Linking Nodes"
        whatIsIt="The repeated 3-step recipe for adding a node to a linked structure: (1) allocate memory with malloc, (2) fill in its data, (3) connect its pointer(s) to the rest of the structure."
        simple="Think of it as: build the train bogie, load its cargo, then couple it to the train."
        syntax={`struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
newNode->data = value;
newNode->next = NULL;       // or link it into the list`}
        example={{
          code: `struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
newNode->data = 10;
newNode->next = NULL;

if (head == NULL) {
    head = newNode;             // first node becomes head
} else {
    struct Node *temp = head;
    while (temp->next != NULL)
        temp = temp->next;       // walk to the last node
    temp->next = newNode;        // link last node to the new one
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>malloc(sizeof(struct Node))</code> — step 1: create the node in memory.</li>
              <li><code>newNode-&gt;data = 10;</code> — step 2: fill in the data.</li>
              <li>The if-else — step 3: either this is the very first node (becomes head), or we walk to the end and link it there.</li>
            </ul>
          ),
        }}
        practice={{
          question: "What are the 3 steps every 'insert a node' function performs, in order?",
          answer: "1) malloc a new node, 2) set its data field, 3) connect pointers (its own 'next', and/or the previous node's 'next') to link it into the structure.",
        }}
        dsa="This exact 3-step recipe is reused for inserting into Singly/Doubly/Circular Linked Lists, inserting into a BST, and adding a new vertex/edge in graph representations."
      />

      <TopicCard
        id="pat-traverse"
        tone="rose"
        title="Traversing Nodes with a Temp Pointer"
        whatIsIt="Using a separate 'walker' pointer (commonly named temp or curr) to move through a linked structure WITHOUT losing the original head pointer."
        simple="head is like the front door key to your house — you never want to lose it. So you make a photocopy (temp) and use that copy to walk through every room, leaving the original key untouched."
        syntax={`struct Node *temp = head;      // start walker at head
while (temp != NULL) {
    printf("%d ", temp->data);   // visit
    temp = temp->next;            // move forward
}`}
        example={{
          code: `struct Node *temp = head;
while (temp != NULL) {
    printf("%d -> ", temp->data);
    temp = temp->next;
}
printf("NULL\\n");`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>temp = head;</code> — we copy the address stored in head into temp; head itself never changes.</li>
              <li><code>while (temp != NULL)</code> — keep going until we fall off the end of the list.</li>
              <li><code>temp = temp-&gt;next;</code> — move the walker one node forward each iteration.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why do we use 'temp = head' instead of just moving 'head' itself while traversing?",
          answer: "If we moved head directly, we'd permanently lose the address of the first node once traversal finished — the whole list would become unreachable. Using a temp copy preserves head.",
        }}
        dsa="This 'temp = head; while(temp) {...; temp = temp->next;}' pattern is used for Display, Search, Count, and Sum operations on Singly/Doubly/Circular Linked Lists, and for tree-traversal helper loops."
      />

      <TopicCard
        id="pat-swap"
        tone="sky"
        title="Swapping Values & Temporary Variables"
        whatIsIt="Exchanging the values of two variables using a third 'temporary' variable as a holding spot."
        simple="To swap the contents of two cups without a third cup, you'd spill something. The temp variable is simply a third empty cup that holds one value safely while you move the other."
        syntax={`int temp = a;
a = b;
b = temp;`}
        example={{
          code: `int a = 5, b = 9, temp;
temp = a;   // temp = 5
a = b;      // a = 9
b = temp;   // b = 5
// now a = 9, b = 5`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>temp = a;</code> saves a's original value before it gets overwritten.</li>
              <li><code>a = b;</code> now safely overwrites a.</li>
              <li><code>b = temp;</code> restores a's original value into b, completing the swap.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why can't you just write 'a = b; b = a;' to swap two values?",
          answer: "After 'a = b;', a's original value is already lost (overwritten). So 'b = a;' just copies b's own value back into itself — no real swap happens. A temp variable is required to remember the original value of a.",
        }}
        dsa="Swapping is the core operation inside Bubble Sort, Selection Sort, and Quick Sort (swap two array elements when they're out of order), and useful for simple stack-based problems."
      />

      <TopicCard
        id="pat-pointer-manip"
        tone="indigo"
        title="Basic Pointer Manipulation Recap"
        whatIsIt="A quick reference of the pointer moves you'll repeat throughout DSA code."
        simple="A cheat list of the handful of pointer 'moves' that combine to build every list/tree operation."
        syntax={`p = NULL;            // p points to nothing
p = &x;               // p points to variable x
p = head;             // p points to wherever head points (copy address)
p = p->next;          // move p forward by one node
p->next = q;           // link p's node to q's node
if (p == NULL) ...     // check for end of list / empty structure`}
        example={{
          code: `// Delete the first node of a linked list
struct Node *toDelete = head;   // remember the current head
head = head->next;                // move head forward
free(toDelete);                    // release old node's memory`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li>We save the current head in <code>toDelete</code> before moving head, so we don't lose the pointer we need to free.</li>
              <li><code>head = head-&gt;next;</code> — head now points to what used to be the second node.</li>
              <li><code>free(toDelete);</code> — releases the memory of the old first node.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why do we save 'head' into 'toDelete' BEFORE changing head, when deleting the first node?",
          answer: "Once we move head forward, we'd lose the only reference to the original first node, making it impossible to free() its memory. Saving it first lets us clean it up safely afterward.",
        }}
        dsa="This save-then-move-then-free sequence is the standard pattern for deletion in Singly/Doubly/Circular Linked Lists."
      />

      <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <h3 className="mb-2 text-sm font-bold text-indigo-900">📋 Quick pattern reference</h3>
        <CodeBlock
          label="patterns.c"
          code={`int top = -1;                         // empty stack
int front = -1, rear = -1;             // empty queue

struct Node *newNode = malloc(sizeof(struct Node)); // new node
struct Node *temp = head;              // traversal walker

int t = a; a = b; b = t;               // swap

if (p == NULL) { /* empty / end reached */ }`}
        />
      </div>
    </SectionShell>
  );
}
