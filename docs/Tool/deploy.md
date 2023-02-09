部署流程

以分别部署前端和后端（Spring Boot）到云服务器为例

购买云服务器

`Xshell`连接到云服务器

 安装`jdk`、`MySql`、`Nginx` 

启动`MySql`

启动`Nginx`，配置`server`实例（端口号80、`ip`地址域名、root: `dist`包的路径、html文件）

上传前端打包好的项目`dist`包（包含html、css、js、image）

上传后端打包好的项目`jar`包，启动

本地连接远程的数据库，执行`Sql`脚本
