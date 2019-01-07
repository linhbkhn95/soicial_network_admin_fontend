'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _vi = require('faker/locale/vi');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return Array.from(Array(600).keys()).map(function (index) {
    var _ref;

    return _ref = {}, (0, _defineProperty3.default)(_ref, _models2.default.payment.id, index), (0, _defineProperty3.default)(_ref, _models2.default.payment.code, (0, _utils.fakePlateNumber)()), (0, _defineProperty3.default)(_ref, _models2.default.payment.time, _vi.random.arrayElement(['12/12/2018-29/12/2018', '14/12/2018-29/12/2018'])), (0, _defineProperty3.default)(_ref, _models2.default.payment.total_money, _vi.random.arrayElement([2500000, 20000000])), (0, _defineProperty3.default)(_ref, _models2.default.payment.total_vehicle, _vi.random.arrayElement([480, 483])), (0, _defineProperty3.default)(_ref, _models2.default.payment.runtime, _vi.random.arrayElement([200000, 220000])), (0, _defineProperty3.default)(_ref, _models2.default.payment.time_arg, _vi.random.arrayElement([4800, 5200])), (0, _defineProperty3.default)(_ref, _models2.default.payment.success, _vi.random.arrayElement([93.33, 90.05])), (0, _defineProperty3.default)(_ref, _models2.default.payment.bonus, _vi.random.arrayElement([2500000, 20000000])), _ref;
  });
};

module.exports = exports['default'];