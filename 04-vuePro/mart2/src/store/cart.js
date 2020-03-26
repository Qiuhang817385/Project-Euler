export default {
  state: {
    // 购物车初始状态
    // 这里也必须是对象
    cart: JSON.parse(localStorage.getItem("cart")) || []
  },
  mutations: {
    addcart (state, item) {
      // 添加商品至购物车
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
    cartremove (state, index) {
      // count-1
      if (state.cart[index].cartCount < 2) {
        state.cart.splice(index, 1);
        localStorage.clear()
      } else {
        state.cart[index].cartCount -= 1;
      }
      // 这里必须是JSON字符串的形式
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    cartadd (state, index) {
      // count+1
      state.cart[index].cartCount += 1;
    }
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
