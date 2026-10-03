import ExampleCard from "../../components/ui/ExampleCard";

export default function Trees() {
  return (
    <div className="space-y-3">
      <ExampleCard
        id="ex-binary-tree"
        tone="violet"
        badge="Tree"
        title="Binary Tree — Node Structure & Manual Build"
        idea="A tree node holds data plus two pointers: 'left' child and 'right' child. A binary tree is built by linking nodes through these pointers."
        concepts={["structures (2 self-pointers)", "pointers", "malloc"]}
        code={`struct TreeNode {
    int data;
    struct TreeNode *left, *right;
};

struct TreeNode* createNode(int val) {
    struct TreeNode *node = (struct TreeNode *) malloc(sizeof(struct TreeNode));
    node->data = val;
    node->left = node->right = NULL;
    return node;
}

int main() {
    struct TreeNode *root = createNode(10);
    root->left  = createNode(5);
    root->right = createNode(20);
    root->left->left = createNode(2);
    // tree:        10
    //            /    \\
    //           5      20
    //          /
    //         2
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>createNode()</code> follows the same create-node recipe seen earlier: malloc, fill data, set child pointers to NULL.</li>
            <li><code>root</code> is the single entry point to the whole tree — similar role to <code>head</code> in a linked list.</li>
            <li><code>root-&gt;left-&gt;left</code> shows how you walk DOWN the tree by chaining <code>-&gt;</code>.</li>
          </ul>
        }
        dryrun={<p>After the code runs, root(10) has left child 5 and right child 20; node 5 has left child 2. Both leaves (2 and 20) have left=right=NULL.</p>}
        variables={<p><code>root</code> = pointer to the top-most node. <code>left/right</code> = pointers to child sub-trees (NULL means "no child").</p>}
        complexity={{ time: "O(1) per node creation", space: "O(n) for n nodes" }}
      />

      <ExampleCard
        id="ex-tree-traversal"
        tone="violet"
        badge="Tree"
        title="Tree Traversals — Inorder, Preorder, Postorder (Recursive)"
        idea="Three standard orders to visit every node of a binary tree, all using recursion since each sub-tree is itself a smaller tree."
        concepts={["recursion", "pointers", "if base case"]}
        code={`void inorder(struct TreeNode *root) {      // Left, Root, Right
    if (root == NULL) return;                // base case
    inorder(root->left);
    printf("%d ", root->data);
    inorder(root->right);
}

void preorder(struct TreeNode *root) {      // Root, Left, Right
    if (root == NULL) return;
    printf("%d ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void postorder(struct TreeNode *root) {     // Left, Right, Root
    if (root == NULL) return;
    postorder(root->left);
    postorder(root->right);
    printf("%d ", root->data);
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li>Base case: <code>if (root == NULL) return;</code> — stops recursion at an empty sub-tree (below a leaf).</li>
            <li>The only difference between the 3 traversals is WHEN we print <code>root-&gt;data</code> relative to the two recursive calls.</li>
            <li>Inorder on a Binary SEARCH Tree gives elements in sorted order — very useful to remember!</li>
          </ul>
        }
        dryrun={
          <p>
            For the tree 10(5(2,_), 20): Inorder → 2, 5, 10, 20. Preorder → 10, 5, 2, 20. Postorder → 2, 5, 20, 10.
          </p>
        }
        variables={<p><code>root</code> parameter = the current sub-tree's top node for that recursive call (changes at every level).</p>}
        complexity={{ time: "O(n) visits every node once", space: "O(h) recursion stack, h = tree height" }}
      />

      <ExampleCard
        id="ex-bst"
        tone="violet"
        badge="Tree"
        title="Binary Search Tree (BST) — Insert & Search"
        idea="A binary tree with an ordering rule: for every node, all values in the LEFT sub-tree are smaller, all values in the RIGHT sub-tree are bigger. This rule makes search very fast."
        concepts={["recursion", "pointers", "structures", "if-else"]}
        code={`struct TreeNode* insert(struct TreeNode *root, int val) {
    if (root == NULL)
        return createNode(val);        // base case: found the empty spot
    if (val < root->data)
        root->left = insert(root->left, val);
    else if (val > root->data)
        root->right = insert(root->right, val);
    return root;                        // return unchanged root up the chain
}

struct TreeNode* search(struct TreeNode *root, int key) {
    if (root == NULL || root->data == key)
        return root;                    // not found (NULL) or found (match)
    if (key < root->data)
        return search(root->left, key);
    return search(root->right, key);
}`}
        explain={
          <ul className="list-inside list-disc space-y-1">
            <li><code>insert</code> recursively decides to go left or right by comparing <code>val</code> with the current node, until it finds a NULL spot to place the new node.</li>
            <li>Each recursive call returns the (possibly updated) sub-tree root, so parents correctly re-link: <code>root-&gt;left = insert(root-&gt;left, val)</code>.</li>
            <li><code>search</code> follows the same left/right comparison but stops as soon as it finds a match or hits NULL.</li>
          </ul>
        }
        dryrun={
          <p>
            Insert order 10, 5, 20, 2 into an empty BST: 10 becomes root. 5&lt;10 → goes left of 10. 20&gt;10 → goes
            right of 10. 2&lt;10 → left of 10 → 2&lt;5 → left of 5. search(root, 2): 2&lt;10 go left, 2&lt;5 go left,
            found!
          </p>
        }
        variables={<p><code>root</code> = current sub-tree being examined (changes each recursive call). Comparing <code>val</code>/<code>key</code> against <code>root-&gt;data</code> decides direction.</p>}
        complexity={{ time: "O(h) ~ O(log n) balanced, O(n) worst-case (skewed tree)", space: "O(h) recursion stack" }}
      />
    </div>
  );
}
