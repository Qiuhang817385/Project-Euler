<template>
  <div id="app">
    <h1>{{title}}</h1>
    <hr>
    <div>
      <h2>添加课程</h2>
      <div>
        <lable>课程名称:</lable>
        <input v-model="courseInfo.name"
               type="text" />
      </div>
      <div>
        <lable>课程价格:</lable>
        <input v-model="courseInfo.price"
               type="text" />
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
        <tr v-for="courseList in courseLists"
            :key="courseList.id">
          <!-- {{ courseList }} -->

          <td>{{courseList.name}}</td>
          <td>{{courseList.price}}</td>
          <td><button @click="addCourseToCart(index)">添加到购物车</button></td>
        </tr>
      </table>
    </div>
    <!-- <hello-world>官方推荐写法 -->
    <cart :courseItem="courseItem"
          @removeItem="remove"></cart>
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
      courseItem: []
    }
  },
  methods: {
    remove (index) {
      this.courseItem.splive(index, 1)
    },
    addCourseToList () {
      this.courseLists.push(this.courseInfo)
    },
    addCourseToCart (index) {
      let item = this.courseLists[index]
      // find返回的是本身这个对象

      let isHasCourse = this.courseItem.find(x => x.id === item.id)
      if (isHasCourse) {

      } else {
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
