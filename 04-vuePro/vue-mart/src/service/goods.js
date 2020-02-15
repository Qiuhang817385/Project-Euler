import axios from 'axios';
export default {
  getGoodsInfo () {
    return axios.get('/api/goods')
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