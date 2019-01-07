'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var rest = (0, _objectWithoutProperties3.default)(_ref, []);
    return rest;
};

var ImportButton = function (_Component) {
    (0, _inherits3.default)(ImportButton, _Component);

    function ImportButton() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, ImportButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = ImportButton.__proto__ || Object.getPrototypeOf(ImportButton)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function () {
            console.log('import click');
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(ImportButton, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                label = _props.label,
                rest = (0, _objectWithoutProperties3.default)(_props, ['label']);


            return _react2.default.createElement(_Button2.default, (0, _extends3.default)({
                onClick: this.handleClick,
                label: label
            }, sanitizeRestProps(rest)));
        }
    }]);
    return ImportButton;
}(_react.Component);

ImportButton.propTypes = {};


ImportButton.defaultProps = {
    label: 'ra.action.import'
};

exports.default = (0, _reactRedux.connect)()(ImportButton);
module.exports = exports['default'];