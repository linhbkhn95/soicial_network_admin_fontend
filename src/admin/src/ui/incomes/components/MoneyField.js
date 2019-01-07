import React from 'react';
import { NumberField } from 'react-admin';

const MoneyField = (...props) => (
  <NumberField
    {...props}
    locales="vi"
    options={{ style: 'currency', currency: 'VND' }}
  />
);

export default MoneyField;
