'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageField = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _styles = require('@material-ui/core/styles');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _sanitizeRestProps = require('./sanitizeRestProps');

var _sanitizeRestProps2 = _interopRequireDefault(_sanitizeRestProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  list: {
    display: 'flex',
    listStyleType: 'none'
  },
  image: {
    margin: '0.5rem'
  }
};

var ImageField = function ImageField(_ref) {
  var className = _ref.className,
      _ref$imgClassName = _ref.imgClassName,
      imgClassName = _ref$imgClassName === undefined ? '' : _ref$imgClassName,
      _ref$classes = _ref.classes,
      classes = _ref$classes === undefined ? {} : _ref$classes,
      record = _ref.record,
      source = _ref.source,
      src = _ref.src,
      title = _ref.title,
      refForWidth = _ref.refForWidth,
      rest = (0, _objectWithoutProperties3.default)(_ref, ['className', 'imgClassName', 'classes', 'record', 'source', 'src', 'title', 'refForWidth']);

  var sourceValue = (0, _get2.default)(record, source);
  if (!sourceValue) {
    return _react2.default.createElement('div', (0, _extends3.default)({ className: className }, (0, _sanitizeRestProps2.default)(rest)));
  }

  if (Array.isArray(sourceValue)) {
    return _react2.default.createElement(
      'ul',
      (0, _extends3.default)({
        className: (0, _classnames2.default)(classes.list, className)
      }, (0, _sanitizeRestProps2.default)(rest)),
      sourceValue.map(function (file, index) {
        var titleValue = (0, _get2.default)(file, title) || title;
        var srcValue = (0, _get2.default)(file, src) || title;

        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement('img', {
            alt: titleValue,
            title: titleValue,
            src: srcValue,
            className: classes.image
          })
        );
      })
    );
  }

  var titleValue = (0, _get2.default)(record, title) || title;

  return _react2.default.createElement(
    'div',
    (0, _extends3.default)({ ref: refForWidth, className: className }, (0, _sanitizeRestProps2.default)(rest)),
    _react2.default.createElement('img', {
      title: titleValue,
      alt: titleValue,
      src: sourceValue,
      className: classes.image + ' ' + imgClassName
    })
  );
};

exports.ImageField = ImageField;
ImageField.propTypes = {
  imgClassName: _propTypes2.default.string,
  refForWidth: _propTypes2.default.any,
  addLabel: _propTypes2.default.bool,
  basePath: _propTypes2.default.string,
  className: _propTypes2.default.string,
  cellClassName: _propTypes2.default.string,
  headerClassName: _propTypes2.default.string,
  classes: _propTypes2.default.object,
  record: _propTypes2.default.object,
  sortBy: _propTypes2.default.string,
  source: _propTypes2.default.string.isRequired,
  src: _propTypes2.default.string,
  title: _propTypes2.default.string
};

exports.default = (0, _styles.withStyles)(styles)(ImageField);