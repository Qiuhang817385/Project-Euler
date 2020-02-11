<template>
  <div>
    页面2
    <div>
           哈喽啊{{id}}
          </div>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$route)
  },
  props: ['id']
}
</script>

<style lang="scss" scoped>
</style>