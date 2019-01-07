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

exports.default = function (db) {
  return db.drivers.map(function (driver, index) {
    var _models$income$driver, _income;

    var income = (_income = {}, (0, _defineProperty3.default)(_income, _models2.default.income.driver, (_models$income$driver = {}, (0, _defineProperty3.default)(_models$income$driver, _models2.default.driver.id, driver[_models2.default.driver.id]), (0, _defineProperty3.default)(_models$income$driver, _models2.default.driver.fullName, driver[_models2.default.driver.fullName]), (0, _defineProperty3.default)(_models$income$driver, _models2.default.driver.profilePicture, driver[_models2.default.driver.profilePicture]), (0, _defineProperty3.default)(_models$income$driver, _models2.default.driver.status, driver[_models2.default.driver.status]), (0, _defineProperty3.default)(_models$income$driver, _models2.default.driver.runtime, driver[_models2.default.driver.runtime]), (0, _defineProperty3.default)(_models$income$driver, _models2.default.income.vehicle, driver[_models2.default.driver.vehicle]), _models$income$driver)), (0, _defineProperty3.default)(_income, _models2.default.payment.runtime, _vi.random.arrayElement([200000, 220000])), (0, _defineProperty3.default)(_income, _models2.default.income.total_money, _vi.random.arrayElement([2500000, 20000000])), (0, _defineProperty3.default)(_income, _models2.default.income.be_received, _vi.random.arrayElement([1200000, 10000000])), (0, _defineProperty3.default)(_income, _models2.default.income.customer_payment_money, _vi.random.arrayElement([2500000, 20000000])), (0, _defineProperty3.default)(_income, _models2.default.income.customer_payment_card, _vi.random.arrayElement([2500000, 20000000])), (0, _defineProperty3.default)(_income, _models2.default.income.actually_received, _vi.random.arrayElement([2500000, 20000000])), _income);

    return income;
  });
};

module.exports = exports['default'];