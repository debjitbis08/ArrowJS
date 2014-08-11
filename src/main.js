/*global
 setTimeout,
 module,
 exports,
 define,
 window
 */
(function(root, factory){
    'use strict';
// CommonJS
    if (typeof exports === 'object') {
        module.exports = factory();
// AMD
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
// Browser
    } else {
        root.Arrow = factory();
    }
}((typeof window === 'object' && window) || this, function() {
    'use strict';

    var Arrow = function (f) {
        if (f instanceof Arrow) {
            return f;
        }
        if (!(this instanceof Arrow)) {
            return new Arrow(f);
        }
        this.f = f;
    };

    Arrow.prototype = {
        _notImplemented: function () {
            throw new Error('Arrow is a abstract class, do not use it directly. ' +
                'Please use one of it\'s subclasses or create your own by ' +
                'overriding arr, next and first functions.'
            );
        },
        arr: function () { this._notImplemented(); },
        next: function () { this._notImplemented(); },
        first: function () { this._notImplemented(); },

        run: function () {
            var _sf = this;
            var args = Array.prototype.slice.call(arguments, 0);
            return _sf.f.apply(_sf, args);
        },

        /** Extra Functions **/

        /**
         * @function second
         * @return {Arrow}
         */
        second: function () {
            var f = this;
            var swapA = Arrow(function (pair, cb) {
                cb([pair[1], pair[0]]);
            });
            return swapA.next(f.first()).next(swapA);
        },

        parallel: function (g) {
            var f = this;
            return f.first().next(g.second());
        },

        both: function (g) {
            var f = this;
            return Arrow(function (b, cb) {
                cb([b, b]);
            }).next(f.parallel(g));
        }
    };

    var AsyncA = function (f) {
        Arrow.call(this, f);
    };

    AsyncA.prototype = Object.create(Arrow.prototype);

    AsyncA.prototype.arr = function (f) {
        return AsyncA(function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return new Promise(function (resolve, reject) {
                args.push(resolve);
                f.apply(null, args);
            });
        });
    };

    AsyncA.prototype.first = function () {
        var f = this;
        var _A = AsyncA();
        _A.f = function (x) {
            return f.f(x[0]).then(function (_x) {
                return [_x, x[1]];
            });
        };
        return _A;
    };

    AsyncA.prototype.next = function (g) {
        var f = this;
        var _A = AsyncA();
        _A.f = function (x) {
            return f.f(x).then(function (_y) {
                return g.f(_y);
            });
        };
        return _A;
    };

    /*
    var delay = function (t) {
        return new Arrow(function (x) {
            var y = new Promise(function (resolve, reject) {
                setTimeout(function () {
                    resolve(x);
                }, t);
            });
            return y;
        });
    };
    */

    var Arrows = {
        Arrow: Arrow,
        AsyncA: AsyncA
    };

    return Arrows;
}));