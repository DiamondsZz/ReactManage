import axios from 'axios'

/**
 * 调用get和post请求(基于promise, 基于axios)
 * @param url
 * @param params
 * @param type
 */
export default function Ajax(url = '', params = {}, type = 'GET') {
  let promise;
  return new Promise((resolve, reject) => {
    //get请求处理
    if ('GET' === type) {
      let paramsString = '';
      Object.keys(params).forEach(key => {
        paramsString += key + '=' + params[key] + '&';
      });
      //如果参数不为空,去掉最后一个&
      if (paramsString !== '') {
        paramsString = paramsString.substr(0, paramsString.lastIndexOf('&'));
      }
      //路径拼接
      url += '?' + paramsString;
      promise = axios.get(url)
    } else if ('POST'===  type ) {
      promise = axios.post(url, params,{
        // headers:{
        //   "Content-Type":"application/x-www-form-urlencoded;charset=utf-8" //避免两次post请求
        // }
      });
    }
    promise.then((response) => {
      resolve(response.data);
    }).catch((error) => {
      reject(error);
    })


  });
}
