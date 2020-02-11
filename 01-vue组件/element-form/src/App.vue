<template>
  <div id="app">
    <h3>Element表单</h3>
    <hr>
    <!-- ref是给组件起一个名字 -->
      <el-form :model="model"
             :rules="rules"
             ref="loginForm">
         <el-form-item label="用户名"
                    prop="username">
            <el-input v-model="model.username"
                  autocomplete="off"></el-input>
           </el-form-item>
         <el-form-item label="确认密码"
                    prop="password">
            <el-input type="password"
                  v-model="model.password"
                  autocomplete="off">
        </el-input>
           </el-form-item>
         <el-form-item>
            <el-button type="primary"
                   @click="submitForm('loginForm')">提交</el-button>
           </el-form-item>
        </el-form>
    <hr>
    <!-- 实现v-module -->
    <!-- 其实就是v-module -->
    <!-- 这里emit返回,这里的@监听可以接受到emit的参数对象,arguments -->
    <!-- @本来就是给click绑定的,这里是@input -->
    <k-input :value="value"
             @input="jianting" />
    {{value}}
    <hr>

    <!-- 这里传递值不用:了?,因为没有在data里面写,
      传递方式1,在data里面写xxx=密码,然后:label="xxx"
     -->
    <k-form :model="model"
            :rules="rules">
      <k-form-item label="用户名"
                   prop="username ">
        <k-input v-model="model.username"
                 type="text" />
      </k-form-item>
      <k-form-item :label="xxx"
                   prop="password ">
        <k-input v-model="model.password"
                 type="password" />
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Kinput from './components/Input.vue'
import KFormItem from './components/FormItem.vue'
import KForm from './components/Form.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
    'k-input': Kinput,
    'k-form-item': KFormItem,
    'k-form': KForm
  },
  data () {
    return {
      xxx: '密码2',
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }, { min: 6, max: 10, message: '输入' }],
        password: [{ required: true, message: "请输入密码" }],
      },
      value: ''
    };
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          alert('请求登录!')
        } else {
          alert('校验失败！')
        }
      })
    },
    jianting () {
      console.log(arguments);

      this.value = arguments[0]
    }
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
