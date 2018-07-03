'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var bytesToSize = exports.bytesToSize = function bytesToSize(bytes) {
    if (bytes === 0) return '0 B';
    var k = 1000,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
};

var getPercent = exports.getPercent = function getPercent(num, total) {
    return total <= 0 ? 0 : Math.round(num / total * 10000) / 100.00;
};