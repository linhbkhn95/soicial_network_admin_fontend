'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ReferenceArrayFieldController = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

var _actions = require('../../actions');

var _oneToMany = require('../../reducer/admin/references/oneToMany');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A container component that fetches records from another resource specified
 * by an array of *ids* in current record.
 *
 * You must define the fields to be passed to the iterator component as children.
 *
 * @example Display all the products of the current order as datagrid
 * // order = {
 * //   id: 123,
 * //   product_ids: [456, 457, 458],
 * // }
 * <ReferenceArrayField label="Products" reference="products" source="product_ids">
 *     <Datagrid>
 *         <TextField source="id" />
 *         <TextField source="description" />
 *         <NumberField source="price" options={{ style: 'currency', currency: 'USD' }} />
 *         <EditButton />
 *     </Datagrid>
 * </ReferenceArrayField>
 *
 * @example Display all the categories of the current product as a list of chips
 * // product = {
 * //   id: 456,
 * //   category_ids: [11, 22, 33],
 * // }
 * <ReferenceArrayField label="Categories" reference="categories" source="category_ids">
 *     <SingleFieldList>
 *         <ChipField source="name" />
 *     </SingleFieldList>
 * </ReferenceArrayField>
 *
 */
var ReferenceArrayFieldController = exports.ReferenceArrayFieldController = function (_Component) {
    (0, _inherits3.default)(ReferenceArrayFieldController, _Component);

    function ReferenceArrayFieldController() {
        (0, _classCallCheck3.default)(this, ReferenceArrayFieldController);
        return (0, _possibleConstructorReturn3.default)(this, (ReferenceArrayFieldController.__proto__ || Object.getPrototypeOf(ReferenceArrayFieldController)).apply(this, arguments));
    }

    (0, _createClass3.default)(ReferenceArrayFieldController, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.fetchReferences();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if ((this.props.record || {}).id !== (nextProps.record || {}).id) {
                this.fetchReferences(nextProps);
            }
        }
    }, {
        key: 'fetchReferences',
        value: function fetchReferences() {
            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props,
                crudGetManyAccumulate = _ref.crudGetManyAccumulate,
                reference = _ref.reference,
                ids = _ref.ids;

            crudGetManyAccumulate(reference, ids);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                resource = _props.resource,
                reference = _props.reference,
                data = _props.data,
                ids = _props.ids,
                children = _props.children,
                basePath = _props.basePath;


            var referenceBasePath = basePath.replace(resource, reference); // FIXME obviously very weak

            return children({
                isLoading: ids.length !== 0 && !data,
                ids: ids,
                data: data,
                referenceBasePath: referenceBasePath,
                currentSort: {}
            });
        }
    }]);
    return ReferenceArrayFieldController;
}(_react.Component);

ReferenceArrayFieldController.propTypes = {
    addLabel: _propTypes2.default.bool,
    basePath: _propTypes2.default.string.isRequired,
    classes: _propTypes2.default.object,
    className: _propTypes2.default.string,
    children: _propTypes2.default.func.isRequired,
    crudGetManyAccumulate: _propTypes2.default.func.isRequired,
    data: _propTypes2.default.object,
    ids: _propTypes2.default.array.isRequired,
    label: _propTypes2.default.string,
    record: _propTypes2.default.object.isRequired,
    reference: _propTypes2.default.string.isRequired,
    resource: _propTypes2.default.string.isRequired,
    sortBy: _propTypes2.default.string,
    source: _propTypes2.default.string.isRequired
};

var mapStateToProps = function mapStateToProps(state, props) {
    var record = props.record,
        source = props.source,
        reference = props.reference;

    var ids = (0, _get2.default)(record, source) || [];
    return {
        data: (0, _oneToMany.getReferencesByIds)(state, reference, ids),
        ids: ids
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {
    crudGetManyAccumulate: _actions.crudGetManyAccumulate
})(ReferenceArrayFieldController);