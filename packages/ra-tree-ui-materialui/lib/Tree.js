'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tree = exports.styles = undefined;

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

var _styles = require('@material-ui/core/styles');

var _List = require('@material-ui/core/List');

var _List2 = _interopRequireDefault(_List);

var _raTreeCore = require('ra-tree-core');

var _reactDnd = require('react-dnd');

var _reactDndTouchBackend = require('react-dnd-touch-backend');

var _reactDndTouchBackend2 = _interopRequireDefault(_reactDndTouchBackend);

var _draggable = require('./draggable');

var _draggable2 = _interopRequireDefault(_draggable);

var _droppable = require('./droppable');

var _droppable2 = _interopRequireDefault(_droppable);

var _DragLayer = require('./DragLayer');

var _DragLayer2 = _interopRequireDefault(_DragLayer);

var _DragPreview = require('./DragPreview');

var _DragPreview2 = _interopRequireDefault(_DragPreview);

var _TreeNode = require('./TreeNode');

var _TreeNode2 = _interopRequireDefault(_TreeNode);

var _TreeNodeContent = require('./TreeNodeContent');

var _TreeNodeContent2 = _interopRequireDefault(_TreeNodeContent);

var _TreeNodeWithChildren = require('./TreeNodeWithChildren');

var _TreeNodeWithChildren2 = _interopRequireDefault(_TreeNodeWithChildren);

var _RootDropTarget = require('./RootDropTarget');

