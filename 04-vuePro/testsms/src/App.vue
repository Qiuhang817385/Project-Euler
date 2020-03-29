<template>
  <div id="app">
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
import a from './components/HelloWorld.vue';
console.log(a)
export default {
  name: 'App',
  components: {
    // HelloWorld: a
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
