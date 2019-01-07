import { stringify } from 'qs';
import objectPath from 'object-path';
import { apiOperatorGenerator } from '~/dataProvider/apiClient/request';
import { generalizeListData } from '~/utils';
import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  UPDATE_MANY,
  DELETE_MANY,
  GET_MANY,
  GET_MANY_REFERENCE,
} from 'react-admin';
import { SubmissionError } from 'redux-form';

import { API_BASE, API_DATA_MOCK } from '../constants';

const apiOperator = apiOperatorGenerator(API_BASE);

export const GET_ME = '/DATA/GET_ME';
export const GET_OPTION = '/DATA/GET_OPTION';

global.apiDataGet = apiOperator['get'];
global.resource = {};

// function getListEarnings(object) {
//   let result = [];
//   for (var index in object) {
//     console.log('index', object[index]);

//     var attr = object[index];
//     result = result.concat(attr);
//   }
//   return result;
// }

const withAxios = (
  resource,
  type,
  url,
  method,
  options,
  params,
  accessToken,
) => {
  if (type === 'GET__EXPORT') {
    return Promise.resolve({
      accessToken,
    });
  }

  return apiOperator[method](
    url,
    params.data,
    options.headers,
    accessToken,
  ).then(res => {
    switch (type) {
      case GET_OPTION:
      case GET_LIST:
      case GET_MANY_REFERENCE:
        // if (resource == 'earnings') {
        // console.log('withAxios', resource, res);

        // // if (res.data['2'] && res.data.length) data = res.data['2'];
        // // if (res.data['2'] && res.data['2'].length > 10)
        // // data = res.data['2'].slice(0, 10);
        // let data = getListEarnings(res.data);
        // global.resource[resource] = res;
        // return {
        // data: generalizeListData(data),
        // total: data.length,
        // };
        // }
        return {
          ...res,
          data: generalizeListData(res.items),
          total: res.total_record,
        };
      case CREATE:
        return { data: { ...params.data, id: res.id } };
      case UPDATE:
        return { data: { ...params.data } };
      case DELETE:
        return { data: { id: params.id, ...res } };

      case GET_ONE: {
        const data = res;
        const generalizedData = Object.keys(data).reduce((acc, key) => {
          const keySplit = key.split('_');
          if (keySplit.pop() === 'url') {
            const filePrmKey = keySplit.join('_');
            return {
              ...acc,
              [filePrmKey]: { src: data[key], ...data[filePrmKey] },
            };
          }

          return acc;
        }, {});
        //console.log('generalized Data ', generalizedData);
        return { data: { ...data, ...generalizedData } };
      }
      default:
        return { data: res };
    }
  });
};
const withFetch = (type, url, method, options, params, accessToken) => {
  let headers;
  options.headers.append('Authorization', `Bearer ${accessToken}`);
  return fetch(`${API_DATA_MOCK}${url}`, options)
    .then(res => {
      headers = res.headers;
      return res.json();
    })
    .then(json => {
      switch (type) {
        case GET_LIST:
        case GET_MANY_REFERENCE:
          if (!headers.has('content-range')) {
            throw new Error(
              'The Content-Range header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare Content-Range in the Access-Control-Expose-Headers header?',
            );
          }
          return {
            data: json,
            total: parseInt(
              headers
                .get('content-range')
                .split('/')
                .pop(),
              10,
            ),
          };
        case CREATE:
          return { data: { ...params.data, id: json.id } };
        case UPDATE:
          return { data: { ...params.data } };
        default:
          return { data: json };
      }
    });
};

const prepareRequestMock = (type, resource, params, header) => {
  const options = {
    headers: new Headers({
      Accept: 'application/json',
      ...header,
    }),
  };
  let url = '';
  let method = 'get';
  switch (type) {
    case GET_LIST: {
      url = resource;
      if (resource != 'earnings') {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sorts;
        const query = {
          sort: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          filter: JSON.stringify(params.filters),
        };

        url = `/${resource}?${stringify(query)}`;
      }

      method = 'get';
      break;
    }
    case GET_ONE:
      url = `/${resource}/${params.id}`;
      method = 'get';
      break;
    case CREATE:
      url = `/${resource}`;
      method = 'post';
      break;
    case UPDATE:
      url = `/${resource}/${params.id}`;
      method = 'put';
      break;
    case UPDATE_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `/${resource}?${stringify(query)}`;
      method = 'patch';
      break;
    }
    case DELETE:
      url = `/${resource}/${params.id}`;
      method = 'delete';
      break;
    case DELETE_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `/${resource}?${stringify(query)}`;
      method = 'delete';
      break;
    }
    case GET_MANY: {
      const query = {
        filter: JSON.stringify({ id: params.ids }),
      };
      url = `/${resource}?${stringify(query)}`;
      method = 'get';
      break;
    }
    case GET_ME: {
      url = '/auth/me';
      method = 'get';
      break;
    }
    case GET_MANY_REFERENCE: {
      let query = {};
      console.log('GET_MANY_REFERENCE');
      if (resource != 'earnings') {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sorts;
        query = {
          sort: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          filter: JSON.stringify({
            ...params.filters,
            [params.target]: params.id,
          }),
        };
      } else {
        query = {
          token:
            '593f848ffce706128fb0a8c2d998ce62df94bec204edaab2d1503126aa0310e4',
          fleet_id: localStorage.getItem('fleet_id'),
        };
      }
      url = `/${resource}?${stringify(query)}`;
      method = 'get';
      break;
    }
    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }

  options.method = method.toUpperCase();

  // body in GET, DELETE ... is not allowed
  if (['POST', 'PUT', 'PATCH'].indexOf(method.toUpperCase()) > -1) {
    options.body = JSON.stringify(objectPath.get(params, 'data', {}));
  }
  return { url, options, method };
};

