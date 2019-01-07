'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _en = require('faker/locale/en');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (db) {
    var id = 0;

    return db.categories.reduce(function (acc, category) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(Array.from(Array(10).keys()).map(function (index) {
            var width = (0, _utils.randomFloat)(10, 40);
            var height = (0, _utils.randomFloat)(10, 40);

            return {
                id: id++,
                category_id: category.id,
                reference: category.name.substr(0, 2) + '-' + _en.random.alphaNumeric(5) + '-' + _en.random.arrayElement('ABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                width: width,
                height: height,
                price: (0, _utils.randomFloat)(width * height / 20, width * height / 15),
                thumbnail: 'https://marmelab.com/posters/' + category.name + '-' + (index + 1) + '.jpeg',
                image: 'https://marmelab.com/posters/' + category.name + '-' + (index + 1) + '.jpeg',
                description: _en.lorem.paragraph(),
                stock: (0, _utils.weightedBoolean)(20) ? 0 : _en.random.number({ min: 0, max: 250 })
            };
        })));
    }, []);
};

module.exports = exports['default'];