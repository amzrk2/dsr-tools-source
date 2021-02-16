import axios from 'axios';
import { $message } from './message';

const BASE = (repo, version = '1') => {
  if (process.env.NODE_ENV === 'production') {
    return `https://cdn.jsdelivr.net/gh/dsrkafuu/${repo}@${version}`;
  } else {
    return `/mock/${repo}`;
  }
};

const api = axios.create({
  baseURL: BASE('dsr-api', '1.1'),
});
api.resolve = (path) => `${BASE('dsr-api', '1.1')}${path}`;
const cdn = axios.create({
  baseURL: BASE('dsr-cdn', '1.1'),
});
cdn.resolve = (path) => `${BASE('dsr-cdn', '1.1')}${path}`;
const xhr = axios.create();

const interceptors = (text) => [
  (res) => res,
  (e) => {
    const status = e.response.status;
    $message({ type: 'error', text: `${text} - ${status}` });
  },
];

api.interceptors.response.use(...interceptors('API 请求失败'));
cdn.interceptors.response.use(...interceptors('CDN 请求失败'));
xhr.interceptors.response.use(...interceptors('数据请求失败'));

export default {
  /**
   * @param {Vue} Vue
   */
  install(Vue) {
    Vue.prototype.$api = api;
    Vue.prototype.$cdn = cdn;
    Vue.prototype.$axios = xhr;
  },
};
