'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sanitizeRestProps = function sanitizeRestProps(_ref) {
  var handleSubmit = _ref.handleSubmit,
      handleSubmitWithRedirect = _ref.handleSubmitWithRedirect,
      invalid = _ref.invalid,
      pristine = _ref.pristine,
      saving = _ref.saving,
      submitOnEnter = _ref.submitOnEnter,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['handleSubmit', 'handleSubmitWithRedirect', 'invalid', 'pristine', 'saving', 'submitOnEnter']);
  return rest;
};

/**
 * This component ensure form related props are not passed to its children. This is required
 * in `NodeActions` is used inside a NodeForm and buttons not related to form (such as EditButton
 * or DeleteButton) are used.
 *
 * @example
 * const CustomNodeActions = props => (
 *     <NodeActions {...props}>
 *         <SaveButton variant="flat" />
 *         <IgnoreFormProps>
 *             <EditButton />
 *             <ShowButton />
 *             <DeleteButton />
 *         </IgnoreFormProps>
 *     </NodeActions>
 * );
 */
var IgnoreFormProps = function IgnoreFormProps(_ref2) {
  var children = _ref2.children,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['children']);
  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react.Children.map(children, function (child) {
      return (0, _react.cloneElement)(child, sanitizeRestProps(props));
    })
  );
};

IgnoreFormProps.propTypes = {
  children: _propTypes2.default.node.isRequired
};

exports.default = IgnoreFormProps;
module.exports = exports['default'];