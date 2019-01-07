export const API_BASE = (() => {
  // // hot debug
  // if (localStorage.getItem('API_BASE')) {
  //   return localStorage.getItem('API_BASE');
  // }

  // if (process.env.REACT_APP_API_BASE) {
  //   return process.env.REACT_APP_API_BASE;
  // }

  // if (process.env.REACT_APP_CLIENT === 'mock') {
  //   return 'http://localhost:2000';
  // }

  return 'http://localhost:5000';
})();

export const APP_VERSION = '1.0.1';

export const AUTH_BASE = API_BASE; //"http://pms.yootamedia.com/";
export const API_TIMEOUT = 30000;
export const API_DATA_MOCK = 'http://localhost:2000';
export const apiParamsKey = {
  pageSize: 'page_size',
  page: 'page',
  refreshToken: 'refresh_token',
  accessToken: 'access_token',
  province: 'adl1',
  district: 'adl2',
  commune: 'adl3',
  mark: 'mark',
  model: 'model',
  oldPassword: 'old_password',
  newPassword: 'new_password',
  renewPassword: 're_new_password',
};
export const urlStore = {
  appStore: 'https://itunes.apple.com/vn/app/be-driver/id1440565779?mt=8',
  googlePlay: 'https://play.google.com/store',
};
export const role = {
  admin: 1,
  normalUser: 2,
};

document.env = process.env;
