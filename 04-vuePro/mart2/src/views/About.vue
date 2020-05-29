<template>
  <div class="about">
    <van-divider />
    <h1>欢迎回来</h1>
    <van-divider />
    <article style="text-align:left">
      　我认为， 贝多芬说过一句富有哲理的话，卓越的人一大优点是：在不利与艰难的遭遇里百折不饶。这似乎解答了我的疑惑。 既然如此， 布尔沃曾经提到过，要掌握书，莫被书掌握；要为生而读，莫为读而生。
    </article>
    <div>
      <div class="space"
           v-if='shows'>
        <div class="card">
          <div class="card-shine"></div>
          <div class="code-snippet">
            <code>
              本地时间
              <br>
              {{date}}
            </code>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <a-button type="primary"
                @click="handleLogout">注销</a-button>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

import { Divider } from 'vant';

import { Message, Button } from 'ant-design-vue';

export default {
  components: {
    [Divider.name]: Divider,
    [Button.name]: Button,
    [Message.name]: Message,
  },
  data () {
    return {
      shows: true,
      date: 0
    }
  },
  mounted () {
    Message.config({
      top: `200px`,
    });
    this.date = new Date().toLocaleString()
    setTimeout(() => {
      this.shows = false
    }, 4500)
  },
  created () {
    // axios.get('/api/userinfo')
  },
  methods: {
    handleLogout () {
      this.$store.dispatch('logout');
      Message
        .loading('正在注销..', 1)
        .then(() => {
          Message.success('注销成功', 1.2).then(() => {
            const path = this.$route.query.redirect || '/';
            this.$router.push(path);
          })
        });
    }
  }
}
</script>
<style >
.about {
  position: absolute;
  top: 0;
  background: url("../assets/img/08.jpg");
  height: 100%;
  width: 100%;
}
.bottom {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.space {
  perspective: 1500px;
  width: 100%;
  border-radius: 14px;
}
.card {
  display: inline-block;
  position: relative;
  border-radius: 14px;
  /* left: 30px; */
  top: 20px;
  color: #fdfdfd;
  font-weight: 600;
  font-size: 16px;
  background: rgb(76, 171, 255);
  width: 70%;
  transform: rotate3d(0, 0, 0, 0deg) rotate(0deg);
  box-shadow: -27.1px 62.5px 125px -25px rgba(50, 50, 93, 0.5),
    -16.2px 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
}
.code-snippet {
  border-radius: 14px;
  padding: 25px 30px;
  background: url("../assets/img/10.jpg") no-repeat center;
  background-size: cover;
}

.card-shine {
  border-radius: 14px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    to top right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0) 20%,
    rgba(255, 255, 255, 0.5) 70%,
    #fff
  );
  pointer-events: none;
  opacity: 0.2;
}
</style>