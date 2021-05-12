import axios from 'axios'
import NProgress from 'nprogress'


const http = axios.create({
    baseURL: `http://localhost:3000/`
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
  }, function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  });

  // Add a response interceptor
  http.interceptors.response.use(function (response) {
    NProgress.done();
    return response;
  }, function (error) {
    // Do something with response error
    console.log(error);
    return Promise.reject(error);
  });

export default http