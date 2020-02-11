<template>
  <div id="app">
    <!-- 使用name需要加绑定 -->
    <!--直接的话不需要 -->
    <router-link :to="{name:'page1',params:{userId:123}}">页面1</router-link>
    <router-link :to="{name:'page2'}">页面2</router-link>
    <router-link :to="{name:'page3'}">页面3</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
