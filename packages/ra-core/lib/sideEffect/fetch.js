'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeFetchAction = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.handleFetch = handleFetch;

var _effects = require('redux-saga/effects');

var _fetchActions = require('../actions/fetchActions');

var _dataFetchActions = require('../dataFetchActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(handleFetch);

var addLanguageToHeader = function addLanguageToHeader(requestHandler, getLangCode) {
  return function (type, resource, params, header, accessToken) {
    var langCode = getLangCode;
    if (typeof getLangCode === 'function') {
      langCode = getLangCode();
    }

    var localizedHeader = (0, _extends3.default)({}, header, {
      'x-language': langCode
    });

    //logArgs({
    //prefix: 'addLanguageToHeader',
    //args: { type, resource, params, header, accessToken },
    //});
    return requestHandler(type, resource, params, localizedHeader, accessToken);
  };
};

function validateResponseFormat(response, type) // eslint-disable-line no-console
{
  var logger = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;

  if (!response.hasOwnProperty('data')) {
    logger('The response to \'' + type + '\' must be like { data: ... }, but the received response does not have a \'data\' key. The dataProvider is probably wrong for \'' + type + '\'.');
    throw new Error('ra.notification.data_provider_error');
  }
  if (_dataFetchActions.fetchActionsWithArrayOfRecordsResponse.includes(type) && !Array.isArray(response.data)) {
    logger('The response to \'' + type + '\' must be like { data : [...] }, but the received data is not an array. The dataProvider is probably wrong for \'' + type + '\'');
    throw new Error('ra.notification.data_provider_error');
  }
  if (_dataFetchActions.fetchActionsWithArrayOfIdentifiedRecordsResponse.includes(type) && Array.isArray(response.data) && response.data.length > 0 && !response.data[0].hasOwnProperty('id')) {
    logger('The response to \'' + type + '\' must be like { data : [{ id: 123, ...}, ...] }, but the received data items do not have an \'id\' key. The dataProvider is probably wrong for \'' + type + '\'');
    throw new Error('ra.notification.data_provider_error');
  }
  if (_dataFetchActions.fetchActionsWithRecordResponse.includes(type) && !response.data.hasOwnProperty('id')) {
    logger('The response to \'' + type + '\' must be like { data: { id: 123, ... } }, but the received data does not have an \'id\' key. The dataProvider is probably wrong for \'' + type + '\'');
    throw new Error('ra.notification.data_provider_error');
  }
  if (_dataFetchActions.fetchActionsWithTotalResponse.includes(type) && !response.hasOwnProperty('total')) {
    logger('The response to \'' + type + '\' must be like  { data: [...], total: 123 }, but the received response does not have a \'total\' key. The dataProvider is probably wrong for \'' + type + '\'');
    throw new Error('ra.notification.data_provider_error');
  }
}

function handleFetch(dataProvider, action) {
  var type, payload, _action$meta, fetchMeta, onSuccess, onFailure, resolve, reject, meta, restType, isOptimistic, localize, response;

  return _regenerator2.default.wrap(function handleFetch$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          type = action.type, payload = action.payload, _action$meta = action.meta, fetchMeta = _action$meta.fetch, onSuccess = _action$meta.onSuccess, onFailure = _action$meta.onFailure, resolve = _action$meta.resolve, reject = _action$meta.reject, meta = (0, _objectWithoutProperties3.default)(_action$meta, ['fetch', 'onSuccess', 'onFailure', 'resolve', 'reject']);
          restType = fetchMeta;
          _context.prev = 2;
          _context.next = 5;
          return (0, _effects.select)(function (state) {
            return state.admin.ui.optimistic;
          });

        case 5:
          isOptimistic = _context.sent;
          _context.next = 8;
          return (0, _effects.select)(function (state) {
            return state.i18n && state.i18n.locale;
          });

        case 8:
          localize = _context.sent;

          if (!isOptimistic) {
            _context.next = 11;
            break;
          }

          return _context.abrupt('return');

        case 11:
          _context.next = 13;
          return (0, _effects.all)([(0, _effects.put)({ type: type + '_LOADING', payload: payload, meta: meta }), (0, _effects.put)({ type: _fetchActions.FETCH_START })]);

        case 13:

          console.log('restType ' + restType + ' meta.resource ' + meta.resource + ' payload', payload, ' dataProvider ', dataProvider);

          // const enhancedDataProvider = addLanguageToHeader(dataProvider, localize);
          _context.next = 16;
          return (0, _effects.call)(dataProvider, restType, meta.resource, payload);

        case 16:
          response = _context.sent;


          process.env.NODE_ENV !== 'production' && validateResponseFormat(response, restType);

          if (typeof resolve === 'function') resolve(response);
          _context.next = 21;
          return (0, _effects.put)({
            type: type + '_SUCCESS',
            payload: response,
            requestPayload: payload,
            meta: (0, _extends3.default)({}, meta, onSuccess, {
              fetchResponse: restType,
              fetchStatus: _fetchActions.FETCH_END
            })
          });

        case 21:
          _context.next = 23;
          return (0, _effects.put)({ type: _fetchActions.FETCH_END });

        case 23:
          _context.next = 32;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context['catch'](2);

          if (typeof reject === 'function') reject(_context.t0);
          _context.next = 30;
          return (0, _effects.put)({
            type: type + '_FAILURE',
            error: _context.t0.message ? _context.t0.message : _context.t0,
            payload: _context.t0.body ? _context.t0.body : null,
            requestPayload: payload,
            meta: (0, _extends3.default)({}, meta, onFailure, {
              fetchResponse: restType,
              fetchStatus: _fetchActions.FETCH_ERROR
            })
          });

        case 30:
          _context.next = 32;
          return (0, _effects.put)({ type: _fetchActions.FETCH_ERROR, error: _context.t0 });

        case 32:
          _context.prev = 32;
          _context.next = 35;
          return (0, _effects.cancelled)();

        case 35:
          if (!_context.sent) {
            _context.next = 39;
            break;
          }

          _context.next = 38;
          return (0, _effects.put)({ type: _fetchActions.FETCH_CANCEL });

        case 38:
          return _context.abrupt('return');

        case 39:
          return _context.finish(32);

        case 40:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked, this, [[2, 25, 32, 40]]);
}
var takeFetchAction = exports.takeFetchAction = function takeFetchAction(action) {
  return action.meta && action.meta.fetch;
};
var fetch = function fetch(dataProvider) {
  return (/*#__PURE__*/_regenerator2.default.mark(function watchFetch() {
      return _regenerator2.default.wrap(function watchFetch$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.takeEvery)(takeFetchAction, handleFetch, dataProvider);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, watchFetch, this);
    })
  );
};

exports.default = fetch;