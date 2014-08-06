// Program: testrb.js
// Author: Franklin Reynolds
// Description: Script to test red/black tree module

var a = 0;

// import module
var rb = require("./rb");
var nrb = require("./rb").Rbtree;

// input values for the tree
var inbuf = [12, 4, 5, 987, 590, 789, 232, 87, 35, 21, 512, 1, 40, 41, 42, 43, 44, 45, 567, 100, 110, 190, 180, 150, 577, 310, 88, 99, 401, 502, 489,46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68,69, 70, 455];

// convenience function for printing to stdout
function stdout_w( outbuf ) {
    process.stdout.write(outbuf);
}

// Insert values from inbuf into the rbtree

for ( var i = 0 ; i < inbuf.length ; i++ ) {
    rb.insert(rb.rbRoot, inbuf[i]);
}

// Display the rbtree
stdout_w("\n");
rb.showbtree(rb.rbRoot, null);
stdout_w("\n");

stdout_w("*****************\n");

// Verify this is a *proper* rbtree
stdout_w("\n");
rb.verifytree( rb.rbRoot );
stdout_w("\n");

// verify findnode( root, value )
stdout_w("verifying findnode\n");

(rb.findnode( rb.rbRoot, 12) == null) ? stdout_w("12 not found\n"): stdout_w("found 12\n");
(rb.findnode( rb.rbRoot, 24) == null) ? stdout_w("24 not found\n"): stdout_w("found 24\n");
(rb.findnode( rb.rbRoot, 489) == null) ? stdout_w("489 not found\n"): stdout_w("found 489\n");

// test of delete a node 
function testdelete( tval ) {
    var targetnode = rb.findnode( tval );

    if (targetnode == null) {
	stdout_w("testdelete:could not find " + tval.toString() + " to delete\n");

    } else {
	rb.removenode( targetnode );

	if (rb.verifytree(rb.rbRoot)) {
	    stdout_w("\ntestdelete:after " + tval.toString() + " is deleted, tree is verified.\n");
	} else {
	    stdout_w("\ntestdelete:after " + tval.toString() + " is deleted, tree is broken!!!!\n");
	    // Display the rbtree
	    stdout_w("\n");
	    rb.showbtree(rb.rbRoot, null);
	    stdout_w("\n");
	}
    }
}

// delete a bunch of values and make sure the tree is not broken
testdelete( 455 );
testdelete( 50 );
testdelete( 21 );
testdelete( 99 );
testdelete( 1 );
testdelete( 60 );
testdelete( 70 );
testdelete( 69 );
testdelete( 590 );
testdelete( 4 );
testdelete( 5);
testdelete( 987 );
testdelete( 789 );
testdelete( 47 );
testdelete( 35 );
testdelete( 53 );
testdelete( 232 );
testdelete( 512 );
testdelete( 49 );
testdelete( 61 );
testdelete( 87 );
// Display the rbtree
stdout_w("\n");
rb.showbtree(rb.rbRoot, null);
stdout_w("\n");
