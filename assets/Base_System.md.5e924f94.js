import{_ as e,c as o,o as c,a as d}from"./app.2608b0ed.js";const j=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"浏览器","slug":"浏览器","link":"#浏览器","children":[]},{"level":2,"title":"前后端分离","slug":"前后端分离","link":"#前后端分离","children":[]},{"level":2,"title":"Node.js","slug":"node-js","link":"#node-js","children":[]},{"level":2,"title":"模块化","slug":"模块化","link":"#模块化","children":[]},{"level":2,"title":"框架和应用类型","slug":"框架和应用类型","link":"#框架和应用类型","children":[]},{"level":2,"title":"工程化","slug":"工程化","link":"#工程化","children":[]},{"level":2,"title":"跨端","slug":"跨端","link":"#跨端","children":[]},{"level":2,"title":"大前端","slug":"大前端","link":"#大前端","children":[]},{"level":2,"title":"后端","slug":"后端","link":"#后端","children":[]},{"level":2,"title":"网络","slug":"网络","link":"#网络","children":[]},{"level":2,"title":"运维","slug":"运维","link":"#运维","children":[]},{"level":2,"title":"计算机基础","slug":"计算机基础","link":"#计算机基础","children":[]},{"level":2,"title":"补充知识点1","slug":"补充知识点1","link":"#补充知识点1","children":[]},{"level":2,"title":"补充知识点2","slug":"补充知识点2","link":"#补充知识点2","children":[]}],"relativePath":"Base/System.md"}'),p={name:"Base/System.md"},a=d(`<p>为了搭起前端知识体系的骨架，明白各类前端工具的概念，出现背景和作用</p><h2 id="浏览器" tabindex="-1">浏览器 <a class="header-anchor" href="#浏览器" aria-hidden="true">#</a></h2><p>本质是一个解析器，渲染引擎解析<code>html</code>、<code>css</code>文件绘制出页面，<code>JavaScript</code>引擎解释执行<code>JavaScript</code></p><p>浏览器内核：以前内核的概念包括渲染引擎和<code>js</code>引擎，现在一般称渲染引擎为内核，<code>js</code>引擎独立称呼，例如：以前称chrome浏览器使用chromium内核，blink渲染引擎，v8<code>js</code>引擎，现在称chrome浏览器使用blink内核（渲染引擎），v8<code>js</code>引擎</p><p>跨域：协议//域名:端口，有一个不同即为跨域</p><h2 id="前后端分离" tabindex="-1">前后端分离 <a class="header-anchor" href="#前后端分离" aria-hidden="true">#</a></h2><p>前后端耦合时期：浏览器通过<code>url</code>定位，服务器返回<code>html</code>页面，可以是静态的，也可以是后端拼接的<code>JSP</code>、<code>PHP</code>页面并解析成的，此时前后端项目代码也是耦合在一起的</p><p>前后端分离时期：浏览器通过<code>ajax</code>发送请求，前端拿到响应回来的数据后自己填充页面</p><p><code>JQuery</code>：对<code>JavaScript</code>进行封装的一个函数库，早期开发模式是基于浏览器的<code>dom api</code>来做渲染和交互，<code>JQuery</code>简化了<code>dom</code>操作，抹平不同浏览器不同版本间的差异</p><p><code>XMLHttpRequest</code>：一开始是99年IE5的非标准出现，后来各浏览器跟进实现，06年才正式成为<code>web</code>标准，它的出现表示浏览器允许<code>JavaScript</code>发出<code>http</code>请求，为后来的<code>Ajax</code>应用创造了前置条件</p><p><code>Ajax</code>：传统网页如果更新内容会重载整个页面，<code>Ajax</code>技术通过<code>XMLHttpRequest</code>对象来向服务器发送异步请求并从服务端获取数据，网页可在不重载的情况下更新数据，促进了后面的前后端分离</p><p>模板引擎：后端使用<code>PHP</code>、<code>JSP</code>等技术，通过模板引擎填充数据（例如<code>.jsp</code>文件，格式和<code>.html</code>文件类似，数据显示部分用<code>Java</code>语言填充），并解析成<code>.html</code>文件返回给浏览器渲染，这是最早的服务端渲染</p><p>额外关键词：MVC架构</p><h2 id="node-js" tabindex="-1">Node.js <a class="header-anchor" href="#node-js" aria-hidden="true">#</a></h2><p>一开始，<code>JavaScript</code>这门语言只能在浏览器中被解析，这是因为<code>Javascript</code>语言需要由内置于浏览器中的<code>Javascript</code>引擎解析为电脑能够理解的机器码并执行</p><p><code>Ryan Dahl</code>将谷歌浏览器的<code>Javascript</code>引擎（V8引擎）从浏览器中取出，并在其之上实现了更多功能，使<code>Javascript</code>拥有了独立于浏览器的运行环境，这就是<code>Node.js</code></p><p><code>js</code>的<code>runtime</code>，本质是一个能执行<code>js</code>的应用程序，有<code>js</code>引擎能解释并执行<code>js</code>，封装能访问本地文件等系统性<code>api</code></p><p><code>Node.js</code>和工程化：前端项目的构建工具在<code>node.js</code>出现之前是不足的，主要原因是跑在浏览器里的<code>js runtime</code>跳不出浏览器这个沙盒，无法直接操作文件，而这是构建工具必备的底层功能，那时候<code>js</code>不是一种系统编程语言，<code>web</code>开发社区没有足够的动力去用一种非<code>js</code>的系统编程语言去开发各类构建工具（那时候可以用<code>Python</code>、<code>Java</code>、<code>Ruby</code>或<code>PHP</code>去写工具，只是当时会的前端太少），<code>Node.js</code>的出现让<code>js</code>跳出了浏览器这个沙盒，可以进行系统调用，把它变成了一种系统编程语言，而熟悉<code>js</code>的开发人员就有动力去实现各种工具了</p><p>不过现在有些构建工具已经不用<code>js</code>写了，例如<code>Rust</code>写的<code>swc</code>代替<code>babel</code>，<code>go</code>写的<code>esbuild</code></p><p>额外关键词：<code>Express</code>、<code>Koa</code>、<code>Nest.js</code>、<code>Deno</code>、<code>Bun</code></p><h2 id="模块化" tabindex="-1">模块化 <a class="header-anchor" href="#模块化" aria-hidden="true">#</a></h2><p>随着项目的增长，一个页面有多个<code>script</code>标签，带来很多依赖关系，命名污染上的问题，于是要让前端模块化，各种模块化规范接连出现</p><p><code>CommonJS</code>：用于Node应用上的模块化规范，但是是同步加载，不适合浏览器端使用</p><p><code>AMD</code>、<code>CMD</code>：用于浏览器端，可异步加载</p><p><code>ES Modules</code>：ES6在语言标准的层面上实现了模块化功能，取代以上规范，成为浏览器和服务器通用的模块解决方案</p><h2 id="框架和应用类型" tabindex="-1">框架和应用类型 <a class="header-anchor" href="#框架和应用类型" aria-hidden="true">#</a></h2><p><code>React</code>、<code>Vue</code>：<code>UI=f(state)</code>，只需操作状态数据，页面会自动更新</p><p>传统页面应用：也叫多页面应用，当客户端发起页面请求后，后端收到请求，然后取出数据库中的数据，组装好 <code>HTML</code>，然后返回 <code>HTML</code>、 <code>css</code>和 <code>JavaScript</code>。有了 <code>Ajax</code> 后，我们在当前页面可以重新获取数据，并更新页面内容。但当我们切换页面，也就是有页面跳转时，整个过程会从头再来一次</p><p><code>SPA</code>：单页面应用，切换页面不用整个页面刷新，所有的资源只在第一次页面请求时被加载，后面都只会发起 <code>Ajax</code>请求获取数据而已</p><p><code>路由</code>：<code>SPA</code>应用的核心，切换<code>url</code>，客户端的<code>JavaScript</code>拦截页面的跳转请求，匹配对应的页面组件，动态获取新的数据，然后在无需重新加载的情况下更新当前页面</p><p><code>状态管理</code>：集中式管理应用的状态，借鉴<code>Flux</code>架构，使状态的改变可追溯</p><p><code>PWA</code>：翻译叫渐进式web app，它不是特指某一项技术，而是应用了多项技术的<code>web app</code>，是个可安装的应用程序，其核心技术包括 <code>App Manifest</code>、<code>Service Worker</code>、<code>Web Push</code>等，集合了<code>web app</code>和<code>native app</code>的优点，使网页加载更快，并且支持离线，本质是在传统web规范基础上加持新的web强化能力（有本地权限），最终还是web网页，依然由浏览器的<code>webview</code>渲染（因此是跨平台的）</p><p><code>SSR</code>：服务端渲染，解决了<code>CSR</code>（客户端渲染）应用首屏渲染时间长，<code>SEO</code>差的问题，本质是启动<code>node</code>服务器，当浏览器向<code>node</code>服务器获取<code>html</code>时，由<code>node</code>服务器去向后端服务器获取数据，然后进行拼接完返回给浏览器 <code>SSR</code>相对是<code>CSR</code>而不是<code>SPA</code>，<code>SPA</code>是相对传统多页应用的，<code>SSR</code>应用也可以是<code>SPA</code>应用，普通<code>CSR</code>其实打包成的也是静态资源（例如<code>dist</code>文件夹，包含<code>js</code>、<code>css</code>、<code>html</code>）</p><p><code>Next.js</code>：封装了<code>React</code>的上层框架（说白了就是一个模板框架，为了更快构建<code>React</code>、<code>Vue</code>应用），集合了一系列工具链及配置，降低了开发成本，支持<code>ssr</code>、<code>ssg</code>等功能，高级脚手架，不要把它看成是<code>ssr</code>框架，<code>ssr</code>只是人家提供的一个功能，你照样可以写成一个<code>csr</code>应用，它只是为了更快更方便开发<code>React</code>应用，类似还有<code>Gastby.js</code>、<code>Nuxt.js</code></p><p><code>Rendora </code>：为了解决<code>SPA</code>项目的<code>SEO</code>处理，请求经过 <code>Rendora </code>的时候它会根据请求头 <code>user-agent</code> 来判断请求是属于爬虫还是普通用户，普通用户直接代理到原有的<code>Web</code>服务器，而爬虫的请求会经过无头浏览器(head-less browser) 处理生成一张页面返回给爬虫，而这个页面的内容可以理解为是运行时的 DOM 快照</p><p>快应用：快应用的出现主要是为了对标微信小程序（因为小程序绑定了微信生态），用户同样不用下载，可以理解成是手机系统层面的小程序</p><p>额外关键词：MVVM架构</p><h2 id="工程化" tabindex="-1">工程化 <a class="header-anchor" href="#工程化" aria-hidden="true">#</a></h2><p><a href="https://github.com/fouber/blog" target="_blank" rel="noreferrer">工程化知识</a></p><p>传统的前端开发模式存在一系列问题，于是涌现了许多工具来解决，前端逐渐进入工程化</p><p>脚手架：<code>Vue CLI</code>、<code>create-react-app</code></p><p>依赖管理：<code>npm</code>、<code>yarn</code>、<code>pnpm</code></p><p><code>sass</code>、<code>less</code>等预处理器增强了<code>css</code>的能力</p><p><code>css</code>、<code>JavaScript</code>代码的浏览器兼容问题：旧浏览器不识别高版本的<code>JavaScript</code>或<code>css</code>特定前缀问题，相关工具：<code>postcss</code>、<code>babel</code></p><p>注：<code>postcss</code>并不是一个加<code>css</code>前缀的工具，它是一个利用<code>js</code>（以插件形式）来转换<code>css</code>代码的工具，它提供了一个庞大的插件系统来执行不同的功能，如<code>css</code>代码检查，压缩，插入前缀。因此加<code>css</code>前缀只是一个<code>postcss</code>插件做的事情</p><p><code>tree-shaking</code>：打包时对使用不到的代码进行删除</p><p><code>TypeScript</code>：补充<code>JavaScript</code>动态类型的特点，减少运行时错误</p><p>代码检查和代码格式化，相关工具：<code>ESLint</code>，<code>Prettier</code></p><p><code>webpack</code>：静态模块打包器，引入了一切皆模块的思想，从entry入口文件为起点，分析整个项目各个文件的依赖关系，构建一个模块依赖图，然后将模块依赖图分离成多个bundle，在构建模块依赖图的过程中，遇到非目标格式的文件会用<code>loader</code>工具来转换浏览器支持的文件格式（如<code>.scss</code>转<code>.css</code>、<code>.ts</code>、<code>.vue</code>转<code>.js</code>），<code>plugin</code>机制调用其它工具对代码做资源压缩、代码分割等操作，核心是<code>dist = webpack(src, option)</code></p><p><code>vite</code>：解决了<code>webpack</code>开发环境打包时间长的弊端，通过不打包，按需编译来提升开发体验，而且降低了配置复杂度，生产环境打包时通过<code>rollup</code></p><p>热更新：开发环境下修改文件保存重新编译，页面能自动更新已修改的文件</p><p><code>bundleless</code>：无打包构建，过去打包主要是因为<code>http/1.1</code>，各浏览器有并行连接限制；浏览器不支持模块系统（如CommonJS包不能直接在浏览器运行）；代码依赖关系与顺序管理。随着标准的确立，浏览器大厂和前端生态的跟进，使得不打包成为可能，主要原因有：<code>http/2.0</code>多路复用，各大浏览器逐渐支持ESM，越来越多<code>npm</code>包支持ESM</p><p>构建：也称打包，前端的构建其实只是狭义上的工程化，广义上的工程化还包括部署，运维，监控，日志等等一系列相关基建</p><p>构建名词：tree-shaking、压缩混淆、编译、打包、代码分割、文件合并、兼容低版本浏览器的js</p><p>增量原则：只加载当前页面资源，没访问的不加载，访问过的可以缓存</p><p>额外关键词：Turbopack、Rome</p><h2 id="跨端" tabindex="-1">跨端 <a class="header-anchor" href="#跨端" aria-hidden="true">#</a></h2><p>跨端：都是实现一个容器，给容器提供统一的<code>api</code>，这套<code>api</code>由不同平台各自去实现，保证功能一致，这样同一份代码能跑在不同平台的相同容器内，缺点：多了一层容器，性能比直接调用系统<code>api</code>会有所下降，当某项能力容器没有提供的时候，需要借助<code>bridge</code>进行扩展，例如<code>js</code>引擎的<code>JSbridge</code>，<code>jvm</code>的<code>jni</code>，至于编译成原生组件或内置浏览器或<code>WebView</code>去承载就由框架自己决定</p><p><code>WebView</code>：承载网页的容器，它有<code>webkit</code>渲染引擎，主要用于移动端（小程序、手机app）展示<code>html</code>页面用，相当于一个内置的浏览器（只是少了地址栏，书签栏这些<code>UI</code>控件），它是移动端操作系统自带的一个控件，供应用程序调用来渲染<code>html</code></p><p><code>Hybrid</code>开发：基于<code>WebView</code>开发（相当于有渲染引擎），再加上一个<code>js</code>引擎，再加上一个<code>bridge</code>可以扩展原生能力，性能会差点，例如小程序、<code>Hybrid App</code></p><p><code>React Native</code>：将<code>React</code>框架移植到了手机端，用来开发手机App，与<code>Hybrid</code>开发区别开来，<code>RN</code>是通过<code>js</code>引擎转化成原生组件的，不需要<code>WebView</code>承载</p><p><code>Electron</code>：<code>chromium</code>（相当于有渲染引擎）+ <code>Node.js</code> + 原生系统<code>api</code>，构建出兼容<code>Mac</code>、<code>Window</code>、<code>Linux</code>三个平台的应用</p><p><code>Tauri</code>：<code>Tauri</code>是Rust编写的跨端构建方案，优点是基于Web技术可以打出比<code>Electron</code>更小的包。体积小10倍以上，由Core（Tauri Runtime和周边）+ TAO（创建跨平台应用窗口的库，支持所有主要平台，除了PC，还有iOS和Android，野心还是很大的） + WRY（基于Tao构建的跨平台Webview渲染库），与<code>Electron</code>主要区别是它的tao和wry使用各个操作系统的内置Webview，而不是像Electron内置Chromium。所以在安装包大小上，具有绝对优势。但使用系统内置的Webview，Webview兼容性是个大问题（之前H5项目遇到Android 9手机上白屏，排查半天是系统内置Webview版本过低，只有68，升级后才解决），会不会出现ie6类的兼容问题不好说。而Electron是所有平台展示都一样，<code>Electorn</code>是拿体积换体验（<code>Electron</code>的跨平台类似浏览器跨平台）</p><p><code>Flutter</code>：使用<code>Dart</code>语言，一套代码在多个平台（IOS、Android、PC端）运行，通过跨平台的<code>Skia</code>图形库实现的渲染引擎，直接在底层进行<code>UI</code>渲染，绘制自己的<code>UI</code>组件，保证跨端的一致性，而且性能接近原生</p><h2 id="大前端" tabindex="-1">大前端 <a class="header-anchor" href="#大前端" aria-hidden="true">#</a></h2><p><code>BFF</code>：网上说得花里胡哨的，其实就是一堆胶水代码，维护性也要考虑。一般做接口聚合，参数校验，鉴权，数据转化等功能，对使用微服务架构的后端好处更多一些，适用场景：后端有稳定的领域服务，需要一个聚合层；有完整的基建：日志，链路，服务器监控，性能监控等</p><p>微前端：项目随着业务的迭代发展可能会变成一个巨石应用，微前端借鉴了微服务的理念，将一个庞大的应用拆分成多个独立的子应用，子应用不需要统一技术栈，每个应用可独立开发、运行、部署。另外也可重构老项目使用，改路由指向新项目页面，新项目的页面渐进式替换旧项目的页面，直至所有页面都重构完成，老项目下线，好处是重构新项目的同时，不用去维护旧项目中和重构页面相同的部分</p><p><code>serverless</code>：区别于传统的云服务器，传统云服务器是购买后24小时无论用不用，都得硬性付费，这样其实是很不划算的，而<code>serverless</code>采用的方案，其实购买的是计算能力，我们根据实际消耗的计算能力来付钱，没有访问就不付钱，访问少了就少付钱, 访问多了就多付钱，比如凌晨我们没有用户访问，此时是不收费的，同时因为我们购买的是技能能力，所以不存在down机的情况，不需要管服务器，突发性的高访问的时候，也不怎么用怕，因为计算能力是可以很轻松的扩展的，传统服务器这些都做不到，另外因为计算能力可扩展，那么只要数据库跟得上，同时在线用户数再多服务器也不会崩溃，传统云服务器，在用户多的时候一旦技术跟不上基本就崩了</p><p>低代码：狭义范围的低代码指通过拖拽组件生成应用的技术，广义上一切可减少代码，提升开发效率的都可称为低代码</p><p><code>WebAssembly</code>：简称<code>wasm</code>，定义了一种新的字节码标准格式，由浏览器提供运行时来运行，目的是把多种语言编译成可以在浏览器直接运行的二进制格式，浏览器只需要实现一个虚拟机（类似<code>Java</code>的<code>jvm</code>，可以跨平台）执行，相比<code>jvm</code>只是<code>Java</code>一家用的，<code>WebAssembly</code>是一套二进制标准给所有语言用</p><p>字节码：和汇编语言一样属于是高级语言和机器码之间的一种中间语言（高级语言 =&gt; 字节码、汇编代码）=&gt; 机器码，它是一种二级制格式，各平台（Mac、Window、Linux等）实现虚拟机执行它，以此实现跨平台，像<code>jvm</code>执行<code>Java</code>字节码文件，现在的V8引擎架构执行<code>js</code>代码也是编译成<code>AOT</code>后再编译成字节码，然后根据不同CPU架构编译成对应机器码</p><p>汇编语言：特定单个机器体系，不同平台编译出来的汇编语言可能不同，和机器码一样都是不能跨平台的</p><p>高级编程语言编译成字节码放到<code>WebAssembly</code>虚拟机中才能运行，浏览器厂商需要做的就是根据<code>WebAssembly</code>规范实现虚拟机</p><p><code>restful api</code>和<code>GraphQL</code>：</p><h2 id="后端" tabindex="-1">后端 <a class="header-anchor" href="#后端" aria-hidden="true">#</a></h2><p>后端：提供服务，例如返回需要的数据、鉴权、更新数据等</p><p>访问顺序：以<code>Spring Boot</code>为例，程序收到请求url为<code>xxx/index</code>或<code>xxx/xxx.jpg</code>等静态资源时先看看有没有controller(业务controller)能处理，不能处理再交给静态资源处理器(内置的controller)处理，发现应该返回<code>index.html</code>，如果是请求数据之类的则会被之前的业务controller处理返回相应信息 请求url =&gt; 业务controller =&gt; 静态资源controller =&gt; 还是找不到则返回404</p><p><code>controller</code>：以<code>Spring Boot</code>为例，对不同格式的<code>url</code>的有不同注解可获取相关参数</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxx.com/{id}</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">用@</span><span style="color:#82AAFF;">PathVariable</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">id</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)来获取id参数</span></span>
<span class="line"><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">xxx.com?a=xx&amp;b=xx</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">用@RequestParam获取请求参数</span></span>
<span class="line"><span style="color:#A6ACCD;">post请求用@RequestBody获取请求体</span></span>
<span class="line"></span></code></pre></div><p>微服务：将一个后端应用程序拆分成多个在不同进程或多个服务器运行，需要时也能彼此通信(一般是HTTP)</p><p>运行服务器：如今的前端代码打包后起node服务器来跑，后端代码打包后也是起服务器，然后运行</p><h2 id="网络" tabindex="-1">网络 <a class="header-anchor" href="#网络" aria-hidden="true">#</a></h2><p><code>WebSocket</code>：双向通信，解决了服务器不能主动向浏览器发送消息的问题</p><p>代理：客户端 =&gt; 代理服务器（转发请求）=&gt; 服务器（处理业务）</p><p>正向代理：服务器不知道哪个客户端发出的请求</p><p>反向代理：客户端只管发请求给代理服务器，不知道最终业务是哪个服务器处理的</p><p><code>Nginx</code>：分配个端口运行Nginx程序，它有反向代理、负载均衡的作用，应对高并发好，把请求分配到工作量少的服务器去，这就是负载均衡</p><p><code>rpc</code>：远程调用函数，让我们好像只执行了一个函数调用就立刻得到了结果，中间网络数据传输，代理等步骤全由<code>rpc</code>框架帮我们做了</p><p>网络安全：通信私密性、可认证性、报文完整性</p><h2 id="运维" tabindex="-1">运维 <a class="header-anchor" href="#运维" aria-hidden="true">#</a></h2><p><code>CDN</code>：在靠近用户的地方，建一个缓存服务器，把远端的内容复制一份放着，采用更多的缓存服务器（也称为CDN边缘节点），布放在用户访问相对集中的地区或网络中。当用户访问网站时，利用全局负载技术，将用户的访问指向距离最近的缓存服务器上，由缓存服务器响应用户请求</p><p>无<code>CICD</code>前部署项目：一般是<code>spa</code>应用，本质是静态资源（后端渲染<code>ssr</code>例外），执行<code>build</code>命令打包，再压缩打包之后的文件，<code>ssh</code>连接服务器传输过去，解压，最后配置<code>Nginx</code>访问该项目的资源</p><p><code>CI/CD</code>：<code>CI/CD</code>和<code>git</code>集成在一起，可理解为服务器端的<code>git hooks</code>，当代码push到远程仓库时，代码会自动构建、部署</p><p>虚拟机：本质上是一个应用程序，可以模拟出一台虚拟的计算机，像安卓模拟器一样也是个应用程序</p><p><code>docker</code>：<code>docker</code>的实现基于Linux容器，而Linux容器只是一个特殊的进程，<code>docker</code>对这个特殊进出进行封装隔离，属于操作系统层面的虚拟化技术（虚拟机是软件层面的），隔离的进程独立于宿主和其它隔离的进程，因此也称其为容器，<code>docker</code>抹平了不同机器，不同系统的差异</p><p><code>docker</code>和虚拟机的区别：虚拟机是虚拟出一套硬件后，在其上运行一个完整的操作系统，在该系统上再运行所需应用进程；而容器的应用进程直接运行于宿主的内核，容器内没有自己的内核，也没有进行硬件虚拟，因此比传统虚拟机更轻便</p><p><code>k8s</code>：一个对容器进行编排工作的工具，干的活类似”操作系统“</p><h2 id="计算机基础" tabindex="-1">计算机基础 <a class="header-anchor" href="#计算机基础" aria-hidden="true">#</a></h2><p><a href="https://windliang.wang/2019/11/06/%E5%88%B0%E5%BA%95%E5%AD%A6%E5%93%AA%E4%B8%80%E9%97%A8%E7%BC%96%E7%A8%8B%E8%AF%AD%E8%A8%80/" target="_blank" rel="noreferrer">编程语言本质</a></p><p>服务器：一台电脑，运行了后端服务程序供客户端访问，其实就是一台电脑与另一台电脑的通信，所谓的后端程序只是接收到请求信息后操作系统文件(例如查询数据库)然后返回给发送方</p><p>应用程序运行时操作系统会分配端口，访问后端（<code>url</code>请求）其实就是访问服务器的后端程序的某个端口，服务器的操作系统收到请求后，发现端口是给后端程序的，于是请求就交给后端程序处理，然后返回，本质是两台电脑的通信</p><p>数据库：数据库其实也是一个应用程序，也是系统编程语言写的(例如MySQL是c++写的)，拥有操作文件的能力，也只是操作和管理数据的应用程序，只是比起直接操作文件系统更好，所以才会用，常用的有<code>mysql</code>、<code>redis</code></p><p>服务器连接数据库需要端口(例如3306端口)：数据库其实也是一个应用程序，所以操作系统要分配个端口给它，返回数据或信息给服务端程序(后端程序)，后端程序再返回给客户端，例如初学时要访问本地数据库是访问端口3306，这时后端程序和数据库的通信本质是同一电脑不同进程的通信</p><p>为什么用了<code>mysql</code>还要<code>redis</code>：<code>redis</code>将数据缓存在内存中，比<code>mysql</code>直接去硬盘读取快，并且应对高并发好</p><p>CPU架构：现在主流PC端架构基本都是x86，手机端都是ARM架构，特殊点的像苹果的M系列芯片是基于ARM架构用在PC端</p><p>语言跨平台：指写的代码可以不经改动直接应用在另一个操作系统或CPU上，<code>Java</code>跨平台是因为它和C相比，编译出来的二进制文件可以在其它任何安装了<code>Java</code>运行环境（<code>Jvm</code>）的平台上运行，而C编译出来的东西一般只能在一类操作系统上运行，但是C编译出来的东西运行时不需要额外安装任何运行环境，而且可以为指定的CPU、操作系统单独编译一份（只要切换编译器即可，所以有时下载安装包时需要选择32位还是64位的），另外C#、python、php、js都可以一份代码在多种平台上直接运行，不过都需要相应的运行环境（如<code>Node.js</code>是<code>js</code>的运行环境），这样看来，几乎所有语言都是跨平台的</p><h2 id="补充知识点1" tabindex="-1">补充知识点1 <a class="header-anchor" href="#补充知识点1" aria-hidden="true">#</a></h2><p><code>webpack</code>依赖<code>Node.js</code>是怎么个依赖法：<code>webpack</code>是用<code>js</code>编写的工具，想在机器上跑<code>js</code>脚本，就需要有一个解释执行<code>js</code>的环境，<code>Node.js</code>出现之前只能在浏览器环境下解释执行<code>js</code>，而<code>Node.js</code>基于v8引擎进行了一系列封装，使得我们可以在非浏览器环境下解释执行<code>js</code><code>Node.js</code>支持本地文件读写，<code>webpack</code>基于此提供了编译前端代码的功能 <code>Node.js</code>可以搭建网络服务，<code>webpack</code>基于此提供了开发环境的搭建，使得我们可以轻松地在本地构建服务继而调试我们的前端项目代码 说<code>webpack</code>依赖<code>Node.js</code>不太准确，应该说<code>webpack</code>是用<code>Node.js</code>这个应用程序去执行的，因为<code>js</code>不是机器语言，解释执行<code>js</code>必须要一个特定的环境，而<code>Node.js</code>提供了这个环境</p><p>开发环境下的流程是什么样的：启动后会在本地起一个本地服务器（<code>webpack</code>或脚手架的开发服务器、<code>Nginx</code>或用<code>Node.js</code>起一个<code>http</code>服务器），监听某个端口，打开开发环境<code>url</code>，本地服务器返回资源，发起请求时本地服务器起代理作用将请求转发到目标服务器上</p><h2 id="补充知识点2" tabindex="-1">补充知识点2 <a class="header-anchor" href="#补充知识点2" aria-hidden="true">#</a></h2><p>1、从输入URL到展示页面的全过程</p><p>2、前端的发展史</p><p>3、碰到一个新的工具，要以这样的思维去看待：出现背景是什么，解决了什么问题</p><p>4、项目应该是适合什么工具用什么，而不是流行什么用什么</p>`,114),s=[a];function r(t,l,i,n,h,u){return c(),o("div",null,s)}const m=e(p,[["render",r]]);export{j as __pageData,m as default};
