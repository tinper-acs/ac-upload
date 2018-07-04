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

var getFileTypeIcon = exports.getFileTypeIcon = function getFileTypeIcon(type) {
    var _type = void 0;
    type = type.substr(type.lastIndexOf('.')).toLowerCase();
    switch (type) {
        case '.pdf':
            _type = 'file-svg-pdf';
            break;
        case '.css':
            _type = 'file-svg-css';
            break;
        case '.csv':
            _type = 'file-svg-csv';
            break;
        case '.doc':
            _type = 'file-svg-doc';
            break;
        case '.xlsx':
            _type = 'file-svg-xlsx';
            break;
        case '.xls':
            _type = 'file-svg-xls';
            break;
        case '.exe':
            _type = 'file-svg-exe';
            break;
        case '.fla':
            _type = 'file-svg-fla';
            break;
        case '.html':
            _type = 'file-svg-html';
            break;
        case '.png':
            _type = 'file-svg-png';
            break;
        case '.jpg':
            _type = 'file-svg-jpg';
            break;
        case '.gif':
            _type = 'file-svg-gif';
            break;
        case '.jpeg':
            _type = 'file-svg-jpeg';
            break;
        case '.js':
            _type = 'file-svg-js';
            break;
        case '.ppt':
            _type = 'file-svg-ppt';
            break;
        case '.psd':
            _type = 'file-svg-psd';
            break;
        case '.txt':
            _type = 'file-svg-txt';
            break;
        case '.docx':
            _type = 'file-svg-docx';
            break;
        case '.xml':
            _type = 'file-svg-xml';
            break;
        case '.zip':
            _type = 'file-svg-zip';
            break;
        case '.rar':
            _type = 'file-svg-rar';
            break;
        case '.svg':
            _type = 'file-svg-svg';
            break;

        default:
            _type = 'file-svg-unknown';
            break;
    }
    return _type;
};