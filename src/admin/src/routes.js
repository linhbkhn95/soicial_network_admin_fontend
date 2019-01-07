import React from 'react';
import { Route } from 'react-router-dom';
import EarningShow from '~/ui/incomes/Detail';

export default [
  <Route exact path="/earnings/:id/details" component={EarningShow} />,
];
