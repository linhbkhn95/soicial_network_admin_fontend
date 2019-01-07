'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _reduxSaga = require('redux-saga');

exports.default = function (emitter) {
    return {
        complete: function complete() {
            emitter(_reduxSaga.END);
        },
        error: function error() {
            emitter(_reduxSaga.END);
        },
        next: function next(value) {
            emitter(value);
        }
    };
};

module.exports = exports['default'];