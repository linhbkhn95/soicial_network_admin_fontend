// eslint-disable-next-line
import { takeLatest, takeEvery, all } from 'redux-saga/effects';
import { t } from 'i18next';

import authServiceClient from '~/dataProvider/apiClient/auth';

// eslint-disable-next-line
import { createRequestSaga, takeRequest } from '../sagas/request';
import { setToast, forwardTo } from '../actions/ui';

import {
  removeIdentity,
  updateTokens,
  updateIdentity,
  logout,
  savePermission,
} from '../actions/auth';

import {
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_LOAD_IDENTITY,
  ACTION_GET_PERMISSION,
  ACTION_EDIT_IDENTITY,
  ACTION_CHANGE_PASSWORD,
} from '../constants';

import { noop } from '../actions/common';

const requestLogin = createRequestSaga({
  request: authServiceClient.basicLogin,
  key: ACTION_LOGIN,
  cancel: ACTION_LOGOUT,
  success: [data => updateTokens(data), () => forwardTo('/')],
  // handled on login page
  failure: [
    err => {
      if (err.response) {
        if (err.response.status === 422) {
          return noop();
        }
      }
      return setToast(err.message, 'error');
    },
  ],
});

const getPermission = createRequestSaga({
  request: authServiceClient.getPermission,
  key: ACTION_GET_PERMISSION,
  cancel: ACTION_LOGOUT,
  success: [data => savePermission(data.items)],
  accessTokenRequired: true,
  failure: [err => setToast(err.message, 'err')],
});

const requestIdentity = createRequestSaga({
  request: authServiceClient.getMe,
  key: ACTION_LOAD_IDENTITY,
  success: [data => updateIdentity(data)],
  //failure: [
  //(reason, action, { accessToken, refreshToken }) => logout(refreshToken),
  //],
});

const requestLogout = createRequestSaga({
  request: authServiceClient.logout,
  key: ACTION_LOGOUT,
  success: [
    () => setToast('Logout successfully!!!'),
    () => removeIdentity(),
    () => forwardTo('/login'),
  ],

  failure: [
    err => {
      // logout unsuccessful, you have not refresh_token ? => goto login
      if (err.statusCode === 422) {
        return forwardTo('/login');
      }

      return setToast("Couldn't logout", 'error');
    },
  ],
});

const requestEditIdentity = createRequestSaga({
  key: ACTION_EDIT_IDENTITY,
  request: authServiceClient.editIdentity,
  success: [
    () => setToast(t('IDENTITY.PROFILE.UPDATE_SUCCESS')),
    ({ data }) => updateIdentity(data),
  ],
});
const changePass = createRequestSaga({
  request: authServiceClient.changePass,
  key: ACTION_CHANGE_PASSWORD,
  cancel: ACTION_LOGOUT,
  success: [() => setToast('Thay đổi mật khẩu thành công')],

  // handled on login page
  failure: [
    err => {
      if (err.response) {
        if (err.response.status === 422) {
          return noop();
        }
      }
      return setToast(err.message, 'error');
    },
  ],
});
// root saga reducer
const asyncAuthWatchers = [
  // like case return, this is take => call
  // inner function we use yield*
  // from direct watcher we just yield value
  function* asyncAuthFetchWatcher() {
    // use takeLatest instead of take every, so double click in short time will not trigger more fork
    yield all([
      // takeLatest('app/loginFacebook', requestLoginFacebook),
      // takeLatest('app/loginGoogle', requestLoginGoogle),
      takeLatest(ACTION_LOGIN, requestLogin),
      // user
      takeLatest(ACTION_LOAD_IDENTITY, requestIdentity),

      takeLatest(ACTION_LOGOUT, requestLogout),

      takeLatest(ACTION_GET_PERMISSION, getPermission),
      takeLatest(ACTION_CHANGE_PASSWORD, changePass),
    ]);
  },
  function* asyncUserFetchWatcher() {
    yield all([takeLatest(ACTION_EDIT_IDENTITY, requestEditIdentity)]);
  },
];

export default asyncAuthWatchers;
