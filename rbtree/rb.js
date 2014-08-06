/*
 * name: rb.js
 * author: FDReynolds
 * description: javascript implementation of red-black trees
 *
 *  The Following Constraints Must Be Met For A Correct Red/Black Tree:
 *  1. Each node is either red or black.
 *  2. The root node is black.
 *  3. All leaves (null) are black. (All leaves are same color as the root.)
 *  4. Every red node must have two black child nodes.
 *  5. Every path from a given node to any of its descendant leaves contains 
 *     the same number of black nodes.
 */

// some constants
var BLACK = 1;
var RED = 0;
var COLOR =["R", "B"];

// input values for the tree
// var inbuf = [12, 4, 5, 987, 590, 789, 232, 87, 35, 21, 512, 1, 40, 41, 42, 43, 44, 45, 567, 100, 110, 190, 180, 150, 577, 310, 88, 99, 401, 502, 489,46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,69, 70, 455];
//var inbuf = [12, 4, 5, 987, 23];
//var inbuf = [12, 4, 5, 987, 23, 789, 24, 232];

var dbuf = [];

// convenience function for printing to stdout
function stdout_w( outbuf ) {
    process.stdout.write(outbuf);
}

// RB node
function rbNode( parent, val ) {
    this.parent = parent;
    this.value = val;
    this.color = RED;
    this.left = null;
    this.right = null;
}

// return the sibling of the parent node, i.e., uncle
function uncle( cnode ) {
    "use strict";

    try {
	if ( cnode.parent.parent == null ) {
	    return null;
	}
	if ( cnode.parent.parent.left == cnode.parent ) {
	    return cnode.parent.parent.right;
	} else {
	    return cnode.parent.parent.left;
	}
    } catch (e) {
	return null;
    }
}

// Left Rotate 
function l_rotate( cnode, curtree ) {
    "use strict";

    var grandp = cnode.parent;
    var parent = cnode;   // node being rotated
    var child = cnode.right;

    // set parent right to child left
    parent.right = child.left;
    // set the parent of the left to the child's parent
    if (child.left != null) {
	child.left.parent = parent;
    }
    // set child left to old parent
    child.left = parent;
    // set the parent of the rotated parent to rotated child
    parent.parent = child;
    if (grandp == null) {
	// set rbRoot to the new root
	curtree.rbRoot = child;
    } else {
	// set grandparent link to child
	if (grandp.left == parent) {
	    grandp.left = child;
	} else {
	    grandp.right = child;
	}
    }
    // set the parent of rotated child to grandp
    child.parent = grandp;
    return child;
}

// Right rotate
function r_rotate( cnode, curtree ) {
    "use strict";

    var grandp = cnode.parent;
    var parent = cnode;
    var child = cnode.left;

    // set parent left to child left
    parent.left = child.right;
    // set the parent of the right to the child's parent
    if (child.right != null) {
	child.right.parent = parent;
    }
    // set child right to old parent
    child.right = parent;
    // set the parent of rotated parent to old child
    parent.parent = child;
    if (grandp == null) {
	curtree.rbRoot = child;
    } else {
	// set grandparent link to child
	if (grandp.left == parent) {
	    grandp.left = child;
	} else {
	    grandp.right = child;
	}
    }
    // set the parent of rotated child to grandp
    child.parent = grandp;
    return child;
}

