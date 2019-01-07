'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _styles = require('@material-ui/core/styles');

var _reduxForm = require('redux-form');

var _raCore = require('ra-core');

var _NodeFormActions = require('./NodeFormActions');

var _NodeFormActions2 = _interopRequireDefault(_NodeFormActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    root: {
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1
    }
};

var sanitizeRestProps = function sanitizeRestProps(_ref) {
    var anyTouched = _ref.anyTouched,
        array = _ref.array,
        asyncBlurFields = _ref.asyncBlurFields,
        asyncValidate = _ref.asyncValidate,
        asyncValidating = _ref.asyncValidating,
        autofill = _ref.autofill,
        blur = _ref.blur,
        cancelDropOnChildren = _ref.cancelDropOnChildren,
        change = _ref.change,
        clearAsyncError = _ref.clearAsyncError,
        clearFields = _ref.clearFields,
        clearSubmit = _ref.clearSubmit,
        clearSubmitErrors = _ref.clearSubmitErrors,
        crudUpdate = _ref.crudUpdate,
        destroy = _ref.destroy,
        dirty = _ref.dirty,
        dispatch = _ref.dispatch,
        dispatchCrudUpdate = _ref.dispatchCrudUpdate,
        form = _ref.form,
        getTreeState = _ref.getTreeState,
        handleSubmit = _ref.handleSubmit,
        initialize = _ref.initialize,
        initialized = _ref.initialized,
        initialValues = _ref.initialValues,
        invalid = _ref.invalid,
        isDragging = _ref.isDragging,
        onSelect = _ref.onSelect,
        onToggleItem = _ref.onToggleItem,
        onUnselectItems = _ref.onUnselectItems,
        parentSource = _ref.parentSource,
        pristine = _ref.pristine,
        pure = _ref.pure,
        redirect = _ref.redirect,
        reset = _ref.reset,
        resetSection = _ref.resetSection,
        save = _ref.save,
        startUndoable = _ref.startUndoable,
        submit = _ref.submit,
        submitFailed = _ref.submitFailed,
        submitSucceeded = _ref.submitSucceeded,
        submitting = _ref.submitting,
        touch = _ref.touch,
        translate = _ref.translate,
        triggerSubmit = _ref.triggerSubmit,
        undoable = _ref.undoable,
        undoableDragDrop = _ref.undoableDragDrop,
        untouch = _ref.untouch,
        valid = _ref.valid,
        validate = _ref.validate,
        props = (0, _objectWithoutProperties3.default)(_ref, ['anyTouched', 'array', 'asyncBlurFields', 'asyncValidate', 'asyncValidating', 'autofill', 'blur', 'cancelDropOnChildren', 'change', 'clearAsyncError', 'clearFields', 'clearSubmit', 'clearSubmitErrors', 'crudUpdate', 'destroy', 'dirty', 'dispatch', 'dispatchCrudUpdate', 'form', 'getTreeState', 'handleSubmit', 'initialize', 'initialized', 'initialValues', 'invalid', 'isDragging', 'onSelect', 'onToggleItem', 'onUnselectItems', 'parentSource', 'pristine', 'pure', 'redirect', 'reset', 'resetSection', 'save', 'startUndoable', 'submit', 'submitFailed', 'submitSucceeded', 'submitting', 'touch', 'translate', 'triggerSubmit', 'undoable', 'undoableDragDrop', 'untouch', 'valid', 'validate']);
    return props;
};

