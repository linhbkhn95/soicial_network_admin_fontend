import { takeLastest, takeEvery, all } from 'redux-saga/effects';
import generalServiceClient from '~/dataProvider/apiClient/general';
import { createRequestSaga, takeRequest } from '../sagas/request';
import { apiParamsKey } from '../constants';
import { saveMarkOptions, saveModelOptions } from '../actions/general';

export const GET_MARK_OPTIONS = '/SAGA/GET_MARK_OPTIONS';
export const GET_MODEL_OPTIONS = '/SAGA/GET_MODEL_OPTIONS';

const requestGetMarkOptions = createRequestSaga({
  request: generalServiceClient.getMarkOptions,
  key: GET_MARK_OPTIONS,
  success: [data => saveMarkOptions(data)],
});

const requestGetModelOptions = createRequestSaga({
  request: generalServiceClient.getModelOptions,
  key: GET_MODEL_OPTIONS,
  success: [
    (data, action) => saveModelOptions(data, action.args[apiParamsKey.mark]),
  ],
});

const asyncGeneralWatcher = [
  function* asynGeneralFetchWatcher() {
    yield all([
      takeLastest(GET_MARK_OPTIONS, requestGetMarkOptions),
      takeLastest(GET_MODEL_OPTIONS, requestGetModelOptions),
    ]);
  },
];

export default asyncGeneralWatcher;
