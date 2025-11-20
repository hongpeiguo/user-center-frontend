import axios from "axios";
import router from "./router";

alert(process.env.NODE_ENV);

const myAxios = axios.create({
  // 区分开发和线上环境
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://43.138.129.35",
  timeout: 10000,
  withCredentials: true,
});

// Add a request interceptor
myAxios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
myAxios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response);

    const { data } = response;
    console.log(data);
    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息接口，或者不是登录页面，则跳转到登录页面
      if (
        !response.request.responseURL.includes("user/current") &&
        !window.location.pathname.includes("/user/login")
      ) {
        // 使用 Vue Router 进行跳转
        router.push({
          path: "/user/login",
          query: { redirect: router.currentRoute.value.fullPath }, // 记录当前路径，以便登录后返回
        });
      }
    }
    return response;
  },
  function (error) {
    // 处理网络错误、超时、服务器500错误等
    console.error("网络请求异常:", error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default myAxios;
