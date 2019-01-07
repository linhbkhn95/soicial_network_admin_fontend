const faker = require('faker/locale/en');

const weightedArrayElement = (values, weights) =>
    faker.random.arrayElement(
        values.reduce(
            (acc, value, index) =>
                acc.concat(new Array(weights[index]).fill(value)),
            []
        )
    );

const nbProducts = weightedArrayElement(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [30, 20, 5, 2, 1, 1, 1, 1, 1, 1]
);

console.log(nbProducts);
