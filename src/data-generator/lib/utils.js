"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fakeTypeFleet = exports.randomBoolean = exports.randomFloat = exports.randomDate = exports.weightedBoolean = exports.fakePlateNumber = exports.weightedArrayElement = exports.fakeAlphabetSquence = undefined;

var _en = require("faker/locale/en");

var _en2 = _interopRequireDefault(_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var alphabet = ["A", "B", "C", "D", "E", "F", "L", "H", "K"];

var fakeAlphabetSquence = exports.fakeAlphabetSquence = function fakeAlphabetSquence(count) {
  return Array.from(Array(count).keys()).reduce(function (acc) {
    return "" + acc + _en2.default.random.arrayElement(alphabet);
  }, "");
};

var weightedArrayElement = exports.weightedArrayElement = function weightedArrayElement(values, weights) {
  return _en2.default.random.arrayElement(values.reduce(function (acc, value, index) {
    return acc.concat(new Array(weights[index]).fill(value));
  }, []));
};

var fakePlateNumber = exports.fakePlateNumber = function fakePlateNumber() {
  var district = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["15", "16", "30", "31", "29", "34"];
  return "" + _en2.default.random.arrayElement(district) + _en2.default.random.arrayElement(alphabet) + " - " + _en2.default.random.number({ min: 1000, max: 9999 });
};

var weightedBoolean = exports.weightedBoolean = function weightedBoolean(likelyhood) {
  return _en2.default.random.number(99) < likelyhood;
};

var randomDate = exports.randomDate = function randomDate(minDate, maxDate) {
  var minTs = minDate instanceof Date ? minDate.getTime() : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
  var maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  var range = maxTs - minTs;
  var randomRange = _en2.default.random.number({ max: range });
  // move it more towards today to account for traffic increase
  var ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
};

var randomFloat = exports.randomFloat = function randomFloat(min, max) {
  return parseFloat(_en2.default.random.number({ min: min, max: max, precision: 0.01 }).toFixed(2));
};

var randomBoolean = exports.randomBoolean = function randomBoolean() {
  return Math.random() >= 0.5;
};

var fakeTypeFleet = exports.fakeTypeFleet = function fakeTypeFleet(type) {
  var listtype = {
    0: "Doanh nghiệp vận tải/Hợp tác xã",
    1: "Cá nhân"
  };
  return listtype[type];
};