import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import generateData from 'data-generator';
import { API_DATA_MOCK, AUTH_BASE } from '~/dataProvider/constants';
// import url from 'url';

// const simpleHandler = (urlStr, opts) => {
//   const { path } = url.parse(urlStr);
//   if (path === '/auth/refresh') {
//     return new Response(
//       {
//         access_token: '5452062907.1677ed0.247ee8e8359d45ab82f99676f42ae71e',
//         refresh_token: '5452062907.1677ed0.247ee8e8359d45ab82f99676f42ae71e',
//       },
//       { status: 200 },
//     );
//   } else if (path === '/auth/basic') {
//     return new Response(
//       {
//         access_token: '5452062907.1677ed0.247ee8e8359d45ab82f99676f42ae71e',
//         refresh_token: '5452062907.1677ed0.247ee8e8359d45ab82f99676f42ae71e',
//       },
//       { status: 200 },
//     );
//   } else if (path === '/') {
//     return new Response({}, { status: 200 });
//   } else if (path === '/auth/me') {
//     return new Response(
//       {
//         phone: '0961896304',
//         id: '694953',
//       },
//       { status: 200 },
//     );
//   } else {
//     return new Response(
//       {
//         message: 'Not found',
//       },
//       { status: 404 },
//     );
//   }
// };

export default () => {
  const data = generateData({ serializeDate: true });
  const restServer = new FakeRest.FetchServer(API_DATA_MOCK);
  if (window) {
    window.restServer = restServer; // give way to update data in the console
  }
  // init fakeServer with data
  console.log('api data base ', AUTH_BASE);
  restServer.init(data);
  restServer.toggleLogging(); // logging is off by default, enable it
  fetchMock.mock(`begin:${API_DATA_MOCK}`, restServer.getHandler());

  fetch(API_DATA_MOCK)
    .then(() => console.log(`${API_DATA_MOCK} OK`))
    .catch(err => console.log(`${API_DATA_MOCK} has err: ${err}`));

  return () => fetchMock.restore();
};
