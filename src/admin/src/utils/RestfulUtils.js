import axios from 'axios';

const USESOCKET = false;

axios.defaults.baseURL = 'http://localhost:4000/';

export default {
  post: function(url, body) {
    let access_token = localStorage.getItem('accessToken');
    var config = {
      headers: { Authorization: 'bearer ' + access_token },
    };
    return new Promise((resolve, reject) => {
      if (USESOCKET) {
        // io.socket.post(url,body, function (resData, jwres) {
        //     if (jwres.statusCode == "200") {
        //       resolve(resData);
        //     } else {
        //         resolve(null)
        //     }
        //   });
      } else {
        axios
          .post(url, body, config)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            resolve(null);
          });
      }
    });
  },
  get: function(url) {
    let access_token = localStorage.getItem('accessToken');
    var config = {
      headers: { Authorization: 'bearer ' + access_token },
    };
    return new Promise((resolve, reject) => {
      if (USESOCKET) {
        // io.socket.get(url, function (resData, jwres) {
        //     if (jwres.statusCode == "200") {
        //       resolve(resData);
        //     } else {
        //         resolve(null)
        //     }
        //   });
      } else {
        console.log('config', config);
        axios
          .get(url, config)
          .then(res => {
            resolve(res.data);
          })
          .catch(err => {
            resolve(null);
          });
      }
    });
  },
};
