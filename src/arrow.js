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
        var swapA = f.arr(function (pair, cb) {
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
        return f.arr(function (b, cb) {
            cb([b, b]);
        }).next(f.parallel(g));
    }
};

module.exports = Arrow;
