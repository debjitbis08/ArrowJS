/*global
 describe,
 expect,
 it,
 TestHelper
 */

'use strict';

(function (global) {

    var Arrows = global.Arrows || require('../src/main');

    describe('ArrowJS', function () {

        describe('Arrow', function () {

            it('should have the function run', function () {
                expect(Arrows.Arrow.prototype.run).to.be.a('function');
            });

            it('should have the function arr', function () {
                expect(Arrows.Arrow.prototype.run).to.be.a('function');
            });

            describe('arr', function () {
                it('should throw a error', function () {
                    var A = Arrows.Arrow();
                    expect(A.arr).to.throw(Error);
                });
            });
        });

        it('should work', function (done) {
            var doubleA = Arrows.AsyncA().arr(function (n, cb) {
                setTimeout(function () {
                    cb(2 * n);
                }, 0);
            });
            var addOneA = Arrows.AsyncA().arr(function (n, cb) {
                cb(n + 1);
            });

            Arrows.AsyncA.prototype.add = function (g) {
                var f = this;
                return f.both(g).next(this.arr(function(v, cb) {
                    cb(v[0] + v[1]);
                }));
            };

            Promise.all([doubleA.next(addOneA).run(2), doubleA.add(addOneA).run(2)]).then(function (v) {
                expect(v[0]).to.equal(5);
                expect(v[1]).to.equal(7);
                done();
            });
        });
    });

})(this);

