## Cookie + Session登录

`http`是无状态协议，客户端发起请求时与服务器建立连接，请求完成后又会断开连接，这种方式是为了节省传输时占用的连接资源，为了判断客户端的登录状态推出了`Cookie`

`Cookie`是服务器给客户端的一段特殊信息，客户端每次发送请求时会在请求头带上这些特殊信息

服务器对`Cookie`进行认证，需要通过`Session`

`Session`是一种记录客户端状态的机制，服务器在验证登录成功后，会创建`SessionId`并保存起来，并通过`set-cookie`将`SessionId`写入`Cookie`中，当客户端再次访问的时候比对`Cookie`中的`SessionId`与服务端保存的`SessionId`是否一致来验证

存在的问题：

服务端对接大量的客户端也就需要保存大量的`SessionId`
如果服务端是集群，为了同步登录态，需要将`SessionId`同步到每一台机器上

## token登录

`token`是服务端生成的一串字符串当成客户端请求的一个标识，首次登录后，服务端生成一个`token`返回给客户端，客户端自行保存，后续访问带上这个`token`来让服务器验证身份，用解析`token`的计算时间换取`session`的存储空间

## token续签

通过双`token`，即`access token`和`refresh token`来实现`token`续签（`refresh token`也有的叫`cache token`）

后端为了`token`的安全性，一般会把`token`的过期时间设置得比较短，而为了避免用户频繁登录，传给客户端保存的是`access token`，当验证`access token`有效时，会根据规则取出`refresh token`判断是否存在

不存在则说明客户空闲过久，信息失效需要重新登录。存在则验证是否过期，过期会重新续签`token`

例如`access token`有效期12小时，`refresh token`有效期24小时，用户如果在超过12小时但是不到24小时的时间内请求服务器则会续签`token`，超过24小时就需要重新登录

### 有了token为什么还要cookie

例如token是在axios请求拦截里添加请求头Authorization：{token}，当通过location.href ='文件地址'下载文件，默认发起一个get请求，但是不会经过axios请求拦截器（该请求也会自动带上cookie），因此无法添加token，需要cookie以便能实现认证下载，类似的还有通过a标签下载

不用cookie解决办法：不用cookie会比较麻烦，如果要用ajax去接收，类型改成blob，然后去下载这个资源或者后端配合，从header中获取不到就从query string(params)获取前端url带上token参数 download?token={token}

## JWT

`JSON Web Token`（JWT）是一个`token`的具体实现方式，是目前最流行的跨域认证解决方案

原理：服务器认证以后，生成一个`JSON`对象然后转变成一个字符串即`token`，返回给用户，如

```json
{
    "姓名": "张三",
    "角色": "普通用户",
    "到期时间": "2023年2月11日0点0分"
}
```