'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NodeView = undefined;

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTAINER_CLASS = 'treenode-content';

var styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var cancelDropOnChildren = _ref.cancelDropOnChildren,
        crudUpdate = _ref.crudUpdate,
        dispatchCrudUpdate = _ref.dispatchCrudUpdate,
        getTreeState = _ref.getTreeState,
        isDragging = _ref.isDragging,
        onSelect = _ref.onSelect,
        onToggleItem = _ref.onToggleItem,
        onUnselectItems = _ref.onUnselectItems,
        parentSource = _ref.parentSource,
        startUndoable = _ref.startUndoable,
        translate = _ref.translate,
        undoable = _ref.undoable,
        undoableDragDrop = _ref.undoableDragDrop,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['cancelDropOnChildren', 'crudUpdate', 'dispatchCrudUpdate', 'getTreeState', 'isDragging', 'onSelect', 'onToggleItem', 'onUnselectItems', 'parentSource', 'startUndoable', 'translate', 'undoable', 'undoableDragDrop']);
    return rest;
};

var NodeView = exports.NodeView = function (_Component) {
    (0, _inherits3.default)(NodeView, _Component);

    function NodeView() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, NodeView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = NodeView.__proto__ || Object.getPrototypeOf(NodeView)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.persist();
            // This ensure clicking on a button does not collapse/expand a node
            // When clicking on the form (empty spaces around buttons) however, it should
            // propagate to the parent
            if (!event.target.matches('.' + CONTAINER_CLASS)) {
                event.stopPropagation();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(NodeView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                actions = _props.actions,
                basePath = _props.basePath,
                children = _props.children,
                classes = _props.classes,
                node = _props.node,
                resource = _props.resource,
                props = (0, _objectWithoutProperties3.default)(_props, ['actions', 'basePath', 'children', 'classes', 'node', 'resource']);


            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({
                    className: (0, _classnames2.default)(CONTAINER_CLASS, classes.root),
                    onClick: this.handleClick
                }, sanitizeRestProps(props)),
                _react.Children.map(children, function (field) {
                    return field ? (0, _react.cloneElement)(field, {
                        basePath: field.props.basePath || basePath,
                        record: node.record,
                        resource: resource
                    }) : null;
                }),
                actions && (0, _react.cloneElement)(actions, {
                    basePath: basePath,
                    record: node.record,
                    resource: resource
                })
            );
        }
    }]);
    return NodeView;
}(_react.Component);

NodeView.propTypes = {
    actions: _propTypes2.default.node,
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    node: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired
};
exports.default = (0, _styles.withStyles)(styles)(NodeView);