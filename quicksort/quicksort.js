/* Program: quicksort.js
 * Description: A simple, recursive javascript implementation of quicksort
 * Author: Franklin Reynolds
 * Date: Oct 15, 2014
 *
 * Notes on QuickSort:
 * a. given an unsorted list, choose a pivot from the end of the list
 * b. starting and the begining of the list, check if items belong to the 
 *    left or right of the pivot:
 *
 *    loop 
 *       if unsorted[left] <= pivot then
 *          left++;
 *       else
 *          swap(unsorted[left], unsorted[right])
 *          right--;
 *    until left catches up to right
 *
 *    repeat using the left list and the right list
 *
*/

var inbuf = [12, 4, 5, 987, 590, 789, 232, 87, 35, 21, 512, 1, 40, 41, 42, 43, 44, 45, 567, 100, 110, 190, 180, 150, 577, 310, 88, 99, 401, 502, 489, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 455];

function partition( start, end ) {
    "use strict"
    var pivot = end;
    var right = end - 1;
    var left = start;

    if (start >= end) return;
	
    while ( left <= right ) {
	if ( inbuf[ left ] <= inbuf[ pivot ] ) {
	    left++;
	} else {
	    lswap( left, right );
	    right--;
	}
    }
    if ( inbuf[ left ] > inbuf[ pivot ] ) {
	lswap( left, pivot );
    }

    if ( start < left ) partition( start, left - 1 );
    if ( (left + 1) < end ) partition( left + 1, end );

    return;
}

function lswap( a, b ) {
    "use strict"
    var temp = inbuf[ a ];
    inbuf[ a ] = inbuf[ b ];
    inbuf[ b ] = temp;
    return;
}

process.stdout.write("inital list to be sorted = " + inbuf + "\n");
partition(0, (inbuf.length - 1) );
process.stdout.write("\nwell done. final list = " + inbuf + "\n");
