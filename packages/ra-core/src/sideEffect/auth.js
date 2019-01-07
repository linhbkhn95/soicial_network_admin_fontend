import { all, put, call, select, takeEvery } from 'redux-saga/effects';
import { push, replace } from 'react-router-redux';

import {
  // showNotification,
  hideNotification,
} from '../actions/notificationActions';
import {
  USER_LOGIN,
  USER_LOGIN_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_CHANGE_PASS_LOADING,
  USER_CHANGE_PASS_SUCCESS,
  USER_CHANGE_PASS_FAILURE,
  USER_CHECK,
  USER_LOGOUT,
  USER_CHANGE_PASS,
  ACTION_REMOVE_IDENTITY,
  USER_FORGOT_PASSWORD,
  USER_FORGOT_PASSWORD_LOADING,
  USER_FORGOT_PASSWORD_FAILURE,
  USER_FORGOT_PASSWORD_SUCCESS,
  USER_RESET_PASSWORD,
  // USER_RESET_PASSWORD_LOADING,
  // USER_RESET_PASSWORD_FAILURE,
  USER_RESET_PASSWORD_SUCCESS,
} from '../actions/authActions';
import { FETCH_ERROR } from '../actions/fetchActions';
import {
  AUTH_LOGIN,
  AUTH_CHANGE_PASS,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
} from '../auth';
const nextPathnameSelector = state => {
  const locationState = state.routing.location.state;
  return locationState && locationState.nextPathname;
};

const addLanguageToHeaderAuth = (requestHandler, getLangCode) => (
  type,
  params,
  header,
  ...rest
) => {
  console.log('sideEffect getLangCode ', getLangCode);
  let langCode = getLangCode;
  if (typeof getLangCode === 'function') {
    langCode = getLangCode();
  }

  const localizedHeader = {
    ...header,
    'x-language': langCode,
  };

  //logArgs({
  //prefix: 'addLanguageToHeader',
  //args: { type, resource, params, header, accessToken },
  //});
  return requestHandler(type, params, localizedHeader, ...rest);
};

const currentPathnameSelector = state => state.routing.location;

