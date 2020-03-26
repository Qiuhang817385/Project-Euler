<template>
  <div>
    <div class="good"
         v-for="(item,index) in cart"
         :key="item.id">
      {{item.title}}
      <div class="right">
        <i class="cubeic-remove"
           @click="removeCart(index)"></i>
        <span>{{item.cartCount}}</span>
        <i class="cubeic-add"
           @click="addCart(index)"></i>
      </div>
    </div>
    <div class="totalPrice">Total {{total}}</div>

    <!-- <cube-button :disabled="true"
                 v-if="total<minTotal">还差{{minTotal-total}}可以购买</cube-button> -->
    <a-button :disabled="true"
              v-if="total<minTotal"
              style=width:300px
              icon="shopping-cart">还差{{minTotal-total}}</a-button>

    <!-- <cube-button v-else
                 @click="showT">
      下单
    </cube-button> -->

    <a-button type="primary"
              icon="shopping-cart"
              v-else
              @click="showT"
              style=width:300px>Click</a-button>
    <!-- <div>
      {{cart}}
    </div>-->
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  mounted () {
    this.$message.config({
      top: `200px`,
    });
  },
  data () {
    return {
      minTotal: 1000
    };
  },
  computed: {
    ...mapState({
      cart: state => state.cart.cart
    }),
    ...mapGetters({
      total: "total"
    })
  },
  methods: {
    addCart (index) {
      this.$store.commit("cartadd", index);
    },
    removeCart (index) {
      this.$store.commit("cartremove", index);
    },
    showT () {
      // const toast = this.$createToast({
      //   time: 1300,
      //   txt: "正在下单",
      //   type: "loading",
      //   onTimeout: () => {
      //     const toast = this.$createToast({
      //       time: 1300,
      //       txt: "下单成功",
      //       type: "correct",
      //     });
      //     toast.show();
      //   }
      // });
      // toast.show();

      this.$message
        .loading('正在下单..', 1.3)
        .then(() => {
          this.$message.success('下单成功', 1)
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