// rebalance the tree...
function rebal( cnode, curtree ) {
    "use strict";

    /* if cnode is the new root, color it BLACK and return */
    if ( cnode.parent == null) {
	cnode.color = BLACK;
	return;
    }

    /* if parent of cnode is alread black, then we are done */
    if ( cnode.parent.color == BLACK ) {
	return;
    } 

    /* if parent and uncle node are RED, make grandparent RED and the
     *    parent and uncle BLACK AND reexamine the grandparent...
     */
    var u = uncle(cnode);
    if ( u != null && u.color == RED) {
	u.color = BLACK;
	cnode.parent.color = BLACK;
	cnode.parent.parent.color = RED;
	// recurse!!!
	rebal( cnode.parent.parent, curtree );
	return;
    } 	

    /* if the parent is red but the uncle is black (including null) +
     * cnode is the right child and the parent is the left child of
     * the grandparent THEN left_rotate parent; if parent is right
     * child and cnode is left child THEN right_rotate parent.
     */
    if ( cnode == cnode.parent.right && cnode.parent == cnode.parent.parent.left ) {
	l_rotate( cnode.parent , curtree);
	cnode = cnode.left;
    } else if ( cnode == cnode.parent.left && cnode.parent == cnode.parent.parent.right ) {
	r_rotate( cnode.parent, curtree );
	cnode = cnode.right;
    }

    /* if the parent is red but the uncle is black (including null)
     * AND cnode is the left child and the parent is the left child,
     * right rotate the grandparent (if cnode and parent are right
     * children, perform a left rotate of the grandparent
     */
    cnode.parent.color = BLACK;
    cnode.parent.parent.color = RED;
    if ( cnode == cnode.parent.left && cnode.parent == cnode.parent.parent.left) {
	r_rotate(cnode.parent.parent, curtree);
    } else if ( cnode == cnode.parent.right && cnode.parent == cnode.parent.parent.right) {
	l_rotate(cnode.parent.parent, curtree);
    }
}

/* insert a node into the tree
 */
function insert( cnode, val ) {
    "use strict";

    /* first node is set to root
     * should have a tree object to hide this.
     */
    if (this.rbRoot == null) {
	this.rbRoot = new rbNode( null, val );
	this.rbRoot.color = BLACK;
	return;
    }
    debugger;
    /* try to descend tree, else create new node */
    if (cnode.value > val) {
	if (cnode.left == null) {
	    cnode.left = new rbNode( cnode, val );
	    rebal(cnode.left, this);
	} else {
	    this.insert(cnode.left, val);
	}
	return;
    } 

    if (cnode.value < val) {
	if (cnode.right == null) {
	    cnode.right =  new rbNode( cnode, val );
	    rebal(cnode.right, this);
	} else {
	    this.insert(cnode.right, val);
	}
	return;
    }

    /* this is a duplicate, so I am gonna throw it away */
    return;
}

// remove the selected node from the rbtree and finds a replacement.
// calls deletenode() to rebalance the tree.
function removenode( cvalue) {

    // find the node to remove
    var cnode = findnode( this.rbRoot, cvalue );

    if ( cnode == null ) return; // the value was not found

    // if cnode has two non-leaf children, adjust the value of cnode
    //    and set dnode to the new node to be deleted
    var dnode = cnode;
    if ( (cnode.left != null) && (cnode.right != null) ) {
	for (var nextnode = cnode.left; nextnode != null ; nextnode = nextnode.right) {
	    dnode = nextnode;
	}
	cnode.value = dnode.value;
    }
    // dnode is the node we have to delete and it should have at least one null child...
    if ((dnode.left != null) && (dnode.right != null)) {
	stdout_w("dnode has too many real children!!\n");
	debugger;
    }

    // if dnode is RED then replace it with BLACK child - which should be null
    if ( dnode.color == RED ) {
	if ( dnode.parent != null ) {
	    if (dnode.parent.left == dnode) {
		dnode.parent.left = null;
	    } else {
		dnode.parent.right = null;
	    }
	} else {
	    // delete the last node from the tree
	    this.rbRoot = null;
	}
	return;
    }

    // if dnode is BLACK (already established!) and it has a RED child...not sure this is right.
    if ( ( dnode.left != null ) && ( dnode.left.color == RED ) ) {
	dnode.value = dnode.left.value;
	dnode.left = null;
	return;
    } else if ( ( dnode.right != null ) && ( dnode.right.color == RED ) ) { 
	dnode.value = dnode.right.value;
	dnode.right = null;
	return;
    }

    // if we reach this point, dnode should be BLACK and have two null children.
    // now we try to repair rb rules
    fixtree( dnode, this );

    if (dnode.parent == null ) {
	this.rbRoot = null;
    } else {
	if ( dnode.parent.left == dnode ) {
	    dnode.parent.left = null;
	} else if ( dnode.parent.right == dnode ) {
	    dnode.parent.right = null;
	}
    }
}

