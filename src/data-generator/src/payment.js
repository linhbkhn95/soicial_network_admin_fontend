import models from './models';
import { name, phone, random, image } from 'faker/locale/vi';
import { fakePlateNumber, fakeAlphabetSquence } from './utils';

export default () =>
  Array.from(Array(600).keys()).map(index => ({
    [models.payment.id]: index,
    // [models.payment.vihicle]: {
    //     [models.vehicle.id]: vehicle[models.vehicle.id],
    //     [models.vehicle.plate]: vehicle[models.vehicle.plate],

    //     [models.vehicle.seat]: vehicle[models.vehicle.seat],
    //     [models.vehicle.profilePicture]: vehicle[models.vehicle.profilePicture],

    // },
    [models.payment.code]: fakePlateNumber(),
    // [models.payment.type_vehicle]: type_vehicle.findName(),
    [models.payment.time]: random.arrayElement(['12/12/2018-29/12/2018','14/12/2018-29/12/2018']),

    [models.payment.total_money]: random.arrayElement([2500000, 20000000]),
    [models.payment.total_vehicle]: random.arrayElement([480, 483]),

    [models.payment.runtime]: random.arrayElement([200000,220000]),
    [models.payment.time_arg]: random.arrayElement([4800, 5200]),
    [models.payment.success]: random.arrayElement([93.33, 90.05]),
    // [models.payment.vehicle]: index,
    [models.payment.bonus]:random.arrayElement([2500000, 20000000]),
  }));
