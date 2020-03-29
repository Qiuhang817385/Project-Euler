<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading"
                      @refresh="onRefresh">
      <!-- 轮播图 -->
      <van-notice-bar color="#1989fa"
                      background="#fff"
                      left-icon="info-o">
        特朗普称想让美国在复活节（4月12日）之前“复工”。
        对此，纽约市市长德布拉西奥嗤之以鼻：“不知道这种想法打哪来的？千万别指望这个虚幻的希望！”（央视记者徐德智）
      </van-notice-bar>
      <van-swipe class="my-swipe"
                 :autoplay="3000"
                 indicator-color="white">
        <van-swipe-item v-for="(item,index) in slider"
                        :key="index">
          <router-link :to="'/detail/${item.id}'">
            <img :src="getItemURL(item.img)"
                 alt=""
                 class="slider">
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!-- 商品 -->
      <br>
      <good-list :data="goods"
                 @cartanim="$refs.ca.start($event)"></good-list>
      <CartAnim ref="ca"></CartAnim>
    </van-pull-refresh>
  </div>
</template>

<script>

// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex';
import GoodList from '../components/GoodList';
import CartAnim from '../components/CartAnim'
// import kHeader from '../components/Header'
import { PullRefresh } from 'vant';
import { Toast } from 'vant';
export default {
  name: 'Home',
  data () {
    return {
      isLoading: false
    }
  },
  components: {
    GoodList, CartAnim
  },
  computed: {
    ...mapState({ slider: state => state.goods.slider }),
    ...mapGetters(['goods'])
  },
  methods: {
    ...mapActions(['getGoods']),
    getItemURL (url) {
      // console.log(url);
      // /img/01.jpg
      return require("@/assets" + url);
    },
    onRefresh () {
      setTimeout(() => {
        Toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    }
  },
  created () {
    this.getGoods()
  },
}
</script>
<style >
.home {
  overflow: hidden;
}
.my-swipe {
  width: 100%;
}
.slider {
  width: 100%;
  height: 180px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
</style>
