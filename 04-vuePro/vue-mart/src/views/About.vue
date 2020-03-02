<template>
  <div class="about">
    <h1>欢迎回来</h1>
    <hr>
    <article style="text-align:left">
      　我认为， 贝多芬说过一句富有哲理的话，卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。这似乎解答了我的疑惑。 既然如此， 布尔沃曾经提到过，要掌握书，莫被书掌握；要为生而读，莫为读而生。
    </article>
    <!-- <a-button type="primary"
              @click="handleLogout()">注销</a-button> -->
    <a-button @click="handleLogout"
              style="margin-top:190px">注销</a-button>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  mounted () {
    this.$message.config({
      top: `200px`,
    });
  },
  created () {
    // axios.get('/api/userinfo')
  },
  methods: {
    handleLogout () {
      // this.$store.dispatch('logout');
      // const toast = this.$createToast({
      //   time: 1300,
      //   txt: "注销成功",
      //   type: "correct",
      //   onTimeout: () => {
      //     const path = this.$route.query.redirect || '/';
      //     this.$router.push(path);
      //   }
      // });
      // toast.show();
    },
    handleLogout () {
      this.$store.dispatch('logout');
      this.$message
        .loading('正在注销..', 1)
        .then(() => {
          this.$message.success('注销成功', 1.2).then(() => {
            const path = this.$route.query.redirect || '/';
            this.$router.push(path);
          })
        });
    }



  }
}
</script>