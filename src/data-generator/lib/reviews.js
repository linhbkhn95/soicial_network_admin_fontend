'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _en = require('faker/locale/en');

var _sub_days = require('date-fns/sub_days');

var _sub_days2 = _interopRequireDefault(_sub_days);

var _is_after = require('date-fns/is_after');

var _is_after2 = _interopRequireDefault(_is_after);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db, _ref) {
    var serializeDate = _ref.serializeDate;

    var today = new Date();
    var aMonthAgo = (0, _sub_days2.default)(today, 30);

    var id = 0;
    var reviewers = db.customers.filter(function (customer) {
        return customer.has_ordered;
    }).filter(function () {
        return (0, _utils.weightedBoolean)(60);
    }) // only 60% of buyers write reviews
    .map(function (customer) {
        return customer.id;
    });

    return db.commands.filter(function (command) {
        return reviewers.indexOf(command.customer_id) !== -1;
    }).reduce(function (acc, command) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(command.basket.filter(function () {
            return (0, _utils.weightedBoolean)(40);
        }) // reviewers review 40% of their products
        .map(function (product) {
            var date = (0, _utils.randomDate)(command.date);
            var status = (0, _is_after2.default)(aMonthAgo, date) ? (0, _utils.weightedArrayElement)(['accepted', 'rejected'], [3, 1]) : (0, _utils.weightedArrayElement)(['pending', 'accepted', 'rejected'], [5, 3, 1]);

            return {
                id: id++,
                date: serializeDate ? date.toISOString() : date,
                status: status,
                command_id: command.id,
                product_id: product.product_id,
                customer_id: command.customer_id,
                rating: _en.random.number({ min: 1, max: 5 }),
                comment: Array.apply(null, Array(_en.random.number({ min: 1, max: 5 }))).map(function () {
                    return _en.lorem.sentences();
                }).join('\n \r')
            };
        })));
    }, []);
};

module.exports = exports['default'];