const prepareRequestReal = (type, resource, params, header) => {
  let url = '';
  let method = 'get';
  const options = {
    headers: new Headers({
      Accept: 'application/json',
      ...header,
    }),
  };

  switch (type) {
    case 'GET__EXPORT':
      url = `/${resource}`;
      method = 'get';
      break;

    /**
     * params = {
     *pagination: {page, perPage },
     *sorts: { [attribute]: 'ASC|DESC' },
     *filters: {[field]: [value]}
     * }
     */
    case GET_LIST: {
      let query = {};
      console.log('GET_MANY_REFERENCE');
      // if (resource != 'earnings') {
      const pagination = objectPath.get(params, 'pagination', {});

      const { page, perPage } = {
        page: 1,
        perPage: 10,
        ...pagination,
      };

      // const { field, order } = objectPath.get(params, 'sort', {
      // field: '',
      // order: '',
      // });
      const sorts = params.sorts
        ? {
            [params.sorts.field]: params.sorts.order === 'ASC' ? 1 : -1,
          }
        : {};
      query = {
        sorts: sorts, // JSON.stringify([field, order]),
        page, //JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        page_size: perPage,
        filters: params.filters, // JSON.stringify(params.filter),
      };
      // } else {
      // query = {
      // token:
      // '593f848ffce706128fb0a8c2d998ce62df94bec204edaab2d1503126aa0310e4',
      // fleet_id: localStorage.getItem('fleet_id'),
      // filters: params.filters,
      // };
      // }

      console.log('q ', query, ' params ', params);
      url = `/${resource}?${stringify(query)}`;
      method = 'get';
      break;
    }
    case GET_ONE:
      url = `/${resource}/${params.id}`;
      method = 'get';
      break;
    case CREATE:
      url = `/${resource}`;
      method = 'post';
      break;
    case UPDATE:
      url = `/${resource}/${params.id}`;
      method = 'put';
      break;
    case UPDATE_MANY: {
      const query = {
        filters: JSON.stringify({ id: params.ids }),
      };
      url = `/${resource}?${stringify(query)}`;
      method = 'patch';
      break;
    }
    case DELETE:
      url = `/${resource}/${params.id}`;
      method = 'delete';
      break;
    case DELETE_MANY: {
      const query = {
        filters: JSON.stringify({ id: params.ids }),
      };
      url = `/${resource}?${stringify(query)}`;
      method = 'delete';
      break;
    }
    case GET_MANY: {
      const query = {
        filters: JSON.stringify({ id: params.ids }),
      };
      url = `/${resource}?${stringify(query)}`;
      method = 'get';
      break;
    }
    case GET_MANY_REFERENCE: {
      let query = {};
      console.log('GET_MANY_REFERENCE');
      if (resource != 'earnings') {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          sorts: JSON.stringify([field, order]),
          range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
          filters: JSON.stringify({
            ...params.filters,
            [params.target]: params.id,
          }),
        };
      } else {
        // query = {
        //   token:
        //     '593f848ffce706128fb0a8c2d998ce62df94bec204edaab2d1503126aa0310e4',
        //   fleet_id: localStorage.getItem('fleet_id'),
        // };
      }
      url = `/${resource}?${stringify(query)}`;

      method = 'get';
      break;
    }
    case GET_ME: {
      url = '/auth/me';
      method = 'get';
      break;
    }
    case GET_OPTION: {
      url = `/${params.key}`;
      method = 'get';
      break;
    }

    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }

  options.method = method.toUpperCase();

  // body in GET, DELETE ... is not allowed
  if (['POST', 'PUT', 'PATCH'].indexOf(method.toUpperCase()) > -1) {
    options.body = JSON.stringify(objectPath.get(params, 'data', {}));
  }

  return { url, options, method };
};

const generateClient = (dataTypeToGet = 'real') => {
  let request = withFetch;

  return async (type, resource, params = {}, header = {}, accessToken = '') => {
    let prepareRequest = prepareRequestReal;

    if (dataTypeToGet === 'real') {
      request = withAxios;
    }

    if (
      dataTypeToGet === 'mock'
      //||
      // (resource == "fleets" || resource == "payments")
    ) {
      request = withFetch;
      prepareRequest = prepareRequestMock;
    }

    const { url, options, method } = prepareRequest(
      type,
      resource,
      params,
      header,
    );
    try {
      const response = await request(
        resource,
        type,
        url,
        method,
        options,
        params,
        accessToken,
      );
      return response;
    } catch (err) {
      if ((err.response && err.response.status) === 422) {
        //console.log('throw submissionError');
        throw new SubmissionError(
          err.response.data && err.response.data.errors,
        );
      }

      throw err;
    }
  };
};
export default generateClient;
