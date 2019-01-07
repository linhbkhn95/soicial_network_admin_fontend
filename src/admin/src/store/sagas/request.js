import jwtDecode from 'jwt-decode';
import { apiParamsKey } from '~/store/api/constants';
import {
  select,
  call,
  put,
  take,
  fork,
  race,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import { delay, channel, buffers } from 'redux-saga';
import { userLogout } from 'react-admin';

import {
  markRequestPending,
  markRequestSuccess,
  markRequestCancelled,
  markRequestFailed,
} from '../actions/request';

import { REFRESH_TOKEN } from '../constants';

import { API_TIMEOUT } from '../api/constants';

import { invokeCallback, log } from '../actions/common';

import { showNotification as setToast } from 'react-admin';

import { push as forwardTo } from 'react-router-redux';

import { removeIdentity, updateTokens } from '../actions/auth';

import { getAccessToken, getRefreshToken } from '../selectors/auth';

import authServiceClient from '~/dataProvider/apiClient/auth';

import { MARK_REQUEST_PENDING } from '../constants/request';

function UnauthorizedException(message) {
  this.status = 401;
  this.message = message;
  this.toString = function() {
    return this.value + this.message;
  };
}

/**
 * @param {*} refreshToken
 */
function* requestAccessToken(refreshToken) {
  let forceLogout = true;
  const timeout = API_TIMEOUT;
  console.log('requestAccessToken ', refreshToken);
  // catch exception is safer than just read response status
  if (refreshToken) {
    try {
      // tell user to wait, no need to catch for more errors this step!!!
      // yield put(setToast("Refresh token"));

      // try refresh token, then reload page ?
      console.log('requestaccess token ', refreshToken);
      const { ret, isTimeout } = yield race({
        ret: call(authServiceClient.refreshAccessToken, [], {
          [apiParamsKey.refreshToken]: refreshToken,
        }),
        isTimeout: call(delay, timeout),
      });

      const error = isTimeout ? true : ret.error;

      if (!error) {
        forceLogout = false;
        // it can return more such as user info, expired date ?
        // call action creator to update
        console.log('ret request acess token ', ret);
        yield put(updateTokens(ret));
      } else {
        yield put(setToast('Can not refresh token'));
      }
    } catch (e) {
      yield put(log(e, 'error'));
    }
  }

  if (forceLogout) {
    // call logout user because we do not have refresh token
    yield put(userLogout());
    yield put(forwardTo('/login'));
  }
}

function* handleRequestPending(chan) {
  while (1) {
    yield take(chan);
  }
}

// process in order for parallel requests
export function* watchRequests() {
  // create a channel to queue incoming requests, just 1 message so it will keep
  // read write set in order
  const chan = yield call(channel, buffers.sliding(1));
  yield fork(handleRequestPending, chan);

  yield takeEvery(MARK_REQUEST_PENDING, function* _(action) {
    // dispatch to the worker thread
    yield put(chan, action);
  });
}

// create saga here
// convenient way: [] instead of polymorph, such as item is not array then [item]
// because later changes to code will be so easy, just add new row
export const createRequestSaga = ({
  request,
  key,
  start,
  stop,
  success,
  failure,
  cancelled,
  timeout = API_TIMEOUT,
  cancel,
  accessTokenRequired = null,
}) =>
  // when we dispatch a function, redux-thunk will give it a dispatch
  // while redux-saga will give it an action instead, good for testing
  // we may not needs this if we use redux-saga, of course we can use both
  function* _(action) {
    // default is empty
    let args = action.args || [];
    // check to see if we have success callback that pass as a param,
    // so that it will be callback from where it was born
    // with this way we can make something like cleaning the messages

    const callback =
      typeof args[args.length - 1] === 'function'
        ? args[args.length - 1]
        : null;

    if (callback) {
      args = args.slice(0, -1);
    }

    // error first callback
    let ret = null;
    let err = null;

    // store into redux, default key is action type for unique name
    const requestKey =
      typeof key === 'function' ? key(...args) : key || action.type;
    // for key, we render unique key using action.args
    // but for actionCreator when callback, we should pass the whole action
    // so on event such as success, we can use action.type or action.args to
    // do next, example: addBook => success : (data, {args:[token]}) => loadBooks(token)

    if (start) {
      for (let i = 0; i < start.length; i++) {
        const actionCreator = start[i];
        yield put(actionCreator());
      }
    }

    // mark pending
    yield put(markRequestPending(requestKey));

    try {
      // this is surely Error exception, assume as a request failed
      if (!request) {
        throw new Error('Api is not found');
      }

      // we do not wait forever for whatever request !!!
      // timeout is 0 mean default timeout, so default is 0 in case user input 0
      console.log('args saga ', args, ' request ', request);
      const raceOptions = {
        data: call(request, ...args),
        isTimeout: call(delay, timeout),
      };

      if (cancel) {
        raceOptions.cancelRet = take(cancel);
      }

      const response = yield race(raceOptions);
      const { data, isTimeout, cancelRet } = response;
      if (isTimeout) {
        throw new Error(`Api timeout ${isTimeout}`);
      } else if (cancelRet) {
        // callback on success
        if (cancelled) {
          for (let i = 0; i < cancelled.length; i++) {
            const actionCreator = cancelled[i];
            yield put(actionCreator(cancelRet, action));
          }
        }

        // for (let actionCreator of cancelled) {
        //  yield put(actionCreator(cancelRet, action));
        // }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        if (data && data.error) {
          switch (data.error) {
            case 'token_expired':
              // throw unthorized response, need translate ?
              throw new UnauthorizedException(data.error);
            default:
              throw new Error(data.error);
          }
        }

        // callback on success
        if (success) {
          for (let i = 0; i < success.length; i++) {
            const actionCreator = success[i];
            yield put(actionCreator(data, action));
          }
        }

        // for (let actionCreator of success) {
        //  yield put(actionCreator(data, action));
        // }
        // finally mark the request success
        yield put(markRequestSuccess(requestKey));

        // assign data, for cancel both ret and err is null
        ret = data;
      }
    } catch (reason) {
      console.log('reason ', reason);
      // unauthorized
      if (reason && reason.response && reason.response.status === 401) {
        // something wrong, logout
        console.log('statusCode 401 in saga ');
        // yield put(setToast("Token expired"));
      }
      if (reason && reason.response && reason.response.status === 404) {
        // something wrong, logout
        console.log('statusCode 404 in saga');
        yield put(setToast('Server error'));
      }
      // anyway, we should treat this as error to log
      if (failure) {
        for (let i = 0; i < failure.length; i++) {
          const actionCreator = failure[i];
          yield put(actionCreator(reason, action));
        }
      }
      // for (let actionCreator of failure) {
      //  yield put(actionCreator(reason, action));
      // }
      yield put(markRequestFailed(reason, requestKey));

      // mark error
      err = reason;
    } finally {
      if (stop) {
        for (let i = 0; i < stop.length; i++) {
          const actionCreator = stop[i];
          yield put(actionCreator(ret, action));
        }
      }
      // for (let actionCreator of stop) {
      //  yield put(actionCreator(ret, action));
      // }
      // check if the last param is action, should call it as actionCreator
      // from where it is called, we can access action[type and args],
      // so we will use it with first error callback styleack)

      if (callback) {
        yield put(invokeCallback(callback, err, ret));
      }
    }
  };
export const takeRequest = (signal, request, multiple = false) => {
  const requestSaga = createRequestSaga(
    typeof request === 'function' ? { request } : request,
  );
  return multiple
    ? takeEvery(signal, requestSaga)
    : takeLatest(signal, requestSaga);
};
