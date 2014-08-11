ArrowJS
=======

**HIGHLY EXPERIMENTAL**

A small library that implements [Arrows](https://en.wikipedia.org/wiki/Arrow_%28computer_science%29). You can also
implement other types of Arrows by overriding just a few functions.

The library provides Arrows for asynchronous function, AsyncA. Other types of Arrows should be implemented based on
the AsyncA definition.

More resources about Arrows can be found here: http://www.haskell.org/haskellwiki/Arrow#External_links

Examples
--------

```javascript
var doubleA = Arrows.AsyncA().arr(function (n, cb) {
    setTimeout(function () {
       cb(2 * n);
    }, 0);
});
var addOneA = Arrows.AsyncA().arr(function (n, cb) {
    cb(n + 1);
});

AsyncA.prototype.add = function (g) {
	var f = this;
    return f.both(g).next(this.arr(function(v, cb) {
        cb(v[0] + v[1]);
    }));
};

doubleA.next(addOneA).run(2).then(function (v) {console.log(v)}); //Logs 5
doubleA.add(addOneA).run(2).then(function (v) {console.log(v)}); //Logs 7
```