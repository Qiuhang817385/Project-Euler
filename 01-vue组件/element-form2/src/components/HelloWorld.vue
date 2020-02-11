<template>
  <div class="hello">
    <!-- <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row> -->
    <h3>Element表单</h3>
    <hr>
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
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      model: { username: "tom", password: "" },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入密码" }],
      }
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
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
