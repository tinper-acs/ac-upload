'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _from = require('babel-runtime/core-js/array/from');

var _from2 = _interopRequireDefault(_from);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _common = require('./common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return (0, _from2.default)(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new _promise2.default(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return _promise2.default.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var Dragger = _tinperBee.Upload.Dragger;
var propTypes = {
    title: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    action: _propTypes2.default.string,
    showUploadList: _propTypes2.default.bool,
    accept: _propTypes2.default.string,
    name: _propTypes2.default.string,
    data: _propTypes2.default.object,
    onSuccess: _propTypes2.default.func,
    onError: _propTypes2.default.func
};

var AcUpload = function (_Component) {
    _inherits(AcUpload, _Component);

    function AcUpload(props) {
        var _this2 = this;

        _classCallCheck(this, AcUpload);

        var _this = _possibleConstructorReturn(this, (AcUpload.__proto__ || (0, _getPrototypeOf2.default)(AcUpload)).call(this, props));

        _this.getElement = function () {
            return document.querySelector('.ac-upload-modal');
        };

        _this.onRemove = function (file) {
            return function () {
                _this.setState(function (_ref) {
                    var fileList = _ref.fileList;

                    var index = fileList.indexOf(file);
                    var newFileList = fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList
                    };
                });
            };
        };

        _this.showModeHandler = function (e) {
            if (e) e.stopPropagation();
            _this.setState({
                show: true
            });
        };

        _this.hideModelHandler = function () {
            _this.setState({
                show: false,
                fileList: []
            });
        };

        _this.onEnter = function () {};

        _this.startUploadClick = _asyncToGenerator(_regenerator2.default.mark(function _callee() {
            var fileList, formData, data, key, result;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this.setState({
                                uploading: true
                            });
                            fileList = _this.state.fileList;
                            formData = new FormData();
                            data = _this.props.data;

                            fileList.forEach(function (file) {
                                formData.append(_this.props.name, file);
                            });
                            for (key in data) {
                                formData.append(key, data[key]);
                            }
                            _context.next = 8;
                            return _axios2.default.post(_this.props.action, formData).catch(function (err) {
                                _this.setState({
                                    uploading: false
                                });
                                _this.props.onError && _this.props.onError(err);
                            });

                        case 8:
                            result = _context.sent;

                            _this.setState({
                                uploading: false
                            });
                            if (result && result.data.status == 1) {
                                _this.props.onSuccess && _this.props.onSuccess(result.data.data);
                                _this.setState({
                                    show: false,
                                    fileList: []
                                });
                            }

                        case 11:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));

        _this.state = {
            show: false,
            uploading: false,
            fileList: []
        };
        _this.uploadProps = {
            name: 'file',
            multiple: props.multiple,
            showUploadList: props.showUploadList,
            action: props.action,
            accept: props.accept,
            beforeUpload: function beforeUpload(file) {
                if (_this.state.fileList.find(function (item) {
                    return item.name == file.name;
                })) {
                    _tinperBee.Message.create({ content: '图片选择重复', color: 'warning' });
                } else {
                    _this.setState(function (_ref3) {
                        var fileList = _ref3.fileList;
                        return {
                            fileList: [].concat(_toConsumableArray(fileList), [file])
                        };
                    });
                }
                return false;
            }
        };
        return _this;
    }

    _createClass(AcUpload, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'div',
                { className: 'ac-upload-wrap' },
                _react2.default.createElement(_tinperBee.Loading, { container: this.getElement, loadingType: 'line', show: this.state.uploading }),
                _react2.default.createElement(
                    'span',
                    { onClick: this.showModeHandler },
                    this.props.children
                ),
                _react2.default.createElement(
                    _tinperBee.Modal,
                    {
                        dialogClassName: 'ac-upload-modal',
                        backdrop: false,
                        autoFocus: false,
                        enforceFocus: false,
                        onEnter: this.onEnter,
                        show: this.state.show,
                        onHide: this.hideModelHandler },
                    _react2.default.createElement(
                        _tinperBee.Modal.Header,
                        {
                            closeButton: true },
                        _react2.default.createElement(
                            _tinperBee.Modal.Title,
                            null,
                            this.props.title
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Body,
                        null,
                        _react2.default.createElement(
                            'div',
                            { className: 'ac-upload-wrap' },
                            _react2.default.createElement(
                                Dragger,
                                this.uploadProps,
                                _react2.default.createElement(
                                    'div',
                                    { className: 'opeat' },
                                    _react2.default.createElement(_tinperBee.Icon, { type: 'inbox', className: 'uf-upload icon-upload' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'upload-tips' },
                                        '\u62D6\u62FD\u6587\u4EF6\u5230\u6B64\u5904\u6216'
                                    ),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'upload-tips' },
                                        '\u70B9\u51FB\u9009\u62E9\u4E0A\u4F20\u6587\u4EF6'
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'file-list' },
                                _react2.default.createElement(
                                    'ul',
                                    { className: 'file-list-item' },
                                    this.state.fileList.map(function (file, index) {
                                        return _react2.default.createElement(
                                            'li',
                                            { className: 'clearfix', key: index },
                                            '\u540D\u79F0:\u300C',
                                            file.name,
                                            '\u300D \u5927\u5C0F:\u300C',
                                            (0, _common.bytesToSize)(file.size),
                                            '\u300D ',
                                            _react2.default.createElement(_tinperBee.Icon, { onClick: _this3.onRemove(file), className: 'file-close', type: 'uf-close-bold', title: '\u5220\u9664' + file.name })
                                        );
                                    })
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _tinperBee.Modal.Footer,
                        null,
                        _react2.default.createElement(
                            _tinperBee.Button,
                            { onClick: this.startUploadClick, disabled: this.state.fileList.length != 0 ? false : true, colors: 'primary' },
                            ' \u5F00\u59CB\u4E0A\u4F20 '
                        )
                    )
                )
            );
        }
    }]);

    return AcUpload;
}(_react.Component);

AcUpload.propTypes = propTypes;
AcUpload.defaultProps = {
    title: "文件上传",
    multiple: false,
    action: "/upload",
    showUploadList: true,
    accept: "",
    name: "files[]",
    data: {}
};
exports.default = AcUpload;