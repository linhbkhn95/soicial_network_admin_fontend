'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeNodeWithChildren = undefined;

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

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _ExpansionPanel = require('@material-ui/core/ExpansionPanel');

var _ExpansionPanel2 = _interopRequireDefault(_ExpansionPanel);

var _ExpansionPanelDetails = require('@material-ui/core/ExpansionPanelDetails');

var _ExpansionPanelDetails2 = _interopRequireDefault(_ExpansionPanelDetails);

var _ExpansionPanelSummary = require('@material-ui/core/ExpansionPanelSummary');

var _ExpansionPanelSummary2 = _interopRequireDefault(_ExpansionPanelSummary);

var _KeyboardArrowDown = require('@material-ui/icons/KeyboardArrowDown');

var _KeyboardArrowDown2 = _interopRequireDefault(_KeyboardArrowDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TreeNodeWithChildren = exports.TreeNodeWithChildren = function (_Component) {
    (0, _inherits3.default)(TreeNodeWithChildren, _Component);

    function TreeNodeWithChildren() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, TreeNodeWithChildren);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TreeNodeWithChildren.__proto__ || Object.getPrototypeOf(TreeNodeWithChildren)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function () {
            var _this$props = _this.props,
                toggleNode = _this$props.toggleNode,
                node = _this$props.node;


            toggleNode(node.id);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TreeNodeWithChildren, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                basePath = _props.basePath,
                cancelDropOnChildren = _props.cancelDropOnChildren,
                children = _props.children,
                classes = _props.classes,
                closeNode = _props.closeNode,
                expandNode = _props.expandNode,
                getIsNodeExpanded = _props.getIsNodeExpanded,
                isExpanded = _props.isExpanded,
                node = _props.node,
                resource = _props.resource,
                toggleNode = _props.toggleNode,
                TreeNode = _props.treeNodeComponent,
                treeNodeWithChildrenComponent = _props.treeNodeWithChildrenComponent,
                TreeNodeContent = _props.treeNodeContentComponent,
                props = (0, _objectWithoutProperties3.default)(_props, ['basePath', 'cancelDropOnChildren', 'children', 'classes', 'closeNode', 'expandNode', 'getIsNodeExpanded', 'isExpanded', 'node', 'resource', 'toggleNode', 'treeNodeComponent', 'treeNodeWithChildrenComponent', 'treeNodeContentComponent']);


            return _react2.default.createElement(
                _ExpansionPanel2.default,
                {
                    classes: {
                        root: classes.panel
                    },
                    elevation: 0,
                    expanded: isExpanded || getIsNodeExpanded(node.id),
                    onChange: this.handleChange
                },
                _react2.default.createElement(
                    _ExpansionPanelSummary2.default,
                    {
                        classes: {
                            content: classes.panelSummaryContent,
                            expandIcon: classes.expandIcon,
                            root: classes.panelSummary,
                            expanded: classes.panelSummaryExpanded
                        },
                        expandIcon: _react2.default.createElement(_KeyboardArrowDown2.default, null)
                    },
                    _react2.default.createElement(
                        TreeNodeContent,
                        (0, _extends3.default)({
                            key: 'TreeNodeContent' + node.id,
                            basePath: basePath,
                            node: node,
                            resource: resource,
                            cancelDropOnChildren: cancelDropOnChildren,
                            classes: {
                                handle: classes.handle
                            }
                        }, props),
                        children
                    )
                ),
                _react2.default.createElement(
                    _ExpansionPanelDetails2.default,
                    {
                        classes: {
                            root: classes.panelDetails
                        }
                    },
                    _react2.default.createElement(
                        _List2.default,
                        { dense: true },
                        node.children.map(function (child) {
                            return _react2.default.createElement(
                                TreeNode,
                                (0, _extends3.default)({
                                    key: 'TreeNode_' + child.id,
                                    basePath: basePath,
                                    classes: classes,
                                    node: child,
                                    getIsNodeExpanded: getIsNodeExpanded,
                                    resource: resource,
                                    treeNodeComponent: TreeNode,
                                    treeNodeWithChildrenComponent: treeNodeWithChildrenComponent,
                                    treeNodeContentComponent: TreeNodeContent,
                                    toggleNode: toggleNode,
                                    closeNode: closeNode,
                                    expandNode: expandNode
                                }, props),
                                children
                            );
                        })
                    )
                )
            );
        }
    }]);
    return TreeNodeWithChildren;
}(_react.Component);

TreeNodeWithChildren.propTypes = {
    basePath: _propTypes2.default.string.isRequired,
    cancelDropOnChildren: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    closeNode: _propTypes2.default.func,
    expandNode: _propTypes2.default.func,
    getIsNodeExpanded: _propTypes2.default.func,
    isExpanded: _propTypes2.default.bool,
    node: _propTypes2.default.object.isRequired,
    resource: _propTypes2.default.string.isRequired,
    toggleNode: _propTypes2.default.func,
    treeNodeComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    treeNodeContentComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]).isRequired,
    treeNodeWithChildrenComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
};
exports.default = TreeNodeWithChildren;