'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _reactDnd = require('react-dnd');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Custom DragLayer from Alejandro Hernandez
 * See https://github.com/react-dnd/react-dnd/issues/592#issuecomment-399287474
 */
var styles = {
    layer: {
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: 100,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    },
    item: {}
};

var CustomDragLayer = function (_Component) {
    (0, _inherits3.default)(CustomDragLayer, _Component);

    function CustomDragLayer() {
        (0, _classCallCheck3.default)(this, CustomDragLayer);
        return (0, _possibleConstructorReturn3.default)(this, (CustomDragLayer.__proto__ || Object.getPrototypeOf(CustomDragLayer)).apply(this, arguments));
    }

    (0, _createClass3.default)(CustomDragLayer, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return !(0, _isEqual2.default)(this.props.offset, nextProps.offset);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                classes = _props.classes,
                beingDragged = _props.beingDragged,
                DragPreview = _props.dragPreviewComponent,
                itemBeingDragged = _props.itemBeingDragged,
                offset = _props.offset;

            if (!beingDragged || !offset) return null;

            return _react2.default.createElement(
                'div',
                { className: classes.layer },
                _react2.default.createElement(
                    'div',
                    {
                        role: 'presentation',
                        className: classes.item,
                        style: {
                            transform: 'translate(' + offset.x + 'px, ' + offset.y + 'px)'
                        }
                    },
                    _react2.default.createElement(DragPreview, { node: itemBeingDragged })
                )
            );
        }
    }]);
    return CustomDragLayer;
}(_react.Component);

CustomDragLayer.propTypes = {
    beingDragged: _propTypes2.default.bool,
    classes: _propTypes2.default.object.isRequired,
    dragPreviewComponent: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.func]).isRequired,
    itemBeingDragged: _propTypes2.default.object,
    offset: _propTypes2.default.object
};
exports.default = (0, _compose2.default)((0, _styles.withStyles)(styles), (0, _reactDnd.DragLayer)(function (monitor) {
    return {
        itemBeingDragged: monitor.getItem(),
        componentType: monitor.getItemType(),
        beingDragged: monitor.isDragging(),
        offset: monitor.getSourceClientOffset()
    };
}))(CustomDragLayer);
module.exports = exports['default'];