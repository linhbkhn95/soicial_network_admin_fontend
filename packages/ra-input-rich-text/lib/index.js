'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RichTextInput = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _debounce = require('lodash/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _quill = require('quill');

var _quill2 = _interopRequireDefault(_quill);

var _reactAdmin = require('react-admin');

var _FormHelperText = require('@material-ui/core/FormHelperText');

var _FormHelperText2 = _interopRequireDefault(_FormHelperText);

var _FormControl = require('@material-ui/core/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _styles = require('@material-ui/core/styles');

var _styles2 = require('./styles');

var _styles3 = _interopRequireDefault(_styles2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RichTextInput = exports.RichTextInput = function (_Component) {
    (0, _inherits3.default)(RichTextInput, _Component);

    function RichTextInput() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, RichTextInput);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RichTextInput.__proto__ || Object.getPrototypeOf(RichTextInput)).call.apply(_ref, [this].concat(args))), _this), _this.onTextChange = function () {
            var value = _this.editor.innerHTML == '<p><br></p>' ? '' : _this.editor.innerHTML;
            _this.props.input.onChange(value);
        }, _this.updateDivRef = function (ref) {
            _this.divRef = ref;
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(RichTextInput, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                value = _props.input.value,
                toolbar = _props.toolbar;


            this.quill = new _quill2.default(this.divRef, {
                modules: { toolbar: toolbar },
                theme: 'snow'
            });

            this.quill.setContents(this.quill.clipboard.convert(value));

            this.editor = this.divRef.querySelector('.ql-editor');
            this.quill.on('text-change', (0, _debounce2.default)(this.onTextChange, 500));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.quill.off('text-change', this.onTextChange);
            this.quill = null;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props$meta = this.props.meta,
                error = _props$meta.error,
                _props$meta$helperTex = _props$meta.helperText,
                helperText = _props$meta$helperTex === undefined ? false : _props$meta$helperTex;

            return _react2.default.createElement(
                _FormControl2.default,
                {
                    error: error,
                    fullWidth: this.props.fullWidth,
                    className: 'ra-rich-text-input'
                },
                _react2.default.createElement('div', { ref: this.updateDivRef }),
                error && _react2.default.createElement(
                    _FormHelperText2.default,
                    null,
                    error
                ),
                helperText && _react2.default.createElement(
                    _FormHelperText2.default,
                    null,
                    helperText
                )
            );
        }
    }]);
    return RichTextInput;
}(_react.Component);

RichTextInput.propTypes = {
    addLabel: _propTypes2.default.bool.isRequired,
    classes: _propTypes2.default.object,
    input: _propTypes2.default.object,
    label: _propTypes2.default.string,
    meta: _propTypes2.default.object,
    options: _propTypes2.default.object,
    source: _propTypes2.default.string,
    toolbar: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.bool]),
    fullWidth: _propTypes2.default.bool
};
RichTextInput.defaultProps = {
    addLabel: true,
    options: {},
    record: {},
    toolbar: true,
    fullWidth: true
};


var RichRextInputWithField = (0, _reactAdmin.addField)((0, _styles.withStyles)(_styles3.default)(RichTextInput));

RichRextInputWithField.defaultProps = {
    addLabel: true,
    fullWidth: true
};
exports.default = RichRextInputWithField;