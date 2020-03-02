<template>
  <div class="home">
    <kHeader title="Back">
      <i class="cubeic-tag"></i>
    </kHeader>
    <!--
    <img alt="Vue logo"
         src="../assets/logo.png"> -->
    <!-- 轮播图 -->
    <cube-slide :data="slider"
                :interval="3000">
      <cube-slide-item v-for="(item,index) in slider"
                       :key="index">
        <router-link :to="'/detail/${item.id}'">
          <img :src="getItemURL(item.img)"
               alt=""
               class="slider">
        </router-link>
      </cube-slide-item>
    </cube-slide>
    <!-- 商品 -->
    <br>
    <good-list :data="goods"
               @cartanim="$refs.ca.start($event)"></good-list>
    <CartAnim ref="ca"></CartAnim>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex';
import GoodList from '../components/GoodList';
import CartAnim from '../components/CartAnim'
import kHeader from '../components/Header'
export default {
  name: 'Home',
  components: {
    GoodList, CartAnim, kHeader
  },
  computed: {
    /* 
      slider(){
        return this.$store.state.goods.slider
      }
     */
    ...mapState({ slider: state => state.goods.slider }),
    ...mapGetters(['goods'])
  },
  methods: {
    ...mapActions(['getGoods']),
    getItemURL (url) {
      console.log(url);
      // /img/01.jpg
      return require("@/assets" + url);

    }
  },
  created () {
    this.getGoods()
  },
}
</script>
<style >
.cube-slide {
  height: auto;
}

.cube-slide-item > a > img {
  width: 100%;
  height: auto;
}
</style>
