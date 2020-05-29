export default {
  state: {
    // 购物车初始状态
    // 这里也必须是对象
    cart: JSON.parse(localStorage.getItem("cart")) || []
  },
  mutations: {
    /**
     * Home-添加商品Item至购物车
     */
    addcart (state, item) {
      const good = state.cart.find(v => v.title == item.title);
      if (good) {
        good.cartCount += 1;
      } else {
        state.cart.push({
          ...item,
          cartCount: 1
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    /**
     * Cart-通过索引操作-商品数量+
     */
    cartAddByIndex (state, index) {
      // count+1
      state.cart[index].cartCount += 1;
    },
    /**
     * Cart-通过索引操作-商品数量-
     */
    cartRemoveByIndex (state, index) {
      // count-1
      if (state.cart[index].cartCount < 2) {
        state.cart.splice(index, 1);
        localStorage.clear()
      } else {
        state.cart[index].cartCount -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

  },
  getters: {
    cartTotal: state => {
      // 商品总数
      let num = 0;
      state.cart.forEach(v => {
        num += v.cartCount;
      });
      return num;
    },
    total: state => {
      // 总价
      return state.cart.reduce(
        (total, item) => total + item.cartCount * item.price,
        0
      );
    }
  }
};
