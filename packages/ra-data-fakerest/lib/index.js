'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _fakerest = require('fakerest');

var _fakerest2 = _interopRequireDefault(_fakerest);

var _reactAdmin = require('react-admin');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
function log(type, resource, params, response) {
    if (console.group) {
        // Better logging in Chrome
        console.groupCollapsed(type, resource, JSON.stringify(params));
        console.log(response);
        console.groupEnd();
    } else {
        console.log('FakeRest request ', type, resource, params);
        console.log('FakeRest response', response);
    }
}

/**
 * Respond to react-admin data queries using a local JavaScript object
 *
 * Useful for debugging and testing - do not use in production.
 *
 * @example
 * import fakeDataProvider from 'ra-data-fakerest';
 * const dataProvider = fakeDataProvider({
 *   posts: [
 *     { id: 0, title: 'Hello, world!' },
 *     { id: 1, title: 'FooBar' },
 *   ],
 *   comments: [
 *     { id: 0, post_id: 0, author: 'John Doe', body: 'Sensational!' },
 *     { id: 1, post_id: 0, author: 'Jane Doe', body: 'I agree' },
 *   ],
 * })
 */

exports.default = function (data) {
    var loggingEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var restServer = new _fakerest2.default.Server();
    restServer.init(data);
    if (window) {
        window.restServer = restServer; // give way to update data in the console
    }

    function getResponse(type, resource, params) {
        switch (type) {
            case _reactAdmin.GET_LIST:
                {
                    var _params$pagination = params.pagination,
                        page = _params$pagination.page,
                        perPage = _params$pagination.perPage;
                    var _params$sort = params.sort,
                        field = _params$sort.field,
                        order = _params$sort.order;

                    var query = {
                        sort: [field, order],
                        range: [(page - 1) * perPage, page * perPage - 1],
                        filter: params.filter
                    };
                    return {
                        data: restServer.getAll(resource, query),
                        total: restServer.getCount(resource, {
                            filter: params.filter
                        })
                    };
                }
            case _reactAdmin.GET_ONE:
                return {
                    data: restServer.getOne(resource, params.id, (0, _extends4.default)({}, params))
                };
            case _reactAdmin.GET_MANY:
                return {
                    data: restServer.getAll(resource, {
                        filter: { id: params.ids }
                    })
                };
            case _reactAdmin.GET_MANY_REFERENCE:
                {
                    var _params$pagination2 = params.pagination,
                        _page = _params$pagination2.page,
                        _perPage = _params$pagination2.perPage;
                    var _params$sort2 = params.sort,
                        _field = _params$sort2.field,
                        _order = _params$sort2.order;

                    var _query = {
                        sort: [_field, _order],
                        range: [(_page - 1) * _perPage, _page * _perPage - 1],
                        filter: (0, _extends4.default)({}, params.filter, (0, _defineProperty3.default)({}, params.target, params.id))
                    };
                    return {
                        data: restServer.getAll(resource, _query),
                        total: restServer.getCount(resource, {
                            filter: _query.filter
                        })
                    };
                }
            case _reactAdmin.UPDATE:
                return {
                    data: restServer.updateOne(resource, params.id, (0, _extends4.default)({}, params.data))
                };
            case _reactAdmin.UPDATE_MANY:
                params.ids.forEach(function (id) {
                    return restServer.updateOne(resource, id, (0, _extends4.default)({}, params.data));
                });
                return { data: params.ids };
            case _reactAdmin.CREATE:
                return {
                    data: restServer.addOne(resource, (0, _extends4.default)({}, params.data))
                };
            case _reactAdmin.DELETE:
                return { data: restServer.removeOne(resource, params.id) };
            case _reactAdmin.DELETE_MANY:
                params.ids.forEach(function (id) {
                    return restServer.removeOne(resource, id);
                });
                return { data: params.ids };
            default:
                return false;
        }
    }

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    return function (type, resource, params) {
        var collection = restServer.getCollection(resource);
        if (!collection) {
            return new Promise(function (_, reject) {
                return reject(new Error('Undefined collection "' + resource + '"'));
            });
        }
        var response = void 0;
        try {
            response = getResponse(type, resource, params);
        } catch (error) {
            return new Promise(function (_, reject) {
                return reject(error);
            });
        }
        if (response === false) {
            return new Promise(function (_, reject) {
                return reject(new Error('Unsupported fetch action type ' + type));
            });
        }
        if (loggingEnabled) {
            log(type, resource, params, response);
        }
        return new Promise(function (resolve) {
            return resolve(response);
        });
    };
};

module.exports = exports['default'];