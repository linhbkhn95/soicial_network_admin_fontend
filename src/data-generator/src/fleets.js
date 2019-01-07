import models from "./models";
import { name, phone, random, image } from "faker/locale/vi";
import { fakePlateNumber, fakeTypeFleet, fakeAlphabetSquence } from "./utils";

export default () =>
  Array.from(Array(600).keys()).map(index => ({
    [models.fleet.id]: index,
    // [models.fleet.vihicle]: {
    //     [models.vehicle.id]: vehicle[models.vehicle.id],
    //     [models.vehicle.plate]: vehicle[models.vehicle.plate],

    //     [models.vehicle.seat]: vehicle[models.vehicle.seat],
    //     [models.vehicle.profilePicture]: vehicle[models.vehicle.profilePicture],

    // },
    [models.fleet.type]: "fakeTypeFleet(index % 2)",
    // [models.fleet.type_vehicle]: type_vehicle.findName(),
    [models.fleet.name]: "Hợp tác xã Đồng Khởi",

    [models.fleet.email]: "dongkhoixetai@gmail.com",
    [models.fleet.phone]: "0389952267",

    [models.fleet.image_scan]: "hopdongkhoi.pdf",
  }));
