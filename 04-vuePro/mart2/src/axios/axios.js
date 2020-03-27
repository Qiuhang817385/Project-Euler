// 拦截器的作用,用于拦截请求和响应
// 提前对请求做处理,在请求头里面添加token
// 不用再service当中请求
const axios = require('axios');

export default function (vm) {
  axios.interceptors.request.use(config => {
    // console.log("config", config);
    const token = localStorage.getItem('token');
    if (token) {
      // 这样直接设置token不规范
      // config.headers.token = token;
      // 这样才是正确规范
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  })
  //响应拦截器
  // 参数1表示成功的响应
  // 这里只关心失败的响应
  axios.interceptors.response.use(null, err => {
    // vm是vue实例
    if (err.response.status === 401) {/* 说明没有登录或者令牌过期 */
      // 清空vuex和localstorage
      vm.$store.dispatch("logout");
      // 跳转
      vm.$router.push("/login");
    }
    return Promise.reject(err);
  })
}