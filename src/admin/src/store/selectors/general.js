import get from 'lodash/get';

export const getListTotal = (state, resource) =>
  get(state, ['admin', 'resources', resource, 'list', 'total']);

export const getOption = (state, key) =>
  get(state, ['setting', 'options', key]);

export const getMap = (state, key) => get(state, ['setting', 'maps', key]);

export const getFilterValues = state =>
  get(state, ['form', 'filterForm', 'values']);
