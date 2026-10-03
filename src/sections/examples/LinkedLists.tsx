import ExampleCard from "../../components/ui/ExampleCard";

export default function LinkedLists() {
  return (
    <div className="space-y-3">
      <ExampleCard
        id="ex-singly-linked-list"
        tone="rose"
        badge="Linked List"
        title="Singly Linked List (Insert at end, Display)"
        idea="A chain of nodes where each node points only FORWARD to the next node. The list is accessed starting from 'head'."
        concepts={["structures", "pointers", "malloc", "traversal with temp"]}
        code={`struct Node { int data; struct Node *next; };
struct Node *head = NULL;

void insertEnd(int val) {
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (head == NULL) { head = newNode; return; }
    struct Node *temp = head;
    while (temp->next != NULL)
        temp = temp->next;        // walk to the last node
    temp->next = newNode;          // link last node to new node
}

void display() {
    struct Node *temp = head;
    while (temp != NULL) {
        printf("%d -> ", temp->data);
        temp = temp->next;
    }
    printf("NULL\\n");
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>head</code> always points to the first node; it's NULL when the list is empty.</li>
            <li><code>insertEnd</code> walks to the last node using <code>temp</code> (so head isn't disturbed), then attaches the new node there.</li>
            <li><code>display</code> uses the standard traversal pattern: start at head, print, move to next, repeat until NULL.</li>
          </ul>
        }
        dryrun={<p>insertEnd(1): head→[1|NULL]. insertEnd(2): head→[1|•]→[2|NULL]. display prints "1 -&gt; 2 -&gt; NULL".</p>}
        variables={<p><code>head</code> = pointer to first node (never moved during traversal). <code>temp</code> = disposable walker pointer.</p>}
        complexity={{ time: "O(n) insert at end / display, O(1) insert at head", space: "O(n) nodes" }}
      />

      <ExampleCard
        id="ex-doubly-linked-list"
        tone="rose"
        badge="Linked List"
        title="Doubly Linked List"
        idea="Like a singly linked list, but each node also has a 'prev' pointer to the PREVIOUS node — allowing traversal in both directions."
        concepts={["structures (2 pointers)", "pointers", "malloc"]}
        code={`struct Node { int data; struct Node *prev, *next; };
struct Node *head = NULL;

void insertEnd(int val) {
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    newNode->data = val;
    newNode->next = NULL;
    if (head == NULL) { newNode->prev = NULL; head = newNode; return; }
    struct Node *temp = head;
    while (temp->next != NULL)
        temp = temp->next;
    temp->next = newNode;
    newNode->prev = temp;     // link backward too
}

void displayForward() {
    struct Node *temp = head;
    while (temp != NULL) { printf("%d <-> ", temp->data); temp = temp->next; }
    printf("NULL\\n");
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>Each node now stores TWO links: <code>prev</code> (backward) and <code>next</code> (forward).</li>
            <li>When inserting at the end, besides linking <code>temp-&gt;next = newNode</code>, we also set <code>newNode-&gt;prev = temp</code> so we can walk backward later.</li>
            <li>This lets you traverse backward from any node (e.g., from tail to head) without restarting from head.</li>
          </ul>
        }
        dryrun={<p>insertEnd(1), insertEnd(2): list is head↔[1]↔[2]↔NULL, where each node knows both its neighbors.</p>}
        variables={<p><code>prev</code> = pointer to previous node (NULL for head). <code>next</code> = pointer to next node (NULL for tail).</p>}
        complexity={{ time: "O(n) insert at end (O(1) if tail pointer kept), O(1) delete if node known", space: "O(n), extra pointer per node" }}
      />

      <ExampleCard
        id="ex-circular-linked-list"
        tone="rose"
        badge="Linked List"
        title="Circular Linked List"
        idea="Like a singly linked list, but the LAST node points back to the FIRST node instead of NULL — the chain forms a loop."
        concepts={["structures", "pointers", "malloc", "loop termination condition"]}
        code={`struct Node { int data; struct Node *next; };
struct Node *head = NULL;

void insertEnd(int val) {
    struct Node *newNode = (struct Node *) malloc(sizeof(struct Node));
    newNode->data = val;
    if (head == NULL) { newNode->next = newNode; head = newNode; return; }
    struct Node *temp = head;
    while (temp->next != head)
        temp = temp->next;        // walk until we reach the node pointing back to head
    temp->next = newNode;
    newNode->next = head;          // new node closes the loop
}

void display() {
    if (head == NULL) return;
    struct Node *temp = head;
    do {
        printf("%d -> ", temp->data);
        temp = temp->next;
    } while (temp != head);        // stop once we're back at head
    printf("(back to head)\\n");
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>The traversal/termination condition changes: instead of checking <code>!= NULL</code>, we check <code>!= head</code>, since there IS no NULL in this circle.</li>
            <li><code>do-while</code> is used for display because we must process the head node BEFORE checking "have we come back to head?".</li>
            <li>A single node list still points to itself: <code>newNode-&gt;next = newNode</code>.</li>
          </ul>
        }
        dryrun={<p>insertEnd(1): head→[1]→(itself). insertEnd(2): [1]→[2]→back to [1]. display: "1 -&gt; 2 -&gt; (back to head)".</p>}
        variables={<p><code>head</code> = entry point into the circle. Termination always compares against <code>head</code>, never NULL.</p>}
        complexity={{ time: "O(n) insert at end / display", space: "O(n) nodes" }}
      />
    </div>
  );
}
