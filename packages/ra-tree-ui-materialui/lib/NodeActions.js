'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeActions = undefined;

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            alignItems: 'center',
            marginLeft: 'auto',
            marginRight: theme.spacing.unit * 4
        }
    };
};

var NodeActions = exports.NodeActions = function (_Component) {
    (0, _inherits3.default)(NodeActions, _Component);

    function NodeActions() {
        (0, _classCallCheck3.default)(this, NodeActions);
        return (0, _possibleConstructorReturn3.default)(this, (NodeActions.__proto__ || Object.getPrototypeOf(NodeActions)).apply(this, arguments));
    }

    (0, _createClass3.default)(NodeActions, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                classes = _props.classes,
                props = (0, _objectWithoutProperties3.default)(_props, ['children', 'classes']);

            return _react2.default.createElement(
                'span',
                { className: classes.root },
                _react.Children.map(children, function (action) {
                    return action ? (0, _react.cloneElement)(action, props) : null;
                })
            );
        }
    }]);
    return NodeActions;
}(_react.Component);

NodeActions.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    record: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired
};
exports.default = (0, _styles.withStyles)(styles)(NodeActions);