// finish deleting the node and repairing the rb tree... lots of special cases.
function fixtree( dnode, curtree ) {

    // if dnode.parent == null then dnode is the new root
    if ( dnode.parent == null ) {
	curtree.rbRoot = dnode;
	return;
    }
    debugger;
    // if sibling is RED, swap parent and sib colors and rotate parent
    // first, set snode to the sibling node
    var snode = (dnode.parent.left != dnode) ? dnode.parent.left : dnode.parent.right;

    if ( (snode != null) && (snode.color == RED) ) {
	dnode.parent.color = RED;
	snode.color = BLACK;
	if ( dnode.parent.left == dnode ) {
	    l_rotate( dnode.parent, curtree );
	} else {
	    r_rotate( dnode.parent, curtree );
	}
	// after rotation, dnode probably has a new sibling
	snode = (dnode.parent.left != dnode) ? dnode.parent.left : dnode.parent.right;
    }

    // if parent, sib and sib's kids are black: mark sib as RED and re-examine the parent?
    if ( ( dnode.parent.color == BLACK ) && ( snode.color == BLACK )  && 
	 (( snode.left == null) || (snode.left.color == BLACK )) && 
	 (( snode.right == null) || (snode.right.color == BLACK )) ) {
	     snode.color = RED;
	     // re-examine
	     fixtree( dnode.parent, curtree );
	     return;
    } 

    // if sib and sib's kids are BLACK but the parent is RED, switch colors of 
    // parent and sib
    if ( (dnode.parent.color == RED) && (snode.color == BLACK) && 
	 ((snode.left == null) || (snode.left.color == BLACK)) && 
	 ((snode.right == null) || (snode.right.color == BLACK)) ) {
	snode.color = RED;
	dnode.parent.color = BLACK;
	return;
    }

    // sib is BLACK, its left child is RED and its right child is BLACK AND 
    // dnode is the left child of its parent.
    if ( snode.color == BLACK ) {
	if (( dnode.parent.left == dnode) && 
	    ((snode.right == null) || (snode.right.color == BLACK)) && 
	    ((snode.left != null) && (snode.left.color == RED)) ) {
	    snode.color = RED;
	    snode.left.color = BLACK;
	    snode = r_rotate( snode, curtree );
	} else if (( dnode.parent.right == dnode) && 
		   ((snode.left == null) || (snode.left.color == BLACK)) && 
		   ((snode.right != null) &&(snode.right.color == RED)) ) { 
	    snode.color = RED;
	    snode.right.color = BLACK;
	    snode = l_rotate( snode, curtree );
	}
    }

    snode.color = dnode.parent.color;
    dnode.parent.color = BLACK;

    if (dnode == dnode.parent.left) {
	snode.right.color = BLACK;
	l_rotate( dnode.parent, curtree );
    } else {
	snode.left.color = BLACK;
	r_rotate( dnode.parent, curtree );
    }
}

/*  The Following Constraints Must Be Met For A Correct Red/Black Tree:
 *  1. Each node is either red or black.
 *  2. The root node is black.
 *  3. All leaves (null) are black. (All leaves are same color as the root.)
 *  4. Every red node must have two black child nodes.
 *  5. Every path from a given node to any of its descendant leaves contains 
 *     the same number of black nodes.
 */
function verifytree(rbRoot) {
    // not worried about (1)
    // verify root is Black (2)
    if ( rbRoot.color != BLACK ) {
	stdout_w( "root is not BLACK! \n");
	return false;
    }
    // not worried about (3) 'cuz NULLs are considered black and all leaves
    // are NULL
    if ( walktree( rbRoot ) != null ) return true; else return false;
}

