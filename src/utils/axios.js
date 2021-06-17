import axios from 'axios';

import { message } from 'antd';
import 'antd/lib/message/style/index.less';

import jsdelivr from './jsdelivr';

export const api = axios.create({
  baseURL: jsdelivr('', 'dsr-cdn-api'),
});
export const cdn = axios.create({
  baseURL: jsdelivr('', 'dsr-cdn-main'),
});
export const workers = axios.create({
  baseURL: 'https://workers.dsrkafuu.su',
});
export const xhr = axios.create();

const interceptors = (text) => [
  (res) => res,
  (e) => {
    const response = e.response;
    if (!response) {
      message.error(`发送请求失败`);
      console.error(e);
    } else {
      message.error(`${response.status} - ${text}`);
      console.error(e);
    }
    return null;
  },
];
api.interceptors.response.use(...interceptors('API 请求失败'));
cdn.interceptors.response.use(...interceptors('CDN 请求失败'));
workers.interceptors.response.use(...interceptors('CloudFlare Workers 请求失败'));
xhr.interceptors.response.use(...interceptors('数据请求失败'));
