<template>
  <div>
    <!--  @input="$emit('input',$event.target.value)" -->
    <!-- 监听input事件,绑定value值 -->
    <input :type="type"
           :value="value"
           @input="onInput">
  </div>
</template>

<script>
export default {
  // props: ['value'],
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput (e) {
      let value = e.target.value;
      // 把这个value传递给父组件,父组件再显示value,因为一般的情况下
      // vue你输入input,value是没有反应的,也就是只是单向的数据
      // 双向数据绑定::vue->html->vue

      // 什么是单向数据流,就是你只有在vue源代码当中改变了value的值,这个值才会凸显到页面之上
      // 而双向的话允许你在html页面修改value再直接显示,效果上就是直接显示
      this.$emit('input', value)
      this.$parent.$emit('validate');
    }
  },
}
</script>

<style lang="scss" scoped>
</style>