import{_ as e,c,o as t,a as d}from"./app.c0601825.js";const o="/assets/image-20201106153032276.ca4d5913.png",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"http1.1","slug":"http1-1","link":"#http1-1","children":[]},{"level":2,"title":"http2","slug":"http2","link":"#http2","children":[]},{"level":2,"title":"https","slug":"https","link":"#https","children":[]},{"level":2,"title":"三次握手和四次挥手","slug":"三次握手和四次挥手","link":"#三次握手和四次挥手","children":[]},{"level":2,"title":"网络安全","slug":"网络安全","link":"#网络安全","children":[]}],"relativePath":"topic/http.md"}'),p={name:"topic/http.md"},h=d('<h2 id="http1-1" tabindex="-1">http1.1 <a class="header-anchor" href="#http1-1" aria-hidden="true">#</a></h2><p>队头阻塞：如果某个请求没成功响应，会阻塞后续请求</p><p>低效TCP利用：由于TCP慢启动机制，在一开始传输速率不高，在处理多个请求后才会慢慢提高传输速率，对于请求量小的应用受影响大</p><p>消息头臃肿：http1.1消息头无法压缩，比如有cookie的存在，经常出现请求头大小比请求数据还大的情况</p><p>无优先级设置：http1.1无法为重要的资源指定优先级，每个http请求都一视同仁</p><h2 id="http2" tabindex="-1">http2 <a class="header-anchor" href="#http2" aria-hidden="true">#</a></h2><p>http2是基于帧的协议，采用分帧方便解析</p><p>多路复用：http1.1中如果想发送多个并行的请求，必须使用多个tcp连接，而http2请求和响应都在同一个tcp连接上，http2时代，以往的优化手段：合并资源（如雪碧图，css、js文件合并）和域名分片也不再需要了</p><p>域名分片：在http1.1时代，例如chrome浏览器最多只能建立6个tcp链接，而单个tcp连接同一时间只能处理一个http请求，因此将资源拆分向不同子域名请求，使得浏览器能够同时下载更多资源，从而缩短了页面加载时间并改善了用户体验，但这也会造成服务器压力增大、DNS解析域名花费时间、建立tcp连接的开销</p><h2 id="https" tabindex="-1">https <a class="header-anchor" href="#https" aria-hidden="true">#</a></h2><p><code>HTTPS</code>=<code>HTTP</code>+<code>SSL</code></p><p>① 对称加密：客户端和服务端用同个密钥对数据进行加密或解密 缺点：商量密钥时可能会被窃听</p><p>② 非对称加密：服务端拥有一把公钥和一把私钥 第一步：客户端向服务端索要公钥，服务端发送公钥给客户端 第二步：客户端使用公钥进行加密，服务端用私钥进行解密 缺点：服务端无法向客户端发送数据</p><p>③ <code>HTTPS</code>采用对称加密+非对称加密的机制，商量密钥阶段用非对称加密，通信阶段用对称加密 第一步：客户端向服务端索要公钥，服务端发送公钥给客户端 第二步：客户端定义一个随机数，用公钥加密后发送给服务端，服务端使用私钥解密得到随机数 第三步：随机数作为对称加密的密钥使用 缺点：假如客户端第一次索要公钥的请求就被黑客拦截，此后黑客就能一直当中间人</p><p>解决中间人问题的办法是数字证书机构，经过该机构认证过的公钥才是可信赖的公钥，让客户端能够确定公钥是可信赖的服务器发送过来的</p><p><img src="'+o+'" alt="图片加载失败"></p><h2 id="三次握手和四次挥手" tabindex="-1">三次握手和四次挥手 <a class="header-anchor" href="#三次握手和四次挥手" aria-hidden="true">#</a></h2><p>三次握手的过程： 第一次握手：<code>A</code>向<code>B</code>发起建立连接请求：<code>A</code>——&gt;<code>B</code> 第二次握手：<code>B</code>收到<code>A</code>的请求，并且向<code>A</code>发送确认信号：<code>A</code>&lt;——<code>B</code> 第三次握手：<code>A</code>收到<code>B</code>的确认信号，并向<code>B</code>发送确认信号：<code>A</code>——&gt;<code>B</code> 目的是为了确认双方的收发能力都正常</p><p>四次挥手的过程： 第一次挥手：<code>A</code>向<code>B</code>发起断开连接请求，表示<code>A</code>没有数据要发送了：<code>A</code>——&gt;<code>B</code> 第二次挥手：<code>B</code>收到<code>A</code>的请求，并且向<code>A</code>发送确认信号：<code>A</code>&lt;——<code>B</code> 第三次挥手：<code>B</code>向<code>A</code>发送信号，请求断开连接，表示<code>B</code>没有数据要发送了：<code>A</code>&lt;——<code>B</code> 第四次挥手：<code>A</code>向<code>B</code>发送确认信号，同意断开：<code>A</code>——&gt;<code>B</code> 第二次挥手和第三次挥手不能合成一次的原因：此时<code>A</code>虽然不再发送数据了，但是还可以接收数据，<code>B</code>可能还有数据要发送给<code>A</code> 挥手次数比握手多一次的原因：在握手过程，通信只需要处理连接。而挥手过程，通信需要处理数据<code>+</code>连接</p><h2 id="网络安全" tabindex="-1">网络安全 <a class="header-anchor" href="#网络安全" aria-hidden="true">#</a></h2>',20),a=[h];function i(r,s,l,n,_,A){return t(),c("div",null,a)}const T=e(p,[["render",i]]);export{u as __pageData,T as default};
