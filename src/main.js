'use strict';

var Arrow = require('./arrow');
var AsyncA = require('./asyncA');

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

module.exports = {
    Arrow: Arrow,
    AsyncA: AsyncA
};
