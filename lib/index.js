'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty = require('babel-runtime/core-js/object/define-property');

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _setPrototypeOf = require('babel-runtime/core-js/object/set-prototype-of');

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require('babel-runtime/core-js/object/create');

var _create2 = _interopRequireDefault(_create);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; (0, _defineProperty2.default)(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tinperBee = require('tinper-bee');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
    title: _propTypes2.default.string,
    multiple: _propTypes2.default.bool,
    action: _propTypes2.default.string,
    showUploadList: _propTypes2.default.bool,
    accept: _propTypes2.default.string,
    name: _propTypes2.default.string,
    data: _propTypes2.default.object,
    maxSize: _propTypes2.default.number,
    isView: _propTypes2.default.bool
};

var AcUpload = function (_Component) {
    _inherits(AcUpload, _Component);

    function AcUpload(props) {
        _classCallCheck(this, AcUpload);

        var _this = _possibleConstructorReturn(this, (AcUpload.__proto__ || (0, _getPrototypeOf2.default)(AcUpload)).call(this, props));

        _this.componentWillReceiveProps = function (newProps) {
            _this.setState({
                historyData: newProps.defaultFileList
            });
        };

        _this.defaultFileListToList = function (_list) {
            var newData = [];
            if (Array.isArray(_list)) {
                for (var i = 0; i < _list.length; i++) {
                    if (_list[i]['del'] == null) {
                        newData.push({
                            uid: _list[i].fileName,
                            name: _list[i].originalFileName,
                            status: 'done',
                            url: _list[i].accessAddress
                        });
                    }
                }
            }
            return newData;
        };

        _this.showModeHandler = function (e) {
            if (e) e.stopPropagation();
            _this.setState({
                show: true
            });
        };

        _this.hideModelHandler = function () {
            _this.setState({
                show: false
            });
        };

        _this.viewFileHandler = function () {
            _this.setState({
                show: true
            });
        };

        _this.state = {
            show: false,
            historyData: props.defaultFileList
        };
        return _this;
    }

    _createClass(AcUpload, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var uploadProps = {
                name: this.props.name,
                data: this.props.data,
                size: this.props.maxSize,
                multiple: this.props.multiple,
                showUploadList: this.props.showUploadList,
                action: this.props.action,
                accept: this.props.accept,
                defaultFileList: this.defaultFileListToList(this.state.historyData),
                onChange: function onChange(msg) {
                    if (msg.file.status == 'done') {
                        _this2.props.onSuccess && _this2.props.onSuccess(msg.file.response);
                        if (!_this2.props.multiple) {
                            _this2.setState({
                                show: false
                            });
                        }
                    }
                    if (msg.file.status == 'error') {
                        _this2.props.onError && _this2.props.onError();
                    }
                    if (msg.file.status == 'uploading') {
                        console.log('uploading');
                    }
                    if (msg.file.status == 'removed') {
                        console.log(msg);
                        _this2.props.onDelete && _this2.props.onDelete(msg.file);
                    }
                }
            };
            return _react2.default.createElement(
                'span',
                { className: 'ac-upload-wrap' },
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
                                _tinperBee.Upload,
                                uploadProps,
                                !this.props.isView && _react2.default.createElement(
                                    'div',
                                    { className: 'opeat' },
                                    _react2.default.createElement('div', { className: 'svg-ready' }),
                                    _react2.default.createElement(
                                        'div',
                                        { className: 'upload-tips' },
                                        '\u70B9\u51FB\u9009\u62E9\u4E0A\u4F20\u6587\u4EF6'
                                    )
                                )
                            ),
                            this.props.isView && this.props.defaultFileList.length == 0 && _react2.default.createElement(
                                'div',
                                { className: 'opeat' },
                                _react2.default.createElement('div', { className: 'svg-no-pic' }),
                                _react2.default.createElement(
                                    'div',
                                    { style: { "fontSize": "14px" }, className: 'upload-tips' },
                                    '\u6682\u65E0\u9644\u4EF6'
                                )
                            )
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
    action: "/iuap_pap_quickstart/fileMananger/fastDfs/imgUpload",
    showUploadList: true,
    accept: "",
    name: "files[]",
    data: {},
    maxSize: 10240000000,
    defaultFileList: [],
    isView: false
};
exports.default = AcUpload;