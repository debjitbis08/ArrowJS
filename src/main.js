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
        this.f = f;
    };

    var arr = function (f) {
        return new Arrow(function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return new Promise(function (resolve, reject) {
                console.log(args);
                args.push(resolve);
                f.apply(null, args);
            });
        });
    };

    var first = function (sf) {
        return new Arrow(function (x) {
            return sf.f(x[0]).then(function (_x) {
                return [_x, x[1]];
            });
        });
    };

    var next = function (sff, sfg) {
        return new Arrow(function (x) {
            return sff.f(x).then(function (_y) {
                return sfg.f(_y);
            });
        });
    };

    var run = function (sf) {
        var _sf = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var v = _sf.f.apply(_sf, args);

        return v;
    };

    /** Extra Functions **/

    /**
     * @function second
     * @param f {Arrow}
     * @return {Arrow}
     */
    var second = function (f) {
        var swapA = arr(function (pair, cb) {
            cb([pair[1], pair[0]]);
        });
        return next(next(swapA, first(f)), swapA);
    };

    var parallel = function (f, g) {
        return next(first(f), second(g));
    };

    var both = function (f, g) {
        return next(arr(function (b, cb) {
            cb([b, b]);
        }), parallel(f, g));
    };

    /**
     * Delay the computation pipeline by t milliseconds
     * @function delay
     * @param t {Number}
     * @returns {Arrow}
     */
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

    Arrow.arr = arr;
    Arrow.first = first;
    Arrow.next = next;
    Arrow.run = run;

    Arrow.delay = delay;
    Arrow.second = second;
    Arrow.parallel = parallel;
    Arrow.both = both;

    return Arrow;
}));