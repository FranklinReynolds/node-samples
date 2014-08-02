/* Program: recursive implementation of merge sort in javascript/node.js.
 * Date: May 4, 2014
 * Author: Franklin Reynolds
 */

var inbuf = [12, 4, 5, 987, 590, 789, 232, 87, 35, 21, 512, 1, 40, 41, 42, 43, 44, 45, 567, 100, 110, 190, 180, 150, 577, 310, 88, 99, 401, 502, 489, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 455];

function merge(alist, blist) {
    "use strict"
    var outlist = [];

    if (alist.length > 1 || blist.length > 1) {
	alist = divide( alist );
	blist = divide( blist );
    }
    while (alist.length > 0 || blist.length > 0 ) {

	if ( alist.length < 1 ) { // if alist used up? drain b
	    while (blist.length > 0) { outlist.push( blist.shift() );  }
	    return outlist;
	}
	if ( blist.length < 1 ) { // if blist used up? drain a*/
	    while (alist.length > 0) { outlist.push( alist.shift() );  }
	    return outlist;
	}
	/* otherwise compare alist and blist and grab the lowest value */
	if (alist[0] > blist[0]) { outlist.push(blist.shift()); }
	                         else { outlist.push(alist.shift()); }
    }
}

function divide( list ) {
    "use strict"
    if (list.length > 1) {
	var middle = Math.floor(list.length / 2);  // stupid trick for index
	var alist = list.slice(0, middle );
	var blist = list.slice(middle, list.length );
	list = merge( alist, blist );
    }
    return list;
}

process.stdout.write("inital list to be sorted = " + inbuf + "\n");
var final = divide( inbuf );
process.stdout.write("well done. final = " + final + "\n");
