'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userLogout = exports.USER_LOGOUT = exports.userCheck = exports.USER_CHECK = exports.userChangePass = exports.userLogin = exports.forgotPassword = exports.resetPassword = exports.USER_RESET_PASSWORD_SUCCESS = exports.USER_RESET_PASSWORD_FAILURE = exports.USER_RESET_PASSWORD_LOADING = exports.USER_RESET_PASSWORD = exports.USER_FORGOT_PASSWORD_SUCCESS = exports.USER_FORGOT_PASSWORD_FAILURE = exports.USER_FORGOT_PASSWORD_LOADING = exports.USER_FORGOT_PASSWORD = exports.USER_CHANGE_PASS = exports.ACTION_REMOVE_IDENTITY = exports.USER_CHANGE_PASS_SUCCESS = exports.USER_CHANGE_PASS_FAILURE = exports.USER_CHANGE_PASS_LOADING = exports.USER_LOGIN_SUCCESS = exports.USER_LOGIN_FAILURE = exports.USER_LOGIN_LOADING = exports.USER_LOGIN = exports.USER_CHECK_SUCCESS = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var USER_CHECK_SUCCESS = exports.USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
var USER_LOGIN = exports.USER_LOGIN = 'RA/USER_LOGIN';
var USER_LOGIN_LOADING = exports.USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
var USER_LOGIN_FAILURE = exports.USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
var USER_LOGIN_SUCCESS = exports.USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';
var USER_CHANGE_PASS_LOADING = exports.USER_CHANGE_PASS_LOADING = 'RA/USER_CHANGE_PASS_LOADING';
var USER_CHANGE_PASS_FAILURE = exports.USER_CHANGE_PASS_FAILURE = 'RA/USER_CHANGE_PASS_FAILURE';
var USER_CHANGE_PASS_SUCCESS = exports.USER_CHANGE_PASS_SUCCESS = 'RA/USER_CHANGE_PASS_SUCCESS';
var ACTION_REMOVE_IDENTITY = exports.ACTION_REMOVE_IDENTITY = 'VEEP/ACTION_REMOVE_IDENTITY';
var USER_CHANGE_PASS = exports.USER_CHANGE_PASS = 'RA/USER_CHANGE_PASS';

var USER_FORGOT_PASSWORD = exports.USER_FORGOT_PASSWORD = 'RA/USER_FORGOT_PASSWORD';
var USER_FORGOT_PASSWORD_LOADING = exports.USER_FORGOT_PASSWORD_LOADING = 'RA/USER_FORGOT_PASSWORD_LOADING';
var USER_FORGOT_PASSWORD_FAILURE = exports.USER_FORGOT_PASSWORD_FAILURE = 'RA/USER_FORGOT_PASSWORD_FAILURE';
var USER_FORGOT_PASSWORD_SUCCESS = exports.USER_FORGOT_PASSWORD_SUCCESS = 'RA/USER_FORGOT_PASSWORD_SUCCESS';

var USER_RESET_PASSWORD = exports.USER_RESET_PASSWORD = 'RA/RESET_PASSWORD';
var USER_RESET_PASSWORD_LOADING = exports.USER_RESET_PASSWORD_LOADING = 'RA/RESET_PASSWORD_LOADING';
var USER_RESET_PASSWORD_FAILURE = exports.USER_RESET_PASSWORD_FAILURE = 'RA/RESET_PASSWORD_FAILURE';
var USER_RESET_PASSWORD_SUCCESS = exports.USER_RESET_PASSWORD_SUCCESS = 'RA/RESET_PASSWORD_SUCCESS';
var resetPassword = exports.resetPassword = function resetPassword(payload, pathName, resolve, reject) {
  return {
    type: USER_RESET_PASSWORD,
    payload: payload,
    meta: { auth: true, pathName: pathName, resolve: resolve, reject: reject }
  };
};

var forgotPassword = exports.forgotPassword = function forgotPassword(payload, pathName, resolve, reject) {
  return {
    type: USER_FORGOT_PASSWORD,
    payload: payload,
    meta: { auth: true, pathName: pathName, resolve: resolve, reject: reject }
  };
};

var userLogin = exports.userLogin = function userLogin(payload, pathName, resolve, reject) {
  return {
    type: USER_LOGIN,
    payload: payload,
    meta: { auth: true, pathName: pathName, resolve: resolve, reject: reject }
  };
};

var userChangePass = exports.userChangePass = function userChangePass(payload, meta, resolve, reject) {
  return {
    type: USER_CHANGE_PASS,
    payload: payload,
    meta: (0, _extends3.default)({ auth: true, resolve: resolve, reject: reject }, meta)
  };
};

var USER_CHECK = exports.USER_CHECK = 'RA/USER_CHECK';

var userCheck = exports.userCheck = function userCheck(payload, pathName, routeParams) {
  return {
    type: USER_CHECK,
    payload: (0, _extends3.default)({}, payload, {
      routeParams: routeParams
    }),
    meta: { auth: true, pathName: pathName }
  };
};

var USER_LOGOUT = exports.USER_LOGOUT = 'RA/USER_LOGOUT';

/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
var userLogout = exports.userLogout = function userLogout(redirectTo) {
  return {
    type: USER_LOGOUT,
    payload: {
      redirectTo: redirectTo
    },
    meta: { auth: true }
  };
};