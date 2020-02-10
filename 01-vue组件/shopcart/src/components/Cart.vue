<template>
  <!-- // 命令vbas -->
  <div>
    <h2>我是购物车</h2>
    <table>
      <!-- 第一行 -->
      <tr>
        <td>勾选</td>
        <td>课程名称</td>
        <td>课程价格</td>
        <td>数量</td>
        <td>价格</td>
      </tr>
      <!-- 第二行,遍历出购物车当中的项目 -->
      <tr v-for="(item,index) in courseItem"
          :key="item.id">
        <!-- 勾选框 -->
        <td>
          <input type="checkbox"
                 v-model="item.isActive">
        </td>
        <!-- 课程名 -->
        <td>{{item.name}}</td>
        <!-- 课程价格 -->
        <td>{{item.price}}</td>
        <!-- 课程数量增减 -->
        <td>
          <button @click="dec(index)">-</button>
          {{item.number}}
          <button @click="add(index)">+</button>
        </td>
        <!-- 课程总价 -->
        <td>{{item.price*item.number}}</td>
      </tr>
      <tr>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>{{isActiveCourse}}/{{allCourseList}}</td>
        <td>{{allPrice}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  // 遵守单向数据流,子组件拿到courseItem
  props: ['courseItem'],

  methods: {
    // 减少数量
    dec (index) {
      let number = this.courseItem[index].number
      if (number > 1) {
        this.courseItem[index].number -= 1
      } else {
        // 监听和响应
        if (window.confirm('确定要删除吗')) {
          // 子组件告诉父组件来进行修改,父组件通过on来监听就ok了
          this.$emit('removeItem', index)
        }
      }
    },
    // 增加数量
    add (index) {
      // 直接操作父组件当中的数据
      // this.courseItem[index].number += 1
      this.$emit('addItem', index)
    }
  },
  // 快捷键,vcum
  computed: {
    // 这是实时刷新的,不用触发什么条件
    isActiveCourse () {
      // 返回的是一个数组,不会对原来的有改变
      return this.courseItem.filter(item => item.isActive === true).length
    },
    allCourseList () {
      return this.courseItem.length
    },
    allPrice () {
      let num = 0
      // 只有item.active是true的才会变量
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
