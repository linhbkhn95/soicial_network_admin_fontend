import {
  MARK_REQUEST_CANCELLED,
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_FAILED
} from '../constants/request';

// mark request for later checking
export const markRequestPending = (key, tokenRequired) => ({
  type: MARK_REQUEST_PENDING,
  meta: { key, tokenRequired }
});

export const markRequestSuccess = key => ({
  type: MARK_REQUEST_SUCCESS,
  meta: { key }
});

export const markRequestCancelled = ({ type, reason }, key) => ({
  type: MARK_REQUEST_CANCELLED,
  payload: `${type}: ${reason || 'called'}`,
  meta: { key }
});

// failed need a reason, because we do not know why !!!
export const markRequestFailed = (reason, key) => ({
  type: MARK_REQUEST_FAILED,
  payload: reason,
  meta: { key }
});
