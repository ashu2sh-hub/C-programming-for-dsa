import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function Structures() {
  return (
    <SectionShell
      index={7}
      emoji="🧩"
      title="Structures"
      description="Structures group related data together — the exact tool used to build a 'node' for linked lists and trees."
    >
      <TopicCard
        id="struct-basics"
        tone="sky"
        title="struct, Declaring Variables, Accessing Members"
        defaultOpen
        whatIsIt="A struct is a user-defined type that bundles multiple variables (possibly of different types) under one name."
        simple="A plain variable can hold only one value. But real-world data has multiple fields — e.g. a student has a name, age, and marks. A struct lets you group all of that into one custom 'type'."
        syntax={`struct TagName {
    type member1;
    type member2;
};

struct TagName varName;      // declare a struct variable
varName.member1 = value;     // access member with dot (.)`}
        example={{
          code: `struct Student {
    int roll;
    float marks;
};

int main() {
    struct Student s1;
    s1.roll = 1;
    s1.marks = 95.5;
    printf("%d %f\\n", s1.roll, s1.marks);
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>{"struct Student { ... };"}</code> defines a new blueprint called Student (no memory used yet).</li>
              <li><code>struct Student s1;</code> creates an actual variable s1 following that blueprint.</li>
              <li><code>s1.roll</code> uses dot notation to access/set a member of a direct struct variable.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Define a struct 'Point' with int x and int y, then create a variable p1 with x=3, y=4.",
          answer: (
            <pre className="whitespace-pre-wrap font-mono text-xs">{`struct Point { int x; int y; };
struct Point p1;
p1.x = 3;
p1.y = 4;`}</pre>
          ),
        }}
        dsa="Structures are used to describe EVERY DSA node: a linked list node (data + next), a tree node (data + left + right), a graph edge (src, dest, weight) used in Kruskal's MST."
      />

      <TopicCard
        id="struct-pointers-nodes"
        tone="sky"
        title="Structures with Pointers — The 'Node' Pattern"
        whatIsIt="A struct that contains a pointer to another struct of the SAME type. This self-referencing struct is called a 'node', and it's the building block of linked lists and trees."
        simple="A node is like one train bogie: it carries some data/passengers, and it has a coupling (pointer) connecting it to the NEXT bogie. Chain enough nodes together and you get a linked list!"
        syntax={`// Linked list node
struct Node {
    int data;
    struct Node *next;   // pointer to the SAME struct type
};

// Tree node
struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
};`}
        example={{
          code: `struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node n1, n2;
    n1.data = 10;
    n2.data = 20;
    n1.next = &n2;     // n1 now "points to" n2 -> they're linked!
    n2.next = NULL;     // n2 is the last node

    printf("%d\\n", n1.data);       // 10
    printf("%d\\n", n1.next->data); // 20 (follow the link)
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>struct Node *next;</code> — the struct contains a pointer to its own type. This is allowed because a pointer's size is fixed, even before the struct is fully defined.</li>
              <li><code>n1.next = &n2;</code> physically links n1 to n2 by storing n2's address inside n1.</li>
              <li><code>NULL</code> means "points to nothing" — it marks the end of a chain.</li>
              <li><code>n1.next-&gt;data</code> follows the pointer then reads data — the core traversal pattern.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why can't a struct contain a variable of its OWN type directly (struct Node next;) but it CAN contain a pointer (struct Node *next;)?",
          answer: "A struct containing itself directly would need infinite memory (a node inside a node inside a node...). A pointer only needs a fixed few bytes to store an address, regardless of the target's size, so self-referencing via a pointer works.",
        }}
        dsa="This self-referential struct IS the linked list node and the tree node. Every list/tree/graph program in your lab starts by defining this struct."
      />

      <Quiz
        title="🧪 Mini Quiz — Structures"
        questions={[
          {
            q: "What is the correct way to access a member of a direct struct variable (not a pointer)?",
            options: ["var->member", "var.member", "var::member", "member(var)"],
            correct: 1,
            explain: "Use the dot (.) operator for direct struct variables; use -> only through pointers.",
          },
          {
            q: "Why does 'struct Node { struct Node *next; }' compile, but 'struct Node { struct Node next; }' does NOT?",
            options: [
              "Syntax error, both are invalid",
              "A pointer has a fixed small size; a nested struct-by-value would need infinite size",
              "C doesn't allow pointers inside structs",
              "next is a reserved keyword",
            ],
            correct: 1,
            explain: "Pointers store a fixed-size address, so self-reference via pointer is fine. Direct self-containment is impossible (infinite recursion in size).",
          },
        ]}
      />
    </SectionShell>
  );
}
