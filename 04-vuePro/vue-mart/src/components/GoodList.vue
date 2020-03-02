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
            <i class="cubeic-add"
               @click.stop.prevent="addCart($event, item)"></i>
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
export default {
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
      // console.log(url);
      // /img/01.jpg
      return require("@/assets" + url);

    }
  },
  data () {
    return {
      baseUrl: process.env.BASE_URL,
    }
  },
  computed: {
    // fullUrl:function(){
    //   return `${this.baseUrl}`
    // }
  },
};
</script>

<style lang="stylus" scoped>
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
      font-size 22px
    .info
      text-align right
</style>