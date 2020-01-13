<template>
  <div id="app">
    <template>
      <div>
        <h3>Element表单</h3>
        <hr>
        <el-form :model='model'
                 :rules="rules"
                 ref="loginForm">
          <el-form-item lable="用户名"
                        prop="username">
            <el-input v-model="model.username"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item lable="确认密码"
                        prop="password">
            <el-input v-model="model.password"
                      type="password"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="primary"
                      @click="submitForm('loginForm')">提交</el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data: function () {
    return {

    };
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
