'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        item: {
            alignItems: 'center',
            backgroundColor: theme.palette.action.active,
            display: 'inline-flex',
            height: 72,
            minWidth: 72,
            paddingTop: theme.spacing.unit * 1.5,
            paddingBottom: theme.spacing.unit * 1.5,
            paddingLeft: theme.spacing.unit * 6,
            paddingRight: theme.spacing.unit * 4
        }
    };
};

var DragPreview = function (_Component) {
    (0, _inherits3.default)(DragPreview, _Component);

    function DragPreview() {
        (0, _classCallCheck3.default)(this, DragPreview);
        return (0, _possibleConstructorReturn3.default)(this, (DragPreview.__proto__ || Object.getPrototypeOf(DragPreview)).apply(this, arguments));
    }

    (0, _createClass3.default)(DragPreview, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                className = _props.className,
                classes = _props.classes,
                node = _props.node,
                style = _props.style,
                translate = _props.translate;

            return _react2.default.createElement(
                'div',
                { className: className || classes.item, style: style },
                children ? typeof children === 'function' ? children({ node: node, translate: translate }) : children : translate('ra.tree.drag_preview', {
                    id: node.id,
                    smart_count: node.children.length
                })
            );
        }
    }]);
    return DragPreview;
}(_react.Component);

DragPreview.propTypes = {
    children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.func]),
    className: _propTypes2.default.string,
    classes: _propTypes2.default.object,
    node: _propTypes2.default.object,
    style: _propTypes2.default.object,
    translate: _propTypes2.default.func.isRequired
};

exports.default = (0, _compose2.default)(_raCore.translate, (0, _styles.withStyles)(styles))(DragPreview);
module.exports = exports['default'];