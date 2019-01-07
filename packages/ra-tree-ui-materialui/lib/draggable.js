'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _reactRedux = require('react-redux');

var _reactDnd = require('react-dnd');

var _raCore = require('ra-core');

var _raTreeCore = require('ra-tree-core');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dragSourceSpecs = {
    beginDrag: function beginDrag(props) {
        return props.node;
    },
    endDrag: function endDrag(_ref, monitor) {
        var basePath = _ref.basePath,
            dispatchCrudUpdate = _ref.dispatchCrudUpdate,
            expandNode = _ref.expandNode,
            node = _ref.node,
            parentSource = _ref.parentSource,
            resource = _ref.resource,
            startUndoable = _ref.startUndoable,
            _ref$undoableDragDrop = _ref.undoableDragDrop,
            undoableDragDrop = _ref$undoableDragDrop === undefined ? true : _ref$undoableDragDrop;

        if (!monitor.didDrop()) {
            return;
        }

        var droppedOnNode = monitor.getDropResult();
        if (typeof droppedOnNode.id === 'undefined' || droppedOnNode.id === node.record[parentSource]) {
            return;
        }

        // Ensure the node on which the dragged node has been dropped is expanded along with its parents
        // to avoid the dropped node to disappear
        var nodeToExpand = droppedOnNode;
        expandNode(resource, nodeToExpand.id);

        if (nodeToExpand.parent) {
            do {
                nodeToExpand = nodeToExpand.parent;
                expandNode(resource, nodeToExpand.id);
            } while (nodeToExpand.parent);
        }

        if (undoableDragDrop) {
            return startUndoable((0, _raCore.crudUpdate)(resource, node.record.id, (0, _extends5.default)({}, node.record, (0, _defineProperty3.default)({}, parentSource, droppedOnNode.id)), node.record, basePath, false));
        }

        return dispatchCrudUpdate(resource, node.record.id, (0, _extends5.default)({}, node.record, (0, _defineProperty3.default)({}, parentSource, droppedOnNode.id)), node.record, basePath, false);
    }
};

var dragSourceConnect = function dragSourceConnect(connect, monitor) {
    return {
        connectDragPreview: connect.dragPreview(),
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(undefined, {
    dispatchCrudUpdate: _raCore.crudUpdate,
    expandNode: _raTreeCore.expandNode,
    startUndoable: _raCore.startUndoable
}), (0, _reactDnd.DragSource)(_constants.DROP_TARGET_TYPE, dragSourceSpecs, dragSourceConnect));
module.exports = exports['default'];