'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _raUiMaterialui = require('ra-ui-materialui');

var _NodeActions = require('./NodeActions');

var _NodeActions2 = _interopRequireDefault(_NodeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NodeFormActions = function NodeFormActions(props) {
    return _react2.default.createElement(
        _NodeActions2.default,
        props,
        _react2.default.createElement(_raUiMaterialui.SaveButton, { variant: 'flat' })
    );
};

exports.default = NodeFormActions;
module.exports = exports['default'];