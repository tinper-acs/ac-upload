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

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

require('tinper-bee/assets/tinper-bee.css');

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass; }

var Demo = function (_Component) {
    _inherits(Demo, _Component);

    function Demo() {
        _classCallCheck(this, Demo);

        var _this = _possibleConstructorReturn(this, (Demo.__proto__ || (0, _getPrototypeOf2.default)(Demo)).call(this));

        _this.handlerUploadSuccess = function (data) {
            console.log('成功');
            console.log(data);
        };

        _this.addTest = function () {
            _this.setState({
                testList: [{
                    fileName: 'b11a50c1f1-2f8e-4737-b341-e710010307e5_.png',
                    accessAddress: 'http://10.10.24.43:8080/wbalone/images/ba50c1f1-2f8e-4737-b341-e710010307e5_.png'
                }, {
                    fileName: 'b22a50c1f1-2f8e-4737-b341-e710010307e5_.png',
                    accessAddress: 'http://10.10.24.43:8080/wbalone/images/ba50c1f1-2f8e-4737-b341-e710010307e5_.png'
                }]
            });
        };

        _this.state = {
            testList: []
        };
        return _this;
    }

    _createClass(Demo, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    _tinperBee.Button,
                    { onClick: this.addTest, colors: 'success' },
                    '\u52A0'
                ),
                _react2.default.createElement(
                    _index2.default,
                    {
                        action: '/upload.do',
                        defaultFileList: this.state.testList,
                        multiple: true,
                        isView: false,
                        onError: function onError(err) {
                            return alert('上传报错了');
                        },
                        onSuccess: this.handlerUploadSuccess,
                        onDelete: function onDelete(file) {
                            return console.log(file);
                        }
                    },
                    _react2.default.createElement(
                        _tinperBee.Button,
                        { shape: 'border', colors: 'success' },
                        '\u4E0A\u4F20'
                    )
                )
            );
        }
    }]);

    return Demo;
}(_react.Component);

exports.default = Demo;