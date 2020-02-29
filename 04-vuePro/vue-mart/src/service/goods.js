import axios from 'axios';
export default {
  getGoodsInfo () {
    // return axios.get('/api/goods')
    return axios.get('http://www.qiuhang.club:7300/mock/5e5a17e700fbdf09dcf21f8e/api/goods')
      //对数据做处理
      .then(res => {
        const { code, data: goodsInfo, slider, keys } = res.data;
        // 数据处理
        if (code) {
          return { slider, keys, goodsInfo }
        } else {
          return null;
        }
      })
  }
}