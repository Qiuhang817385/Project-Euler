import us from '../service/user';


export default {
  state: {
    // 这个状态应该从本地存储当中直接获取一次用以判断是否登录过
    // isLogin: false
    isLogin: localStorage.getItem('token') ? true : false
  },
  mutations: {
    // 把state设置成传递过来的b的值
    // b传递过来是true代表登录,
    // b传递过来是false代表注销,
    setLoginState (state, b) {
      state.isLogin = b;
    }
  },
  actions: {/* action是编写业务逻辑的地方,相当于控制器,调取业务层service的方法 */
    // 第二个参数是用户的登录信息
    login ({ commit }, user) {
      // 一些请求的服务也尽量拆分到单独的serve层当中
      // 这个就相当于controller层,调业务层做业务组合
      // console.log(user);
      let userData = new Object();
      // console.log(user['用户名'])
      userData.username = user['用户名'];
      userData.passwd = user['密码'];
      // console.log(userData)
      return us.login(userData).then((res) => {
        // console.log(res);
        //从返回来的数据当中, 结构出code和令牌
        // easy-mock的问题
        const { code, token } = res.data.data.message;
        if (!code) {
          // 如果成功,把状态更改成true
          commit('setLoginState', true);
          let Newtoken = token + (new Date().getTime() + 1000 * 60)
          localStorage.setItem('token', Newtoken);
        }
        return code;
      })
    },
    logout ({ commit }) {
      //清除缓存
      localStorage.removeItem('token');
      //重置状态
      commit("setLoginState", false);
    },
    sendSms (mobileNumber) {
      // http://www.qiuhang.club:7300/mock/5e7e00fd00fbdf09dcf21f9a/sms/sms
      return us.smsServe(mobileNumber).then((res) => {
        // console.log(res)
        // console.log();
        // let reg = /[0-9]/g;
        return res.data.result.sid;
        // 匹配任何包含至少一个 n 的字符串。 至少1个
        // 匹配任何包含零个或多个 n 的字符串。 最多0个
        // let reg=/\d+/g;
        // console.log(reg.exec(res.data.result.sid)[0])
      })
    }
  },
  modules: {
  }
}
