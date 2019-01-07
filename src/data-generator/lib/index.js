"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.models = undefined;

var _customers = require("./customers");

var _customers2 = _interopRequireDefault(_customers);

var _categories = require("./categories");

var _categories2 = _interopRequireDefault(_categories);

var _products = require("./products");

var _products2 = _interopRequireDefault(_products);

var _commands = require("./commands");

var _commands2 = _interopRequireDefault(_commands);

var _reviews = require("./reviews");

var _reviews2 = _interopRequireDefault(_reviews);

var _payment = require("./payment");

var _payment2 = _interopRequireDefault(_payment);

var _companies = require("./companies");

var _companies2 = _interopRequireDefault(_companies);

var _drivers = require("./drivers");

var _drivers2 = _interopRequireDefault(_drivers);

var _vehicles = require("./vehicles");

var _vehicles2 = _interopRequireDefault(_vehicles);

var _incomes = require("./incomes");

var _incomes2 = _interopRequireDefault(_incomes);

var _fleets = require("./fleets");

var _fleets2 = _interopRequireDefault(_fleets);

var _finalize = require("./finalize");

var _finalize2 = _interopRequireDefault(_finalize);

var _models2 = require("./models");

var _models3 = _interopRequireDefault(_models2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.models = _models3.default;

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { serializeDate: true };

  var db = {};
  db.customers = (0, _customers2.default)(db, options);
  db.categories = (0, _categories2.default)(db, options);
  db.products = (0, _products2.default)(db, options);
  db.commands = (0, _commands2.default)(db, options);
  db.reviews = (0, _reviews2.default)(db, options);
  db.fleets = (0, _fleets2.default)(db, options);

  db.companies = (0, _companies2.default)(db, options);
  db.drivers = (0, _drivers2.default)(db, options);
  db.vehicles = (0, _vehicles2.default)(db, options);
  db.payments = (0, _payment2.default)(db, options);
  db.incomes = (0, _incomes2.default)(db, options);

  (0, _finalize2.default)(db);

  return db;
};