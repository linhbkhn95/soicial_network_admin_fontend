'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createSubscribeFactory = undefined;

var _reduxSaga = require('redux-saga');

var _realtimeObserver = require('./realtimeObserver');

var _realtimeObserver2 = _interopRequireDefault(_realtimeObserver);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSubscribeFactory = exports.createSubscribeFactory = function createSubscribeFactory(realtimeObserverImpl) {
    return function (watcher, emitter) {
        var observer = realtimeObserverImpl(emitter);
        var result = watcher.subscribe(observer);

        return result.unsubscribe;
    };
};

exports.default = function (watcher) {
    return (0, _reduxSaga.eventChannel)(function (emitter) {
        return createSubscribeFactory(_realtimeObserver2.default)(watcher, emitter);
    });
};