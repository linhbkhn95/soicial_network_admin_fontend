'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _en = require('faker/locale/en');

var _is_after = require('date-fns/is_after');

var _is_after2 = _interopRequireDefault(_is_after);

var _sub_days = require('date-fns/sub_days');

var _sub_days2 = _interopRequireDefault(_sub_days);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db, _ref) {
    var serializeDate = _ref.serializeDate;

    var today = new Date();
    var aMonthAgo = (0, _sub_days2.default)(today, 30);

    return Array.from(Array(600).keys()).map(function (id) {
        var nbProducts = (0, _utils.weightedArrayElement)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]);
        var basket = Array.from(Array(nbProducts).keys()).map(function () {
            return {
                product_id: _en.random.number({ min: 0, max: 10 * 13 - 1 }),
                quantity: (0, _utils.weightedArrayElement)([1, 2, 3, 4, 5], [10, 5, 3, 2, 1])
            };
        });

        var total_ex_taxes = basket.reduce(function (total, product) {
            return total + db.products[product.product_id].price * product.quantity;
        }, 0);

        var delivery_fees = (0, _utils.randomFloat)(3, 8);
        var tax_rate = _en.random.arrayElement([0.12, 0.17, 0.2]);
        var taxes = parseFloat(((total_ex_taxes + delivery_fees) * tax_rate).toFixed(2));
        var customer = _en.random.arrayElement(db.customers.filter(function (customer) {
            return customer.has_ordered;
        }));
        var date = (0, _utils.randomDate)(customer.first_seen, customer.last_seen);

        var status = (0, _is_after2.default)(date, aMonthAgo) && _en.random.boolean() ? 'ordered' : (0, _utils.weightedArrayElement)(['delivered', 'cancelled'], [10, 1]);
        return {
            id: id,
            reference: _en.random.alphaNumeric(6).toUpperCase(),
            date: serializeDate ? date.toISOString() : date,
            customer_id: customer.id,
            basket: basket,
            total_ex_taxes: total_ex_taxes,
            delivery_fees: delivery_fees,
            tax_rate: tax_rate,
            taxes: taxes,
            total: parseFloat((total_ex_taxes + delivery_fees + taxes).toFixed(2)),
            status: status,
            returned: status == 'delivered' ? (0, _utils.weightedBoolean)(10) : false
        };
    });
};

module.exports = exports['default'];