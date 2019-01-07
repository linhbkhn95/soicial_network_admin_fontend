import {
  generateService,
  generateMockService,
  apiOperators,
} from '../apiClient/request';

import { AUTH_BASE } from '../constants';

const serviceMeta = {
  refreshAccessToken: {
    url: () => '/auth/refresh',
    method: 'post',
  },
  basicLogin: {
    url: () => '/auth/basic',
    method: 'get',
  },
  getMe: {
    url: () => '/auth/me',
    requireToken: true,
    method: 'get',
  },
  getCompany: {
    url: id => `/fleets/${id}`,
    requireToken: true,
    method: 'get',
  },
  logout: {
    url: () => '/auth/logout',
    requireToken: true,
    method: 'put',
  },
  changePass: {
    url: () => '/auth/change-password',
    requireToken: true,
    method: 'put',
  },
  forgotPassword: {
    url: () => '/auth/forgot-password',
    // requireToken: true,
    method: 'post',
  },
  resetPassword: {
    url: () => '/auth/reset-password',
    requireToken: true,
    method: 'post',
  },
  checkResetPassword: {
    url: () => '/auth/reset-password',
    method: 'get',
  },
  earnings: {
    url: () => '/auth/earnings',
    requireToken: true,
    method: 'get',
  },
 
};

const authService = generateService(serviceMeta, apiOperators.auth);

export default authService;

// generateService return một Object gom cac ham api service voi signature (params, headers) => Promises, voi key la
// key trong serviceMete, call bang cach objReturnFromGenerateService[serviceName](params, headers)

/// Code o duoi không quan trọng

export const mockService = generateMockService(serviceMeta, AUTH_BASE);

export const refreshAccessToken = (params, header) =>
  apiOperators.auth['post'](
    serviceMeta.refreshAccessToken.url(),
    { ...params },
    { ...header },
  );

export const basicLogin = (params, header) =>
  apiOperators.auth['post'](
    serviceMeta.basicLogin.url(),
    { ...params },
    { ...header },
  );
  export const checkResetPassword = (params, header) =>
  apiOperators.auth['get'](
    serviceMeta.checkResetPassword.url(),
    { ...params },
    { ...header },
  );
  export const forgotPassword = (params, header) =>
  apiOperators.auth['post'](
    serviceMeta.forgotPassword.url(),
    { ...params },
    { ...header },
  );
  export const resetPassword = (params, header) =>
  apiOperators.auth['post'](
    serviceMeta.resetPassword.url(),
    { ...params },
    { ...header },
  );
export const changePass = (params, header) =>
  authService['changePass']({ ...params }, { ...header });