// find and return the node whose value matches "val"
function findnode ( cnode, val ) {
    var temp = null;

    if (cnode == null) return null;
    if (cnode.value == val) return cnode;

    temp = findnode( cnode.left, val );
    if ( temp != null )  return temp;

    temp = findnode( cnode.right, val );
    if ( temp != null ) return temp;

    return temp;
}

// look for violation of RB tree rules. Return null is error encountered.
function walktree( cnode ) {
    var ts;
    
    if ( cnode == null ) return 1;

    var leftcount = walktree( cnode.left );
    if (leftcount == null) return null;

    stdout_w( cnode.value.toString() + ", " );

    // test all Red parents must have two Black childred rule
    if ( cnode.color == RED ) {
	if ( !( (cnode.left == null) || (cnode.left.color == BLACK) ) ) {
	    stdout_w( "red cnode: " + cnode.value.toString() + 
		      " violates two black children rule. \n" );
	}
	if ( !( (cnode.right == null) || (cnode.right.color == BLACK) ) ) {
	    stdout_w( "red cnode: " + cnode.value.toString() + 
		      " violates two black children rule. \n" );
	}
    }
    var rightcount = walktree( cnode.right);
    if (rightcount == null) return null;

    // verify matching number of black nodes in all subtrees
    if ( leftcount != rightcount ) {
	stdout_w( "left/right black count violated - cnode: " + 
		  cnode.value.toString() + " l:" + leftcount.toString() +
		  " r:" + rightcount.toString() + "\n");
    }
    // if BLACK return leftcount+1 because the counts are equal or the error has 
    //        already been reported.
    if (cnode.color == BLACK) {
	return( leftcount + 1 ) ;
    }
    return( leftcount );
}

function showbtree( cnode, prev_node ) {
    
    if ( cnode == null ) return;

    if ( cnode.right != null ) {
	// replace parent RIGHT arc with blanks
	if ((prev_node != null) && (prev_node.right == cnode)) {
	    dbuf.pop();
	    dbuf.push("   ");
	}
	// push RIGHT arc
	dbuf.push("  |");
	// go to RIGHT node
	showbtree( cnode.right, cnode );

	// display line including RIGHT arc
	for ( var i in dbuf )  stdout_w( dbuf[i] );
	stdout_w("\n");

	// pop RIGHT arc
	dbuf.pop();
	// undo the replacement of the RIGHT arc with blanks
	if ((prev_node != null) && (prev_node.right == cnode)) {
	    dbuf.pop();
	    dbuf.push("  |");
	}
    }
    // display the current node
    for ( var i in dbuf ) stdout_w( dbuf[i] );

    var tempp = (cnode.parent == null) ? "N" : cnode.parent.value.toString();
    var templ = (cnode.left == null) ? "N" : cnode.left.value.toString();
    var tempr = (cnode.right == null) ? "N" : cnode.right.value.toString();
    var tempv = (cnode.value == null) ? "N" : cnode.value.toString();

    stdout_w( "--" + COLOR[cnode.color] + tempv);
    stdout_w(" P:" + tempp + " L:" +templ+" R:"+ tempr + "\n");

    if ( cnode.left != null ) {
	// replace parent LEFT arc with blanks
	if (prev_node != null) {
	    if (prev_node.value > cnode.value) {
		dbuf.pop();
		dbuf.push("   ");
	    }
	}
	// push LEFT arc
	dbuf.push("  |");

	// display line including LEFT arc
	for ( var i in dbuf )  stdout_w( dbuf[i] );
	stdout_w("\n");

	// go to LEFT node
	showbtree( cnode.left, cnode );
	// pop LEFT arc
	dbuf.pop();
    }	
    return;
}

//create the red/black tree object "class"
function Rbtree() {
    this.rbRoot = null;
    this.findnode = findnode;
    this.removenode = removenode;
    this.showbtree = showbtree;
    this.verifytree = verifytree;
    this.insert = insert;
}

// export the red/black tree object
exports = module.exports = new Rbtree;
exports.Rbtree = Rbtree;
