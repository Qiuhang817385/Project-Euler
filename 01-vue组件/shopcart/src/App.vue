<template>
  <div id="app">
    <h1>{{title}}</h1>
    <hr>
    <div>
      <h2>添加课程</h2>
      <div>
        <label for="cname">课程名称:</label>
        <!--v-bind可以给任何属性赋值,从vue到页面的单向数据流
                    v-model只能给具备value属性的元素进行双向数据绑定,必须是有value属性的元素
                -->
        <input v-model="courseInfo.name"
               type="text"
               name="cname"
               id="cname" />
      </div>
      <div>
        <label for="cprice">课程价格:</label>
        <input v-model="courseInfo.price"
               type="text"
               name="cprice"
               id="cprice" />
      </div>
      <div>
        <button @click="addCourseToList">添加课程到列表</button>
      </div>
    </div>
    <div>
      <h2>课程列表</h2>
      <table>
        <tr>
          <th>课程名称</th>
          <th>课程价格</th>
          <th>操作</th>
        </tr>
        <!-- 在tr里面做列表渲染 -->
        <tr v-for="(courseList,index) in courseLists"
            :key="courseList.id">
          <!-- {{ courseList }} -->

          <td>{{courseList.name}}</td>
          <td>{{courseList.price}}</td>
          <td><button @click="addCourseToCart(index)">添加到购物车</button></td>
        </tr>
      </table>
    </div>
    <!-- <hello-world>官方推荐写法 ,小写组件的名字-->
    <!-- 父组件向子组件传递courseItem 子-父-->
    <!-- 传递属性正好一致都是   子-父 子-父-->
    <!-- 父组件监听子组件的removeItem  子-父-->
    <cart :courseItem="courseItem"
          @removeItem="remove"
          @addItem="add"></cart>
  </div>
</template>

<script>
import Cart from './components/Cart'
export default {
  name: 'App',
  components: {
    Cart
  },
  data () {
    return {
      title: '这里是标题',
      courseInfo: { name: '', price: '' },
      courseLists: [
        { id: 0, name: 'web全栈', price: 1000 },
        { id: 1, name: 'Python', price: 2000 }
      ],
      // 购物车的数据
      courseItem: []
    }
  },
  methods: {
    remove (index) {
      this.courseItem.splice(index, 1)
    },
    add (index) {
      this.courseItem[index].number += 1
    },
    // 添加课程到课程列表
    addCourseToList () {
      this.courseLists.push(this.courseInfo)
    },
    // 添加课程到购物车,拿到当前index,gentodolist这不是一样吗
    addCourseToCart (index) {
      // 根据index拿到数据值,需要添加到购物车的item
      let item = this.courseLists[index]
      // find返回的是本身这个对象
      // 在添加到购物车之前,先判断是否购物车当中有相同的,购物车数据在本页面courseItem
      // courseItem是一个数组,数组有一个find方法
      // 返回值是通过测试（函数内判断）的数组的第一个元素的值
      // 第一个值,只返回第一个
      let isHasCourse = this.courseItem.find(x => x.id === item.id)
      if (isHasCourse) {
        // 这个数组存储的是购物车对象{ id: 0, name: 'web全栈', price: 1000 },
        isHasCourse.number += 1
      } else {
        // 为item添加一个新的字段
        this.courseItem.push({
          ...item,
          number: 1,
          // 思考,如果是true,怎么过滤显示对应的值
          isActive: true
        })
      }
    }

  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
