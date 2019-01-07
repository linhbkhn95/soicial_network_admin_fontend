import axios from 'axios';
import qs from 'qs';
import { SubmissionError } from 'redux-form';
//import {
//addRequestAccessToken,
//addAccessToken,
//} from '~/dataProvider/apiClient/enhancer';
import {
  addRequestAccessToken,
  addAccessToken,
} from '~/dataProvider/apiClient/apiSagaEnhancer';
import { AUTH_BASE, API_BASE } from '../constants';

console.log(`API_BASE ${API_BASE} AUTH_BASE ${AUTH_BASE}`);

function getData(data) {
  for (var index in data) {
    if (data[index] == null || data[index] == undefined) delete data[index];
  }
  return data;
}

class RequestError extends Error {
  constructor(resp) {
    super(resp.problem);
    this.name = this.constructor.name;
    this.statusCode = resp.status;
    this.response = resp;
  }
}

const methods = ['get', 'put', 'post', 'delete', 'patch'];
// common api request
// Authorization Bearer JWT
//
// APiOperators Generator generates a set (in represention as an object) of common methods with specific api base
export const apiOperatorGenerator = apiBase => {
  const axiosApi = axios.create({
    baseURL: apiBase,
    headers: {
      // "Accept": 'application/json',
      'x-language': 'vi',
    },
  });

  return methods.reduce(
    (acc, method) => ({
      ...acc,
      [method]: (url, params = {}, headers = {}, token = null) => {
        // console.log(
        //   `url: ${url}, params: ${params}, header: ${headers} token: ${token}`,
        // );
        return apiRequest(axiosApi, method, url, params, headers, token);
      },
    }),
    {},
  );
};

// we get apiOperator of data and auth service (data api base and auth api base)
const authDataOperator = apiOperatorGenerator(API_BASE);
export const apiOperators = {
  data: authDataOperator,
  auth:
    API_BASE === AUTH_BASE ? authDataOperator : apiOperatorGenerator(AUTH_BASE),
};

// we define apiRequest for common usage
const apiRequest = async (
  axiosApi,
  method,
  path,
  params = {},
  headers = {},
  token = null,
) => {
  const requestHeaders = headers;
  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
    // requestHeaders["Content-Type"] ="multipart/form-data"
  }
  // console.log(
  //   "axios params ",
  //   params,
  //   "token ",
  //   token,
  //   " with method ",
  //   method,
  // );
  // if (getConfig(store.getState()).mode === "staging") {
  //   api.setBaseURL(API_BASE_STAGE);
  // } else {
  //   api.setBaseURL(API_BASE);
  // }
  params = getData(params);
  try {
    let args = [
      path,
      params,
      {
        headers: {
          ...requestHeaders,
          // 'content-type': `multipart/form-data; boundary=${params.data._boundary}`,
        },
      },
    ];

    if (method === 'get') {
      args = [
        path,
        {
          params,
          headers: {
            ...requestHeaders,
          },
          paramsSerializer: _params =>
            qs.stringify(_params, { arrayFormat: 'brackets' }),
        },
      ];
    }

    //if request hasFile
    if (params && params.hasFile) {
      var acc = new FormData();
      delete params['hasFile'];
      await Object.keys(params).forEach(key => {
        acc.append(key, params[key]);
      });
      args = [
        path,
        acc,
        {
          headers: {
            ...requestHeaders,
            'content-type': 'multipart/form-data',
          },
        },
      ];
    }
    if (method === 'delete') {
      args = [
        path,
        {
          headers: {
            ...requestHeaders,
          },
        },
      ];
    }

    // if(path=="fleets"){
    //   resp = await  await axios({
    //     method: 'post',
    //     url: 'http://www.yourserver.com/upload',
    //     data: form,
    //     headers: {
    //     'content-type': `multipart/form-data; boundary=${form._boundary}`,
    //     },
    // }
    const resp = await axiosApi[method](...args);

    if (resp.ok || (resp.status >= 200 && resp.status < 300)) {
      //console.log('response ', resp.data);
      return resp.data;
    }

    //console.log('response ', resp);
    throw new RequestError(resp);
  } catch (e) {
    //console.log('response err ', e);
    throw e;
  }
};

/**
 * @deprecated Not using
 * @param {string} url
 */
export const getParentUrl = url => {
  const s = url.split('/');
  s.pop();
  return s.join('/');
};

export const generateService = (serviceMeta, apiOperator) =>
  Object.keys(serviceMeta).reduce((acc, key) => {
    const {
      method,
      url,
      requireToken = false,
      isFormData = false,
    } = serviceMeta[key];

    let newRequest = apiOperator[method];
    if (!methods.includes(method) || typeof url !== 'function') {
      newRequest = () =>
        Promise.reject({ message: 'Unknown Method or Endpoint' });
    }

    const requestAccessToken = (params, headers) =>
      apiOperators.auth['post']('/auth/refresh', { ...params }, { ...headers });

    if (requireToken) {
      newRequest = addAccessToken(
        addRequestAccessToken(
          newRequest,
          localStorage.getItem('refreshToken'),
          requestAccessToken,
        ),
      );
    }
    let decoredRequest = (params, header, urlParams = []) => {
      let _params = { ...params };
      if (isFormData) {
        _params = Object.keys(params).reduce((acc, key) => {
          acc.append(key, params[key]);
          return acc;
        }, new FormData());
      }
      return newRequest(url(...urlParams), _params, { ...header });
    };
    return { ...acc, [key]: decoredRequest };
  }, {});

export const generateMockService = (serviceMeta, URL_BASE) =>
  Object.keys(serviceMeta).reduce((acc, key) => {
    const { url, method } = serviceMeta[key];
    let newRequest;
    if (!methods.includes(method) || typeof url !== 'function') {
      newRequest = () =>
        Promise.reject({ message: 'Unknow Method or Endpoint' });
    }
    newRequest = async (params, header) => {
      const headers = new Headers({
        Accept: 'application/json',
        ...header,
      });
      try {
        const ret = await fetch(`${URL_BASE}${url()}`, {
          method: method.toUpperCase,
          body: JSON.stringify(params),
          headers,
        });
        return ret;
      } catch (e) {
        throw e;
      }
    };
    return { ...acc, [key]: newRequest };
  }, {});

export const withSubmissionErrorHandler = ({
  requestor,
  SubmissionErrorConstructor = SubmissionError,
  submitAction,
  submitFn,
  accessToken,
  onSuccess,
  onFailure,
  submitParamsUrl,
  header = {},
}) => values => {
  const pr = new Promise((resolve, reject) => {
    const cb = (err, ret) => {
      if (err) {
        if (typeof onFailure === 'function') {
          onFailure(err);
        }
        reject(err);
      } else {
        if (typeof onSuccess === 'function') {
          onSuccess(err);
        }
        resolve(ret);
      }
    };

    if (submitAction) {
      if (accessToken) {
        requestor(
          submitAction,
          accessToken,
          submitParamsUrl,
          { ...values },
          { ...header },
          cb,
        );
      } else {
        requestor(
          submitAction,
          submitParamsUrl,
          { ...values },
          { ...header },
          cb,
        );
      }
    }

    if (submitFn) {
      submitFn({ ...values }, (err, ret) => cb(err, ret));
    }
  });

  return pr.then(
    () => {},
    err => {
      if ((err.response && err.response.status) === 422) {
        console.log('erradjkdajkdjkadjkadkjadkjadkjadad', err);
        throw new SubmissionErrorConstructor(
          err.response.data && err.response.data.errors,
        );
      }
    },
  );
};
