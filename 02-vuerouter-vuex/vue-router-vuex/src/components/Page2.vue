<template>
  <div>
    页面2
    <div>
           哈喽啊{{$route.params.id}}
          </div>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
    console.log(this.$route.params.id)
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
</style>