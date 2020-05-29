<template>
  <div class="wrapper">
    <!-- schema规则,数据驱动表单,用数据来定义表单的外形
    从服务器把表单的数据返回回来,动态生成表单的内容,答题程序
    单选问答?
    -->
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
      <van-field v-model="phone"
                 name="手机号"
                 label="手机号"
                 placeholder="手机号"
                 :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="sms"
                 center
                 clearable
                 label="短信验证码"
                 placeholder="请输入短信验证码"
                 ref="sms"
                 :rules="[{ required: true, message: '请输入短信验证码' }]"
                 v-on:touchstart.native="ontouchstart"
                 v-on:touchend.native="ontouchend">
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
    <van-number-keyboard :show="show"
                         v-model="password"
                         extra-key="."
                         close-button-text="完成"
                         @blur="show = false"
                         @input="onInput"
                         @delete="onDelete" />
    <!-- 剪切板 -->
    <!-- 复制 -->
    <van-action-sheet v-model="show2"
                      :actions="actions2"
                      @select="onSelect2" />
    <!-- 粘贴 -->
    <van-action-sheet v-model="show3"
                      :actions="actions3"
                      @select="onSelect3" />
  </div>

</template>

<script>
import { Image, Toast, Form, Field, Button, NumberKeyboard, ActionSheet, Notify } from 'vant';

import { Message, Calendar } from 'ant-design-vue';

export default {
  components: {
    [Image.name]: Image,
    [Toast.name]: Toast,
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
    [ActionSheet.name]: ActionSheet,
    [Calendar.name]: Calendar,
  },
  created () {
    // console.log("this.$refs.sms", this.$refs.sms)
  },
  mounted () {
    Message.config({
      top: `200px`,
    });
    this.$refs.sms.onClick = function (e) {
      console.log(e)
    }
  },
  data () {
    return {
      phone: '',
      sms: '',
      value: '',
      username: '',
      password: '',
      show: false,
      //action2 对应控制-剪切复制弹出框
      show2: false,
      //action3 对应控制-粘贴弹出框
      show3: false,
      // 剪切复制弹出框
      actions2: [
        { name: '复制' },
        { name: '剪切板' }
      ],
      // 粘贴弹出框
      actions3: [
        { name: '粘贴' }
      ],
      vNumber: ''
    }
  },
  methods: {
    onPanelChange (value, mode) {
      console.log(value, mode);
    },
    showKeyboard (e) {
      // console.log(e)
      // console.log(this)
      console.log(this.$refs.pwd.type)
    },
    // 模拟长按事件
    ontouchend () {
      clearTimeout(this.timer)
    },
    ontouchstart () {
      // 模拟长按事件
      this.timer = setTimeout(() => {
        this.show3 = true
      }, 1000)
    },
    /**
     * 发送验证码
     */
    sendVerify (number) {
      let results = this.$store.dispatch('sendSms', number);
      return results.then((tips) => {
        let reg = /\d+/g;
        let code = reg.exec(tips);
        return { tips, code }
      })
    },
    /**
     * 策略模式封装表单校验
     */
    validateAll (parms, data) {
      let willValidata = {
        username: (x) => {
          console.log(x)
        },
        pwd: (x) => {
          console.log(x)
        },
        phoneNumber: (x) => {
          console.log(typeof x);
          x = parseInt(x)
          console.log(x)
          let reg = /^1[3-8][0-9]{9}$/;
          console.log(reg.test(x))
          return reg.test(x);
        }
      }
      return willValidata[parms](data)
    },
    /**
     * 弹出框
     */
    onSelect2 (e, item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      // console.log(this.vNumber)  console.log(e)  console.log(item)
      this.show2 = false;
      Toast('复制成功');
    },
    /**
     * 弹出框
     */
    onSelect3 (e, item) {
      this.show3 = false;
      this.sms = this.vNumber;
    },
    sendSMS (e) {
      // 只有这个this是本身的this
      // 直接再created当中设置this的话，哪个this到了这一层就变成了window
      // 1.获取电话号码
      // 2.获取对电话号码校验,封装成校验规则;
      let fes = this.validateAll('phoneNumber', this.phone);
      if (fes) {
        this.sendVerify(this.phone).then((result) => {
          let { tips, code } = result;
          // 这里是直接赋值了,其实不应该这么做的,应该是点击复制的时候把值拿出来
          // 可以封装到本身的data当中进行管理
          this.vNumber = code[0]
          console.log(tips, code[0]);
          // 模拟3秒后收到验证码
          setTimeout(() => {
            Notify({
              type: 'success',
              message: tips,
              duration: 5000,
              onClick: function () {
                // 显示验证码
                vueCom.show2 = true;
              }
            });
          }, 3000)
        });
        let vueCom = this;
        e.target.disabled = true;
        let i = 60;
        let timer = setInterval(() => {
          if (i === 0) {
            e.target.innerText = `发送验证码`
            e.target.disabled = false;
            clearInterval(timer);
          } else {
            e.target.innerText = `${i}S后重新发送`
            i--;
          }
        }, 1000)
      } else {
        Notify({
          type: 'error',
          message: '手机号错误',
        });
      }
    },
    /**
     * 登录
     */
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
            Message
              .loading('正在登陆..', 1.3)
              .then(() => {
                Message.success('登陆成功', 1).then(() => {
                  const path = this.$route.query.redirect || '/';
                  this.$router.push(path);
                })
              });
          } else {
            Message
              .error('登录失败,用户名或者密码错误', 1);
          }
        })
        .catch(error => {
          console.log('错误');
          Message
            .error('登录失败,用户名或者密码错误', 1);
        })
      // e.preventDefault();
    },
    /**
     * 小键盘事件,可以做校验
     */
    onInput (value) {
      // Toast(value);
    },
    onDelete () {
      // Toast('删除');
    },
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