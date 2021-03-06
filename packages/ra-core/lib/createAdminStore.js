'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _effects = require('redux-saga/effects');

var _authActions = require('./actions/authActions');

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _sideEffect = require('./sideEffect');

var _i18n = require('./i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var authProvider = _ref.authProvider,
      _ref$customReducers = _ref.customReducers,
      customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
      _ref$customSagas = _ref.customSagas,
      customSagas = _ref$customSagas === undefined ? [] : _ref$customSagas,
      dataProvider = _ref.dataProvider,
      _ref$i18nProvider = _ref.i18nProvider,
      i18nProvider = _ref$i18nProvider === undefined ? _i18n.defaultI18nProvider : _ref$i18nProvider,
      history = _ref.history,
      initialState = _ref.initialState,
      _ref$locale = _ref.locale,
      locale = _ref$locale === undefined ? 'en' : _ref$locale;

  var messages = i18nProvider(locale);
  var appReducer = (0, _reducer2.default)(customReducers, locale, messages);

  var resettableAppReducer = function resettableAppReducer(state, action) {
    return appReducer(action.type !== _authActions.USER_LOGOUT ? state : undefined, action);
  };
  var saga = /*#__PURE__*/_regenerator2.default.mark(function rootSaga() {
    return _regenerator2.default.wrap(function rootSaga$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _effects.all)([(0, _sideEffect.adminSaga)(dataProvider, authProvider, i18nProvider)].concat((0, _toConsumableArray3.default)(customSagas)).map(_effects.fork));

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, rootSaga, this);
  });
  var sagaMiddleware = (0, _reduxSaga2.default)();
  var store = (0, _redux.createStore)(resettableAppReducer, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(sagaMiddleware, (0, _reactRouterRedux.routerMiddleware)(history)), typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  }));
  sagaMiddleware.run(saga);
  return store;
};

module.exports = exports['default'];