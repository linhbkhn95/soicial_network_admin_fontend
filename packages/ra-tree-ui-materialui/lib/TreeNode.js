'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        expandIcon: {
            margin: 0,
            left: -theme.spacing.unit * 6
        },
        root: {
            alignItems: 'baseline',
            display: 'flex',
            padding: 0,
            flexGrow: 1
        },
        node: {
            alignItems: 'baseline',
            display: 'flex',
            padding: 0,
            flexGrow: 1,
            paddingLeft: theme.spacing.unit * 6
        },
        leaf: {
            display: 'flex',
            flexGrow: 1,
            margin: 0,
            padding: 0,
            paddingLeft: theme.spacing.unit * 6,
            paddingRight: theme.spacing.unit * 4,
            position: 'relative'
        },

        panel: {
            background: 'transparent',
            display: 'block',
            flexGrow: 1,
            margin: 0
        },
        panelDetails: {
            display: 'flex',
            flexDirection: 'column',
            padding: 0
        },
        panelSummary: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: 0,
            padding: 0
        },
        panelSummaryExpanded: {
            margin: 0
        },
        panelSummaryContent: {
            alignItems: 'center',
            margin: 0,

            // JSS notation to reference another class (here panelSummaryExpanded)
            '&$panelSummaryExpanded': {
                margin: 0
            }
        },
        handle: {
            cursor: 'drag',
            alignItems: 'center',
            display: 'flex',
            marginRight: theme.spacing.unit * 2
        },
        draggingOver: {
            background: theme.palette.action.hover
        }
    };
};

var TreeNode = function (_Component) {
    (0, _inherits3.default)(TreeNode, _Component);

    function TreeNode() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, TreeNode);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TreeNode.__proto__ || Object.getPrototypeOf(TreeNode)).call.apply(_ref, [this].concat(args))), _this), _this.handleDrop = function (event) {
            if (_this.props.isOver && _this.props.canDrop) {
                event.persit();
                event.preventDefault();
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TreeNode, [{
        key: 'render',
        value: function render() {
            var _classNames;

            var _props = this.props,
                basePath = _props.basePath,
                canDrop = _props.canDrop,
                children = _props.children,
                classes = _props.classes,
                closeNode = _props.closeNode,
                connectDropTarget = _props.connectDropTarget,
                expandNode = _props.expandNode,
                getIsNodeExpanded = _props.getIsNodeExpanded,
                isOver = _props.isOver,
                isOverCurrent = _props.isOverCurrent,
                itemType = _props.itemType,
                node = _props.node,
                resource = _props.resource,
                treeNodeComponent = _props.treeNodeComponent,
                TreeNodeWithChildren = _props.treeNodeWithChildrenComponent,
                TreeNodeContent = _props.treeNodeContentComponent,
                toggleNode = _props.toggleNode,
                props = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'canDrop', 'children', 'classes', 'closeNode', 'connectDropTarget', 'expandNode', 'getIsNodeExpanded', 'isOver', 'isOverCurrent', 'itemType', 'node', 'resource', 'treeNodeComponent', 'treeNodeWithChildrenComponent', 'treeNodeContentComponent', 'toggleNode']);

            return connectDropTarget(_react2.default.createElement(
                'div',
                { className: classes.root },
                _react2.default.createElement(
                    _ListItem2.default,
                    {
                        button: true,
                        classes: {
                            root: (0, _classnames2.default)((_classNames = {}, (0, _defineProperty3.default)(_classNames, classes.node, node.children.length > 0), (0, _defineProperty3.default)(_classNames, classes.leaf, node.children.length === 0), (0, _defineProperty3.default)(_classNames, classes.draggingOver, isOverCurrent), _classNames))
                        },
                        dense: true,
                        disableGutters: true
                    },
                    node.children.length > 0 ? _react2.default.createElement(
                        TreeNodeWithChildren,
                        (0, _extends3.default)({
                            key: 'TreeNodeWithChildren' + node.id,
                            basePath: basePath,
                            cancelDropOnChildren: !!itemType,
                            classes: classes,
                            closeNode: closeNode,
                            expandNode: expandNode,
                            getIsNodeExpanded: getIsNodeExpanded
                            /*
                            Override the isExpanded prop managed through redux on hover.
                            Set it to undefined when not hovering to fall back to redux state
                            so that it stay expanded if it was before
                            */
                            , isExpanded: isOver && canDrop ? true : undefined,
                            node: node,
                            resource: resource,
                            treeNodeComponent: treeNodeComponent,
                            treeNodeWithChildrenComponent: TreeNodeWithChildren,
                            treeNodeContentComponent: TreeNodeContent,
                            toggleNode: toggleNode
                        }, props),
                        children
                    ) : _react2.default.createElement(
                        _react.Fragment,
                        null,
                        _react2.default.createElement(
                            TreeNodeContent,
                            (0, _extends3.default)({
                                key: 'TreeNodeContent_' + node.id,
                                basePath: basePath,
                                node: node,
                                resource: resource,
                                isLeaf: true,
                                cancelDropOnChildren: !!itemType,
                                onDrop: this.handleDrop,
                                classes: {
                                    handle: classes.handle
                                }
                            }, props),
                            children
                        )
                    )
                )
            ));
        }
    }]);
    return TreeNode;
}(_react.Component);

TreeNode.propTypes = {
    basePath: _propTypes2.default.string.isRequired,
    canDrop: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    closeNode: _propTypes2.default.func,
    connectDropTarget: _propTypes2.default.func,
    expandNode: _propTypes2.default.func,
    getIsNodeExpanded: _propTypes2.default.func,
    isOver: _propTypes2.default.bool,
    isOverCurrent: _propTypes2.default.bool,
    itemType: _propTypes2.default.string,
    node: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired,
    toggleNode: _propTypes2.default.func,
    treeNodeComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    treeNodeContentComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]).isRequired,
    treeNodeWithChildrenComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
};
TreeNode.defaultProps = {
    connectDropTarget: function connectDropTarget(target) {
        return target;
    }
};
exports.default = (0, _styles.withStyles)(styles)(TreeNode);
module.exports = exports['default'];