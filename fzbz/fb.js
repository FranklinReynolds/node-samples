/*
 * program: fb.js
 * desc: simple javascript (node.js) implementation of fizzbuzz
 * author: Franklin Reynolds
 */

for (var i = 1; i < 100 ; i++ ) {
    out = (i % 3 ? "" : "fizz");
    out = (i % 5 ? out : out + "buzz" );
    process.stdout.write( (out === "" ? i.toString() : out) + "\n");
}
