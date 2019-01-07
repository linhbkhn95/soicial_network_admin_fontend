import { put, takeEvery } from 'redux-saga/effects';

function* handleSuccessActions({
  payload = {},
  meta: { successActionCreators },
}) {
  let i = 0;
  for (i = 0; i < successActionCreators.length; i++) {
    yield put(successActionCreators[i](payload));
  }
}

function* sagaHandleSuccessActions() {
  yield takeEvery(
    action => action.meta && Array.isArray(action.meta.successActionCreators),
    handleSuccessActions,
  );
}

function* handleFailureActions({ error, meta: { failureActionCreators } }) {
  let i = 0;
  for (i = 0; i < failureActionCreators.length; i++) {
    yield put(failureActionCreators[i](error));
  }
}

function* sagaHandleFailureActions() {
  yield takeEvery(
    action => action.meta && Array.isArray(action.meta.failureActionCreators),
    handleFailureActions,
  );
}

export default [sagaHandleSuccessActions, sagaHandleFailureActions];
