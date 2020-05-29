import { loginService, smsServe } from '../service/user';


export default {
  state: {
    // isLogin: false
    isLogin: localStorage.getItem('token') ? true : false
  },
  mutations: {
    setLoginState (state, loginStatus) {
      state.isLogin = loginStatus;
    }
  },
  actions: {/* action是编写业务逻辑的地方,相当于控制器,调取业务层service的方法 */
    /**
     * 登录
     */
    login ({ commit }, user) {
      let userData = new Object();
      userData.username = user['用户名'];
      userData.passwd = user['密码'];
      console.log(userData)
      return loginService(userData).then((res) => {
        console.log('res', res);
        const { code, token } = res.data.data.message;
        // 成功,状态->true
        if (!code) {
          commit('setLoginState', true);
          let Newtoken = token + (new Date().getTime() + 1000 * 60)
          localStorage.setItem('token', Newtoken);
        }
        return code;
      })
    },
    /**
     * 登出
     */
    logout ({ commit }) {
      localStorage.removeItem('token');
      commit("setLoginState", false);
    },
    /**
     * 发送短信验证码
     */
    sendSms (mobileNumber) {
      return smsServe(mobileNumber).then((res) => {
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
