'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudGetMatchingAccumulate = exports.CRUD_GET_MATCHING_ACCUMULATE = exports.crudGetManyAccumulate = exports.CRUD_GET_MANY_ACCUMULATE = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _dataActions = require('./dataActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUD_GET_MANY_ACCUMULATE = exports.CRUD_GET_MANY_ACCUMULATE = 'RA/CRUD_GET_MANY_ACCUMULATE';

var crudGetManyAccumulate = exports.crudGetManyAccumulate = function crudGetManyAccumulate(resource, ids) {
  return {
    type: CRUD_GET_MANY_ACCUMULATE,
    payload: { resource: resource, ids: ids },
    meta: { accumulate: _dataActions.crudGetMany }
  };
};

var CRUD_GET_MATCHING_ACCUMULATE = exports.CRUD_GET_MATCHING_ACCUMULATE = 'RA/CRUD_GET_MATCHING_ACCUMULATE';

var crudGetMatchingAccumulate = exports.crudGetMatchingAccumulate = function crudGetMatchingAccumulate(reference, relatedTo, pagination, sort, filter) {
  var action = (0, _dataActions.crudGetMatching)(reference, relatedTo, pagination, sort, filter);

  return {
    type: CRUD_GET_MATCHING_ACCUMULATE,
    meta: {
      accumulate: function accumulate() {
        return action;
      },
      accumulateValues: function accumulateValues() {
        return true;
      },
      accumulateKey: JSON.stringify((0, _extends3.default)({
        resource: reference
      }, action.payload))
    }
  };
};