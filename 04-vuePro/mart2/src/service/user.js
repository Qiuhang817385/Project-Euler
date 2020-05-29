import axios from 'axios';
/**
 * 登录接口
 */
export const loginService = async (user) => {
  // 实际应该用post
  return axios.get('http://www.qiuhang.club:7300/mock/5e5a17e700fbdf09dcf21f8e/mart/api/login', { params: user })
    .then(res => {
      console.log('res', res)
      return res;
    })
    .catch(e => e)
}

/**
 * 短信验证码接口
 */
export const smsServe = (phoneNumber) => {
  return axios.post('http://www.qiuhang.club:7300/mock/5e7e00fd00fbdf09dcf21f9a/sms/sms2', { mobile: phoneNumber })
    .then((res => {
      console.log('res', res);
      return res;
    }))
    .catch(e => e)
}
