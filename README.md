ArrowJS
=======

**HIGHLY EXPERIMENTAL**

A small library that implements Arrows for asynchronous functions. You can also implement other types of Arrows by
overriding just a few functions.

Examples
--------

```javascript
var doubleA = Arrow.arr(function (n, cb) {
	setTimeout(function () {
	   cb(2 * n);
	}, 0);
});
var addOneA = Arrow.arr(function (n, cb) {
	cb(n + 1);
});

var addA = function (f, g) {
	return Arrow.next(Arrow.both(f, g), Arrow.arr(function(v, cb) {
		cb(v[0] + v[1]);
	}));
};

Arrow.run(addA(doubleA, addOneA), 2)
	.then(function (v) {console.log(v);}); // Logs '7' ((2 * 2) + (2 + 1))
```