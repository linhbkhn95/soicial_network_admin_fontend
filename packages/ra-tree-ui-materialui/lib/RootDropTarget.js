'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactDnd = require('react-dnd');

var _styles = require('@material-ui/core/styles');

var _Typography = require('@material-ui/core/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _ListItem = require('@material-ui/core/ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _GetApp = require('@material-ui/icons/GetApp');

var _GetApp2 = _interopRequireDefault(_GetApp);

var _constants = require('./constants');

var _raCore = require('ra-core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
    return {
        root: {
            paddingLeft: theme.spacing.unit * 6
        },
        text: {
            paddingLeft: theme.spacing.unit * 2,
            paddingTop: theme.spacing.unit,
            paddingBottom: theme.spacing.unit
        },
        hover: {
            backgroundColor: theme.palette.action.active
        }
    };
};

var RootDropTarget = function (_Component) {
    (0, _inherits3.default)(RootDropTarget, _Component);

    function RootDropTarget() {
        (0, _classCallCheck3.default)(this, RootDropTarget);
        return (0, _possibleConstructorReturn3.default)(this, (RootDropTarget.__proto__ || Object.getPrototypeOf(RootDropTarget)).apply(this, arguments));
    }

    (0, _createClass3.default)(RootDropTarget, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return this.props.canDrop !== nextProps.canDrop || this.props.isOverCurrent !== nextProps.isOverCurrent;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                canDrop = _props.canDrop,
                classes = _props.classes,
                connectDropTarget = _props.connectDropTarget,
                isOverCurrent = _props.isOverCurrent,
                translate = _props.translate;

            return _react2.default.createElement(
                _ListItem2.default,
                {
                    className: (0, _classnames2.default)(classes.root, (0, _defineProperty3.default)({}, classes.hover, canDrop && isOverCurrent)),
                    disabled: !canDrop
                },
                _react2.default.createElement(_GetApp2.default, null),
                connectDropTarget(_react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                        _Typography2.default,
                        { className: classes.text },
                        translate('ra.tree.root_target')
                    )
                ))
            );
        }
    }]);
    return RootDropTarget;
}(_react.Component);

RootDropTarget.propTypes = {
    canDrop: _propTypes2.default.bool,
    classes: _propTypes2.default.object.isRequired,
    connectDropTarget: _propTypes2.default.func.isRequired,
    isOverCurrent: _propTypes2.default.bool,
    translate: _propTypes2.default.func.isRequired
};


var dropTargetSpecs = {
    drop: function drop(props, monitor) {
        if (monitor.isOver({ shallow: true })) {
            return { id: null, record: { id: null } };
        }

        return undefined;
    },
    canDrop: function canDrop(props, monitor) {
        var item = monitor.getItem();
        return item.parent;
    }
};

var dropTargetConnect = function dropTargetConnect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        item: monitor.getItem()
    };
};

exports.default = (0, _compose2.default)((0, _reactDnd.DropTarget)(_constants.DROP_TARGET_TYPE, dropTargetSpecs, dropTargetConnect), _raCore.translate, (0, _styles.withStyles)(styles))(RootDropTarget);
module.exports = exports['default'];