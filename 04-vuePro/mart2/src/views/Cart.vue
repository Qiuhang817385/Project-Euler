<template>
  <div>

    <van-nav-bar title="Cart"
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <!-- card -->
    <div class="good"
         v-for="(item,index) in cart"
         :key="item.id">
      <van-card :num="item.cartCount"
                :price="item.price"
                :title="item.title"
                :thumb="getItemURL(item.img)">
        <template #footer>
          <van-button size="mini"
                      @click="removeCart(index)">-</van-button>
          <van-button size="mini"
                      @click="addCart(index)">+</van-button>
        </template>
      </van-card>

    </div>

    <van-submit-bar disabled
                    v-if="total<minTotal"
                    :price="total*100"
                    button-text="提交订单"
                    tip="满30减优惠"
                    tip-icon="info-o" />

    <van-submit-bar :price="total*100"
                    v-else
                    button-text="提交订单"
                    @submit="showT" />

  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
import { NavBar, Card, SubmitBar, Button } from 'vant';

import { Message } from 'ant-design-vue';

export default {
  mounted () {
    Message.config({
      top: `200px`,
    });
  },
  components: {
    [NavBar.name]: NavBar,
    [Card.name]: Card,
    [SubmitBar.name]: SubmitBar,
    [Button.name]: Button,
    // [Message.name]: Message,
  },
  data () {
    return {
      minTotal: 30,
    };
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart
    }),
    ...mapGetters({
      total: "total"
    }),
  },
  methods: {
    onClickLeft () {
      this.$router.push('/');
      //  active: 'home',
    },
    getItemURL (url) {
      return require("@/assets" + url);
    },
    addCart (index) {
      console.log('index', index)
      this.$store.commit("cartAddByIndex", index);
    },
    removeCart (index) {
      this.$store.commit("cartRemoveByIndex", index);
    },
    showT () {
      Message
        .loading('正在下单..', 1.3)
        .then(() => {
          Message.success('下单成功', 1);
        });
    }
  }
};
</script>


<style lang="stylus">
.good
  padding 10px
  text-align left
  .right
    float right
  i
    font-size 18px
.totalPrice
  margin-top 60px
  font-size 20px
  font-weight 500
</style>