var _RootDropTarget2 = _interopRequireDefault(_RootDropTarget);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = exports.styles = {
    root: {
        display: 'flex',
        flexDirection: 'column'
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var currentSort = _ref.currentSort,
        defaultTitle = _ref.defaultTitle,
        displayedFilters = _ref.displayedFilters,
        filterValues = _ref.filterValues,
        hasBulkActions = _ref.hasBulkActions,
        hasCreate = _ref.hasCreate,
        hideFilter = _ref.hideFilter,
        isLoading = _ref.isLoading,
        getTreeState = _ref.getTreeState,
        perPage = _ref.perPage,
        selectedIds = _ref.selectedIds,
        setFilters = _ref.setFilters,
        setPage = _ref.setPage,
        setPerPage = _ref.setPerPage,
        setSelectedIds = _ref.setSelectedIds,
        setSort = _ref.setSort,
        showFilter = _ref.showFilter,
        rest = (0, _objectWithoutProperties3.default)(_ref, ['currentSort', 'defaultTitle', 'displayedFilters', 'filterValues', 'hasBulkActions', 'hasCreate', 'hideFilter', 'isLoading', 'getTreeState', 'perPage', 'selectedIds', 'setFilters', 'setPage', 'setPerPage', 'setSelectedIds', 'setSort', 'showFilter']);
    return rest;
};

var warnAboutChildren = function warnAboutChildren() {
    return console.warn( // eslint-disable-line
    'You passed multiple children to the Tree component. You must either pass it a NodeView or a NodeForm component as its only child:\n\n    <Tree>\n        <NodeView>\n            <TextField source="name" />\n        </NodeView>\n    </Tree>\n\n    // Or\n\n    <Tree>\n        <NodeForm>\n            <TextInput source="name" />\n        </NodeForm>\n    </Tree>\n\nIf you need actions on each node, use the actions prop on either the NodeView or NodeForm component:\n\n    const MyNodeActions = props => (\n        <NodeActions {...props}>\n            <EditButton />\n            <ShowButton />\n            <DeleteButton />\n        </NodeActions>\n    );\n\n    <Tree>\n        <NodeView actions={<MyNodeActions />}>\n            <TextField source="name" />\n        </NodeView>\n    </Tree>\n\n    // Or\n\n    const MyNodeActions = props => (\n        <NodeActions {...props}>\n            <SaveButton variant="flat" />\n            <IgnoreFormProps>\n                <EditButton />\n                <ShowButton />\n                <DeleteButton />\n            </IgnoreFormProps>\n        </NodeActions>\n    );\n\n    <Tree>\n        <NodeForm actions={<MyNodeActions />}>\n            <TextInput source="name" />\n        </NodeForm>\n    </Tree>\n');
};

var Tree = exports.Tree = function (_Component) {
    (0, _inherits3.default)(Tree, _Component);

    function Tree() {
        (0, _classCallCheck3.default)(this, Tree);
        return (0, _possibleConstructorReturn3.default)(this, (Tree.__proto__ || Object.getPrototypeOf(Tree)).apply(this, arguments));
    }

    (0, _createClass3.default)(Tree, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var childrenCount = _react.Children.count(this.props.children);

            if (childrenCount > 1 && process.env.NODE_ENV !== 'production') {
                warnAboutChildren();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                allowDropOnRoot = _props.allowDropOnRoot,
                children = _props.children,
                classes = _props.classes,
                dragPreviewComponent = _props.dragPreviewComponent,
                enableDragAndDrop = _props.enableDragAndDrop,
                parentSource = _props.parentSource,
                treeNodeComponent = _props.treeNodeComponent,
                treeNodeWithChildrenComponent = _props.treeNodeWithChildrenComponent,
                treeNodeContentComponent = _props.treeNodeContentComponent,
                props = (0, _objectWithoutProperties3.default)(_props, ['allowDropOnRoot', 'children', 'classes', 'dragPreviewComponent', 'enableDragAndDrop', 'parentSource', 'treeNodeComponent', 'treeNodeWithChildrenComponent', 'treeNodeContentComponent']);

            var Container = enableDragAndDrop ? (0, _reactDnd.DragDropContext)((0, _reactDndTouchBackend2.default)({
                enableKeyboardEvents: true,
                enableMouseEvents: true,
                enableTouchEvents: true
            }))('div') : _react.Fragment;

            var TreeNode = enableDragAndDrop ? (0, _droppable2.default)(treeNodeComponent) : treeNodeComponent;

            var TreeNodeContent = enableDragAndDrop ? (0, _draggable2.default)(treeNodeContentComponent) : treeNodeContentComponent;

            return _react2.default.createElement(
                _raTreeCore.TreeController,
                (0, _extends3.default)({ parentSource: parentSource }, props),
                function (_ref2) {
                    var getTreeState = _ref2.getTreeState,
                        tree = _ref2.tree,
                        controllerProps = (0, _objectWithoutProperties3.default)(_ref2, ['getTreeState', 'tree']);
                    return _react2.default.createElement(
                        Container,
                        null,
                        enableDragAndDrop ? _react2.default.createElement(_DragLayer2.default, {
                            dragPreviewComponent: dragPreviewComponent
                        }) : null,
                        _react2.default.createElement(
                            _List2.default,
                            {
                                classes: {
                                    root: classes.root
                                },
                                dense: true,
                                disablePadding: true
                            },
                            enableDragAndDrop && allowDropOnRoot ? _react2.default.createElement(_RootDropTarget2.default, { parentSource: parentSource }) : null,
                            tree.map(function (node) {
                                return _react2.default.createElement(
                                    TreeNode,
                                    (0, _extends3.default)({
                                        key: 'TreeNode_' + node.id,
                                        classes: (0, _extends3.default)({}, classes, {
                                            root: classes.node || undefined
                                        }),
                                        getTreeState: getTreeState,
                                        node: node,
                                        treeNodeComponent: TreeNode,
                                        treeNodeWithChildrenComponent: treeNodeWithChildrenComponent,
                                        treeNodeContentComponent: TreeNodeContent
                                    }, sanitizeRestProps(controllerProps)),
                                    children
                                );
                            })
                        )
                    );
                }
            );
        }
    }]);
    return Tree;
}(_react.Component);

Tree.propTypes = {
    allowDropOnRoot: _propTypes2.default.bool,
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    enableDragAndDrop: _propTypes2.default.bool,
    getTreeFromArray: _propTypes2.default.func,
    parentSource: _propTypes2.default.string,
    resource: _propTypes2.default.string.isRequired,
    dragPreviewComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    treeNodeComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    treeNodeContentComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]),
    treeNodeWithChildrenComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func])
};

Tree.defaultProps = {
    classes: {},
    parentSource: 'parent_id',
    dragPreviewComponent: _DragPreview2.default,
    treeNodeComponent: _TreeNode2.default,
    treeNodeContentComponent: _TreeNodeContent2.default,
    treeNodeWithChildrenComponent: _TreeNodeWithChildren2.default
};

exports.default = (0, _styles.withStyles)(styles)(Tree);