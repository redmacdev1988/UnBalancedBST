
var TRAVERSAL = {
  PREORDER: 1,
  INORDER: 2,
  POSTORDER: 3,
};

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

function UnBalancedBST() {
    var head = null;
    var numOfStepsForSearch = 0;

    this.displayNumOfStepsForSearch = function() {
      return numOfStepsForSearch;
    }
    /***
    *
    *  SEARCH THE TREE
    *
    ****/

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

    /***
    *
    *  INSERTING INTO TREE
    *
    ****/

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

    /***
    *
    *  PRINTING TREE FUNCTIONS
    *
    ****/

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

    /***
    *
    *  REMOVING INTO TREE
    *
    ****/
    this.remove = function(number) {
      console.log("Let's remove: " + number);

      if (head) {
            console.log("Head " + head.data + " is valid");

          if (head.data == number && (head.left == null && head.right != null)) {
              console.log("we need to remove root. Where left is null, right is valid");
              var temp = head;
              head = head.right;
              temp.delete();
              return head;
          }
          else if (head.data == number && (head.left != null && head.right == null)) {
              console.log("we need to remove root. Where right is null, left is valid");
              var temp = head;
              head = head.left;
              temp.delete();
              return head;
          }
          else if (head.data == number && (head.left == null && head.right == null)) {
              console.log("We want to remove root, left and right both are valid.")
              head.delete();
              head = null;
              return head;
          }
          return this.traverseRemove(number, head);
      } else {
        console.log("Empty tree. Nothing to remove");
      }
    };

    function deleteMinimum(node, removeCallBack) {
        if (node.left == null && node.right == null) {
            removeCallBack(node);
            return null;
        }

        if (node.left == null && node.right != null) {
            removeCallBack(node);
            return node.right;
        }

        if (node.left) {
            node.left = deleteMinimum(node.left, removeCallBack);
            return node;
        }
    }


    this.traverseRemove = function (number, node) {

        if (node == null) {
            console.log("You're at leaf end, null. Number " + number + " not found. :P )");
            return null;
        }

        console.log("traverseRemove on node: " + node.data);
        if (number > node.data) {
            node.right = this.traverseRemove(number, node.right);
            return node;
        } else if (number < node.data) {
            node.left = this.traverseRemove(number, node.left);
            return node;
        } else if (number == node.data) {

            console.log("Found node to remove! number == " + node.data);
            if (node.left == null && node.right == null) {
                console.log("no children, simple removal");
                node.delete();
                return null;
            }

            if (node.left != null && node.right == null) {
                console.log("Has left child. Connect to left node");
                var leftNodeRef = node.left;
                node.delete();
                return leftNodeRef;
            }

            if (node.left == null && node.right != null) {
                console.log("Has right child. Connect to right node");
                var rightNodeRef = node.right;
                node.delete();
                return rightNodeRef;
            }

            if (node.left && node.right) {
                console.log("BOTH nodes exist...!");
                var nodeToDelete;

                node.right = deleteMinimum(node.right, function(toRemove){
                    node.data = toRemove.data;
                    nodeToDelete = toRemove;
                });
                console.log("node.right assigned. Safe to delete toRemove node");
                nodeToDelete.delete();
                return node;
            }
        } // FOUND
    }



}

UnBalancedBST.CreateObject = function() {
  return new UnBalancedBST();
}

var myBST = UnBalancedBST.CreateObject();

function randomNumberOfZeros() { return Math.ceil(Math.random() * 10); }
function generateRandomNumber() { return Math.floor(Math.random() * Math.pow(10, randomNumberOfZeros())); }

var searchTestValue;

for (var i = 0; i < 1000000; i++) {
    var random = generateRandomNumber();
    if (i == Math.ceil(1000000/2)) {
      searchTestValue = random;
      console.log("USING " + searchTestValue + " AS SEARCH VALUE");
    }
    myBST.insert(random);
}

//myBST.print(TRAVERSAL.INORDER);
console.log("JUST CREATED a tree with a million nodes");

console.log("let's search for: " + searchTestValue);
var node = myBST.search(searchTestValue);

if(node) {
  console.log("found value: " + node.data);
  console.log("Search took total of " + myBST.displayNumOfStepsForSearch() + " number of steps.");
}
