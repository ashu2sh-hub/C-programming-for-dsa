import SectionShell from "../components/ui/SectionShell";
import TopicCard from "../components/ui/TopicCard";
import Quiz from "../components/ui/Quiz";

export default function Arrays() {
  return (
    <SectionShell
      index={4}
      emoji="📦"
      title="Arrays"
      description="The simplest data structure — and the foundation for searching, sorting, stacks and queues built on arrays."
    >
      <TopicCard
        id="arr-1d"
        tone="emerald"
        title="1-D Arrays — Declaration, Indexing, Traversal"
        defaultOpen
        whatIsIt="An array is a collection of elements of the SAME type, stored in CONTIGUOUS (back-to-back) memory, accessed using an index."
        simple="Imagine a row of numbered mailboxes placed right next to each other. Each mailbox holds one value. The index is the mailbox number, starting from 0, not 1."
        syntax={`type name[size];                 // declaration
type name[size] = {v1, v2, ...}; // declaration + initialization
name[index]                      // access element (0-based index)`}
        example={{
          code: `int marks[5] = {90, 85, 76, 60, 99};

// Traversal: visit every element
for (int i = 0; i < 5; i++) {
    printf("%d ", marks[i]);
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>int marks[5]</code> reserves space for 5 ints, stored back-to-back in memory.</li>
              <li><code>marks[0]</code> is the FIRST element (90), <code>marks[4]</code> is the LAST (99). There is no <code>marks[5]</code>!</li>
              <li>The for-loop with <code>i</code> from 0 to size-1 is the standard "traversal" pattern — you'll use it everywhere.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Given int a[4] = {3,1,4,1}; what is a[2] and what is the index of the last element?",
          answer: "a[2] = 4. The last valid index is size - 1 = 3 (a[3] = 1).",
        }}
        dsa="1-D arrays directly implement: Linear/Binary Search data, Bubble/Selection/Insertion/Merge/Heap Sort data, Stack (array version), Queue (array version), and adjacency-matrix rows for graphs."
      />

      <TopicCard
        id="arr-2d"
        tone="emerald"
        title="2-D Arrays"
        whatIsIt="An array of arrays — data arranged in rows and columns, like a grid or table."
        simple="Think of a 2-D array as a spreadsheet: you need TWO indices to find a cell — the row number and the column number."
        syntax={`type name[rows][cols];
type name[rows][cols] = { {..}, {..} };
name[i][j]   // row i, column j`}
        example={{
          code: `int adj[3][3] = {
    {0, 1, 0},
    {1, 0, 1},
    {0, 1, 0}
};

for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++)
        printf("%d ", adj[i][j]);
    printf("\\n");
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>adj[3][3]</code> is a 3x3 grid — 3 rows, 3 columns.</li>
              <li><code>adj[i][j]</code> means "edge between node i and node j" — this is exactly an <strong>adjacency matrix</strong>.</li>
              <li>Nested loops (outer = row, inner = column) are the standard way to traverse 2-D arrays.</li>
            </ul>
          ),
        }}
        practice={{
          question: "How would you represent 'there is an edge between vertex 0 and vertex 2' using adj?",
          answer: "Set adj[0][2] = 1 and adj[2][0] = 1 (for an undirected graph).",
        }}
        dsa="2-D arrays are the standard way to store a graph as an Adjacency Matrix for BFS/DFS/Prim's/Kruskal's, and are also used for matrix-based problems."
      />

      <TopicCard
        id="arr-insert-delete"
        tone="emerald"
        title="Insertion & Deletion Basics in Arrays"
        whatIsIt="Since array memory is contiguous, inserting/deleting in the middle requires shifting elements to make room or close the gap."
        simple="Imagine people standing in a line. To insert a new person in the middle, everyone after that point must shift one step back. To remove someone, everyone after them shifts one step forward."
        syntax={`// insert 'val' at index 'pos' (shift right)
for (int i = n; i > pos; i--)
    arr[i] = arr[i - 1];
arr[pos] = val;
n++;

// delete element at index 'pos' (shift left)
for (int i = pos; i < n - 1; i++)
    arr[i] = arr[i + 1];
n--;`}
        example={{
          code: `int arr[10] = {10, 20, 30, 40}, n = 4;
int pos = 1, val = 99;

for (int i = n; i > pos; i--)
    arr[i] = arr[i - 1];   // shift right to make space
arr[pos] = val;
n++;
// arr is now: 10 99 20 30 40`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li>We start shifting from the END (<code>i = n</code>) moving backwards — this avoids overwriting values we still need.</li>
              <li>After shifting, the gap at <code>pos</code> is empty, so we place <code>val</code> there.</li>
              <li><code>n++</code> because the array now logically has one more element.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why must we shift from the back (high index) to the front when inserting?",
          answer: "If we shifted from the front first, we would overwrite values before copying them further — shifting from the back preserves data as we make room.",
        }}
        dsa="This exact shifting logic appears in: Insertion Sort (shifting bigger elements right), array-based list insert/delete lab questions, and understanding WHY linked lists (O(1) insert/delete) are often preferred over arrays."
      />

      <TopicCard
        id="arr-function-args"
        tone="emerald"
        title="Arrays as Function Arguments"
        whatIsIt="When you pass an array to a function, C actually passes its address (not a copy) — so the function can read AND modify the original array."
        simple="An array name basically means 'the address of its first element'. So passing an array to a function is like handing someone the map to your data, not a photocopy — changes they make affect the real thing."
        syntax={`void functionName(int arr[], int n) {
    // arr[i] accesses/modifies the ORIGINAL array
}
// calling it:
functionName(myArray, size);`}
        example={{
          code: `void doubleAll(int arr[], int n) {
    for (int i = 0; i < n; i++)
        arr[i] = arr[i] * 2;   // modifies the caller's array directly
}

int main() {
    int nums[3] = {1, 2, 3};
    doubleAll(nums, 3);
    // nums is now {2, 4, 6} -- changed even without a return!
}`,
          explain: (
            <ul className="list-inside list-disc space-y-1">
              <li><code>int arr[]</code> in the parameter list really means "a pointer to int" underneath.</li>
              <li>We must also pass <code>n</code> (the size) separately — arrays don't "remember" their own length in C.</li>
              <li>Because the original array is modified directly, we don't need to <code>return</code> the array.</li>
            </ul>
          ),
        }}
        practice={{
          question: "Why do almost all array-based DSA functions take 'int arr[], int n' as parameters?",
          answer: "Because C arrays decay to a pointer (no built-in size info), every function that works on an array must also receive its length explicitly.",
        }}
        dsa="Every array-based DSA function signature looks like this: bubbleSort(int arr[], int n), linearSearch(int arr[], int n, int key), push(int arr[], int *top, int val). You'll type this pattern constantly."
      />

      <Quiz
        title="🧪 Mini Quiz — Arrays"
        questions={[
          {
            q: "In int a[5], what is the index of the first element?",
            options: ["1", "0", "5", "-1"],
            correct: 1,
            explain: "C arrays are zero-indexed — the first element is a[0].",
          },
          {
            q: "Why must array-handling functions also receive the size 'n' as a parameter?",
            options: [
              "Because C requires alphabetical parameters",
              "Because arrays decay to pointers and don't carry size info",
              "Because printf needs it",
              "It's optional, never needed",
            ],
            correct: 1,
            explain: "An array parameter is really a pointer — the function has no way to know how many elements it points to unless told.",
          },
          {
            q: "A 2-D array adj[3][3] is most commonly used in DSA to represent:",
            options: ["A linked list", "An adjacency matrix for a graph", "A stack", "A recursive function"],
            correct: 1,
            explain: "adj[i][j] = 1 means there's an edge between vertex i and j — the classic adjacency matrix representation.",
          },
        ]}
      />
    </SectionShell>
  );
}
