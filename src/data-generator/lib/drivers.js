'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _vi = require('faker/locale/vi');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return Array.from(Array(600).keys()).map(function (index) {
    var _ref;

    return _ref = {}, (0, _defineProperty3.default)(_ref, _models2.default.driver.id, index), (0, _defineProperty3.default)(_ref, _models2.default.driver.fullName, _vi.name.findName()), (0, _defineProperty3.default)(_ref, _models2.default.driver.seat, _vi.random.arrayElement([4, 10])), (0, _defineProperty3.default)(_ref, _models2.default.driver.runtime, _vi.random.arrayElement([7400, 8600])), (0, _defineProperty3.default)(_ref, _models2.default.driver.income, _vi.random.arrayElement([250000, 20000000])), (0, _defineProperty3.default)(_ref, _models2.default.driver.rate, _vi.random.arrayElement([4.5, 5])), (0, _defineProperty3.default)(_ref, _models2.default.driver.phone, _vi.phone.phoneNumber()), (0, _defineProperty3.default)(_ref, _models2.default.driver.state, _vi.random.arrayElement([0, 1])), (0, _defineProperty3.default)(_ref, _models2.default.driver.status, _vi.random.arrayElement([0, 1])), (0, _defineProperty3.default)(_ref, _models2.default.driver.profilePicture, _vi.image.avatar()), _ref;
  });
};

module.exports = exports['default'];