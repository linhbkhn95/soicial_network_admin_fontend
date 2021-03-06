'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _SortIcon = require('./SortIcon');

var _SortIcon2 = _interopRequireDefault(_SortIcon);

var _core = require('@material-ui/core');

var _ButtonBase = require('@material-ui/core/ButtonBase');

var _ButtonBase2 = _interopRequireDefault(_ButtonBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @inheritedComponent ButtonBase

var styles = exports.styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      cursor: 'pointer',
      display: 'inline-flex',
      justifyContent: 'flex-start',
      flexDirection: 'inherit',
      alignItems: 'center',
      '&:hover': {
        color: theme.palette.text.primary
      },
      '&:focus': {
        color: theme.palette.text.primary
      }
    },
    /* Styles applied to the root element if `active={true}`. */
    active: {
      color: theme.palette.text.primary,
      '& $icon': {
        opacity: 1
      }
    },
    /* Styles applied to the icon component. */
    icon: {
      height: 24,
      marginRight: -12,
      marginLeft: 4,
      opacity: 0,
      transition: theme.transitions.create(['opacity', 'transform'], {
        duration: theme.transitions.duration.shorter
      }),
      userSelect: 'none',
      width: 24,
      paddingTop: 10
    },
    /* Styles applied to the icon component if `direction="desc"`. */
    iconDirectionDesc: {
      transform: 'rotate(0deg)'
    },
    /* Styles applied to the icon component if `direction="asc"`. */
    iconDirectionAsc: {
      transform: 'rotate(180deg)'
    }
  };
};

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
function TableSortLabel(props) {
  var active = props.active,
      children = props.children,
      classes = props.classes,
      className = props.className,
      direction = props.direction,
      hideSortIcon = props.hideSortIcon,
      IconComponent = props.IconComponent,
      other = (0, _objectWithoutProperties3.default)(props, ['active', 'children', 'classes', 'className', 'direction', 'hideSortIcon', 'IconComponent']);


  return _react2.default.createElement(
    _ButtonBase2.default,
    (0, _extends3.default)({
      className: (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.active, active), className),
      component: 'span',
      disableRipple: true
    }, other),
    children,
    hideSortIcon ? null : _react2.default.createElement(IconComponent, {
      active: active,
      direction: direction,
      className: (0, _classnames2.default)(classes.icon)
    })
  );
}

TableSortLabel.propTypes = {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active: _propTypes2.default.bool,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children: _propTypes2.default.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: _propTypes2.default.object.isRequired,
  /**
   * @ignore
   */
  className: _propTypes2.default.string,
  /**
   * The current sort direction.
   */
  direction: _propTypes2.default.oneOf(['asc', 'desc']),
  /**
   * Hide sort icon when active is false.
   */
  hideSortIcon: _propTypes2.default.bool,
  /**
   * Sort icon to use.
   */
  IconComponent: _propTypes2.default.func
};

TableSortLabel.defaultProps = {
  active: false,
  direction: 'desc',
  hideSortIcon: false,
  IconComponent: _SortIcon2.default
};

exports.default = (0, _core.withStyles)(styles, { name: 'CustomSortLabel' })(TableSortLabel);