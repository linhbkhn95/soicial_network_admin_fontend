'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _DragHandle = require('@material-ui/icons/DragHandle');

var _DragHandle2 = _interopRequireDefault(_DragHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNodeContent = function (_Component) {
    (0, _inherits3.default)(TreeNodeContent, _Component);

    function TreeNodeContent() {
        (0, _classCallCheck3.default)(this, TreeNodeContent);
        return (0, _possibleConstructorReturn3.default)(this, (TreeNodeContent.__proto__ || Object.getPrototypeOf(TreeNodeContent)).apply(this, arguments));
    }

    (0, _createClass3.default)(TreeNodeContent, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                classes = _props.classes,
                connectDragPreview = _props.connectDragPreview,
                connectDragSource = _props.connectDragSource,
                Container = _props.containerElement,
                expandNode = _props.expandNode,
                submit = _props.submit,
                isLeaf = _props.isLeaf,
                node = _props.node,
                props = (0, _objectWithoutProperties3.default)(_props, ['children', 'classes', 'connectDragPreview', 'connectDragSource', 'containerElement', 'expandNode', 'submit', 'isLeaf', 'node']);

            return _react2.default.createElement(
                _react.Fragment,
                null,
                (0, _react.cloneElement)(_react.Children.only(children), (0, _extends3.default)({ node: node }, props)),
                connectDragPreview && connectDragPreview(_react2.default.createElement('span', null), {
                    // IE fallback: specify that we'd rather screenshot the node
                    // when it already knows it's being dragged so we can hide it with CSS.
                    captureDraggingState: true
                }),
                connectDragSource && connectDragSource(_react2.default.createElement(
                    'div',
                    { className: classes.handle },
                    _react2.default.createElement(_DragHandle2.default, null)
                ))
            );
        }
    }]);
    return TreeNodeContent;
}(_react.Component);

TreeNodeContent.propTypes = {
    basePath: _propTypes2.default.string.isRequired,
    cancelDropOnChildren: _propTypes2.default.bool,
    connectDragPreview: _propTypes2.default.func,
    connectDragSource: _propTypes2.default.func,
    containerElement: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func, _propTypes2.default.string]),
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object.isRequired,
    expandNode: _propTypes2.default.func,
    isLeaf: _propTypes2.default.bool,
    node: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired,
    submit: _propTypes2.default.func
};
TreeNodeContent.defaultProps = {
    containerElement: 'div'
};
exports.default = TreeNodeContent;
module.exports = exports['default'];