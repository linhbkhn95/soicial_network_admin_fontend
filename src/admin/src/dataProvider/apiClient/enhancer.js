import jwtDecode from 'jwt-decode';
import objectPath from 'object-path';
import { apiParamsKey } from '../constants';
// import { isImage } from '~/utils';
// import generalService from '~/dataProvider/apiClient/general';
// import { logArgs } from '~/utils';
import isPlainObject from 'lodash/isPlainObject';
// Decorator for DataProvider React-Admin
export const addRequestAccessToken = (
  requestHandler,
  getRefreshToken,
  requestAccessToken,
  forceLogout = () => null,
) => async (type, resource, params, header, accessToken, ...rest) => {
  let refreshToken = getRefreshToken;
  if (typeof getRefreshToken === 'function') {
    refreshToken = getRefreshToken();
  }
  let refreshAccessToken = accessToken;
  //logArgs({
  //prefix: 'addRequestAccessToken',
  //args: { type, resource, params, header, accessToken },
  //});
  if (
    typeof accessToken === 'string' &&
    accessToken.match(/[A-Za-z0-9\-\._~\+\/]+=*/) // eslint-disable-line
  ) {
    let needRefresh = false;

    try {
      const jwt = jwtDecode(accessToken);
      if (Date.now() / 1000 > jwt.exp - 20) {
        needRefresh = true;
      }
      console.log('check refreshToken ', jwt);
    } catch (e) {
      console.log('need refresh by error ', e);
      needRefresh = true;
    }
    if (needRefresh) {
      console.log('we need refresh ', jwtDecode(accessToken));
      try {
        const ret = await requestAccessToken({
          [apiParamsKey.refreshToken]: refreshToken,
        });

        refreshAccessToken = ret[apiParamsKey.accessToken];
        localStorage.setItem('accessToken', refreshAccessToken);
        localStorage.setItem('refreshToken', ret[apiParamsKey.refreshToken]);
      } catch (e) {
        forceLogout();
        throw e;
      }
    }
  }
  try {
    const data = await requestHandler(
      type,
      resource,
      params,
      header,
      refreshAccessToken,
      ...rest,
    );
    return data;
  } catch (e) {
    throw e;
  }
};

// Decorator for saga api request

export const addLanguageToHeader = (requestHandler, getLangCode) => (
  type,
  resource,
  params,
  header,
  accessToken,
) => {
  let langCode = getLangCode;
  if (typeof getLangCode === 'function') {
    langCode = getLangCode();
  }

  const localizedHeader = {
    ...header,
    'x-language': langCode,
  };

  //logArgs({
  //prefix: 'addLanguageToHeader',
  //args: { type, resource, params, header, accessToken },
  //});
  return requestHandler(type, resource, params, localizedHeader, accessToken);
};

export const addAccessToken = requestHandler => {
  return (type, resource, params, header, ...rest) => {
    const accessToken = localStorage.getItem('accessToken');
    return requestHandler(type, resource, params, header, accessToken, ...rest);
  };
};

export const addAccessTokenApiSaga = requestHandler => {
  return (url, params, headers) => {
    const accessToken = localStorage.getItem('accessToken');
    return requestHandler(url, params, headers, accessToken);
  };
};

export const flushOutNull = requestHandler => (
  type,
  resource,
  params = {},
  header = {},
  accessToken,
) => {
  const data = objectPath.get(params, 'data');
  if (!isPlainObject(data)) {
    return requestHandler(type, resource, params, header, accessToken);
  }
  // const newData = Object.keys(data).reduce(
  //   (acc, key) => ({
  //     ...acc,
  //     [key]: data[key] === "null" ? undefined : data[key],
  //   }),
  //   {},
  // );
  return requestHandler(
    type,
    resource,
    { ...params, data: data },
    header,
    accessToken,
  );
};

export const adjustPhoneNumber = requestHandler => async (
  type,
  resource,
  params = {},
  header = {},
  accessToken = '',
) => {
  if (params.data === undefined || params.data === null) {
    return requestHandler(type, resource, params, header, accessToken);
  }

  const phoneRegex = /(?:\(\+84\)\s|0)([0-9]{2}\s[0-9]{3}\s[0-9]{4})/g;
  const newData = Object.keys(params.data).reduce((acc, key) => {
    if (
      typeof params.data[key] === 'string' &&
      params.data[key].match(phoneRegex)
    ) {
      const corePart = phoneRegex.exec(params.data[key])[1].replace(/\s/g, '');
      return { ...acc, [key]: '0' + corePart };
    }
    return { ...acc, [key]: params.data[key] };
  }, params.data); // hidden class

  return await requestHandler(
    type,
    resource,
    { ...params, data: newData },
    { ...header, 'content-type': 'multipart/form-data' },
    accessToken,
  );
};

export const formDataToHeader = requestHandler => async (
  type,
  resource,
  params = {},
  header = {},
  accessToken = '',
) => {
  //logArgs({
  //prefix: 'formDataToHeader',
  //args: { type, resource, params, header, accessToken },
  //});

  if (params.data === undefined || params.data === null) {
    return requestHandler(type, resource, params, header, accessToken);
  }
  // const normalData = {};
  // const hasFile = Object.keys(params.data).find(key =>
  //   checkIfIsFile(params.data[key]),
  // );

  // const imgFilesKey = Object.keys(params.data).filter(key => {
  //   if (checkIfIsFile(params.data[key]) && isImage(params.data[key], key)) {
  //     return true;
  //   }
  //   normalData[key] = params.data[key];
  //   return false;
  // });
  var acc = {
    ...params.data,
  };

  //generate object data has file data
  await Object.keys(params.data).forEach(key => {
    if (params.data[key] && params.data[key].rawFile) {
      acc[key] = params.data[key].rawFile;
      acc['hasFile'] = true;
    }
  });

  return await requestHandler(
    type,
    resource,
    { ...params, data: acc },
    { ...header },
    accessToken,
  );
};

// const checkIfIsFile = dataItem =>
//   dataItem && dataItem.constructor === Object && dataItem.rawFile;
