<template>
  <div>
    <div class="item"
         v-for="item in data"
         :key="item.id">
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
          <img :src="getItemURL(item.img)"
               alt
               @click.stop.prevent="imgPreview(item.img)">
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <span>Count:{{item.count}}</span>
          <div class="info">
            <van-button class="cubeic-add"
                        type="info"
                        @click.stop.prevent="addCart($event, item)">立即购买</van-button>
          </div>
        </div>
        <!-- https://blog.csdn.net/zuorishu/article/details/84992194
        但是打包还是没有解决
        解决办法,使用了http服务器模块
         -->
      </router-link>
      <!-- {{data}} -->
    </div>
  </div>
</template>

<script>
import { Icon, Button } from 'vant';

export default {
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
  },
  props: ["data"],
  methods: {
    addCart (event, item) {
      this.$store.commit("addcart", item);
      this.$emit('cartanim', event.target)
    },
    // 图片预览
    imgPreview (img) {
      let newImg = this.getItemURL(img);
      this.$createImagePreview({
        imgs: [newImg]
      }).show();
    },
    getItemURL (url) {
      return require("@/assets" + url);
    }
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL,
    }
  },
  computed: {

  },
};
</script>

<style lang="stylus" scoped>
.delete-button
  height 100%
.item
  padding 10px
  overflow hidden
  .left
    width 100px
    float left
    img
      width 100%
  .right
    margin-left 120px
    text-align left
    .title
      line-height 30px
    .cubeic-add
      display inline-block
      margin 0px
      border 0px
      padding 0px
      width 80px
      height 27px
      font-size 16px
    .info
      text-align right
</style>