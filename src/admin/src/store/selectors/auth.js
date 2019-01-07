import path from 'object-path';
import get from 'lodash/get';

export const getAccessToken = state => state.auth.tokens.access_token;
export const getRefreshToken = state => state.auth.tokens.refresh_token;
export const getIdentity = state => state.auth.identity;
export const isLogged = state => get(state, ['admin', 'auth', 'isLoggedIn']);
export const getIdentityName = state =>
  path.get(getIdentity(state), 'username', 'My Profile');
export const getPermission = state => getRole(state);
export const getRole = state => get(state, ['auth', 'identity', 'role']);
