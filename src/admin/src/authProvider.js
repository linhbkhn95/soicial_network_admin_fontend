import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_CHANGE_PASS,
  AUTH_GET_PERMISSIONS,
  AUTH_FORGOT_PASSWORD,
  AUTH_RESET_PASSWORD,
} from 'react-admin';
import {
  basicLogin,
  changePass,
  forgotPassword,
  resetPassword,
} from '~/dataProvider/apiClient/auth';
import { SubmissionError } from 'redux-form';
import { apiParamsKey } from '~/dataProvider/constants';
function parse_query_string(query) {
  var vars = query.split('&');
  var query_string = {};
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    var key = decodeURIComponent(pair[0]);
    var value = decodeURIComponent(pair[1]);
    // If first entry with this name
    if (typeof query_string[key] === 'undefined') {
      query_string[key] = decodeURIComponent(value);
      // If second entry with this name
    } else if (typeof query_string[key] === 'string') {
      var arr = [query_string[key], decodeURIComponent(value)];
      query_string[key] = arr;
      // If third or later entry with this name
    } else {
      query_string[key].push(decodeURIComponent(value));
    }
  }
  return query_string;
}

export default async (type, params, header) => {
  if (type === AUTH_LOGIN) {
    let { phone, password } = params;
    //console.log(`login ${phone} ${password}`);
    try {
      if (phone) {
        phone = phone.trim();
      }
      // if (password) {
      //   password = password.trim();
      // }

      const ret = await basicLogin({ phone, password }, header);
      console.log('ret from login ', ret);
      localStorage.setItem('accessToken', ret[apiParamsKey.accessToken]);
      localStorage.setItem('refreshToken', ret[apiParamsKey.refreshToken]);
      return ret;
    } catch (err) {
      console.log('error from login ', err);
      if ((err.response && err.response.status) === 422) {
        //console.log('throw submissionError');
        throw new SubmissionError(
          err.response.data && err.response.data.errors,
        );
      }
    }
    // accept all username/password combinations
  }

  if (type === AUTH_FORGOT_PASSWORD) {
    const { email } = params;
    //console.log(`login ${phone} ${password}`);
    try {
      const ret = await forgotPassword({ email }, header);
      console.log('forgotpassword ', ret);

      return ret;
    } catch (err) {
      console.log('error from forgot ', err);
      if ((err.response && err.response.status) === 422) {
        //console.log('throw submissionError');
        throw new SubmissionError(
          err.response.data && err.response.data.errors,
        );
      }
    }
  }
  if (type === AUTH_RESET_PASSWORD) {
    const { new_password } = params;
    var query_string = window.location.search.substring(1);
    console.log('query', query_string);
    var parsed_qs = parse_query_string(query_string);

    let token = parsed_qs.token;

    //console.log(`login ${phone} ${password}`);
    try {
      const ret = await resetPassword(
        { password: new_password, token },
        header,
      );
      console.log('AUTH_RESET_PASSWORD ', ret);

      return ret;
    } catch (err) {
      console.log('error from AUTH_RESET_PASSWORD ', err);
      if ((err.response && err.response.status) === 422) {
        //console.log('throw submissionError');
        throw new SubmissionError(
          err.response.data && err.response.data.errors,
        );
      }
    }
  }
  if (type === AUTH_CHANGE_PASS) {
    try {
      const ret = await changePass(
        {
          [apiParamsKey.oldPassword]: params[apiParamsKey.oldPassword],
          [apiParamsKey.newPassword]: params[apiParamsKey.newPassword],
        },
        header,
      );
      return ret;
    } catch (err) {
      if ((err.response && err.response.status) === 422) {
        //console.log('throw submissionError');
        throw new SubmissionError(
          err.response.data && err.response.data.errors,
        );
      }
    }
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    if ((params.response && params.response.status) === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('accessToken')
      ? Promise.resolve(localStorage.getItem('accessToken'))
      : Promise.reject('accessToken outdated');
  }

  if (type === AUTH_GET_PERMISSIONS) {
    return localStorage.getItem('role')
      ? Promise.resolve(localStorage.getItem('role'))
      : Promise.reject('user has no permission');
  }
  // accept all username/password combinations
};
