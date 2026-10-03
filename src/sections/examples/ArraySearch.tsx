import ExampleCard from "../../components/ui/ExampleCard";

export default function ArraySearch() {
  return (
    <div className="space-y-3">
      <ExampleCard
        id="ex-1d-array"
        tone="emerald"
        badge="Array"
        title="1-D Array Operations (Traverse / Insert / Delete)"
        idea="Store a fixed set of elements in order and support basic operations: display all, insert a new value at a position, delete a value from a position."
        concepts={["arrays", "loops", "functions", "shifting elements"]}
        code={`#include <stdio.h>

void display(int arr[], int n) {
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int insert(int arr[], int n, int pos, int val) {
    for (int i = n; i > pos; i--)
        arr[i] = arr[i - 1];
    arr[pos] = val;
    return n + 1;
}

int deleteAt(int arr[], int n, int pos) {
    for (int i = pos; i < n - 1; i++)
        arr[i] = arr[i + 1];
    return n - 1;
}

int main() {
    int arr[10] = {10, 20, 30, 40}, n = 4;
    display(arr, n);
    n = insert(arr, n, 2, 99);   // insert 99 at index 2
    display(arr, n);
    n = deleteAt(arr, n, 0);      // delete element at index 0
    display(arr, n);
    return 0;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>display()</code> traverses with a simple for-loop.</li>
            <li><code>insert()</code> shifts elements from the end backward to open a gap at <code>pos</code>, then places <code>val</code>, and returns the new size.</li>
            <li><code>deleteAt()</code> shifts elements from <code>pos</code> forward to close the gap, and returns the new size.</li>
            <li>We return the updated <code>n</code> because arrays can't resize themselves — the caller must track the new logical size.</li>
          </ul>
        }
        dryrun={
          <p>
            Start: <code>10 20 30 40</code> (n=4). <code>insert(arr,4,2,99)</code> → shift 40 into index 4, 30 into
            index 3, place 99 at index 2 → <code>10 20 99 30 40</code> (n=5). Then{" "}
            <code>deleteAt(arr,5,0)</code> shifts everything one step left →{" "}
            <code>20 99 30 40</code> (n=4).
          </p>
        }
        variables={
          <p>
            <code>n</code> = current logical size of the array (not its declared capacity).{" "}
            <code>pos</code> = index where we insert/delete. <code>i</code> = loop counter used for
            shifting.
          </p>
        }
        complexity={{ time: "O(n) insert/delete, O(1) access", space: "O(1) extra" }}
      />

      <ExampleCard
        id="ex-2d-array"
        tone="emerald"
        badge="Array"
        title="2-D Array Operations (Matrix Traverse / Sum)"
        idea="Store tabular data using rows and columns, and process every cell using nested loops — the same technique used for adjacency matrices."
        concepts={["2-D arrays", "nested loops", "functions"]}
        code={`#include <stdio.h>
#define R 2
#define C 3

void display(int m[R][C]) {
    for (int i = 0; i < R; i++) {
        for (int j = 0; j < C; j++)
            printf("%d ", m[i][j]);
        printf("\\n");
    }
}

int sumAll(int m[R][C]) {
    int sum = 0;
    for (int i = 0; i < R; i++)
        for (int j = 0; j < C; j++)
            sum += m[i][j];
    return sum;
}

int main() {
    int m[R][C] = {{1,2,3}, {4,5,6}};
    display(m);
    printf("Sum = %d\\n", sumAll(m));
    return 0;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>Outer loop <code>i</code> walks rows, inner loop <code>j</code> walks columns — the standard 2-D traversal.</li>
            <li><code>m[i][j]</code> accesses a single cell at row i, column j.</li>
            <li><code>#define R 2</code> / <code>#define C 3</code> are constants fixing the matrix dimensions at compile time.</li>
          </ul>
        }
        dryrun={<p>For m = [[1,2,3],[4,5,6]], sumAll visits 1,2,3,4,5,6 in order and accumulates sum = 21.</p>}
        variables={<p><code>i</code> = row index, <code>j</code> = column index, <code>sum</code> = running total.</p>}
        complexity={{ time: "O(R×C)", space: "O(1) extra" }}
      />

      <ExampleCard
        id="ex-linear-search"
        tone="sky"
        badge="Searching"
        title="Linear Search"
        idea="Check every element one by one from the start until the target (key) is found or the array ends."
        concepts={["arrays", "loops", "functions", "if condition"]}
        code={`#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key)
            return i;          // found at index i
    }
    return -1;                 // not found
}

int main() {
    int arr[] = {4, 2, 9, 7, 5};
    int n = 5, key = 7;
    int result = linearSearch(arr, n, key);
    if (result != -1)
        printf("Found at index %d\\n", result);
    else
        printf("Not found\\n");
    return 0;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>We scan every element with a for-loop; as soon as <code>arr[i] == key</code>, we return its index immediately.</li>
            <li>If the loop finishes without a match, we return <code>-1</code> to signal "not found".</li>
            <li>No assumption is made about the array being sorted — linear search works on ANY array.</li>
          </ul>
        }
        dryrun={<p>arr = {"{4,2,9,7,5}"}, key=7 → i=0:4≠7, i=1:2≠7, i=2:9≠7, i=3:7==7 → return 3.</p>}
        variables={<p><code>key</code> = value we're searching for. <code>i</code> = current index being checked.</p>}
        complexity={{ time: "O(n) worst-case", space: "O(1)" }}
      />

      <ExampleCard
        id="ex-binary-search"
        tone="sky"
        badge="Searching"
        title="Binary Search"
        idea="On a SORTED array, repeatedly check the middle element and eliminate half the remaining elements each time — much faster than checking one by one."
        concepts={["arrays", "loops", "functions", "arithmetic operators"]}
        code={`#include <stdio.h>

int binarySearch(int arr[], int n, int key) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == key)
            return mid;
        else if (arr[mid] < key)
            low = mid + 1;       // search right half
        else
            high = mid - 1;      // search left half
    }
    return -1;
}

int main() {
    int arr[] = {2, 4, 7, 9, 15, 20};
    int n = 6, key = 15;
    int result = binarySearch(arr, n, key);
    printf("%d\\n", result);   // index 4
    return 0;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>low</code> and <code>high</code> mark the current search boundary; it starts as the whole array.</li>
            <li><code>mid = (low+high)/2</code> picks the middle index of the current range.</li>
            <li>If <code>arr[mid] &lt; key</code>, the key must be to the right, so we move <code>low</code> up; otherwise we move <code>high</code> down.</li>
            <li>The loop stops when <code>low &gt; high</code> (range exhausted) or the key is found.</li>
            <li><strong>Requires the array to be sorted</strong> — this is the trade-off for its speed.</li>
          </ul>
        }
        dryrun={
          <p>
            arr = {"{2,4,7,9,15,20}"}, key=15: low=0,high=5,mid=2 (val 7) → 7&lt;15 so low=3. low=3,high=5,mid=4
            (val 15) → match! return 4.
          </p>
        }
        variables={<p><code>low/high</code> = current search boundaries. <code>mid</code> = index being tested each round.</p>}
        complexity={{ time: "O(log n)", space: "O(1) iterative" }}
      />
    </div>
  );
}
