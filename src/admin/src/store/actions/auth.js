import {
  ACTION_SAVE_REFRESH_TOKEN,
  ACTION_REMOVE_IDENTITY,
  ACTION_LOGIN,
  ACTION_LOGOUT,
  ACTION_UPDATE_TOKENS,
  ACTION_LOAD_IDENTITY,
  ACTION_UPDATE_IDENTITY,
  ACTION_SAVE_PERMISSION,
  ACTION_CHANGE_PASSWORD,
} from '../constants';

import { GET_ME } from '~/dataProvider/apiClient/common';
import { apiParamsKey } from '~/store/api/constants';
import { getCompanyDetailFromUserData } from '~/store/actions/general';

const CRUD_GET_ME = 'CRUD/GET_ME';

export const login = ({ username, password }, ...etc) => ({
  type: ACTION_LOGIN,
  args: [
    {
      username,
      password,
    },
    ...etc,
  ],
});

export const getMe = () => ({
  type: CRUD_GET_ME,
  meta: {
    fetch: GET_ME,
    onSuccess: {
      successActionCreators: [updateIdentity],
    },
    resolve: response => {
      console.log('set role ', response);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('fleet_id', response.data.fleet_id);

    },
  },
});

export const logout = refreshToken => ({
  type: ACTION_LOGOUT,
  args: [[], { [apiParamsKey['refreshToken']]: refreshToken }],
});

export const savePermission = permissions => ({
  type: ACTION_SAVE_PERMISSION,
  payload: {
    permissions,
  },
});
export const changePassword = ({ old_password, new_password }) => {
  console.log('changepasss', old_password);
  return {
    type: ACTION_CHANGE_PASSWORD,
    args: [
      {
        old_password,
        new_password,
      },
    ],
  };
};

export const updateTokens = ({ access_token, refresh_token }) => ({
  type: ACTION_UPDATE_TOKENS,
  payload: { access_token, refresh_token },
});

export const loadIdentity = accessToken => ({
  type: ACTION_LOAD_IDENTITY,
  args: [accessToken],
});

export const updateIdentity = ({ data = {} } = {}) => ({
  type: ACTION_UPDATE_IDENTITY,
  payload: data,
});

/**
 * apply remove logged user
 */
export const removeIdentity = () => ({
  type: ACTION_REMOVE_IDENTITY,
});

export const saveRefreshToken = data => ({
  type: ACTION_SAVE_REFRESH_TOKEN,
  payload: data,
});
