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
    var _Arrow = function (f) {
        this.f = f;
    };

    var arr = function (f) {
        return new _Arrow(function (x) {
            return new Promise(function (resolve, reject) {
                if (f.length === 1) {
                    resolve(f(x));
                } else {
                    f(x, resolve);
                }
            });
        });
    };

    var first = function (sf) {
        return new _Arrow(function (x, z) {
            var y = sf.f(x);
            return [y, z];
        });
    };

    var next = function (sff, sfg) {
        return new _Arrow(function (x) {
            var y = sff.f(x);
            var z = y.then(function (_y) {
                return sfg.f(_y);
            });

            return z;
        });
    };

    var run = function (sf) {
        var _sf = arguments[0];
        var args = Array.prototype.slice.call(arguments, 1);
        var v = _sf.f.apply(_sf, args);

        return v;
    };

    var Arrow = {
        arr: arr,
        first: first,
        next: next,
        run: run
    };

    return Arrow;
}));