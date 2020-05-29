<template>
  <div>
    详情页面
    <br>
    <!-- 两种拿到id的方式 -->
    第一种拿到参数ID的方式props:{{id}}
    <br>
    第二种拿到参数ID的方式$route.params.id:{{$route.params.id}}
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>

<style lang="scss" scoped>
</style>