var NodeForm = function (_Component) {
    (0, _inherits3.default)(NodeForm, _Component);

    function NodeForm() {
        var _ref2;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, NodeForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref2 = NodeForm.__proto__ || Object.getPrototypeOf(NodeForm)).call.apply(_ref2, [this].concat(args))), _this), _this.handleClick = function (event) {
            event.persist();
            // This ensure clicking on an input or button does not collapse/expand a node
            // When clicking on the form (empty spaces around inputs) however, it should
            // propagate to the parent
            if (event.target.tagName.toLowerCase() !== 'form') {
                event.stopPropagation();
            }
        }, _this.handleDrop = function (event) {
            event.persist();
            if (_this.props.cancelDropOnChildren) {
                event.preventDefault();
            }
        }, _this.handleSubmit = function () {
            var _this$props = _this.props,
                basePath = _this$props.basePath,
                dispatchCrudUpdate = _this$props.dispatchCrudUpdate,
                handleSubmit = _this$props.handleSubmit,
                record = _this$props.node.record,
                resource = _this$props.resource,
                startUndoable = _this$props.startUndoable,
                _this$props$undoable = _this$props.undoable,
                undoable = _this$props$undoable === undefined ? true : _this$props$undoable;


            return handleSubmit(function (values) {
                return undoable ? startUndoable((0, _raCore.crudUpdate)(resource, record.id, (0, _extends3.default)({}, record, values), record, basePath, false)) : dispatchCrudUpdate(resource, record.id, (0, _extends3.default)({}, record, values), record, basePath, false);
            });
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(NodeForm, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                actions = _props.actions,
                basePath = _props.basePath,
                children = _props.children,
                classes = _props.classes,
                handleSubmit = _props.handleSubmit,
                invalid = _props.invalid,
                node = _props.node,
                pristine = _props.pristine,
                resource = _props.resource,
                saving = _props.saving,
                _props$submitOnEnter = _props.submitOnEnter,
                submitOnEnter = _props$submitOnEnter === undefined ? true : _props$submitOnEnter,
                props = (0, _objectWithoutProperties3.default)(_props, ['actions', 'basePath', 'children', 'classes', 'handleSubmit', 'invalid', 'node', 'pristine', 'resource', 'saving', 'submitOnEnter']);


            return _react2.default.createElement(
                'form',
                (0, _extends3.default)({
                    className: classes.root,
                    onClick: this.handleClick
                }, sanitizeRestProps(props)),
                _react.Children.map(children, function (field) {
                    return field ? (0, _react.cloneElement)(field, {
                        basePath: field.props.basePath || basePath,
                        onDrop: _this2.handleDrop,
                        record: node.record,
                        resource: resource
                    }) : null;
                }),
                actions && (0, _react.cloneElement)(actions, {
                    basePath: basePath,
                    record: node.record,
                    resource: resource,
                    handleSubmit: this.handleSubmit,
                    handleSubmitWithRedirect: this.handleSubmit,
                    invalid: invalid,
                    pristine: pristine,
                    saving: saving,
                    submitOnEnter: submitOnEnter
                })
            );
        }
    }]);
    return NodeForm;
}(_react.Component);

NodeForm.propTypes = {
    actions: _propTypes2.default.node,
    basePath: _propTypes2.default.string.isRequired,
    cancelDropOnChildren: _propTypes2.default.bool,
    children: _propTypes2.default.node,
    classes: _propTypes2.default.object,
    dispatchCrudUpdate: _propTypes2.default.func.isRequired,
    handleSubmit: _propTypes2.default.func.isRequired,
    invalid: _propTypes2.default.bool,
    node: _propTypes2.default.object.isRequired,
    pristine: _propTypes2.default.bool,
    resource: _propTypes2.default.string.isRequired,
    saving: _propTypes2.default.bool,
    startUndoable: _propTypes2.default.func.isRequired,
    submitOnEnter: _propTypes2.default.bool,
    undoable: _propTypes2.default.bool
};
NodeForm.defaultProps = {
    actions: _react2.default.createElement(_NodeFormActions2.default, null)
};


var mapStateToProps = function mapStateToProps(state, _ref3) {
    var node = _ref3.node;
    return {
        form: 'tree-node-form-' + node.id,
        initialValues: node.record,
        record: node.record
    };
};

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, {
    dispatchCrudUpdate: _raCore.crudUpdate,
    startUndoable: _raCore.startUndoable
}), (0, _reduxForm.reduxForm)({
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
}), (0, _styles.withStyles)(styles))(NodeForm);
module.exports = exports['default'];