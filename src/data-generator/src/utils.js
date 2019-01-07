import faker from "faker/locale/en";

const alphabet = ["A", "B", "C", "D", "E", "F", "L", "H", "K"];

export const fakeAlphabetSquence = count =>
  Array.from(Array(count).keys()).reduce(
    acc => `${acc}${faker.random.arrayElement(alphabet)}`,
    "",
  );

export const weightedArrayElement = (values, weights) =>
  faker.random.arrayElement(
    values.reduce(
      (acc, value, index) => acc.concat(new Array(weights[index]).fill(value)),
      [],
    ),
  );

export const fakePlateNumber = (
  district = ["15", "16", "30", "31", "29", "34"],
) =>
  `${faker.random.arrayElement(district)}${faker.random.arrayElement(
    alphabet,
  )} - ${faker.random.number({ min: 1000, max: 9999 })}`;

export const weightedBoolean = likelyhood =>
  faker.random.number(99) < likelyhood;

export const randomDate = (minDate, maxDate) => {
  const minTs =
    minDate instanceof Date
      ? minDate.getTime()
      : Date.now() - 5 * 365 * 24 * 60 * 60 * 1000; // 5 years
  const maxTs = maxDate instanceof Date ? maxDate.getTime() : Date.now();
  const range = maxTs - minTs;
  const randomRange = faker.random.number({ max: range });
  // move it more towards today to account for traffic increase
  const ts = Math.sqrt(randomRange / range) * range;
  return new Date(minTs + ts);
};

export const randomFloat = (min, max) =>
  parseFloat(faker.random.number({ min, max, precision: 0.01 }).toFixed(2));

export const randomBoolean = () => Math.random() >= 0.5;

export const fakeTypeFleet = type => {
  let listtype = {
    0: "Doanh nghiệp vận tải/Hợp tác xã",
    1: "Cá nhân",
  };
  return listtype[type];
};
