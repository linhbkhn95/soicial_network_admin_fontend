export const API_BASE =
  localStorage.getItem('API_BASE') || process.env.API_BASE; // 'https://gw.veep.me/api/v1/fleet'; // 'http://192.168.24.210:6001' //"http://pms.yootamedia.com/";
export const API_DATA_BASE = process.env.API_BASE; // 'https://gw.veep.me/api/v1/fleet';
// export const API_AUTH_AND_SETTINGS_BASE = 'http://localhost:4444';
// export const API_BASE_STAGE = 'http://192.168.24.210:6001' //"http://pms.yootamedia.com/";
export const API_TIMEOUT = 30000;

export const role = {
  admin: 1,
  normalUser: 2,
};

export const apiParamsKey = {
  pageSize: 'page_size',
  page: 'page',
  refreshToken: 'refresh_token',
  accessToken: 'access_token',
  province: 'adl1',
  district: 'adl2',
  commune: 'adl3',
};
