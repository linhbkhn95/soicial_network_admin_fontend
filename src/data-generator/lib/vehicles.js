'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _en = require('faker/locale/en');

var _en2 = _interopRequireDefault(_en);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// db.drivers.map((driver) => {
//     driver.
// })

exports.default = function (db) {
  return db.drivers.map(function (driver, index) {
    var _models$vehicle$owner, _vehicle;

    var vehicle = (_vehicle = {}, (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.id, index), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.status, _en2.default.random.number({ min: 0, max: 1 })), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.state, _en2.default.random.number({ min: 0, max: 3 })), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.owner, (_models$vehicle$owner = {}, (0, _defineProperty3.default)(_models$vehicle$owner, _models2.default.driver.id, driver[_models2.default.driver.id]), (0, _defineProperty3.default)(_models$vehicle$owner, _models2.default.driver.fullName, driver[_models2.default.driver.fullName]), (0, _defineProperty3.default)(_models$vehicle$owner, _models2.default.driver.profilePicture, driver[_models2.default.driver.profilePicture]), (0, _defineProperty3.default)(_models$vehicle$owner, _models2.default.driver.status, driver[_models2.default.driver.status]), _models$vehicle$owner)), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.plate, (0, _utils.fakePlateNumber)()), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.branch, _en2.default.random.arrayElement(_constants.carBranch)), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.subBranch, _en2.default.random.arrayElement(_constants.carSubBranch)), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.colour, _en2.default.internet.color()), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.seat, _en2.default.random.number({ min: 4, max: 7 })), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.year, _en2.default.date.past(12).getFullYear()), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.registrationNumber, _en2.default.random.alphaNumeric(5) + '-' + _en2.default.random.alphaNumeric(5)), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.registrationExpireDate, _en2.default.date.future().toLocaleDateString()), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.insuranceNumber, '' + (0, _utils.fakeAlphabetSquence)(2) + _en2.default.random.number({
      min: 10,
      max: 99
    }) + '-' + _en2.default.random.alphaNumeric(6)), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.insuranceExpireDate, _en2.default.date.future().toLocaleDateString()), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.company, _en2.default.random.arrayElement(db.companies)), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.companyExpireDate, _en2.default.date.future().toLocaleDateString()), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.leftPicture, 'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_s_oem_5_600.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.rightPicture, 'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_fq_oem_10_600.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.frontPicture, 'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_f_oem_2_600.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.frontPicture, 'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_r_oem_2_600.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.certificationFront, 'https://dantricdn.com/thumb_w/640/90fe8e733d/2016/12/07/dangkiem1-1481099693570.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.certificationBack, 'https://thuxe.vn/sites/default/files/so_dang_kiem_mercedes_amg_c300_2013.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.insuranceFront, 'https://img.websosanh.vn/v2/users/financial/images/dwtvld16sbpgj.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.insuranceBack, 'https://shopbaohiem.vn/wp-content/uploads/2016/12/bao-hiem-tnds-oto.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.registrationBack, 'https://toyotago.com.vn/wp-content/uploads/2017/04/dang-ky-o-to.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.registrationFront, 'http://laodong.com.vn/Uploaded/phamthuhien/2014_03_05/giay_VOCV.jpg'), (0, _defineProperty3.default)(_vehicle, _models2.default.vehicle.companyEnsign, 'https://znews-photo-td.zadn.vn/w1024/Uploaded/Aohuouk/2014_06_08/6614_Lo_go_cac_hang_xe_hoi_1_a.jpg'), _vehicle);
    driver.vehicle = {}, driver.vehicle[_models2.default.vehicle.frontPicture] = vehicle[_models2.default.vehicle.frontPicture], driver.vehicle[_models2.default.vehicle.plate] = vehicle[_models2.default.vehicle.plate], driver[_models2.default.vehicle.seat] = vehicle[_models2.default.vehicle.seat], driver.vehicle[_models2.default.vehicle.status] = vehicle[_models2.default.vehicle.status], driver.vehicle[_models2.default.vehicle.seat] = vehicle[_models2.default.vehicle.seat], driver.vehicle[_models2.default.vehicle.branch] = vehicle[_models2.default.vehicle.branch];
    driver.vehicle[_models2.default.vehicle.year] = vehicle[_models2.default.vehicle.year];

    return vehicle;
  });
};

module.exports = exports['default'];