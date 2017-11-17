

var TRAVERSAL = {
  PREORDER: 1,
  INORDER: 2,
  POSTORDER: 3,
};



/***************************************
  NODE OBJECT WE USE TO CREATE OUR TREE
****************************************/

function treeNode(left, newData, right) {
    // this = {}
    if (new.target === undefined) {
         console.log('You didnt use new. Giving you a new treeNode');
         return new treeNode(null, data, null);
    }
    // assign properties to self
    this.left = left || null;
    this.data = newData;
    this.right = right || null;

    this.display = function() {
        console.log(": " +this.data);
    };

    this.delete = function() {
      this.left = null;
      this.right = null;
      this.data = null;
    }
    // return this
}



/***************************************
  UnBalancedBST

  - insert into tree
  - remove from tree
  - print (inorder, preorder, postorder)
  - create balanced tree
  - check for balanceness
  - search for node in tree
  - show how many steps it took for the search
****************************************/
function UnBalancedBST() {
    var head = null;
    var numOfStepsForSearch = 0;

    this.displayNumOfStepsForSearch = function() {
      return numOfStepsForSearch;
    }

    this.getRoot = function() {
      return head;
    }

    /***************************************
            SEARCHING IN TREE
    ****************************************/

    // PRIVATE
    // O(n)
     function traverseSearch(number, node) {
       if (node == null) return null;
       numOfStepsForSearch++;

       if (number > node.data) {
          return traverseSearch(number, node.right);
       } else if (number < node.data ){
          return traverseSearch(number, node.left);
       } else if (number == node.data) {
          return node;
       }
     }

     // PUBLIC
     // returns you the node if found
     // null otherwise
     this.search = function(numberToFind) {
        numOfStepsForSearch = 0;

        if (head) {
            return traverseSearch(numberToFind, head);
        }
     }

     /***************************************
             INSERTING INTO THE TREE
     ****************************************/

    // PRIVATE
    function traverseInsertion(numberToInsert, node) {
        if (node == null) { return new treeNode(null, numberToInsert, null); }
        if (numberToInsert > node.data) {
            node.right = traverseInsertion(numberToInsert, node.right);
            return node;
        } else {
            node.left = traverseInsertion(numberToInsert, node.left);
            return node;
        }
    }

    // PUBLIC
    this.insert = function(number) {
        if (head == null) {
          head = new treeNode(null, number, null);
        } else {
            if (number > head.data) { head.right = traverseInsertion(number, head.right); }
            else { head.left = traverseInsertion(number, head.left); }
        }
    };

    /***************************************
            PRINTING THE TREE
    ****************************************/

    // PRIVATE
    function inOrderPrint(node) {
        if (node == null) return;
        inOrderPrint(node.left);
        if (head == node) {
          console.log("==================== HEAD =========================");
        }
        node.display();
        if (head == node) {
          console.log("===================== ========================")
        }
        inOrderPrint(node.right);
    }

    // PRIVATE
    function preOrderPrint(node) {
        if (node == null) return;
        node.display();
        preOrderPrint(node.left);
        preOrderPrint(node.right);
    }

    // PRIVATE
    function postOrderPrint(node) {
        if (node == null) return;
        postOrderPrint(node.left);
        postOrderPrint(node.right);
        node.display();
    }

    // PUBLIC
    this.print = function(traversalType) {
        console.log(" printing tree ");

        if (head) {
          console.log("Head is " + head.data + "..!");
          switch (traversalType) {
              case TRAVERSAL.INORDER: inOrderPrint(head);
              break;
              case TRAVERSAL.PREORDER: preOrderPrint(head);
              break;
              case TRAVERSAL.POSTORDER: postOrderPrint(head);
            default:
          }
        } else {
          console.log("Tree is currently empty.")
        }
    };


    /***************************************
            CREATING A BALANCED TREE
    ****************************************/

    // PRIVATE
    function inOrderToArray(node, array) {
        if (node == null) return;
        inOrderToArray(node.left, array);
        array.push(node.data);
        inOrderToArray(node.right, array);
    }

    // PUBLIC
    // Convert an inordered tree to a sorted array
    this.flattenInOrderToSortedArray = function() {
      var sortedArray = [];
      if (head) {
          inOrderToArray(head, sortedArray);
      }
      return sortedArray;
    }

    // PRIVATE
    // Build a balanced tree from the sorted array
    // where the left/right node takes on the mid of
    // the left/right sides of the array.
    function buildBalancedTree(array) {
        if (array.length == 0) { return null; }

        var mid = Math.floor((array.length)/2);
        var n = new treeNode(null, array[mid], null);

        var arrayOnLeft = array.slice(0, mid);
        n.left = buildBalancedTree(arrayOnLeft);

        var arrayOnRight= array.slice(mid+1);
        n.right = buildBalancedTree(arrayOnRight);

        return n;
    }

    // PUBLIC
    // convert the incoming array into a balanced tree
    this.sortedArrayToBalancedTree = function(array) {
        if (head) {
            return buildBalancedTree(array);
        }
        return null;
    };


    /***************************************
            BALANCENESS OF A TREE
    ***************************************/

    // PRIVATE
    // will send 'false' to callback for any unbalanceness
    function countBalance(node, balancedCallBack) {
        if (node == null) { return -1; }
            var leftCount = 1 + countBalance(node.left, balancedCallBack);
            var rightCount = 1 + countBalance(node.right, balancedCallBack);

            if (Math.abs(leftCount-rightCount) > 1) {
              console.log("Not balanced at: " + node.data);
              balancedCallBack(false);
            }
            else { console.log("Balanced at " + node.data); }

            return (leftCount >= rightCount) ? leftCount : rightCount;
    }

    // PUBLIC
    // Checks to see if an unbalanceness exist in the tree
    this.checkForBalanceness = function(balancedTree) {
      var balancenessExist = true;
      countBalance(balancedTree, function(balanced = true) {
        if (balanced == false) { balancenessExist = balanced }
      });

      console.log("Does Balancess Exist? : " + balancenessExist);
    }

    /***************************************
            REMOVING FROM THE TREE
    ***************************************/

    // PUBLIC
    // if we're removing the root, we take care of it here.
    // if we remove from anywhere else, we use traverseRemove
    this.remove = function(number) {
      console.log("Let's remove: " + number);

      if (head) {
          if (head.data == number && rightChildOnly(head)) {
              var temp = head; head = head.right; temp.delete();
              return head;
          }
          else if (head.data == number && leftChildOnly(head)) {
              var temp = head; head = head.left; temp.delete();
              return head;
          }
          else if (head.data == number && noChildren(head)) {
              head.delete(); head = null;
              return head;
          }
          return this.traverseRemove(number, head);
      } else {
        console.log("Empty tree. Nothing to remove");
      }
    };

    //PRIVATE
    // Finds the minimum of sub-tree and delete it
    function deleteMinimum(node, removeCallBack) {

        if (noChildren(node)) {
            removeCallBack(node);
            return null;
        }

        if (rightChildOnly(node)) {
            removeCallBack(node);
            return node.right;
        }

        if (node.left) {
            node.left = deleteMinimum(node.left, removeCallBack);
            return node;
        }
    }

    //PRIVATE UTILITY FOR CHECKING NODE'S CHILDREN EXISTENCE

    function noChildren(node) {
        return (node.left == null && node.right == null);
    }
    function leftChildOnly(node) {
        return (node.left != null && node.right == null);
    }
    function rightChildOnly(node) {
      return (node.left == null && node.right != null);
    }
    function bothChildExist(node) {
      return (node.left != null && node.right != null);
    }

    // PUBLIC
    //
    this.traverseRemove = function (number, node) {
        if (node == null) {
            console.log("You're at leaf end, null. Number " + number + " not found. :P )");
            return null;
        }
        if (number > node.data) {
            node.right = this.traverseRemove(number, node.right);
            return node;
        } else if (number < node.data) {
            node.left = this.traverseRemove(number, node.left);
            return node;
        } else if (number == node.data) {
            if (noChildren(node)) {
                node.delete(); return null;
            }
            if (leftChildOnly(node)) {
                var leftNodeRef = node.left; node.delete(); return leftNodeRef;
            }
            if (rightChildOnly(node)) {
                var rightNodeRef = node.right; node.delete(); return rightNodeRef;
            }
            if (bothChildExist(node)) {
                var nodeToDelete;
                node.right = deleteMinimum(node.right, function(toRemove){
                    node.data = toRemove.data;
                    nodeToDelete = toRemove;
                });
                nodeToDelete.delete();
                return node;
            }
        } // FOUND
    } // traverseRemove function

}

UnBalancedBST.CreateObject = function() {
  return new UnBalancedBST();
}

var myBST = UnBalancedBST.CreateObject();
myBST.insert(50);
myBST.insert(40);
myBST.insert(30);
myBST.insert(45);
myBST.insert(90);
myBST.insert(82);
myBST.insert(96);
myBST.insert(98);
myBST.insert(99);
myBST.print(TRAVERSAL.INORDER);

console.log("------ Change unbalanced tree into a balanced tree -------");
var array = myBST.flattenInOrderToSortedArray();
var balancedTree = myBST.sortedArrayToBalancedTree(array);

myBST.checkForBalanceness(balancedTree);

console.log("===== Test the Balanceness of the Original Tree");
myBST.checkForBalanceness(myBST.getRoot());

myBST.remove(90);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(40);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(50);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(45);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(30);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(82);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(98);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(99);
myBST.print(TRAVERSAL.INORDER);

myBST.remove(96);
myBST.print(TRAVERSAL.INORDER);
