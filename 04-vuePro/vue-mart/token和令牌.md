如果没有token

服务器拒绝并且发送401的状态码

表明没有认证



做处理---转到登录页面

登录以后签发一个令牌

放到客户端的cookie或者localstorage当中

![image-20200214020624825](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214020624825.png)

![image-20200214021808695](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214021808695.png)





别在项目启动的时候安包,会出错



axios

![image-20200214123426035](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214123426035.png)

![image-20200214141405879](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214141405879.png)

# 注销

![image-20200214141643782](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214141643782.png)

![image-20200214142652594](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214142652594.png)





令牌过期的话后端来进行判断,服务器进行判断并且返回状态

//返回401

//转到登录页面

//清空当前过期令牌

![image-20200214142824710](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214142824710.png)

![image-20200214143225200](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214143225200.png)

# 令牌深入

![image-20200214143532359](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214143532359.png)

后端规范

![image-20200214143738904](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214143738904.png)



头和载荷都是json

明文

1.不能包含敏感信息

2.不能修改内容

红

紫

蓝

分别是头,载荷,签名

https:jwt.io![image-20200214144229079](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214144229079.png)

![image-20200214144849626](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214144849626.png)

![image-20200214144919698](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214144919698.png)





如果配置代理,不需要用假的服务器,那么就注释掉before

![image-20200214145034975](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214145034975.png)





这部分是提升

![image-20200214145419761](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214145419761.png)



协议或者域名或者端口

跨域

使用mapaction

![image-20200214145620555](C:\Users\Artificial\AppData\Roaming\Typora\typora-user-images\image-20200214145620555.png)

imp是es6

require是node的common.js



