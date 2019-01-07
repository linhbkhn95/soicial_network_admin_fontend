'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _performantArrayToTree = require('performant-array-to-tree');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Recursivly create nodes.
 */
var createNode = function createNode(_ref) {
    var children = _ref.children,
        node = (0, _objectWithoutProperties3.default)(_ref, ['children']);
    return {
        id: node.data.id,
        record: node.data,
        children: children ? children.map(function (child) {
            return createNode(child);
        }) : []
    };
};

/**
 * Recursivly add a parent property to every nodes so that they can a reference to their parent
 */
var addParent = function addParent(node, parent) {
    return (0, _extends4.default)({}, node, {
        children: node.children.map(function (child) {
            return addParent(child, node);
        }),
        parent: parent
    });
};

/**
 * Build a tree representation of the data returned by the List component
 */

exports.default = function (data, parentSource) {
    // arrayToTree requires top level nodes to have their parent id set to null
    var sanitizedData = data.map(function (item) {
        return (0, _extends4.default)({}, item, (0, _defineProperty3.default)({}, parentSource, item[parentSource] || null));
    });

    return (0, _performantArrayToTree.arrayToTree)(sanitizedData, {
        id: 'id',
        parentId: parentSource
    }).map(function (node) {
        return createNode(node, 1);
    }).map(function (node) {
        return addParent(node, null);
    });
};

module.exports = exports['default'];