import { getGoodsInfoService } from '../service/goods';
// 商品可以通过分类的形式进行过滤,这个需求,然后按照分类进行显示
export default {
  state: {
    // 轮播图,若干图片
    slider: [],
    keys: [],
    goodsInfo: {}
  },
  mutations: {
    setGoodsInfo (state, { slider, keys, goodsInfo }) {
      state.slider = slider;
      state.goodsInfo = goodsInfo;
      state.keys = keys
    }
  },
  actions: {/* action是编写业务逻辑的地方,相当于控制器,调取业务层service的方法 */
    getGoods ({ state, commit }) {
      if (!state.keys.length) {
        getGoodsInfoService().then(goodsInfo => {
          commit('setGoodsInfo', goodsInfo)
        })
      }
    }
  },
  modules: {
  },
  // 相当于computed
  getters: {/* 添加一个goods属性,转换对象形式变成数组形式 */
    // 对goods进行预操作变成数组
    goods: state => {
      // 这里先得到一个二维数组
      return state.keys.map(key => state.goodsInfo[key])
        // 对数组做聚合
        .reduce((prev, next) => prev.concat(next), [])
    }
  }
}
