observable可以把一个普通对象,变成响应式



写起来比dva要舒服一点

像vuex

原来的state  本身不能直接修改,直接进行push操作,需要在原有的基础上,进行合并



但是在mobx里面,可以直接进行push操作

![image-20200608232119413](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232119413.png)



使用,提供到全局store当中

![image-20200608232141748](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232141748.png)

![image-20200608232205305](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232205305.png)

![image-20200608232218970](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232218970.png)



在组件当中调用store里面的数据

![image-20200608232350588](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232350588.png)

![image-20200608232417312](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232417312.png)

![image-20200608232458483](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232458483.png)





异步处理乱七八糟,点击添加

![image-20200608232558513](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232558513.png)

![image-20200608232723640](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232723640.png)

![image-20200608232922778](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608232922778.png)







![image-20200608233700822](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608233700822.png)



抽象语法树--->遍历这个生成的对象--->代码生成





![image-20200608234439099](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608234439099.png)

![image-20200608234956511](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200608234956511.png)