ArrowJS
=======

**HIGHLY EXPERIMENTAL**

A small library that implements [Arrows](https://en.wikipedia.org/wiki/Arrow_%28computer_science%29) for asynchronous functions. You can also implement other types of Arrows by
overriding just a few functions.

More resources about Arrows  can be found here: http://www.haskell.org/haskellwiki/Arrow#External_links

Examples
--------

```javascript
var doubleA = Arrow(function (n, cb) {
    setTimeout(function () {
       cb(2 * n);
    }, 0);
});
var addOneA = Arrow(function (n, cb) {
    cb(n + 1);
});

Arrow.prototype.add = function (g) {
	var f = this;
    return f.both(g).next(Arrow(function(v, cb) {
        cb(v[0] + v[1]);
    }));
};

doubleA.next(addOneA).run(2).then(function (v) {console.log(v)}); //Logs 5
doubleA.add(addOneA).run(2).then(function (v) {console.log(v)}); //Logs 7
```