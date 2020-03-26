<template>

  <div id="app">

    <van-tabbar v-model="active">
      <van-tabbar-item replace
                       to="/"
                       name="home"
                       icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item icon="cart-o"
                       replace
                       to="/cart"
                       :badge="cartTotal">Cart</van-tabbar-item>
      <van-tabbar-item icon="manager-o"
                       replace
                       to="/about"
                       dot>Me</van-tabbar-item>
    </van-tabbar>

    <transition name="route-move">
      <!-- 动画的解决方案 -->
      <router-view class="child-view" />
    </transition>

  </div>

</template>
<script>
import { mapGetters } from 'vuex';

export default {
  methods: {

  },
  data () {
    return {
      active: 'home',
      selectLabel: "/",
    }
  },
  watch: {
    $route (route) {
      this.selectLabel = route.path
    }
  },
  created () {
    // 初始化页签设置,避免页面刷新
    // 选中了某个签,刷新之后仍然是这个签
    this.selectLabel = this.$route.path;
  },
  computed: {
    ...mapGetters(['cartTotal'])
  },
}
/*
 .child-view
    position absolute
    left 0
    top 0
    width 100%
    padding-bottom 40px
 */
</script>

<style lang="stylus" scoped>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  width 100%
  height 100%
  .route-move-enter
    transform translate3d(-100%, 0, 0)
  .route-back-enter
    transform translate3d(100%, 0, 0)
  .route-move-leave-to
    transform translate3d(100%, 0, 0)
  .route-back-leave-to
    transform translate3d(-100%, 0, 0)
  .route-move-enter-active, .route-move-leave-active, .route-back-enter-active, .route-back-leave-active
    transition transform 0.3s
</style>
