import jwtDecode from 'jwt-decode';
import objectPath from 'object-path';
import { apiParamsKey } from '../constants';

export const addRequestAccessToken = (
  requestHandler,
  refreshToken,
  requestAccessToken,
  forceLogout = () => null,
) => async (url, params, header, accessToken) => {
  let refreshAccessToken = accessToken;
  // console.log(`addRequestAccessTokenAxios accessToken ${accessToken}`);
  if (typeof accessToken === 'string' && accessToken.match(/\w+\.\w+\.\w+/)) {
    let needRefresh = false;

    try {
      const jwt = jwtDecode(accessToken);
      if (Date.now() / 1000 > jwt.exp - 20) {
        needRefresh = true;
      }
    } catch (e) {
      console.log('need refresh by error ', e);
      needRefresh = true;
    }
    if (needRefresh) {
      console.log(
        `we need to refresh accessToken with refreshToken ${localStorage.getItem(
          'refreshToken',
        )}`,
      );
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
    const data = await requestHandler(url, params, header, refreshAccessToken);
    return data;
  } catch (e) {
    throw e;
  }
};

export const addAccessToken = requestHandler => {
  return (url, params, headers) => {
    const accessToken = localStorage.getItem('accessToken');
    return requestHandler(url, params, headers, accessToken);
  };
};
