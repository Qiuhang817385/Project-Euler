<template>
  <div>
    <h2>我是购物车</h2>
    <table>
      <tr>
        <td>勾选</td>
        <td>课程名称</td>
        <td>课程价格</td>
        <td>数量</td>
        <td>价格</td>
      </tr>
      <tr v-for="item in courseItem"
          :key="item.id">
        <td>
          <input type="checkbox"
                 v-model="item.isActive">
        </td>
        <td>{{item.name}}</td>
        <td>{{item.price}}</td>
        <td>
          <button @click="dec(index)">-</button>
          {{item.number}}
          <button @click="add(index)">+</button>
        </td>
        <td>{{item.price*item.number}}</td>
      </tr>
      <tr>
        <td></td>
        <td colspan="2">{{isActiveCourse}}/{{allCourseList}}</td>
        <td colspan="2">{{allPrice}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  // 遵守单向数据流
  props: ['courseItem'],
  methods: {
    dec (index) {
      let number = this.courseItem[index].number
      if (number > 0) {
        this.courseItem[index].number -= 1
      } else {
        // 监听和响应
        if (window.confirm('确定要删除吗')) {
          this.$emit('removeItem', index)
        }
      }
    },
    add (index) {
      // let number =this.courseItem[index].number
      this.courseItem[index].number += 1
    }
  },
  // 快捷键,vcum
  computed: {
    isActiveCourse () {
      return this.courseItem.filter(item => item.isActive).length
    },
    allCourseList () {
      return this.courseItem.length
    },
    allPrice () {
      let num = 0
      this.courseItem.forEach(item => {
        if (item.isActive) {
          num += item.price * item.number
        }
      })
      return num
    }
  }
}
// 命令vbas
</script>

<style>
</style>
