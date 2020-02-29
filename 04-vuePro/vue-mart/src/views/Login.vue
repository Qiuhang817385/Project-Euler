<template>
  <div>
    <!-- schema规则,数据驱动表单,用数据来定义表单的外形
    从服务器把表单的数据返回回来,动态生成表单的内容,答题程序
    单选问答?
    -->
    <cube-form  :model="model"
                :schema="schema"
                @submit="handleLogin"
                @validate="haneldValidate">
    </cube-form>
    <hr>
    <!-- <button @click="clickH">toast按钮</button> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {
        username: "",
        passwd: ""
      },
      schema: {//表单的结构定义
        fields: [//字段数组
          {
            type: "input",
            // 和model绑定
            modelKey: "username",
            label: "用户名",
            props: {/* 属性 */
              placeholder: "请输入用户名"
            },
            rules: {
              //校验规则
              required: true
            },
            trigger: "blur"
          },
          {
            type: "input",
            modelKey: "passwd",
            label: "密码",
            props: {
              type: "password",
              placeholder: "请输入密码",
              // 加了一个眼睛
              eye: {
                open: true
              }
            },
            rules: {
              required: true
            },
            trigger: "blur"
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }

    }
  },
  methods: {
    // 登录
    handleLogin (e) {
      // 登录请求
      console.log("请求");
      this.$store.dispatch('login', this.model)
        .then((code) => {
          console.log("code", code);

          if (!code) {
            console.log("code", code);
            // 登录成功
            // 拿到会跳地址再做重定向,如果没有,那么回到首页
            console.log("this.$router", this.$router);
            console.log("this.$route", this.$route);

            const toast = this.$createToast({
              time: 1300,
              txt: "成功",
              type: "correct",
              onTimeout: () => {
                const path = this.$route.query.redirect || '/';
                this.$router.push(path);
              }
            });
            toast.show();

          } else {
            const toast = this.$createToast({
              time: 1300,
              txt: "登录失败,用户名或者密码错误",
              type: "error"
            });
            toast.show()
          }
        })
        .catch(error => {
          console.log('错误');
          // 用户名或者密码错误
          const toast = this.$createToast({
            time: 1300,
            txt: error.message || error.response.data.message || "登录失败",
            type: "error"
          });
          toast.show()
        })
      e.preventDefault();
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

<style lang="scss" scoped>
</style>