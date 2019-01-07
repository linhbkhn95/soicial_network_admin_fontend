'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        nodeId = _ref.payload,
        meta = _ref.meta;

    if (![_actions.CLOSE_NODE, _actions.TOGGLE_NODE, _actions.EXPAND_NODE].includes(type)) {
        return state;
    }
    if (!meta.resource) {
        console.warn('The ' + type + ' action does not have a resource meta'); // eslint-disable-line
        return state;
    }

    return (0, _extends5.default)({}, state, (0, _defineProperty3.default)({}, meta.resource, (0, _extends5.default)({}, state[meta.resource] || {}, (0, _defineProperty3.default)({}, nodeId, type === _actions.TOGGLE_NODE ? state[meta.resource] ? !state[meta.resource][nodeId] : true : type === _actions.EXPAND_NODE))));
};

module.exports = exports['default'];