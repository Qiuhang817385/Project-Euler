<template>
  <div>
    页面1
    <!-- {{this.$store.state.count}} -->
    {{count}}
    <hr>
    {{age}}
    <hr>
    <button @click="handleClick">增加</button>
  </div>
</template>

<script>
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
    }
  },
}
</script>

<style lang="scss" scoped>
</style>