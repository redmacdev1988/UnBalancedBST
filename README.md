# UnBalancedBST
Unbalanced Binary Search Tree (in javascript)

  - insert into tree
  - remove from tree
  - print (inorder, preorder, postorder)

  - search for node in tree
  - show how many steps it took for the search

  - create balanced tree
  - check for balanceness


# Building the Tree

You start off inserting into the tree. Each insertion is O (log n). We insert n items so total runtime for inserting n items is O (n log n).
You can also remove from the tree, which is binary recursion also. So O (log n).
After you build a tree, you can print via depth first search in 3 ways: in order, pre order, and post order.

# Searching the Tree

You can search the tree via binary recursion. This is the purpose of why we use binary tree: Fast Searching.
The search time is O (log n) because we cut the tree in half at every step of the search.

# Balanced Tree

There is a problem. What if we enter 30, 20, 10, 8, 6, 4, 2, 60. The tree would look like this:

                     30
                   20  60
                10
              8
            6
          4
        2

This is basically a linked list. So as we can see, if we were to enter a root node that is very much larger ( or smaller ) than the rest of the data sample, our tree would deteriorate into a list. And as we know searching a list is always O(n). Thus, we lose the capability of a tree and kind of resort back to using a linked list. This is not what we want. This issue is called an Unbalanced Tree.

But first let us define what is a balanced tree: A binary tree is balanced if for any two leaves the difference of the depth is at most 1.

Hence an example of "unbalanced" tree would be if we were to insert 50 40 30 20 60. On the left side we have 20, 30, 40, 50, which has a depth of 3. On the right side we have 50 and 60, with a depth of 1. There is a difference of 2, and thus, means this tree is unbalanced.

          50
        40  60
      30
    20

Therefore, Balanceness and Unbalanceness is to make sure that we carry on with using a binary tree and that it does not deteriorate into a list.

When we are working with a data sample, there is almost no way to know which item in the data set is smack middle of the data range. Thus, what we do is to simply create a tree with what data sample we have. Usually, it will have a bit of unbalanceness to it. We then convert the unbalanced tree into a balanced tree like so:

1) Going depth first search, we use in order traversal to push items onto an array.

                  50
                40  60
              30
            20

will be converted to array [20 30 40 50 60]
