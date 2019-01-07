'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _pure = require('recompose/pure');

var _pure2 = _interopRequireDefault(_pure);

var _SvgIcon = require('@material-ui/core/SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrowDownward = function (_React$Component) {
  (0, _inherits3.default)(ArrowDownward, _React$Component);

  function ArrowDownward() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ArrowDownward);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ArrowDownward.__proto__ || Object.getPrototypeOf(ArrowDownward)).call.apply(_ref, [this].concat(args))), _this), _this.muiName = 'SvgIcon', _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ArrowDownward, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          direction = _props.direction,
          props = (0, _objectWithoutProperties3.default)(_props, ['active', 'direction']);


      if (active) {
        if (direction === 'desc') {
          return _react2.default.createElement(
            _SvgIcon2.default,
            props,
            _react2.default.createElement(
              'g',
              {
                id: 'Page-1',
                stroke: 'none',
                'stroke-width': '1',
                fill: 'none',
                'fill-rule': 'evenodd',
                'fill-opacity': '0.6'
              },
              _react2.default.createElement(
                'g',
                { id: 'Union', fill: '#203048' },
                _react2.default.createElement('path', {
                  d: 'M0.253451,3.94554 C0.175133,3.90989 0.110389,3.85865 0.0658497,3.79709 C0.0213708,3.73557 -0.0013331,3.66595 6.05025e-05,3.59535 C0.00145411,3.52474 0.0268948,3.4557 0.073781,3.39527 L2.56227,0.192222 C2.60785,0.133553 2.67209,0.0850377 2.74878,0.0513647 C2.82547,0.0176917 2.91201,0 3.00004,0 C3.08807,0 3.17462,0.0176917 3.25131,0.0513647 C3.32799,0.0850377 3.39224,0.133553 3.43782,0.192222 L5.9263,3.39527 C5.97318,3.45572 5.99859,3.52479 5.99994,3.59541 C6.0013,3.66603 5.97854,3.73566 5.93401,3.79718 C5.88947,3.8587 5.82476,3.90989 5.74649,3.94553 C5.66821,3.98117 5.57919,3.99997 5.48853,4 L0.511556,4 C0.420846,3.99999 0.331769,3.98119 0.253451,3.94554 Z',
                  id: 'Shape'
                }),
                _react2.default.createElement('path', {
                  d: 'M5.74655,8.05446 C5.82487,8.09011 5.88961,8.14135 5.93415,8.20291 C5.97863,8.26443 6.00133,8.33405 5.99994,8.40465 C5.99855,8.47526 5.9731,8.5443 5.92622,8.60473 L3.43773,11.8078 C3.39215,11.8664 3.32791,11.915 3.25122,11.9486 C3.17453,11.9823 3.08799,12 2.99996,12 C2.91193,12 2.82538,11.9823 2.74869,11.9486 C2.67201,11.915 2.60776,11.8664 2.56218,11.8078 L0.0736951997,8.60473 C0.0268233997,8.54428 0.0014106697,8.47521 5.72198998e-05,8.40459 C-0.0012962303,8.33397 0.0214581997,8.26434 0.0659922997,8.20282 C0.110526,8.1413 0.175241,8.09011 0.253514,8.05447 C0.331788,8.01883 0.420809,8.00003 0.51147,8 L5.48844,8 C5.57915,8.00001 5.66823,8.01881 5.74655,8.05446 Z',
                  id: 'Path',
                  opacity: '0.105412946'
                })
              )
            )
          );
        }

        return _react2.default.createElement(
          _SvgIcon2.default,
          props,
          _react2.default.createElement(
            'g',
            {
              id: 'Page-1',
              stroke: 'none',
              'stroke-width': '1',
              fill: 'none',
              'fill-rule': 'evenodd',
              'fill-opacity': '0.6'
            },
            _react2.default.createElement(
              'g',
              { id: 'Union', fill: '#203048' },
              _react2.default.createElement('path', {
                d: 'M0.253451,3.94554 C0.175133,3.90989 0.110389,3.85865 0.0658497,3.79709 C0.0213708,3.73557 -0.0013331,3.66595 6.05025e-05,3.59535 C0.00145411,3.52474 0.0268948,3.4557 0.073781,3.39527 L2.56227,0.192222 C2.60785,0.133553 2.67209,0.0850377 2.74878,0.0513647 C2.82547,0.0176917 2.91201,0 3.00004,0 C3.08807,0 3.17462,0.0176917 3.25131,0.0513647 C3.32799,0.0850377 3.39224,0.133553 3.43782,0.192222 L5.9263,3.39527 C5.97318,3.45572 5.99859,3.52479 5.99994,3.59541 C6.0013,3.66603 5.97854,3.73566 5.93401,3.79718 C5.88947,3.8587 5.82476,3.90989 5.74649,3.94553 C5.66821,3.98117 5.57919,3.99997 5.48853,4 L0.511556,4 C0.420846,3.99999 0.331769,3.98119 0.253451,3.94554 Z',
                id: 'Shape',
                opacity: '0.109999999'
              }),
              _react2.default.createElement('path', {
                d: 'M5.74655,8.05446 C5.82487,8.09011 5.88961,8.14135 5.93415,8.20291 C5.97863,8.26443 6.00133,8.33405 5.99994,8.40465 C5.99855,8.47526 5.9731,8.5443 5.92622,8.60473 L3.43773,11.8078 C3.39215,11.8664 3.32791,11.915 3.25122,11.9486 C3.17453,11.9823 3.08799,12 2.99996,12 C2.91193,12 2.82538,11.9823 2.74869,11.9486 C2.67201,11.915 2.60776,11.8664 2.56218,11.8078 L0.0736951997,8.60473 C0.0268233997,8.54428 0.0014106697,8.47521 5.72198998e-05,8.40459 C-0.0012962303,8.33397 0.0214581997,8.26434 0.0659922997,8.20282 C0.110526,8.1413 0.175241,8.09011 0.253514,8.05447 C0.331788,8.01883 0.420809,8.00003 0.51147,8 L5.48844,8 C5.57915,8.00001 5.66823,8.01881 5.74655,8.05446 Z',
                id: 'Path'
              })
            )
          )
        );
      }

      return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', {
          'fill-rule': 'evenodd',
          'clip-rule': 'evenodd',
          d: 'M0.253451 3.94554C0.175133 3.90989 0.110389 3.85865 0.0658497 3.79709C0.0213708 3.73557 -0.0013331 3.66595 6.05025e-05 3.59535C0.00145411 3.52474 0.0268948 3.4557 0.073781 3.39527L2.56227 0.192222C2.60785 0.133553 2.67209 0.0850377 2.74878 0.0513647C2.82547 0.0176917 2.91201 0 3.00004 0C3.08807 0 3.17462 0.0176917 3.25131 0.0513647C3.32799 0.0850377 3.39224 0.133553 3.43782 0.192222L5.9263 3.39527C5.97318 3.45572 5.99859 3.52479 5.99994 3.59541C6.0013 3.66603 5.97854 3.73566 5.93401 3.79718C5.88947 3.8587 5.82476 3.90989 5.74649 3.94553C5.66821 3.98117 5.57919 3.99997 5.48853 4H0.511556C0.420846 3.99999 0.331769 3.98119 0.253451 3.94554ZM5.74655 8.05446C5.82487 8.09011 5.88961 8.14135 5.93415 8.20291C5.97863 8.26443 6.00133 8.33405 5.99994 8.40465C5.99855 8.47526 5.9731 8.5443 5.92622 8.60473L3.43773 11.8078C3.39215 11.8664 3.32791 11.915 3.25122 11.9486C3.17453 11.9823 3.08799 12 2.99996 12C2.91193 12 2.82538 11.9823 2.74869 11.9486C2.67201 11.915 2.60776 11.8664 2.56218 11.8078L0.0736952 8.60473C0.0268234 8.54428 0.00141067 8.47521 5.72202e-05 8.40459C-0.00129623 8.33397 0.0214582 8.26434 0.0659923 8.20282C0.110526 8.1413 0.175241 8.09011 0.253514 8.05447C0.331788 8.01883 0.420809 8.00003 0.51147 8H5.48844C5.57915 8.00001 5.66823 8.01881 5.74655 8.05446Z',
          fill: '#203048',
          'fill-opacity': '0.6'
        })
      );
    }
  }]);
  return ArrowDownward;
}(_react2.default.Component);

exports.default = ArrowDownward;
module.exports = exports['default'];