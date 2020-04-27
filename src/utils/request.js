import axios from "axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index";
import Vue from "vue";
Vue.use(ElementUI);
// 也可但单独引用
// import { Message } from 'element-ui';
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
const service = axios.create({
  baseURL: BASEURL,
  timeout: 60 * 1000,
});
// 添加请求拦截器
service.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    console.log("发送请求之前的config", config);

    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    console.log("发送请求之后的config", config);
    let data = response.data;
    if (data.resCode !== 0) {
      this.$message.error(data.message);
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;
// 使用export default 文件只能使用一次
// import 不用加花括号
