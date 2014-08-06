/* program: javascript implementation of dijstra's shortest path algorithm
 * author: franklin reynolds
 * date: july 14, 2014
 * 
 * description: This bugger is moderately complicated for such a short
 * program. The graph is a three dimension array. X is the list of
 * nodes. Y is the list of arcs and Z is the description of each
 * arc. Each arc description includes the originating node, the length
 * of the edge (arc), the distance to the final DESTINATION, the
 * destination node of this arc, and a bookkeeping field used for
 * tracking visitation and the shortest path to the final DESTINATION.
 *
 * Note that I do not use a separate heap to track the shortest distance
 * to the DESTINATION. Instead I embed that information in the graph.
 */

var HV = 9999999999 ; // simulates infinity or HighValues
var ORIGIN = 1;       // start shortest path here
var DESTINATION = 5;  // look for shortest path to here

// Graph array columns
var origin = 0;
var edge = 1;
var dist = 2;
var dest = 3;
var bestnext = 4;

var graph = [[[0,0,0,0,0]], // node 0 is a special termination node
             [[1,7,0,2,0],
	      [1,9,0,3,0],
	      [1,14,0,6,0]],
             [[2,10,0,3,0],
              [2,15,0,4,0]],
             [[3,11,0,4,0],
              [3,2,0,6,0]],
             [[4,6,0,5,0],
	      [4,1,0,1,0]],
             [[5,9,0,6,0]],
             [[6,0,0,6,0]]];

function dwalk( node, level) {

    var tempdist = HV;

    if ( graph[node][0][bestnext] == 0 ) { // mark visits to detect cycles
	graph[node][0][bestnext] = level;
    } else {
	 if (graph[node][0][bestnext] < 0 && graph[node][0][bestnext] > level) {
	     return(HV) ; // break cycles
	 }
    }
    for (var trip = 0 ; trip < graph[node].length ; trip++) {

	if ( graph[node][trip][dest] == graph[node][trip][origin] ) {
	    return( HV ); // does not reach DESTINATION
	}
	if ( graph[node][trip][origin] == DESTINATION ) {
	    return( 0 );
	} 
	if ( graph[node][trip][dist] == 0 ) {
	    graph[node][trip][dist] = dwalk( graph[node][trip][dest], --level );
	}
	if (tempdist > graph[node][trip][edge] + graph[node][trip][dist] ) {
	    tempdist = graph[node][trip][edge] + graph[node][trip][dist];
	    graph[node][0][bestnext] = graph[node][trip][dest];
	}
    }
    return tempdist;
}

var shortestpathlength = dwalk(ORIGIN, -1);

process.stdout.write("shortest length: "+ shortestpathlength + "\n");
process.stdout.write("best path: ");
var i = 1;
do {
    process.stdout.write( " " + graph[i][0][origin] + ",");
    if (graph[i][0][origin] == DESTINATION) break;
    i = graph[i][0][bestnext] ;
} while (true);
process.stdout.write("\n");
