import { GET_ONE } from 'ra-core/lib/dataFetchActions';
import { API_BASE } from '../../dataProvider/constants';

export default (type, resource, params = {}) => {
  let url = API_BASE + '/statistic/map' + resource;

  const options = {
    headers: new Headers({
      Accept: 'application/json',
    }),
  };

  // let headers;
  return fetch(url, options)
    .then(res => {
      // headers = res.headers;
      return res.json();
    })
    .then(json => {
      if (type && type == GET_ONE) {
        return json;
      }
      return json;
    });
};
