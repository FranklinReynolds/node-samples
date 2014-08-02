/* program: tr1
 * desc: enumerate variations from a list of lists. items from each
 *       list can occur in each variation only once
 * date: may 6, 2014
 * author: Franklin Reynolds
*/

var lists = [[1,2,3,4,5],
             [2,4,6,8,0,],
             [3,6,9],
             [0,1,10,11,100,101,110,111]];

var olist = [];

function twalk (count) {
    if ( typeof lists[count] === "undefined" ) {
	process.stdout.write("whoopie: " + olist + "\n");
	return;
    }

    var llist = lists[count].concat();

    count++;
    while (llist.length > 0) {
	olist.push( llist.shift()) ; 
	twalk(count);
	olist.pop();
    }
    return;
}

process.stdout.write("hi there\n");
process.stdout.write("lists: " + lists[0] + "\n");
twalk( 0 );
process.stdout.write("olist: " + olist + "\n");

