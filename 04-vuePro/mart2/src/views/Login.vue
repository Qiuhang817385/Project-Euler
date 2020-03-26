<template>
  <div class="wrapper">
    <!-- schema规则,数据驱动表单,用数据来定义表单的外形
    从服务器把表单的数据返回回来,动态生成表单的内容,答题程序
    单选问答?
    -->
    <!-- <cube-form  :model="model"
                :schema="schema"
                @submit="handleLogin"
                @validate="haneldValidate">
    </cube-form> -->
    <img width="100"
         height="100"
         src="../assets/logo.png" />
    <van-form class="vanform"
              @submit="onSubmit">
      <van-field v-model="username"
                 name="用户名"
                 label="用户名"
                 placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="password"
                 type="password"
                 name="密码"
                 label="密码"
                 placeholder="密码"
                 @touchstart.stop="show = true"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <van-field v-model="sms"
                 center
                 clearable
                 label="短信验证码"
                 placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small"
                      type="primary"
                      @click="sendSMS">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- <button @click="clickH">toast按钮</button> -->
    <!-- <van-button type="default">默认按钮</van-button> -->
    <!-- <van-button >
      弹出默认键盘
    </van-button> -->
    <!-- 键盘 -->
    <van-number-keyboard :show="show"
                         v-model="password"
                         extra-key="."
                         close-button-text="完成"
                         @blur="show = false"
                         @input="onInput"
                         @delete="onDelete" />
    <!-- 剪切板 -->
    <van-action-sheet v-model="show2"
                      :actions="actions"
                      @select="onSelect" />
  </div>

</template>

<script>
import { Image } from 'vant';
import { Toast } from 'vant';
export default {
  created () {
  },
  mounted () {
    this.$message.config({
      top: `200px`,
    });

  },
  data () {
    return {
      sms: '',
      value: '',
      username: '',
      password: '',
      show: false,
      show2: false,
      actions: [
        { name: '复制' },
        { name: '剪切板' }
      ]
    }
  },
  methods: {
    onSelect (item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(this)
      this.show2 = false;
      Toast('复制成功');
    },
    sendSMS (e) {
      // 只有这个this是本身的this
      // 直接再created当中设置this的话，哪个this到了这一层就变成了window
      let ssss = this;
      e.target.disabled = true;
      let i = 60;
      let timer = setInterval(() => {
        if (i === 0 || i == 54) {
          e.target.innerText = `发送验证码`
          e.target.disabled = false;
          clearInterval(timer);
          this.$notify({
            type: 'success',
            message: '您的验证码为：654321',
            onClick: function () {
              console.log(this)
              console.log(ssss)
              // console.log('1232421')
              ssss.show2 = true
              // console.log(self)
            }
          });

        }
        e.target.innerText = `${i}S后重新发送`
        i--;
      }, 1000)
      console.log()
      // console.log(this)
    },
    onSubmit (values) {
      console.log('submit', values);
      // 登录请求
      console.log("请求");
      this.$store.dispatch('login', values)
        .then((code) => {
          console.log("code", code);

          if (!code) {
            console.log("code", code);
            // 登录成功
            // 拿到会跳地址再做重定向,如果没有,那么回到首页
            console.log("this.$router", this.$router);
            console.log("this.$route", this.$route);
            this.$message
              .loading('正在登陆..', 1.3)
              .then(() => {
                this.$message.success('登陆成功', 1).then(() => {
                  const path = this.$route.query.redirect || '/';
                  this.$router.push(path);
                })
              });
          } else {
            this.$message
              .error('登录失败,用户名或者密码错误', 1);
          }
        })
        .catch(error => {
          console.log('错误');
          this.$message
            .error('登录失败,用户名或者密码错误', 1);
        })
      // e.preventDefault();
    },
    onInput (value) {
      // Toast(value);
    },
    onDelete () {
      // Toast('删除');
    },
    // 登录
    handleLogin (e) {

    },
    // 校验,校验结果
    haneldValidate (result) {
      console.log(result);

    },
    clickH () {
      const toast = this.$createToast({
        time: 0,
        txt: 'Toast time 0'
      })
      toast.show()
      setTimeout(() => {
        toast.hide()
      }, 2000)
    }
  },
}
</script>

<style scoped>
img {
  position: relative;
  top: 40px;
}
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.vanform {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>