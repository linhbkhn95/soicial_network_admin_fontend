'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.TreeControllerView = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _getTreeFromArray = require('./getTreeFromArray');

var _getTreeFromArray2 = _interopRequireDefault(_getTreeFromArray);

var _selectors = require('./selectors');

var _actions = require('./actions');

var _react = require('react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultGetTreeState = function defaultGetTreeState(state) {
    return state.tree;
};

var TreeControllerView = exports.TreeControllerView = function (_Component) {
    (0, _inherits3.default)(TreeControllerView, _Component);

    function TreeControllerView() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, TreeControllerView);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = TreeControllerView.__proto__ || Object.getPrototypeOf(TreeControllerView)).call.apply(_ref, [this].concat(args))), _this), _this.handleGetIsNodeExpanded = function (nodeId) {
            return (0, _selectors.getIsNodeExpanded)(_this.props.treeState, _this.props.resource, nodeId);
        }, _this.handleCloseNode = function (nodeId) {
            return _this.props.closeNode(_this.props.resource, nodeId);
        }, _this.handleExpandNode = function (nodeId) {
            return _this.props.expandNode(_this.props.resource, nodeId);
        }, _this.handleToggleNode = function (nodeId) {
            return _this.props.toggleNode(_this.props.resource, nodeId);
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(TreeControllerView, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                closeNode = _props.closeNode,
                expandNode = _props.expandNode,
                _props$data = _props.data,
                fetchedAt = _props$data.fetchedAt,
                data = (0, _objectWithoutProperties3.default)(_props$data, ['fetchedAt']),
                getTreeFromArray = _props.getTreeFromArray,
                getTreeState = _props.getTreeState,
                ids = _props.ids,
                parentSource = _props.parentSource,
                resource = _props.resource,
                toggleNode = _props.toggleNode,
                treeState = _props.treeState,
                props = (0, _objectWithoutProperties3.default)(_props, ['children', 'closeNode', 'expandNode', 'data', 'getTreeFromArray', 'getTreeState', 'ids', 'parentSource', 'resource', 'toggleNode', 'treeState']);

            var availableData = ids.reduce(function (acc, id) {
                return [].concat((0, _toConsumableArray3.default)(acc), [data[id]]);
            }, []);
            var tree = getTreeFromArray(Object.values(availableData), parentSource);

            return children((0, _extends3.default)({
                getIsNodeExpanded: this.handleGetIsNodeExpanded,
                parentSource: parentSource,
                tree: tree,
                closeNode: this.handleCloseNode,
                expandNode: this.handleExpandNode,
                toggleNode: this.handleToggleNode,
                resource: resource
            }, props));
        }
    }]);
    return TreeControllerView;
}(_react.Component);

TreeControllerView.propTypes = {
    basePath: _propTypes2.default.string.isRequired,
    children: _propTypes2.default.func.isRequired,
    closeNode: _propTypes2.default.func.isRequired,
    expandNode: _propTypes2.default.func.isRequired,
    ids: _propTypes2.default.array.isRequired,
    data: _propTypes2.default.object.isRequired,
    getTreeFromArray: _propTypes2.default.func,
    getTreeState: _propTypes2.default.func,
    parentSource: _propTypes2.default.string,
    resource: _propTypes2.default.string.isRequired,
    toggleNode: _propTypes2.default.func.isRequired,
    treeState: _propTypes2.default.object
};


var mapStateToProps = function mapStateToProps(state, _ref2) {
    var getTreeState = _ref2.getTreeState;
    return {
        treeState: getTreeState(state)
    };
};

var TreeController = (0, _reactRedux.connect)(mapStateToProps, {
    closeNode: _actions.closeNode,
    expandNode: _actions.expandNode,
    toggleNode: _actions.toggleNode
})(TreeControllerView);

TreeController.defaultProps = {
    getTreeFromArray: _getTreeFromArray2.default,
    getTreeState: defaultGetTreeState,
    parentSource: 'parent_id'
};

exports.default = TreeController;