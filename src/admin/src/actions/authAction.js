
import {CHANGEPASS} from './typeAction'
export  const  changepass = (payload, pathName, resolve, reject) =>{
  console.log('action',CHANGEPASS)
  return {
    type: CHANGEPASS,
    payload: payload,
    meta: { auth: true, pathName: pathName, resolve: resolve, reject: reject }
  };
};
// module.exports = {changepass}