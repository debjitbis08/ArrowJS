'use strict';

var Arrow = require('./arrow');

var AsyncA = function (f) {
    if (f instanceof AsyncA) {
        return f;
    }
    if (!(this instanceof AsyncA)) {
        return new AsyncA(f);
    }
    Arrow.call(this, f);
};

AsyncA.prototype = Object.create(Arrow.prototype);

AsyncA.prototype.arr = function (f) {
    return new AsyncA(function () {
        var args = Array.prototype.slice.call(arguments, 0);
        return new Promise(function (resolve) {
            args.push(resolve);
            f.apply(null, args);
        });
    });
};

AsyncA.prototype.first = function () {
    var f = this;
    var _A = new AsyncA();
    _A.f = function (x) {
        return f.f(x[0]).then(function (_x) {
            return [_x, x[1]];
        });
    };
    return _A;
};

AsyncA.prototype.next = function (g) {
    var f = this;
    var _A = new AsyncA();
    _A.f = function (x) {
        return f.f(x).then(function (_y) {
            return g.f(_y);
        });
    };
    return _A;
};

module.exports = AsyncA;