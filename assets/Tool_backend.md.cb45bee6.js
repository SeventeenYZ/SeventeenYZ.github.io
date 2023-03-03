import{_ as e,c as o,o as c,a as d}from"./app.523b53ce.js";const p="/assets/orm.ec0293d6.png",s="/assets/node-compare-traditional.eafc3054.png",t="/assets/controller.39b845cf.png",a="/assets/service.f71326c0.png",r="/assets/middleware.2f3dbd8c.png",n="/assets/error-filter.cc6d7014.png",i="/assets/guard.a9c09690.png",k=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Spring Boot","slug":"spring-boot","link":"#spring-boot","children":[]},{"level":2,"title":"Node.js","slug":"node-js","link":"#node-js","children":[]},{"level":2,"title":"Node.js相关框架概念","slug":"node-js相关框架概念","link":"#node-js相关框架概念","children":[]},{"level":2,"title":"后端架构演变史","slug":"后端架构演变史","link":"#后端架构演变史","children":[]}],"relativePath":"Tool/backend.md"}'),l={name:"Tool/backend.md"},_=d('<h2 id="spring-boot" tabindex="-1">Spring Boot <a class="header-anchor" href="#spring-boot" aria-hidden="true">#</a></h2><p>后端概念</p><p><code>jdk</code>：<code>java</code>运行环境，类似于<code>Node.js</code></p><p><code>pom.xml</code>：依赖关系文件，类似于<code>package.json</code></p><p><code>Maven</code>：项目构建和依赖管理工具，类似于<code>npm</code> + <code>webpack</code></p><p><code>application.properties</code>：相当于<code>webpack.config.js</code>，额外的配置</p><p>拦截器：接收请求前做一些操作（权限检查，没登录不让跳到<code>Controller</code>），请求处理完成后在返回响应数据前做一些操作，类似<code>Axios</code>的拦截器，<code>Koa</code>的中间件，可以定义拦截哪些路径或过滤哪些路径</p><p><code>Spring MVC</code>：是对<code>servlet</code>（控制http请求和响应的程序）的封装</p><p>ORM：对象关系映射，为了解决对象与关系数据库不匹配的情况，将对象映射到数据库的一项技术，例如MyBatis（基于JDBC的封装，让访问数据库更方便） <img src="'+p+'" alt="图片加载失败"></p><p>数据库连接池：数据库连接池是管理数据库连接的，当后端程序和数据库建立连接后将连接保存在池中，当有请求来时，直接用这个连接对数据库进行访问，而不用再生成新的连接</p><p><code>Navicat</code>：一种数据库管理工具，提供可视化管理页面</p><h2 id="node-js" tabindex="-1">Node.js <a class="header-anchor" href="#node-js" aria-hidden="true">#</a></h2><p>可扩展性、延迟和吞吐量是Web服务器的关键性能指标，Node.js通过“非阻塞”方法来处理请求，从而实现低延迟和高吞吐量，换句话说，Node.js不会浪费时间或资源来等待I/O请求返回</p><p>传统Web服务器处理请求时会生成一个新的执行线程甚至派生一个新进程来处理，这会产生很大的开销 虽然生成线程比派生进程产生的内存和CPU开销更小，但也是低效的，大量线程的存在会导致系统将宝贵的周期耗费在线程调度和上下文切换上，这样会增加延迟并且限制了可扩展性和吞吐量</p><p>特点：适合I/O密集型，不适合CPU密集型应用程序，即它的并发能力强。适合搭配非关系型数据库（如MongoDB），不适合搭配关系型数据库（如MySQL），相较于关系型数据库，非关系型数据库有并发能力和水平扩展能力上的优势</p><p><img src="'+s+'" alt="图片加载失败"></p><h2 id="node-js相关框架概念" tabindex="-1">Node.js相关框架概念 <a class="header-anchor" href="#node-js相关框架概念" aria-hidden="true">#</a></h2><p>controller：接收前端请求并作出反应，可通过注解获取参数、header等</p><p><img src="'+t+'" alt="图片加载失败"></p><p>service：一般<code>Controller</code>接收请求后调用<code>Service</code>中的方法返回响应数据，主要是为了分层设计</p><p><img src="'+a+'" alt="图片加载失败"></p><p>中间件：和拦截器一个意思，在控制器调用之前和之后（部分，Koa可以，Express只能在控制器之前调用）调用的函数，中间件函数可以访问请求和响应对象</p><p><img src="'+r+'" alt="图片加载失败"></p><p>异常处理器：负责处理应用程序中所有未处理的异常</p><p><img src="'+n+'" alt="图片加载失败"></p><p>守卫：守卫会根据运行时出现的某些条件（例如权限，角色，访问控制列表等）来确定给定的请求是否由路由处理程序处理。</p><p>普通的应用程序中，一般会在中间件中处理这些逻辑，但是中间件的逻辑过于通用，同时也无法很优雅的去和路由方法进行结合，因此在中间件之后，进入路由方法之前设计了守卫，可以方便的进行方法鉴权等处理。</p><p>守卫会在中间件之后，路由方法之前执行</p><p><img src="'+i+'" alt="图片加载失败"></p><h2 id="后端架构演变史" tabindex="-1">后端架构演变史 <a class="header-anchor" href="#后端架构演变史" aria-hidden="true">#</a></h2><p>简单的后端程序都是打个包部署到服务器上，启动后端程序和数据库，这样就能对外提供访问了</p><p>接着发现用户的请求只有少数是业务请求，其余都是请求静态资源如<code>html</code>、<code>css</code>、<code>js</code>、图片等，于是将这些静态资源单独部署到<code>Nginx</code>上（可接收并发量高，反向代理业务请求给后端程序）</p><p>当访问量上来到一个后端程序有点处理不过来了，于是上集群，部署多个后端程序，由<code>Nginx</code>负责转发请求到其它服务上（负载均衡）</p><p>过了一段时间，发现轮到数据库扛不住了，于是上数据库读写分离，再架设几台数据库服务器，做主从、分库分表</p><p>又过了一段时间，访问量越来越高，而且大部分是查询，于是加上了缓存，把用户高频次访问的数据放到缓存里（相关工具：redis）</p><p>后来，项目功能越来越多，项目也愈发庞大，修改一个类就需要全盘上传，切换nginx重启，发布流程越来越长，越来越繁杂，于是开始把模块拆分，用户信息分个项目，订单系统分个项目，这样就达到了用户模块代码修改时只需要更新用户信息服务就好了，这就是微服务，但还是要切换顶层的Nginx，把要重启的服务的流量切到可用服务上</p><p>这时可以把所有的服务在启动的时候注册到一个注册机里面，然后顶层处理在接收到Nginx的请求时，去注册机找一个可用的服务并调用接口，这样子呢，在不加新功能的时候，顶层处理服务我们就不需要动了。修改了用户信息项目的时候，我们只需要一个个更新用户信息项目的服务群就好了</p>',37),h=[_];function g(m,j,b,f,x,N){return c(),o("div",null,h)}const v=e(l,[["render",g]]);export{k as __pageData,v as default};
