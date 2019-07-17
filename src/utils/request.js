import axios from 'axios';
// toast api https://github.com/fkhadra/react-toastify#toast
// toast demo https://fkhadra.github.io/react-toastify/
import { toast } from 'react-toastify';
import { getLS } from './index';
import { USER_TOKEN } from 'constant';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// create an axios instance
const request = axios.create({
  baseURL: 'http://localhost:5000',
  // withCredentials: true,
  timeout: 5000
});

// request interceptor
request.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${getLS(USER_TOKEN)}`;
    return config;
  },
  error => {
    toast.error(`🦄 ${error.message}`);
    return Promise.reject(error);
  }
);

// response interceptor
request.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.status === 'success') {
      return res;
    } else {
      const msg = res.message || '服务器出错';
      toast.warn(`🦄 ${msg}`)
      return Promise.reject(new Error(msg));
    }
  },
  error => {
    const {response} = error;
    const errortext = response.data.message || codeMessage[response.status] || 'Error';
    toast.error(`🦄 ${errortext}`);
    return Promise.reject(error);
  }
);

export default request;