import ExampleCard from "../../components/ui/ExampleCard";

export default function StacksQueues() {
  return (
    <div className="space-y-3">
      <ExampleCard
        id="ex-stack-array"
        tone="indigo"
        badge="Stack"
        title="Stack using Array"
        idea="LIFO (Last In, First Out) structure: elements are added and removed from the same end, called 'top'."
        concepts={["arrays", "variables", "if condition", "functions"]}
        code={`#define SIZE 5
int stack[SIZE], top = -1;

int isFull()  { return top == SIZE - 1; }
int isEmpty() { return top == -1; }

void push(int val) {
    if (isFull()) { printf("Stack Overflow\\n"); return; }
    stack[++top] = val;
}

int pop() {
    if (isEmpty()) { printf("Stack Underflow\\n"); return -1; }
    return stack[top--];
}

int peek() {
    if (isEmpty()) return -1;
    return stack[top];
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>top = -1</code> means empty; <code>top == SIZE-1</code> means full.</li>
            <li><code>push</code> increments top THEN stores — always check <code>isFull()</code> first.</li>
            <li><code>pop</code> reads the value at top THEN decrements — always check <code>isEmpty()</code> first.</li>
            <li><code>peek</code> looks at the top value WITHOUT removing it.</li>
          </ul>
        }
        dryrun={<p>push(10): top=-1→0, stack=[10]. push(20): top=0→1, stack=[10,20]. pop(): returns 20, top=1→0.</p>}
        variables={<p><code>top</code> = index of the most recently pushed element (-1 if empty).</p>}
        complexity={{ time: "O(1) push/pop/peek", space: "O(n) for the array" }}
      />

      <ExampleCard
        id="ex-queue-array"
        tone="indigo"
        badge="Queue"
        title="Queue using Array (Linear)"
        idea="FIFO (First In, First Out) structure: elements are added at 'rear' and removed from 'front'."
        concepts={["arrays", "variables", "if condition", "functions"]}
        code={`#define SIZE 5
int queue[SIZE], front = -1, rear = -1;

void enqueue(int val) {
    if (rear == SIZE - 1) { printf("Queue Full\\n"); return; }
    if (front == -1) front = 0;
    queue[++rear] = val;
}

int dequeue() {
    if (front == -1 || front > rear) { printf("Queue Empty\\n"); return -1; }
    return queue[front++];
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>front == -1</code> means nothing has ever been enqueued; we set it to 0 on the first insert.</li>
            <li><code>rear</code> moves right every enqueue; <code>front</code> moves right every dequeue.</li>
            <li>Limitation: once <code>rear</code> reaches <code>SIZE-1</code> it's "full" even if front has advanced and left empty slots at the start — solved by the Circular Queue below.</li>
          </ul>
        }
        dryrun={<p>enqueue(1): front=0,rear=0. enqueue(2): rear=1. dequeue(): returns 1, front=1. Front slot 0 is now wasted space.</p>}
        variables={<p><code>front</code> = index to remove from next. <code>rear</code> = index of the last inserted element.</p>}
        complexity={{ time: "O(1) enqueue/dequeue", space: "O(n)" }}
      />

      <ExampleCard
        id="ex-circular-queue"
        tone="indigo"
        badge="Queue"
        title="Circular Queue using Array"
        idea="Same as a linear queue, but 'wraps around' to the beginning using modulus (%), reusing empty slots left behind by dequeues."
        concepts={["arrays", "modulus operator", "if condition", "functions"]}
        code={`#define SIZE 5
int cq[SIZE], front = -1, rear = -1;

int isFull()  { return (rear + 1) % SIZE == front; }
int isEmpty() { return front == -1; }

void enqueue(int val) {
    if (isFull()) { printf("Queue Full\\n"); return; }
    if (isEmpty()) front = 0;
    rear = (rear + 1) % SIZE;
    cq[rear] = val;
}

int dequeue() {
    if (isEmpty()) { printf("Queue Empty\\n"); return -1; }
    int val = cq[front];
    if (front == rear) front = rear = -1;    // queue became empty
    else front = (front + 1) % SIZE;
    return val;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>(rear + 1) % SIZE</code> wraps rear back to 0 once it passes the last index — the "circular" trick.</li>
            <li><code>isFull()</code> checks if advancing rear by one would collide with front — that's the full condition in a circular queue.</li>
            <li>When the last element is dequeued (<code>front == rear</code>), we reset both to -1 to mark empty again.</li>
          </ul>
        }
        dryrun={
          <p>
            SIZE=5. Enqueue 1,2,3,4,5 fills slots 0-4, rear=4. Dequeue twice → front=2. Enqueue 6 → rear = (4+1)%5 =
            0, so 6 is stored at index 0 — reusing the space freed by dequeues!
          </p>
        }
        variables={<p><code>front, rear</code> = circular indices; the % operator keeps them within [0, SIZE-1].</p>}
        complexity={{ time: "O(1) enqueue/dequeue", space: "O(n)" }}
      />

      <ExampleCard
        id="ex-stack-linked-list"
        tone="violet"
        badge="Stack"
        title="Stack using Linked List"
        idea="Instead of a fixed-size array, use nodes: push adds a new node at the HEAD (top), pop removes the head node — no size limit, no wasted memory."
        concepts={["structures", "pointers", "malloc", "functions"]}
        code={`struct Node { int data; struct Node *next; };
struct Node *top = NULL;

void push(int val) {
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = top;   // new node points to old top
    top = newNode;          // top now is the new node
}

int pop() {
    if (top == NULL) { printf("Stack Underflow\\n"); return -1; }
    struct Node *temp = top;
    int val = temp->data;
    top = top->next;         // move top to next node
    free(temp);
    return val;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>Here <code>top</code> is a POINTER to the topmost node (not an index).</li>
            <li><code>push</code>: create a node, link it to the current top, then make it the new top — O(1), no resizing needed ever.</li>
            <li><code>pop</code>: save the current top, move top to the next node, free the old node's memory.</li>
          </ul>
        }
        dryrun={<p>push(10): top→[10|NULL]. push(20): top→[20|•]→[10|NULL]. pop(): returns 20, top→[10|NULL].</p>}
        variables={<p><code>top</code> = pointer to the head node (acts as the stack's top). <code>temp</code> = helper pointer used during pop to free memory safely.</p>}
        complexity={{ time: "O(1) push/pop", space: "O(n) nodes, no wasted pre-allocated space" }}
      />

      <ExampleCard
        id="ex-queue-linked-list"
        tone="violet"
        badge="Queue"
        title="Queue using Linked List"
        idea="Keep two pointers, front and rear, pointing to the first and last nodes. Enqueue adds after rear; dequeue removes from front."
        concepts={["structures", "pointers", "malloc", "functions"]}
        code={`struct Node { int data; struct Node *next; };
struct Node *front = NULL, *rear = NULL;

void enqueue(int val) {
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (rear == NULL) { front = rear = newNode; return; }
    rear->next = newNode;   // link old rear to new node
    rear = newNode;          // update rear
}

int dequeue() {
    if (front == NULL) { printf("Queue Empty\\n"); return -1; }
    struct Node *temp = front;
    int val = temp->data;
    front = front->next;
    if (front == NULL) rear = NULL;   // queue became empty
    free(temp);
    return val;
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>If the queue is empty (<code>rear == NULL</code>), the new node becomes BOTH front and rear.</li>
            <li>Otherwise, we link the current rear's <code>next</code> to the new node, then move rear forward.</li>
            <li><code>dequeue</code> removes from front, and resets rear to NULL if the queue becomes empty.</li>
          </ul>
        }
        dryrun={<p>enqueue(1): front=rear→[1|NULL]. enqueue(2): rear.next→[2], rear→[2]. dequeue(): returns 1, front→[2].</p>}
        variables={<p><code>front</code> = pointer to first node (next to be removed). <code>rear</code> = pointer to last node (where new nodes attach).</p>}
        complexity={{ time: "O(1) enqueue/dequeue", space: "O(n) nodes" }}
      />
    </div>
  );
}
