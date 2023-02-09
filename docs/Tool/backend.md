## Spring Boot

后端概念

`jdk`：`java`运行环境，类似于`Node.js`

`pom.xml`：依赖关系文件，类似于`package.json`

`Maven`：项目构建和依赖管理工具，类似于`npm` + `webpack`

`application.properties`：相当于`webpack.config.js`，额外的配置

Controller：接收前端请求并作出反应，可通过注解获取参数、header等

Service：一般`Controller`接收请求后调用`Service`中的方法返回响应数据，主要是为了分层设计

拦截器：接收请求前做一些操作（权限检查，没登录不让跳到`Controller`），请求处理完成后在返回响应数据前做一些操作，类似`Axios`的拦截器，`Koa`的中间件，可以定义拦截哪些路径或过滤哪些路径

ORM：对象关系映射，为了解决对象与关系数据库不匹配的情况，将对象映射到数据库的一项技术，例如MyBatis

数据库连接池：数据库连接池是管理数据库连接的，当后端程序和数据库建立连接后将连接保存在池中，当有请求来时，直接用这个连接对数据库进行访问，而不用再生成新的连接

`Navicat`：一种数据库管理工具，提供可视化管理页面