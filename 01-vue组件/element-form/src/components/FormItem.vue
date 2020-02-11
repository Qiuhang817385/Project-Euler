<template>
  <div>
    <!-- 12321321 -->
    <label for="">{{label}}</label>
    <div>
      <slot></slot>
      <p v-if="errStatus">{{errMessage}}</p>
    </div>
  </div>
</template>

<script>
import Schema from 'async-validator';
export default {
  inject: ['kForm'],
  props: ['label', 'prop'],
  data () {
    return {
      errMessage: '',
      errStatus: false
    }
  },
  mounted () {
    this.$on('validate', this.validator)
  },
  methods: {
    validator () {
      // 拿到父组件当中的校验规则和值
      console.log('1');
      console.log(this.kForm);
      console.log(this.prop);
      const rules = this.kForm.rules[this.prop];
      const value = this.kForm.model[this.prop];
      console.log('校验了');

      // 描述对象
      // const decriptor = { [this.prop]: rules };
      // const schema = new Schema(decriptor);
      // schema.validate({ [this.prop]: value }, errors => {
      //   if (errors) {
      //     this.errMessage = errors[0].message,
      //       this.errStatus = true
      //   } else {
      //     this.errMessage = '',
      //       this.errStatus = false
      //   }
      // })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>