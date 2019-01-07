"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getIsNodeExpanded = exports.getIsNodeExpanded = function getIsNodeExpanded(state, resource, nodeId) {
    return state[resource] && state[resource][nodeId] || false;
};