export default authProvider => {
  if (!authProvider) return () => null;

  function* handleAuth(action) {
    const { type, payload, error, meta } = action;
    const localize = yield select(state => state.i18n && state.i18n.locale);
    const enhancedAuthProvider = addLanguageToHeaderAuth(
      authProvider,
      localize,
    );

    switch (type) {
      case USER_LOGIN: {
        const { resolve, reject } = meta;
        try {
          yield put({ type: USER_LOGIN_LOADING });
          const authPayload = yield call(
            enhancedAuthProvider,
            AUTH_LOGIN,
            payload,
          );
          yield put({
            type: USER_LOGIN_SUCCESS,
            payload: authPayload,
          });
          if (typeof resolve === 'function') resolve(authPayload);
          const redirectTo = yield meta.pathName ||
            select(nextPathnameSelector);
          yield put(push(redirectTo || '/'));
        } catch (e) {
          if (typeof reject === 'function') reject(e);
          yield put({
            type: USER_LOGIN_FAILURE,
            error: e,
            meta: { auth: true },
          });
          const errorMessage =
            typeof e === 'string'
              ? e
              : typeof e === 'undefined' || !e.message
                ? 'ra.auth.sign_in_error'
                : e.message;
          // yield put(showNotification(errorMessage, "warning"));
        }
        break;
      }

      case USER_FORGOT_PASSWORD: {
        const { resolve, reject } = meta;
        try {
          yield put({ type: USER_FORGOT_PASSWORD_LOADING });
          const authPayload = yield call(
            enhancedAuthProvider,
            AUTH_FORGOT_PASSWORD,
            payload,
          );
          yield put({
            type: USER_FORGOT_PASSWORD_SUCCESS,
            payload: authPayload,
          });
          if (typeof resolve === 'function') resolve(authPayload);
          const redirectTo = yield meta.pathName ||
            select(nextPathnameSelector);
          // yield put(push(redirectTo || "/"));
        } catch (e) {
          if (typeof reject === 'function') reject(e);
          yield put({
            type: USER_FORGOT_PASSWORD_FAILURE,
            error: e,
            meta: { auth: true },
          });
          const errorMessage =
            typeof e === 'string'
              ? e
              : typeof e === 'undefined' || !e.message
                ? 'ra.auth.sign_in_error'
                : e.message;
          // yield put(showNotification(errorMessage, "warning"));
        }
        break;
      }

      case USER_RESET_PASSWORD: {
        const { resolve, reject } = meta;
        try {
          yield put({ type: USER_FORGOT_PASSWORD_LOADING });
          const authPayload = yield call(
            enhancedAuthProvider,
            AUTH_RESET_PASSWORD,
            payload,
          );
          yield put({
            type: USER_RESET_PASSWORD_SUCCESS,
            payload: authPayload,
          });
          if (typeof resolve === 'function') resolve(authPayload);
          const redirectTo = yield meta.pathName ||
            select(nextPathnameSelector);
          // yield put(push(redirectTo || "/"));
        } catch (e) {
          if (typeof reject === 'function') reject(e);
          yield put({
            type: USER_FORGOT_PASSWORD_FAILURE,
            error: e,
            meta: { auth: true },
          });
          const errorMessage =
            typeof e === 'string'
              ? e
              : typeof e === 'undefined' || !e.message
                ? 'ra.auth.sign_in_error'
                : e.message;
          // yield put(showNotification(errorMessage, "warning"));
        }
        break;
      }
      case USER_CHANGE_PASS: {
        const { resolve, reject, onSuccess = {}, onFailure = {} } = meta;
        try {
          yield put({ type: USER_CHANGE_PASS_LOADING });
          const authPayload = yield call(
            enhancedAuthProvider,
            AUTH_CHANGE_PASS,
            payload,
          );
          yield put({
            type: USER_CHANGE_PASS_SUCCESS,
            payload: authPayload,
            meta: {
              ...onSuccess,
            },
          });
          if (typeof resolve === 'function') resolve(authPayload);
        } catch (e) {
          if (typeof reject === 'function') reject(e);
          yield put({
            type: USER_CHANGE_PASS_FAILURE,
            error: e,
            meta: {
              ...onFailure,
            },
          });
          const errorMessage =
            typeof e === 'string'
              ? e
              : typeof e === 'undefined' || !e.message
                ? 'ra.auth.sign_in_error'
                : e.message;
          // yield put(showNotification(errorMessage, "warning"));
        }
        break;
      }
      case USER_CHECK: {
        try {
          yield call(enhancedAuthProvider, AUTH_CHECK, payload);
        } catch (error) {
          yield call(enhancedAuthProvider, AUTH_LOGOUT);
          yield put(
            replace({
              pathname: (error && error.redirectTo) || '/login',
              state: { nextPathname: meta.pathName },
            }),
          );
        }
        break;
      }
      case USER_LOGOUT: {
        yield put(
          push((action.payload && action.payload.redirectTo) || '/login'),
        );
        yield call(enhancedAuthProvider, AUTH_LOGOUT);
        yield put({
          type: ACTION_REMOVE_IDENTITY,
        });
        break;
      }
      case FETCH_ERROR:
        try {
          yield call(enhancedAuthProvider, AUTH_ERROR, error);
        } catch (e) {
          const nextPathname = yield select(currentPathnameSelector);
          yield call(enhancedAuthProvider, AUTH_LOGOUT);
          yield put(
            push({
              pathname: '/login',
              state: { nextPathname },
            }),
          );
          yield put(hideNotification());
        }
        break;
    }
  }
  return function* watchAuthActions() {
    yield all([
      takeEvery(action => action.meta && action.meta.auth, handleAuth),
      takeEvery(FETCH_ERROR, handleAuth),
    ]);
  };
};
