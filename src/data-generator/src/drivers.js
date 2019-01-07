import models from './models';
import { name, phone, random, image } from 'faker/locale/vi';

export default () =>
  Array.from(Array(600).keys()).map(index => ({
    [models.driver.id]: index,
    // [models.driver.vihicle]: {
    //     [models.vehicle.id]: vehicle[models.vehicle.id],
    //     [models.vehicle.plate]: vehicle[models.vehicle.plate],

    //     [models.vehicle.seat]: vehicle[models.vehicle.seat],
    //     [models.vehicle.profilePicture]: vehicle[models.vehicle.profilePicture],

    // },
    [models.driver.fullName]: name.findName(),
    // [models.driver.type_vehicle]: type_vehicle.findName(),
    [models.driver.seat]: random.arrayElement([4, 10]),
    [models.driver.runtime]: random.arrayElement([7400, 8600]),

    [models.driver.income]: random.arrayElement([250000, 20000000]),
    [models.driver.rate]: random.arrayElement([4.5, 5]),

    [models.driver.phone]: phone.phoneNumber(),
    [models.driver.state]: random.arrayElement([0, 1]),
    [models.driver.status]: random.arrayElement([0, 1]),
    // [models.driver.vehicle]: index,
    [models.driver.profilePicture]: image.avatar(),
  }));
