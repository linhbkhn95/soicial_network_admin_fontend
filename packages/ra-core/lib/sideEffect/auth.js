'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _effects = require('redux-saga/effects');

var _reactRouterRedux = require('react-router-redux');

var _notificationActions = require('../actions/notificationActions');

var _authActions = require('../actions/authActions');

var _fetchActions = require('../actions/fetchActions');

var _auth = require('../auth');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nextPathnameSelector = function nextPathnameSelector(state) {
  var locationState = state.routing.location.state;
  return locationState && locationState.nextPathname;
};

var addLanguageToHeaderAuth = function addLanguageToHeaderAuth(requestHandler, getLangCode) {
  return function (type, params, header) {
    for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      rest[_key - 3] = arguments[_key];
    }

    console.log('sideEffect getLangCode ', getLangCode);
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
    return requestHandler.apply(undefined, [type, params, localizedHeader].concat(rest));
  };
};

var currentPathnameSelector = function currentPathnameSelector(state) {
  return state.routing.location;
};

exports.default = function (authProvider) {
  var _marked = /*#__PURE__*/_regenerator2.default.mark(handleAuth);

  if (!authProvider) return function () {
    return null;
  };

  function handleAuth(action) {
    var type, payload, error, meta, localize, enhancedAuthProvider, resolve, reject, authPayload, redirectTo, errorMessage, _resolve, _reject, _authPayload, _redirectTo, _errorMessage, _resolve2, _reject2, _authPayload2, _redirectTo2, _errorMessage2, _resolve3, _reject3, _meta$onSuccess, onSuccess, _meta$onFailure, onFailure, _authPayload3, _errorMessage3, nextPathname;

    return _regenerator2.default.wrap(function handleAuth$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = action.type, payload = action.payload, error = action.error, meta = action.meta;
            _context.next = 3;
            return (0, _effects.select)(function (state) {
              return state.i18n && state.i18n.locale;
            });

          case 3:
            localize = _context.sent;
            enhancedAuthProvider = addLanguageToHeaderAuth(authProvider, localize);
            _context.t0 = type;
            _context.next = _context.t0 === _authActions.USER_LOGIN ? 8 : _context.t0 === _authActions.USER_FORGOT_PASSWORD ? 32 : _context.t0 === _authActions.USER_RESET_PASSWORD ? 54 : _context.t0 === _authActions.USER_CHANGE_PASS ? 76 : _context.t0 === _authActions.USER_CHECK ? 95 : _context.t0 === _authActions.USER_LOGOUT ? 107 : _context.t0 === _fetchActions.FETCH_ERROR ? 114 : 131;
            break;

          case 8:
            resolve = meta.resolve, reject = meta.reject;
            _context.prev = 9;
            _context.next = 12;
            return (0, _effects.put)({ type: _authActions.USER_LOGIN_LOADING });

          case 12:
            _context.next = 14;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_LOGIN, payload);

          case 14:
            authPayload = _context.sent;
            _context.next = 17;
            return (0, _effects.put)({
              type: _authActions.USER_LOGIN_SUCCESS,
              payload: authPayload
            });

          case 17:
            if (typeof resolve === 'function') resolve(authPayload);
            _context.next = 20;
            return meta.pathName || (0, _effects.select)(nextPathnameSelector);

          case 20:
            redirectTo = _context.sent;
            _context.next = 23;
            return (0, _effects.put)((0, _reactRouterRedux.push)(redirectTo || '/'));

          case 23:
            _context.next = 31;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context['catch'](9);

            if (typeof reject === 'function') reject(_context.t1);
            _context.next = 30;
            return (0, _effects.put)({
              type: _authActions.USER_LOGIN_FAILURE,
              error: _context.t1,
              meta: { auth: true }
            });

          case 30:
            errorMessage = typeof _context.t1 === 'string' ? _context.t1 : typeof _context.t1 === 'undefined' || !_context.t1.message ? 'ra.auth.sign_in_error' : _context.t1.message;
            // yield put(showNotification(errorMessage, "warning"));

          case 31:
            return _context.abrupt('break', 131);

          case 32:
            _resolve = meta.resolve, _reject = meta.reject;
            _context.prev = 33;
            _context.next = 36;
            return (0, _effects.put)({ type: _authActions.USER_FORGOT_PASSWORD_LOADING });

          case 36:
            _context.next = 38;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_FORGOT_PASSWORD, payload);

          case 38:
            _authPayload = _context.sent;
            _context.next = 41;
            return (0, _effects.put)({
              type: _authActions.USER_FORGOT_PASSWORD_SUCCESS,
              payload: _authPayload
            });

          case 41:
            if (typeof _resolve === 'function') _resolve(_authPayload);
            _context.next = 44;
            return meta.pathName || (0, _effects.select)(nextPathnameSelector);

          case 44:
            _redirectTo = _context.sent;
            _context.next = 53;
            break;

          case 47:
            _context.prev = 47;
            _context.t2 = _context['catch'](33);

            if (typeof _reject === 'function') _reject(_context.t2);
            _context.next = 52;
            return (0, _effects.put)({
              type: _authActions.USER_FORGOT_PASSWORD_FAILURE,
              error: _context.t2,
              meta: { auth: true }
            });

          case 52:
            _errorMessage = typeof _context.t2 === 'string' ? _context.t2 : typeof _context.t2 === 'undefined' || !_context.t2.message ? 'ra.auth.sign_in_error' : _context.t2.message;
            // yield put(showNotification(errorMessage, "warning"));

          case 53:
            return _context.abrupt('break', 131);

          case 54:
            _resolve2 = meta.resolve, _reject2 = meta.reject;
            _context.prev = 55;
            _context.next = 58;
            return (0, _effects.put)({ type: _authActions.USER_FORGOT_PASSWORD_LOADING });

          case 58:
            _context.next = 60;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_RESET_PASSWORD, payload);

          case 60:
            _authPayload2 = _context.sent;
            _context.next = 63;
            return (0, _effects.put)({
              type: _authActions.USER_RESET_PASSWORD_SUCCESS,
              payload: _authPayload2
            });

          case 63:
            if (typeof _resolve2 === 'function') _resolve2(_authPayload2);
            _context.next = 66;
            return meta.pathName || (0, _effects.select)(nextPathnameSelector);

          case 66:
            _redirectTo2 = _context.sent;
            _context.next = 75;
            break;

          case 69:
            _context.prev = 69;
            _context.t3 = _context['catch'](55);

            if (typeof _reject2 === 'function') _reject2(_context.t3);
            _context.next = 74;
            return (0, _effects.put)({
              type: _authActions.USER_FORGOT_PASSWORD_FAILURE,
              error: _context.t3,
              meta: { auth: true }
            });

          case 74:
            _errorMessage2 = typeof _context.t3 === 'string' ? _context.t3 : typeof _context.t3 === 'undefined' || !_context.t3.message ? 'ra.auth.sign_in_error' : _context.t3.message;
            // yield put(showNotification(errorMessage, "warning"));

          case 75:
            return _context.abrupt('break', 131);

          case 76:
            _resolve3 = meta.resolve, _reject3 = meta.reject, _meta$onSuccess = meta.onSuccess, onSuccess = _meta$onSuccess === undefined ? {} : _meta$onSuccess, _meta$onFailure = meta.onFailure, onFailure = _meta$onFailure === undefined ? {} : _meta$onFailure;
            _context.prev = 77;
            _context.next = 80;
            return (0, _effects.put)({ type: _authActions.USER_CHANGE_PASS_LOADING });

          case 80:
            _context.next = 82;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_CHANGE_PASS, payload);

          case 82:
            _authPayload3 = _context.sent;
            _context.next = 85;
            return (0, _effects.put)({
              type: _authActions.USER_CHANGE_PASS_SUCCESS,
              payload: _authPayload3,
              meta: (0, _extends3.default)({}, onSuccess)
            });

          case 85:
            if (typeof _resolve3 === 'function') _resolve3(_authPayload3);
            _context.next = 94;
            break;

          case 88:
            _context.prev = 88;
            _context.t4 = _context['catch'](77);

            if (typeof _reject3 === 'function') _reject3(_context.t4);
            _context.next = 93;
            return (0, _effects.put)({
              type: _authActions.USER_CHANGE_PASS_FAILURE,
              error: _context.t4,
              meta: (0, _extends3.default)({}, onFailure)
            });

          case 93:
            _errorMessage3 = typeof _context.t4 === 'string' ? _context.t4 : typeof _context.t4 === 'undefined' || !_context.t4.message ? 'ra.auth.sign_in_error' : _context.t4.message;
            // yield put(showNotification(errorMessage, "warning"));

          case 94:
            return _context.abrupt('break', 131);

          case 95:
            _context.prev = 95;
            _context.next = 98;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_CHECK, payload);

          case 98:
            _context.next = 106;
            break;

          case 100:
            _context.prev = 100;
            _context.t5 = _context['catch'](95);
            _context.next = 104;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_LOGOUT);

          case 104:
            _context.next = 106;
            return (0, _effects.put)((0, _reactRouterRedux.replace)({
              pathname: _context.t5 && _context.t5.redirectTo || '/login',
              state: { nextPathname: meta.pathName }
            }));

          case 106:
            return _context.abrupt('break', 131);

          case 107:
            _context.next = 109;
            return (0, _effects.put)((0, _reactRouterRedux.push)(action.payload && action.payload.redirectTo || '/login'));

          case 109:
            _context.next = 111;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_LOGOUT);

          case 111:
            _context.next = 113;
            return (0, _effects.put)({
              type: _authActions.ACTION_REMOVE_IDENTITY
            });

          case 113:
            return _context.abrupt('break', 131);

          case 114:
            _context.prev = 114;
            _context.next = 117;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_ERROR, error);

          case 117:
            _context.next = 130;
            break;

          case 119:
            _context.prev = 119;
            _context.t6 = _context['catch'](114);
            _context.next = 123;
            return (0, _effects.select)(currentPathnameSelector);

          case 123:
            nextPathname = _context.sent;
            _context.next = 126;
            return (0, _effects.call)(enhancedAuthProvider, _auth.AUTH_LOGOUT);

          case 126:
            _context.next = 128;
            return (0, _effects.put)((0, _reactRouterRedux.push)({
              pathname: '/login',
              state: { nextPathname: nextPathname }
            }));

          case 128:
            _context.next = 130;
            return (0, _effects.put)((0, _notificationActions.hideNotification)());

          case 130:
            return _context.abrupt('break', 131);

          case 131:
          case 'end':
            return _context.stop();
        }
      }
    }, _marked, this, [[9, 25], [33, 47], [55, 69], [77, 88], [95, 100], [114, 119]]);
  }
  return (/*#__PURE__*/_regenerator2.default.mark(function watchAuthActions() {
      return _regenerator2.default.wrap(function watchAuthActions$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.all)([(0, _effects.takeEvery)(function (action) {
                return action.meta && action.meta.auth;
              }, handleAuth), (0, _effects.takeEvery)(_fetchActions.FETCH_ERROR, handleAuth)]);

            case 2:
            case 'end':
              return _context2.stop();
          }
        }
      }, watchAuthActions, this);
    })
  );
};

module.exports = exports['default'];