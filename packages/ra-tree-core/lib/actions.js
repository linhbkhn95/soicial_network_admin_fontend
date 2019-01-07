'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var TOGGLE_NODE = exports.TOGGLE_NODE = 'RA/TREE/TOGGLE_NODE';
var EXPAND_NODE = exports.EXPAND_NODE = 'RA/TREE/EXPAND_NODE';
var CLOSE_NODE = exports.CLOSE_NODE = 'RA/TREE/CLOSE_NODE';

var toggleNode = exports.toggleNode = function toggleNode(resource, nodeId) {
    return {
        type: TOGGLE_NODE,
        payload: nodeId,
        meta: { resource: resource }
    };
};

var expandNode = exports.expandNode = function expandNode(resource, nodeId) {
    return {
        type: EXPAND_NODE,
        payload: nodeId,
        meta: { resource: resource }
    };
};

var closeNode = exports.closeNode = function closeNode(resource, nodeId) {
    return {
        type: CLOSE_NODE,
        payload: nodeId,
        meta: { resource: resource }
    };
};