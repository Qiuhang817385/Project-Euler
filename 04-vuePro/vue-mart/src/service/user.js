import axios from 'axios';
export default {
  // 接收前端的user信息,在方法里面发送axios请求
  // 返回一个promise做处理
  login (user) {
    // 实际应该用post
    // return axios.get('/api/login', { params: user })
    return axios.get('http://www.qiuhang.club:7300/mock/5e5a17e700fbdf09dcf21f8e/mart/api/login', { params: user })

  }
}