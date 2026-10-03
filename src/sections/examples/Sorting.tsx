import ExampleCard from "../../components/ui/ExampleCard";

export default function Sorting() {
  return (
    <div className="space-y-3">
      <ExampleCard
        id="ex-bubble-sort"
        tone="amber"
        badge="Sorting"
        title="Bubble Sort"
        idea="Repeatedly compare ADJACENT elements and swap them if they're in the wrong order. Each full pass 'bubbles' the largest remaining element to the end."
        concepts={["nested loops", "if condition", "swap using temp"]}
        code={`void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>Outer loop <code>i</code> counts passes; after each pass, one more big element is in its final place.</li>
            <li>Inner loop <code>j</code> compares each pair of neighbors and swaps if out of order.</li>
            <li><code>n - i - 1</code> shrinks the inner loop's range each pass, since the end is already sorted.</li>
          </ul>
        }
        dryrun={
          <p>
            {"{5,1,4,2}"}: Pass1 → compare(5,1)swap→1 5 4 2; compare(5,4)swap→1 4 5 2; compare(5,2)swap→1 4 2 5.
            Pass2 → compare(1,4)no; compare(4,2)swap→1 2 4 5. Sorted after 2 passes: {"{1,2,4,5}"}.
          </p>
        }
        variables={<p><code>i</code> = pass number, <code>j</code> = comparison index, <code>temp</code> = holds value during swap.</p>}
        complexity={{ time: "O(n²) worst/avg, O(n) best (with early-exit flag)", space: "O(1)" }}
      />

      <ExampleCard
        id="ex-selection-sort"
        tone="amber"
        badge="Sorting"
        title="Selection Sort"
        idea="In every pass, FIND the smallest element in the unsorted part and swap it into its correct position at the front."
        concepts={["nested loops", "if condition", "swap using temp"]}
        code={`void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx])
                minIdx = j;              // track smallest element's index
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>minIdx</code> tracks the index of the smallest element found so far in the unsorted part.</li>
            <li>The inner loop scans from <code>i+1</code> to the end, updating <code>minIdx</code> whenever a smaller value is found.</li>
            <li>Only ONE swap happens per outer pass (unlike Bubble Sort, which may swap many times per pass).</li>
          </ul>
        }
        dryrun={
          <p>
            {"{5,1,4,2}"}: i=0, min is 1 at idx1 → swap(arr[0],arr[1]) → 1 5 4 2. i=1, min in {"{5,4,2}"} is 2 at
            idx3 → swap → 1 2 4 5. i=2, min in {"{4,5}"} is 4 (already placed) → 1 2 4 5. Sorted.
          </p>
        }
        variables={<p><code>minIdx</code> = index of smallest found so far. <code>i</code> = boundary of sorted portion.</p>}
        complexity={{ time: "O(n²) always", space: "O(1)" }}
      />

      <ExampleCard
        id="ex-insertion-sort"
        tone="amber"
        badge="Sorting"
        title="Insertion Sort"
        idea="Build the sorted portion one element at a time: take the next element and shift it backward into its correct position among already-sorted elements — like sorting playing cards in your hand."
        concepts={["loops", "while", "shifting elements"]}
        code={`void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];    // shift bigger element right
            j--;
        }
        arr[j + 1] = key;            // place key in its correct slot
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>key</code> is the element we're currently inserting into the sorted left portion.</li>
            <li>The while loop shifts every element bigger than <code>key</code> one step right, opening a gap.</li>
            <li>Once we stop (either j&lt;0 or arr[j]≤key), we drop <code>key</code> into the gap at <code>j+1</code>.</li>
          </ul>
        }
        dryrun={
          <p>
            {"{5,1,4,2}"}: i=1,key=1: shift 5 right → 5 5 4 2, place 1 → 1 5 4 2. i=2,key=4: shift 5 right → 1 5 5 2,
            place 4 → 1 4 5 2. i=3,key=2: shift 5,4 right → 1 4 5 5 (temp) → 1 2 4 5.
          </p>
        }
        variables={<p><code>key</code> = element being inserted, <code>j</code> = scanning pointer moving left through sorted part.</p>}
        complexity={{ time: "O(n²) worst, O(n) best (nearly sorted)", space: "O(1)" }}
      />

      <ExampleCard
        id="ex-merge-sort"
        tone="rose"
        badge="Sorting"
        title="Merge Sort (Divide & Conquer, Recursive)"
        idea="Split the array into two halves, recursively sort each half, then MERGE the two sorted halves back into one sorted array."
        concepts={["recursion", "arrays", "functions", "temporary arrays"]}
        code={`void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    int L[n1], R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2)
        arr[k++] = (L[i] <= R[j]) ? L[i++] : R[j++];
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {                      // base case: l >= r (0 or 1 element)
        int m = (l + r) / 2;
        mergeSort(arr, l, m);          // sort left half
        mergeSort(arr, m + 1, r);      // sort right half
        merge(arr, l, m, r);           // merge both sorted halves
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>mergeSort</code> keeps splitting the range [l, r] in half until each piece has 0 or 1 element (already sorted) — that's the base case <code>l &lt; r</code> becoming false.</li>
            <li><code>merge()</code> copies the two halves into temp arrays L and R, then combines them back into <code>arr</code> in sorted order by repeatedly picking the smaller front element.</li>
            <li>This is a classic divide-and-conquer recursive algorithm.</li>
          </ul>
        }
        dryrun={
          <p>
            {"{5,1,4,2}"} splits into {"{5,1}"} and {"{4,2}"}; each splits further into single elements (already
            sorted); merging back: {"{5,1}"}→{"{1,5}"}, {"{4,2}"}→{"{2,4}"}; finally merge {"{1,5}"} and {"{2,4}"} →{" "}
            {"{1,2,4,5}"}.
          </p>
        }
        variables={<p><code>l, m, r</code> = left, mid, right boundaries of the current sub-array. <code>L, R</code> = temporary arrays holding the two halves during merge.</p>}
        complexity={{ time: "O(n log n) always", space: "O(n) extra for temp arrays" }}
      />

      <ExampleCard
        id="ex-heap-sort"
        tone="rose"
        badge="Sorting"
        title="Heap Sort"
        idea="Build a Max-Heap from the array (so the largest element is always at the root/index 0), then repeatedly swap the root with the last unsorted element and 'heapify' the rest."
        concepts={["arrays as trees", "recursion", "functions", "swap"]}
        code={`void heapify(int arr[], int n, int i) {
    int largest = i, l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        int temp = arr[i]; arr[i] = arr[largest]; arr[largest] = temp;
        heapify(arr, n, largest);   // fix the affected sub-tree
    }
}

void heapSort(int arr[], int n) {
    for (int i = n / 2 - 1; i >= 0; i--)   // build max heap
        heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        int temp = arr[0]; arr[0] = arr[i]; arr[i] = temp; // move max to end
        heapify(arr, i, 0);                                  // re-heapify reduced heap
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>An array can represent a Binary Tree: for index <code>i</code>, left child is <code>2i+1</code>, right child is <code>2i+2</code>.</li>
            <li><code>heapify()</code> ensures the sub-tree rooted at <code>i</code> satisfies the max-heap property (parent ≥ children), swapping down if needed.</li>
            <li>Building the heap (first loop) starts from the last non-leaf node up to the root.</li>
            <li>The second loop repeatedly extracts the max (root) by swapping it to the end, shrinking the heap, and re-heapifying.</li>
          </ul>
        }
        dryrun={
          <p>
            {"{5,1,4,2}"} → build max-heap → {"{5,2,4,1}"} (5 at root). Swap root with last → {"{1,2,4,5}"}, heapify
            {" {1,2,4}"} → {"{4,2,1,5}"}. Swap → {"{1,2,4,5}"}, heapify {"{1,2}"} → {"{2,1,4,5}"}. Swap →{" "}
            {"{1,2,4,5}"} final sorted array.
          </p>
        }
        variables={<p><code>largest</code> = index of the biggest among node i and its children. <code>l, r</code> = left/right child indices.</p>}
        complexity={{ time: "O(n log n) always", space: "O(1) (sorts in-place)" }}
      />
    </div>
  );
}
