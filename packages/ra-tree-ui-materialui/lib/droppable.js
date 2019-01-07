'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reactDnd = require('react-dnd');

var _constants = require('./constants');

var isDraggingAParent = function isDraggingAParent(props, monitor) {
    var draggedNode = monitor.getItem();

    if (!draggedNode) {
        return false;
    }
    var node = props.node;

    while (node) {
        // If the dragged node is a parent of the current node, it can't be dropped
        if (draggedNode.id === node.id) {
            return true;
        }
        node = node.parent;
    }

    return false;
};

var dropTargetSpecs = {
    drop: function drop(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return props.node;
        }

        return undefined;
    },
    canDrop: function canDrop(props, monitor) {
        return !isDraggingAParent(props, monitor);
    }
};

var dropTargetConnect = function dropTargetConnect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType()
    };
};

exports.default = (0, _reactDnd.DropTarget)(_constants.DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect);
module.exports = exports['default'];