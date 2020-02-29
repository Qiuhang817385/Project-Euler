<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link :to="{name:'login'}">Login</router-link> -->
      <br>
      <button v-if="$store.state.isLogin"
              @click="logout">注销</button>
    </div>

    <transition name="route-move">
      <!-- 动画的解决方案 -->
      <router-view class="child-view" />
    </transition>

    <!-- 添加的东西 -->
    <cube-tab-bar v-model="selectLabel"
                  :data="tabs"
                  @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs"
                :icon="item.icon"
                :label="item.value"
                :key="index">
        <div>{{item.label}}</div>
        <span class="badge"
              v-if="item.label=='Cart'">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>

  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  methods: {
    logout () {
      this.$store.dispatch('logout');
      this.$router.push("/");
    },
    changeHandler (val) {
      this.$router.push(val);
    }
  },
  data () {
    return {
      selectLabel: "/",
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "Me",
          value: "/about",
          icon: "cubeic-person"
        }
      ]
    }
  },
  watch: {
    $route (route) {
      // 监听路由变化并且动态设置页签选中状态
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
</script>
<style lang="stylus" scoped>
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  .cube-tab-bar
    position fixed
    bottom 0
    left 0
    right 0
    background #edf0f4
  .cube-tab-bar-slider
    top 0
  // 动画,点,move和forward的区别??
  .route-move-enter
    transform translate3d(-100%, 0, 0)
  .route-back-enter
    transform translate3d(100%, 0, 0)
  /* 出场后 */
  .route-move-leave-to
    transform translate3d(100%, 0, 0)
  .route-back-leave-to
    transform translate3d(-100%, 0, 0)
  .route-move-enter-active, .route-move-leave-active, .route-back-enter-active, .route-back-leave-active
    transition transform 0.3s
  .child-view // 添加到每个页面上的样式，确保页面间不挤占位置
    position absolute
    left 0
    top 0
    width 100%
    padding-bottom 40px
  .cube-tab
    position relative
  span.badge
    background red
    color white
    border-radius 50%
    padding 2px
    min-width 16px
    min-height 16px
    position absolute
    right 25%
    top 0
</style>
