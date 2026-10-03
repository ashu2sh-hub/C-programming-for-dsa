import SectionShell from "../components/ui/SectionShell";
import Quiz, { type QuizQuestion } from "../components/ui/Quiz";

const questions: QuizQuestion[] = [
  {
    q: "Which function marks the starting point of every C program's execution?",
    options: ["start()", "main()", "run()", "init()"],
    correct: 1,
    explain: "Execution always begins inside main(), regardless of how many other functions exist.",
  },
  {
    q: "What is the correct format specifier to print a float?",
    options: ["%d", "%c", "%f", "%s"],
    correct: 2,
    explain: "%f is used for float/double values; %d is for int, %c for char.",
  },
  {
    q: "Why does scanf(\"%d\", &n) need the '&' symbol?",
    options: [
      "It's optional styling",
      "To pass the memory address so scanf can store the typed value there",
      "To convert n to a float",
      "To declare n",
    ],
    correct: 1,
    explain: "scanf needs an address to know WHERE to write the input value.",
  },
  {
    q: "Which loop is guaranteed to execute its body at least once?",
    options: ["for", "while", "do-while", "none of these"],
    correct: 2,
    explain: "do-while checks its condition only AFTER running the body once.",
  },
  {
    q: "In an array int a[6], what is the valid range of indices?",
    options: ["1 to 6", "0 to 5", "0 to 6", "-1 to 5"],
    correct: 1,
    explain: "C arrays are zero-indexed, so valid indices run from 0 to size-1.",
  },
  {
    q: "Why must array-processing functions also receive the size as a parameter?",
    options: [
      "Arrays decay to pointers and carry no built-in length",
      "C requires it for syntax reasons only",
      "It's needed only for 2-D arrays",
      "It isn't actually necessary",
    ],
    correct: 0,
    explain: "An array parameter is really just a pointer to the first element — size information is lost, so it must be passed explicitly.",
  },
  {
    q: "What does pass-by-value mean for a function parameter?",
    options: [
      "The function receives the original variable and can change it",
      "The function receives a copy; changes don't affect the caller's variable",
      "The parameter is always a pointer",
      "The function cannot use the parameter",
    ],
    correct: 1,
    explain: "By default C copies values into function parameters — use pointers to actually modify the caller's data.",
  },
  {
    q: "What does the '*' symbol do when placed before a pointer variable (e.g. *p)?",
    options: [
      "Declares a new variable called p",
      "Multiplies p by something",
      "Dereferences p — accesses the value at the address p holds",
      "Deletes p",
    ],
    correct: 2,
    explain: "*p means 'go to the address stored in p and get/set the value there'.",
  },
  {
    q: "If struct Node *head; how do you access the data field of the node head points to?",
    options: ["head.data", "head->data", "*head[data]", "data(head)"],
    correct: 1,
    explain: "Use -> to access a struct member through a pointer.",
  },
  {
    q: "Why is a linked list node struct allowed to contain 'struct Node *next' but not 'struct Node next'?",
    options: [
      "C doesn't support structs inside structs at all",
      "A pointer has a small fixed size; containing the struct directly would require infinite memory",
      "next is a reserved keyword",
      "There is no actual difference",
    ],
    correct: 1,
    explain: "Self-containment-by-value is impossible to size; a pointer just stores a fixed-size address.",
  },
  {
    q: "What does malloc(sizeof(struct Node)) do?",
    options: [
      "Frees memory",
      "Reserves memory at runtime for one struct Node and returns a pointer to it",
      "Creates a global variable",
      "Declares a new struct type",
    ],
    correct: 1,
    explain: "malloc() dynamically allocates the requested number of bytes on the heap at runtime.",
  },
  {
    q: "What should you always check right after calling malloc()?",
    options: [
      "If the returned pointer is NULL (allocation failed)",
      "If the value is even",
      "Nothing, malloc never fails",
      "If sizeof() was spelled correctly",
    ],
    correct: 0,
    explain: "malloc returns NULL if it cannot allocate memory; dereferencing NULL would crash the program.",
  },
  {
    q: "Every recursive function MUST have a:",
    options: ["Loop", "Base case that stops the recursion", "Global variable", "Return type of void"],
    correct: 1,
    explain: "Without a base case, a recursive function calls itself forever, causing a stack overflow.",
  },
  {
    q: "Why is recursion a natural fit for tree traversal?",
    options: [
      "Trees can't be traversed any other way",
      "Each sub-tree is itself a smaller tree, matching the recursive 'smaller version of the problem' idea",
      "Recursion uses less memory than loops always",
      "It's unrelated to trees",
    ],
    correct: 1,
    explain: "A binary tree's left/right children are themselves roots of smaller trees — perfect for recursive 'divide into sub-problems' thinking.",
  },
  {
    q: "In an array-based Stack, what does 'top == -1' mean?",
    options: ["Stack is full", "Stack is empty", "An error occurred", "Stack has exactly 1 element"],
    correct: 1,
    explain: "-1 is the conventional sentinel value indicating no elements are present yet.",
  },
  {
    q: "What expression computes the next index in a Circular Queue, wrapping around correctly?",
    options: ["rear + 1", "(rear + 1) % size", "rear - 1", "rear * size"],
    correct: 1,
    explain: "The modulus operator wraps the index back to 0 once it passes size-1.",
  },
  {
    q: "In Binary Search, what must be true about the array beforehand?",
    options: ["It must contain only even numbers", "It must be sorted", "It must have an even size", "Nothing special"],
    correct: 1,
    explain: "Binary Search relies on comparing against a sorted midpoint to eliminate half the array each step; it fails on unsorted data.",
  },
  {
    q: "Which sorting algorithm repeatedly finds the MINIMUM of the unsorted part and places it at the front?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Heap Sort"],
    correct: 1,
    explain: "Selection Sort scans the unsorted part each pass to find the minimum, then swaps it into place.",
  },
  {
    q: "Merge Sort and Quick Sort are both examples of which technique?",
    options: ["Divide and Conquer (recursive)", "Brute force only", "Linear scanning", "Hashing"],
    correct: 0,
    explain: "Both split the problem into smaller sub-problems, solve recursively, then combine results.",
  },
  {
    q: "Inorder traversal of a valid Binary Search Tree visits nodes in which order?",
    options: ["Random order", "Sorted (ascending) order", "Descending order", "Level by level"],
    correct: 1,
    explain: "Inorder (Left, Root, Right) on a BST always produces values in ascending sorted order.",
  },
  {
    q: "BFS (Breadth First Search) typically uses which data structure to decide visit order?",
    options: ["Stack", "Queue", "Linked list only", "No data structure needed"],
    correct: 1,
    explain: "BFS explores level by level using a FIFO queue to track which nodes to visit next.",
  },
  {
    q: "DFS (Depth First Search) is most naturally implemented using:",
    options: ["Recursion (or an explicit stack)", "A queue only", "Sorting", "Binary search"],
    correct: 0,
    explain: "DFS dives as deep as possible before backtracking — a perfect match for recursion's call stack (or a manual stack).",
  },
  {
    q: "In Kruskal's MST algorithm, what is Union-Find (parent[] array) used for?",
    options: [
      "Sorting the edges",
      "Detecting whether adding an edge would form a cycle",
      "Calculating total weight only",
      "Storing vertex coordinates",
    ],
    correct: 1,
    explain: "Union-Find quickly checks if two vertices are already connected; if so, adding that edge would create a cycle, so it's skipped.",
  },
  {
    q: "In Prim's MST algorithm, the key[] array stores:",
    options: [
      "The final MST edge list",
      "The cheapest known edge weight connecting each vertex to the growing tree",
      "The adjacency matrix",
      "Visited status only",
    ],
    correct: 1,
    explain: "key[v] holds the minimum weight edge found so far that could connect vertex v to the tree being built.",
  },
];

export default function QuizFinal() {
  return (
    <SectionShell
      index={13}
      emoji="🏁"
      title="Final Quick MCQ Quiz"
      description="A mixed quiz covering every C concept taught in this guide. Answer each question to instantly see if you're right, plus a short explanation."
    >
      <Quiz title="Final Assessment" questions={questions} />
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center">
        <p className="text-sm font-semibold text-emerald-800">
          🎉 Once you're comfortable with this quiz, you have exactly the C foundation needed to tackle
          your DSA lab syllabus — arrays, linked lists, stacks, queues, sorting, searching, trees, BST,
          BFS, DFS and MST. Good luck!
        </p>
      </div>
    </SectionShell>
  );
}
