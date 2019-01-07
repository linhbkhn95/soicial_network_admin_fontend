import models from './models';
import { name, phone, random, image } from 'faker/locale/vi';
import { fakePlateNumber, fakeAlphabetSquence } from './utils';

export default db => {
  return db.drivers.map((driver, index) => {
    let income = {
      [models.income.driver]: {
        [models.driver.id]: driver[models.driver.id],
        [models.driver.fullName]: driver[models.driver.fullName],
        [models.driver.profilePicture]: driver[models.driver.profilePicture],
        [models.driver.status]: driver[models.driver.status],
        [models.driver.runtime]: driver[models.driver.runtime],
        [models.income.vehicle]: driver[models.driver.vehicle],
      },
      [models.payment.runtime]: random.arrayElement([200000, 220000]),
      [models.income.total_money]: random.arrayElement([2500000, 20000000]),
      [models.income.be_received]: random.arrayElement([1200000, 10000000]),

      [models.income.customer_payment_money]: random.arrayElement([
        2500000,
        20000000,
      ]),
      [models.income.customer_payment_card]: random.arrayElement([
        2500000,
        20000000,
      ]),
      [models.income.actually_received]: random.arrayElement([
        2500000,
        20000000,
      ]),
    };

    return income;
  });
};
