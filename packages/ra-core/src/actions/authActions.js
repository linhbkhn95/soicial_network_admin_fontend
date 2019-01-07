export const USER_CHECK_SUCCESS = 'RA/USER_CHECK_SUCCESS';
export const USER_LOGIN = 'RA/USER_LOGIN';
export const USER_LOGIN_LOADING = 'RA/USER_LOGIN_LOADING';
export const USER_LOGIN_FAILURE = 'RA/USER_LOGIN_FAILURE';
export const USER_LOGIN_SUCCESS = 'RA/USER_LOGIN_SUCCESS';
export const USER_CHANGE_PASS_LOADING = 'RA/USER_CHANGE_PASS_LOADING';
export const USER_CHANGE_PASS_FAILURE = 'RA/USER_CHANGE_PASS_FAILURE';
export const USER_CHANGE_PASS_SUCCESS = 'RA/USER_CHANGE_PASS_SUCCESS';
export const ACTION_REMOVE_IDENTITY = 'VEEP/ACTION_REMOVE_IDENTITY';
export const USER_CHANGE_PASS = 'RA/USER_CHANGE_PASS';

export const USER_FORGOT_PASSWORD = 'RA/USER_FORGOT_PASSWORD';
export const USER_FORGOT_PASSWORD_LOADING = 'RA/USER_FORGOT_PASSWORD_LOADING';
export const USER_FORGOT_PASSWORD_FAILURE = 'RA/USER_FORGOT_PASSWORD_FAILURE';
export const USER_FORGOT_PASSWORD_SUCCESS = 'RA/USER_FORGOT_PASSWORD_SUCCESS';

export const USER_RESET_PASSWORD = 'RA/RESET_PASSWORD';
export const USER_RESET_PASSWORD_LOADING = 'RA/RESET_PASSWORD_LOADING';
export const USER_RESET_PASSWORD_FAILURE = 'RA/RESET_PASSWORD_FAILURE';
export const USER_RESET_PASSWORD_SUCCESS = 'RA/RESET_PASSWORD_SUCCESS';
export const resetPassword = (payload, pathName, resolve, reject) => ({
  type: USER_RESET_PASSWORD,
  payload,
  meta: { auth: true, pathName, resolve, reject },
});

export const forgotPassword = (payload, pathName, resolve, reject) => ({
  type: USER_FORGOT_PASSWORD,
  payload,
  meta: { auth: true, pathName, resolve, reject },
});

export const userLogin = (payload, pathName, resolve, reject) => ({
  type: USER_LOGIN,
  payload,
  meta: { auth: true, pathName, resolve, reject },
});

export const userChangePass = (payload, meta, resolve, reject) => ({
  type: USER_CHANGE_PASS,
  payload,
  meta: { auth: true, resolve, reject, ...meta },
});

export const USER_CHECK = 'RA/USER_CHECK';

export const userCheck = (payload, pathName, routeParams) => ({
  type: USER_CHECK,
  payload: {
    ...payload,
    routeParams,
  },
  meta: { auth: true, pathName },
});

export const USER_LOGOUT = 'RA/USER_LOGOUT';

/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
export const userLogout = redirectTo => ({
  type: USER_LOGOUT,
  payload: {
    redirectTo,
  },
  meta: { auth: true },
});
