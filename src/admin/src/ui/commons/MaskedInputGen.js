import { conformToMask } from 'react-text-mask';

export const generalizeVNPhoneNumber = _value => {
  let value = String(_value)
    .trim()
    .replace(/\s+/, '');

  return value;

  // const vnPhoneNumberMask84 = [
  //   /\d/,
  //   /\d/,
  //   ' ',
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   ' ',
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   /\d/,
  // ];

  // const vnPhoneNumberMask0 = [
  //   '0',
  //   /\d/,
  //   /\d/,
  //   ' ',
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   ' ',
  //   /\d/,
  //   /\d/,
  //   /\d/,
  //   /\d/,
  // ];

  // let mask = vnPhoneNumberMask84;
  // const array84 = '(+84)'.split('');
  // let extractRgx84 = array84.reduce((acc, weepChar, idx) => {
  //   const newComp = '(+84)'
  //     .replace(weepChar, '')
  //     .replace('(', '\\(')
  //     .replace(')', '\\)')
  //     .replace('+', '\\+');

  //   return `${acc}|${newComp}`;
  // }, '?:\\(\\+84\\)');
  // extractRgx84 = `(${extractRgx84})(.*)`;
  // extractRgx84 = new RegExp(extractRgx84);
  // if (value.indexOf('0') === 0) {
  //   mask = vnPhoneNumberMask0;
  //   numValue = value.slice(0);
  // } else {
  //   mask = vnPhoneNumberMask84;
  //   const extractVals = extractRgx84.exec(value);
  //   if (!extractVals) {
  //     numValue = value;
  //   } else {
  //     numValue = extractVals[1];
  //   }
  // }
  // let numValue = numValue.replace(/\D+/g, '');
  // let conformedValue = conformToMask(numValue, mask, {
  //   guide: false,
  // }).conformedValue;
  // conformedValue = conformedValue.trimEnd();
  // if (conformedValue.length !== 0 && mask != vnPhoneNumberMask0) {
  //   conformedValue = '(+84) ' + conformedValue;
  // }
  // return conformedValue;
};

export const generalizeNumberPlate = value => {
  const plateMask4 = [/\d/, /\d/, /[a-zA-Z]/, '-', /\d/, /\d/, /\d/, /\d/];
  const plateMask5 = [
    /\d/,
    /\d/,
    /[a-zA-Z]/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    '.',
    /\d/,
    /\d/,
  ];
  let trimValue = value.replace(/[^A-Za-z0-9]/g, '');
  let plateMask = plateMask4;
  if (trimValue.length > 7) {
    plateMask = plateMask5;
  }

  let generalizedValue = conformToMask(trimValue, plateMask, {
    guide: false,
  }).conformedValue;

  generalizedValue = generalizedValue.trimEnd();

  if (generalizedValue.endsWith('-')) {
    generalizedValue = generalizedValue.slice(0, -1);
  }

  return generalizedValue;
};
