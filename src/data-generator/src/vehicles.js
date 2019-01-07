import faker from 'faker/locale/en';
import models from './models';
import { fakePlateNumber, fakeAlphabetSquence } from './utils';
import { carSubBranch, carBranch } from './constants';

// db.drivers.map((driver) => {
//     driver.
// })

export default db => {
  return db.drivers.map((driver, index) => {
    let vehicle = {
      [models.vehicle.id]: index,
      [models.vehicle.status]: faker.random.number({ min: 0, max: 1 }),
      [models.vehicle.state]: faker.random.number({ min: 0, max: 3 }),
      [models.vehicle.owner]: {
        [models.driver.id]: driver[models.driver.id],
        [models.driver.fullName]: driver[models.driver.fullName],
        [models.driver.profilePicture]: driver[models.driver.profilePicture],
        [models.driver.status]: driver[models.driver.status],
      },
      [models.vehicle.plate]: fakePlateNumber(),
      [models.vehicle.branch]: faker.random.arrayElement(carBranch),
      [models.vehicle.subBranch]: faker.random.arrayElement(carSubBranch),
      [models.vehicle.colour]: faker.internet.color(),
      [models.vehicle.seat]: faker.random.number({ min: 4, max: 7 }),
      [models.vehicle.year]: faker.date.past(12).getFullYear(),
      [models.vehicle.registrationNumber]: `${faker.random.alphaNumeric(
        5,
      )}-${faker.random.alphaNumeric(5)}`,
      [models.vehicle
        .registrationExpireDate]: faker.date.future().toLocaleDateString(),
      [models.vehicle.insuranceNumber]: `${fakeAlphabetSquence(
        2,
      )}${faker.random.number({
        min: 10,
        max: 99,
      })}-${faker.random.alphaNumeric(6)}`,
      [models.vehicle
        .insuranceExpireDate]: faker.date.future().toLocaleDateString(),
      [models.vehicle.company]: faker.random.arrayElement(db.companies),
      [models.vehicle
        .companyExpireDate]: faker.date.future().toLocaleDateString(),
      [models.vehicle.leftPicture]:
        'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_s_oem_5_600.jpg',
      [models.vehicle.rightPicture]:
        'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_fq_oem_10_600.jpg',
      [models.vehicle.frontPicture]:
        'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_f_oem_2_600.jpg',
      [models.vehicle.frontPicture]:
        'https://media.ed.edmunds-media.com/bmw/m6-gran-coupe/2018/oem/2018_bmw_m6-gran-coupe_sedan_base_r_oem_2_600.jpg',
      [models.vehicle.certificationFront]:
        'https://dantricdn.com/thumb_w/640/90fe8e733d/2016/12/07/dangkiem1-1481099693570.jpg',
      [models.vehicle.certificationBack]:
        'https://thuxe.vn/sites/default/files/so_dang_kiem_mercedes_amg_c300_2013.jpg',
      [models.vehicle.insuranceFront]:
        'https://img.websosanh.vn/v2/users/financial/images/dwtvld16sbpgj.jpg',
      [models.vehicle.insuranceBack]:
        'https://shopbaohiem.vn/wp-content/uploads/2016/12/bao-hiem-tnds-oto.jpg',
      [models.vehicle.registrationBack]:
        'https://toyotago.com.vn/wp-content/uploads/2017/04/dang-ky-o-to.jpg',
      [models.vehicle.registrationFront]:
        'http://laodong.com.vn/Uploaded/phamthuhien/2014_03_05/giay_VOCV.jpg',
      [models.vehicle.companyEnsign]:
        'https://znews-photo-td.zadn.vn/w1024/Uploaded/Aohuouk/2014_06_08/6614_Lo_go_cac_hang_xe_hoi_1_a.jpg',
    };
    (driver.vehicle = {}),
      (driver.vehicle[models.vehicle.frontPicture] =
        vehicle[models.vehicle.frontPicture]),
      (driver.vehicle[models.vehicle.plate] = vehicle[models.vehicle.plate]),
      (driver[models.vehicle.seat] = vehicle[models.vehicle.seat]),
      (driver.vehicle[models.vehicle.status] = vehicle[models.vehicle.status]),
      (driver.vehicle[models.vehicle.seat] = vehicle[models.vehicle.seat]),
      (driver.vehicle[models.vehicle.branch] = vehicle[models.vehicle.branch]);
    driver.vehicle[models.vehicle.year] = vehicle[models.vehicle.year];

    return vehicle;
  });
};
