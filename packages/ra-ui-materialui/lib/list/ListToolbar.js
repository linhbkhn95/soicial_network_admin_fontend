'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toolbar = require('@material-ui/core/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _styles = require('@material-ui/core/styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  toolbar: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'flex-start',
    paddingRight: 0
  }
};

var ListToolbar = function ListToolbar(_ref) {
  var _ref$classes = _ref.classes,
      classes = _ref$classes === undefined ? {} : _ref$classes,
      filters = _ref.filters,
      actions = _ref.actions,
      bulkActions = _ref.bulkActions,
      exporter = _ref.exporter,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['classes', 'filters', 'actions', 'bulkActions', 'exporter']);
  return _react2.default.createElement(
    _Toolbar2.default,
    { className: classes.toolbar },
    filters && _react2.default.cloneElement(filters, (0, _extends3.default)({}, rest, {
      context: 'form'
    })),
    _react2.default.createElement('span', null),
    actions && _react2.default.cloneElement(actions, (0, _extends3.default)({}, rest, {
      bulkActions: bulkActions,
      exporter: exporter
      //filters,
    }))
  );
};

ListToolbar.propTypes = {
  classes: _propTypes2.default.object,
  filters: _propTypes2.default.element,
  actions: _propTypes2.default.element,
  bulkActions: _propTypes2.default.element,
  exporter: _propTypes2.default.func
};

exports.default = (0, _styles.withStyles)(styles)(ListToolbar);
module.exports = exports['default'];