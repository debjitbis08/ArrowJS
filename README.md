ArrowJS
=======

**HIGHLY EXPERIMENTAL**

A small library that implements Arrows for asynchronous (and synchronous) functions.

Examples
--------

	var doubleA = Arrow.arr(function (n, cb) {
		setTimeout(function () {
		   cb(2 * n);
		}, 3000);
	});
	var addOneA = Arrow.arr(n => n + 1);

	Arrow.run(Arrow.next(addOneA, doubleA), 2)
		.then(function (v) {console.log(v);}); //Logs 6 after 3 secs