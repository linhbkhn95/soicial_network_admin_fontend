"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _models = require("./models");

var _models2 = _interopRequireDefault(_models);

var _vi = require("faker/locale/vi");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return Array.from(Array(600).keys()).map(function (index) {
    var _ref;

    return _ref = {}, (0, _defineProperty3.default)(_ref, _models2.default.fleet.id, index), (0, _defineProperty3.default)(_ref, _models2.default.fleet.type, "fakeTypeFleet(index % 2)"), (0, _defineProperty3.default)(_ref, _models2.default.fleet.name, "Hợp tác xã Đồng Khởi"), (0, _defineProperty3.default)(_ref, _models2.default.fleet.email, "dongkhoixetai@gmail.com"), (0, _defineProperty3.default)(_ref, _models2.default.fleet.phone, "0389952267"), (0, _defineProperty3.default)(_ref, _models2.default.fleet.image_scan, "hopdongkhoi.pdf"), _ref;
  });
};

module.exports = exports["default"];