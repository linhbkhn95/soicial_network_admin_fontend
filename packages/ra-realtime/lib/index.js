'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.watchLocationChangeFactory = exports.watchCrudActionsFactory = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _reactRouterRedux = require('react-router-redux');

var _effects = require('redux-saga/effects');

var _reactAdmin = require('react-admin');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _buildAction = require('./buildAction');

var _buildAction2 = _interopRequireDefault(_buildAction);

var _createObserverChannel = require('./createObserverChannel');

var _createObserverChannel2 = _interopRequireDefault(_createObserverChannel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchCrudActionsFactory = exports.watchCrudActionsFactory = function watchCrudActionsFactory(observeRequest) {
    return (/*#__PURE__*/_regenerator2.default.mark(function watchCrudActions(action) {
            var params, _action$meta, fetchType, resource, observer, realtimeChannel, payload, type, requestPayload, meta, raAction;

            return _regenerator2.default.wrap(function watchCrudActions$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            params = action.payload, _action$meta = action.meta, fetchType = _action$meta.fetch, resource = _action$meta.resource;
                            _context.next = 3;
                            return (0, _effects.call)(observeRequest, fetchType, resource, params);

                        case 3:
                            observer = _context.sent;

                            if (observer) {
                                _context.next = 6;
                                break;
                            }

                            return _context.abrupt('return');

                        case 6:
                            _context.next = 8;
                            return (0, _effects.call)(_createObserverChannel2.default, observer);

                        case 8:
                            realtimeChannel = _context.sent;
                            _context.prev = 9;

                        case 10:
                            if (!true) {
                                _context.next = 26;
                                break;
                            }

                            _context.next = 13;
                            return (0, _effects.take)(realtimeChannel);

                        case 13:
                            payload = _context.sent;
                            type = action.type, requestPayload = action.payload, meta = action.meta;
                            _context.next = 17;
                            return [(0, _effects.put)({
                                type: type + '_LOADING',
                                payload: requestPayload,
                                meta: (0, _omit2.default)(meta, 'fetch')
                            }), (0, _effects.put)({ type: _reactAdmin.FETCH_START })];

                        case 17:
                            _context.next = 19;
                            return (0, _effects.call)(_buildAction2.default, action, payload);

                        case 19:
                            raAction = _context.sent;
                            _context.next = 22;
                            return (0, _effects.put)(raAction);

                        case 22:
                            _context.next = 24;
                            return (0, _effects.put)({ type: _reactAdmin.FETCH_END });

                        case 24:
                            _context.next = 10;
                            break;

                        case 26:
                            _context.prev = 26;
                            _context.next = 29;
                            return (0, _effects.cancelled)() && realtimeChannel;

                        case 29:
                            if (!_context.sent) {
                                _context.next = 31;
                                break;
                            }

                            realtimeChannel.close();

                        case 31:
                            return _context.finish(26);

                        case 32:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, watchCrudActions, this, [[9,, 26, 32]]);
        })
    );
};

var watchLocationChangeFactory = exports.watchLocationChangeFactory = function watchLocationChangeFactory(watchCrudActions) {
    return (/*#__PURE__*/_regenerator2.default.mark(function watchLocationChange() {
            return _regenerator2.default.wrap(function watchLocationChange$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return (0, _effects.takeLatest)([_reactAdmin.CRUD_GET_LIST, _reactAdmin.CRUD_GET_ONE], watchCrudActions);

                        case 2:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, watchLocationChange, this);
        })
    );
};

exports.default = function (observeQuery) {
    return (/*#__PURE__*/_regenerator2.default.mark(function realtimeSaga() {
            var watchCrudActions;
            return _regenerator2.default.wrap(function realtimeSaga$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            watchCrudActions = watchCrudActionsFactory(observeQuery);
                            _context3.next = 3;
                            return (0, _effects.takeLatest)(_reactRouterRedux.LOCATION_CHANGE, watchLocationChangeFactory(watchCrudActions));

                        case 3:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, realtimeSaga, this);
        })
    );
};