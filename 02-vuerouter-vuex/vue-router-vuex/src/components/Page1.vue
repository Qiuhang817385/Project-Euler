<template>
  <div>
    页面1
    <br>
    this.$store.state.count
    {{$store.state.count}}
    <br>
    count
    {{count}}
    <hr>
    age
    {{age}}
    <hr>
    <button @click="handleClick">增加</button>
    <button @click="handleClickDec">减少</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      count: this.$store.state.count,
      age: this.$store.getters.age
    }
  },
  mounted () {
    console.log(this.$store.state.count);
    this.$store.commit('add');
    console.log(this.$store.state.count);
  },
  methods: {
    handleClick () {
      this.$store.dispatch('addSync');
    },
    handleClickDec () {
      this.$store.dispatch('decSync')
    }
  },
}
</script>

<style lang="scss" scoped>
</style>