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
 *  5. Every path from a given node to any of its descendant leaves 
 *     contains the same number of black nodes.
 */

var BLACK = 1;
var RED = 0;
var COLOR =["R", "B"];

var inbuf = [12, 4, 5, 987, 23, 789, 24, 232, 56, 87, 35, 21, 1, 40, 41, 42, 43, 44, 45, 100, 110, 190, 180, 150, 310, 88, 99, 401, 489, 455];
//var inbuf = [12, 4, 5, 987, 23];
//var inbuf = [12, 4, 5, 987, 23, 789, 24, 232];

var dbuf = [];

var rbRoot = null;

function stdout_w ( outbuf ) {
    process.stdout.write(outbuf);
}

function rbNode( parent, val ) {
    this.parent = parent;
    this.value = val;
    this.color = RED;
    this.left = null;
    this.right = null;
}

function uncle( cnode ) {
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
function l_rotate( cnode ) {

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
	rbRoot = child;
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
}

// Right rotate
function r_rotate( cnode ) {

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
	rbRoot = child;
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
}

// rebalance the tree...
function rebal( cnode ) {

    // if cnode is the new root, color it BLACK and return
    if ( cnode.parent == null) {
	cnode.color = BLACK;
	return;
    }

    // if parent of cnode is alread black, then we are done
    if ( cnode.parent.color == BLACK ) {
	return;
    } 

    // if parent and uncle node are RED, make grandparent RED and the
    //     parent and uncle BLACK AND reexamine the grandparent...
    var u = uncle(cnode);
    if ( u != null && u.color == RED) {
	u.color = BLACK;
	cnode.parent.color = BLACK;
	cnode.parent.parent.color = RED;
	// recurse!!!
	rebal( cnode.parent.parent );
	return;
    } 	

    /* if the parent is red but the uncle is black (including null) + cnode
     * is the right child and the parent is the left child of
     * the grandparent THEN left_rotate parent; if parent is right
     * child and cnode is left child THEN right_rotate parent.
     */
    if ( cnode == cnode.parent.right && cnode.parent == cnode.parent.parent.left ) {
	l_rotate( cnode.parent );
	cnode = cnode.left;
    } else if ( cnode == cnode.parent.left && cnode.parent == cnode.parent.parent.right ) {
	r_rotate( cnode.parent );
	cnode = cnode.right;
    }

    // if the parent is red but the uncle is black (including null)
    // AND cnode is the left child and the parent is the left child,
    // right rotate the grandparent (if cnode and parent are right
    // children, perform a left rotate of the grandparent
    cnode.parent.color = BLACK;
    cnode.parent.parent.color = RED;
    if ( cnode == cnode.parent.left && cnode.parent == cnode.parent.parent.left) {
	r_rotate(cnode.parent.parent);
    } else if ( cnode == cnode.parent.right && cnode.parent == cnode.parent.parent.right) {
	l_rotate(cnode.parent.parent);
    }
}

function insert( cnode, val ) {

    /* first node is set to root
     * should have a tree object to hide this.
     */
    if (rbRoot == null) {
	rbRoot = new rbNode( null, val );
	rbRoot.color = BLACK;
	return;
    }
    
    /* try to descend tree, else create new node */
    if (cnode.value > val) {
	if (cnode.left == null) {
	    cnode.left = new rbNode( cnode, val );
	    rebal(cnode.left);
	} else {
	    insert(cnode.left, val);
	}
	return;
    } 

    if (cnode.value < val) {
	if (cnode.right == null) {
	    cnode.right =  new rbNode( cnode, val );
	    rebal(cnode.right);
	} else {
	    insert(cnode.right, val);
	}
	return;
    }

    /* this is a duplicate, so I am gonna throw it away */
    return;
}

function show_btree( cnode, prev_node ) {
    
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
	show_btree( cnode.right, cnode );

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

    stdout_w( "--" + COLOR[cnode.color] + cnode.value.toString());
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
	show_btree( cnode.left, cnode );
	// pop LEFT arc
	dbuf.pop();
    }	
    return;
}

// Insert values from inbuf into the rbtree
for ( var i = 0 ; i < inbuf.length ; i++ ) {
    insert(rbRoot, inbuf[i]);
}

// Display the rbtree
stdout_w("\n");
show_btree(rbRoot, null);
stdout_w("\n");
