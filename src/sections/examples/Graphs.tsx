import ExampleCard from "../../components/ui/ExampleCard";

export default function Graphs() {
  return (
    <div className="space-y-3">
      <ExampleCard
        id="ex-bfs"
        tone="sky"
        badge="Graph"
        title="BFS — Breadth First Search"
        idea="Explore a graph level by level: visit a node, then visit ALL its direct neighbors before going deeper. Uses a QUEUE to remember which nodes to visit next."
        concepts={["2-D arrays (adjacency matrix)", "queue using array", "loops", "visited[] array"]}
        code={`#define V 5
int adj[V][V];         // adjacency matrix (0/1)
int visited[V];

void bfs(int start) {
    int queue[V], front = 0, rear = 0;
    visited[start] = 1;
    queue[rear++] = start;

    while (front < rear) {
        int curr = queue[front++];       // dequeue
        printf("%d ", curr);
        for (int i = 0; i < V; i++) {
            if (adj[curr][i] == 1 && !visited[i]) {
                visited[i] = 1;             // mark BEFORE enqueue (avoid duplicates)
                queue[rear++] = i;
            }
        }
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>visited[]</code> prevents revisiting a node (and infinite loops in cyclic graphs).</li>
            <li>A simple array-based queue (<code>front</code>, <code>rear</code>) stores nodes waiting to be explored.</li>
            <li>We mark a neighbor visited the MOMENT we enqueue it (not when we dequeue it) to avoid adding it twice.</li>
            <li>The inner for-loop scans row <code>curr</code> of the adjacency matrix to find all neighbors.</li>
          </ul>
        }
        dryrun={
          <p>
            Graph: 0-1, 0-2, 1-3. bfs(0): visit 0, enqueue 1,2. Dequeue 1: visit 1, enqueue 3. Dequeue 2: visit 2, no
            new neighbors. Dequeue 3: visit 3. Order printed: 0 1 2 3.
          </p>
        }
        variables={<p><code>visited[]</code> = tracks explored nodes. <code>front/rear</code> = simple queue pointers. <code>curr</code> = node currently being expanded.</p>}
        complexity={{ time: "O(V²) with adjacency matrix", space: "O(V) for queue + visited" }}
      />

      <ExampleCard
        id="ex-dfs"
        tone="sky"
        badge="Graph"
        title="DFS — Depth First Search (Recursive)"
        idea="Explore a graph by going as DEEP as possible along one path before backtracking — a perfect match for recursion."
        concepts={["recursion", "2-D arrays (adjacency matrix)", "visited[] array"]}
        code={`#define V 5
int adj[V][V];
int visited[V];

void dfs(int curr) {
    visited[curr] = 1;
    printf("%d ", curr);
    for (int i = 0; i < V; i++) {
        if (adj[curr][i] == 1 && !visited[i])
            dfs(i);            // recurse into the unvisited neighbor
    }
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>Visit the current node immediately, mark it visited, then loop through its neighbors.</li>
            <li>For each UNVISITED neighbor, we recurse — diving deep before trying the next neighbor.</li>
            <li>No explicit base case line is needed; the for-loop naturally ends recursion when there are no more unvisited neighbors (this is a natural base case).</li>
          </ul>
        }
        dryrun={<p>Graph: 0-1, 0-2, 1-3. dfs(0): visit 0 → neighbor 1 unvisited → dfs(1): visit 1 → neighbor 3 unvisited → dfs(3): visit 3, no neighbors → back to 1 → back to 0 → neighbor 2 unvisited → dfs(2): visit 2. Order: 0 1 3 2.</p>}
        variables={<p><code>visited[]</code> = prevents revisiting / infinite recursion on cycles. <code>curr</code> = node being explored in the current recursive call.</p>}
        complexity={{ time: "O(V²) with adjacency matrix", space: "O(V) recursion stack + visited" }}
      />

      <ExampleCard
        id="ex-kruskal"
        tone="emerald"
        badge="MST"
        title="Kruskal's Algorithm (Minimum Spanning Tree)"
        idea="Sort ALL edges by weight (smallest first). Repeatedly add the cheapest edge that does NOT form a cycle, using a Union-Find (disjoint set) to detect cycles, until all vertices are connected."
        concepts={["structures (edge)", "sorting", "arrays (union-find)", "functions"]}
        code={`struct Edge { int src, dest, weight; };
int parent[V];

int find(int i) {
    while (parent[i] != i) i = parent[i];   // follow chain to the root
    return i;
}

void unionSet(int a, int b) {
    parent[find(a)] = find(b);               // merge two sets
}

void kruskalMST(struct Edge edges[], int E) {
    // 1. sort edges[] by weight ascending (e.g. using bubble/qsort)
    for (int i = 0; i < V; i++) parent[i] = i;   // each vertex is its own set

    int count = 0, totalWeight = 0;
    for (int i = 0; i < E && count < V - 1; i++) {
        int a = find(edges[i].src), b = find(edges[i].dest);
        if (a != b) {                        // adding this edge won't form a cycle
            unionSet(a, b);
            totalWeight += edges[i].weight;
            count++;
            printf("%d - %d : %d\\n", edges[i].src, edges[i].dest, edges[i].weight);
        }
    }
    printf("Total weight: %d\\n", totalWeight);
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>struct Edge</code> bundles a connection between two vertices with its weight — perfect use of structures.</li>
            <li><code>parent[]</code> implements Union-Find: each vertex starts as its own parent (own set).</li>
            <li><code>find(i)</code> follows parent links up to the root representative of i's set.</li>
            <li>An edge is safe to add only if its two endpoints are in DIFFERENT sets (<code>a != b</code>) — otherwise adding it would create a cycle.</li>
            <li>We stop once we've added <code>V-1</code> edges — that's exactly enough to connect V vertices with no cycle (a spanning tree).</li>
          </ul>
        }
        dryrun={
          <p>
            Edges sorted by weight: (0,1,1), (1,2,2), (0,2,3). Start: each vertex own set. Add (0,1): different sets
            → union. Add (1,2): different sets → union. Add (0,2): same set now (would cycle) → skip. MST = {"{(0,1),(1,2)}"}, total weight 3.
          </p>
        }
        variables={<p><code>parent[]</code> = union-find array tracking set membership. <code>count</code> = number of MST edges chosen so far.</p>}
        complexity={{ time: "O(E log E) for sorting + nearly O(E) for union-find", space: "O(V) for parent[]" }}
      />

      <ExampleCard
        id="ex-prim"
        tone="emerald"
        badge="MST"
        title="Prim's Algorithm (Minimum Spanning Tree)"
        idea="Start from any vertex and GROW the tree one edge at a time, always picking the cheapest edge that connects a vertex already in the tree to one outside it."
        concepts={["2-D arrays (adjacency matrix)", "arrays (key[], mstSet[])", "loops", "functions"]}
        code={`#define V 5
int graph[V][V];   // adjacency matrix, 0 means no edge

int minKey(int key[], int mstSet[]) {
    int min = 1e9, minIndex = -1;
    for (int v = 0; v < V; v++)
        if (!mstSet[v] && key[v] < min) { min = key[v]; minIndex = v; }
    return minIndex;
}

void primMST() {
    int parent[V], key[V], mstSet[V];
    for (int i = 0; i < V; i++) { key[i] = 1e9; mstSet[i] = 0; }
    key[0] = 0; parent[0] = -1;     // start from vertex 0

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet);   // pick cheapest vertex not yet in MST
        mstSet[u] = 1;
        for (int v = 0; v < V; v++)
            if (graph[u][v] && !mstSet[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
    }
    for (int i = 1; i < V; i++)
        printf("%d - %d : %d\\n", parent[i], i, graph[i][parent[i]]);
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>key[v]</code> = cheapest known edge weight connecting v to the growing tree; starts at "infinity" for all except the starting vertex.</li>
            <li><code>mstSet[v]</code> = 1 once v has been added to the MST.</li>
            <li><code>minKey()</code> scans for the cheapest vertex NOT yet included — similar idea to Selection Sort's "find the minimum" step.</li>
            <li>After adding vertex <code>u</code>, we relax its neighbors: if going through u is cheaper than the best known way to reach v, update <code>key[v]</code> and record <code>parent[v] = u</code>.</li>
          </ul>
        }
        dryrun={
          <p>
            Start key[0]=0, rest=∞. Pick u=0 (cheapest). Update neighbors' keys using graph[0][v]. Pick next cheapest
            unvisited vertex, repeat V-1 times. Finally print each vertex's recorded parent — these V-1 edges form
            the MST.
          </p>
        }
        variables={<p><code>key[]</code> = cheapest edge weight found so far to reach each vertex. <code>mstSet[]</code> = which vertices are already included. <code>parent[]</code> = records the MST edges.</p>}
        complexity={{ time: "O(V²) with adjacency matrix (simple version)", space: "O(V) for key, mstSet, parent arrays" }}
      />
    </div>
  );
}
