import{_ as e,c as s,o as a,a as p}from"./app.35542a83.js";const F=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Webpack","slug":"webpack","link":"#webpack","children":[]},{"level":2,"title":"Webpack和Vite开发环境对比","slug":"webpack和vite开发环境对比","link":"#webpack和vite开发环境对比","children":[]},{"level":2,"title":"优化","slug":"优化","link":"#优化","children":[{"level":3,"title":"网络层面","slug":"网络层面","link":"#网络层面","children":[]},{"level":3,"title":"项目方面","slug":"项目方面","link":"#项目方面","children":[]},{"level":3,"title":"代码层面","slug":"代码层面","link":"#代码层面","children":[]}]},{"level":2,"title":"调试","slug":"调试","link":"#调试","children":[]},{"level":2,"title":"构建","slug":"构建","link":"#构建","children":[]},{"level":2,"title":"缓存","slug":"缓存","link":"#缓存","children":[]},{"level":2,"title":"工程化和工具链","slug":"工程化和工具链","link":"#工程化和工具链","children":[]}],"relativePath":"Topic/build.md"}'),n={name:"Topic/build.md"},o=p(`<p><a href="https://web.dev/fast/" target="_blank" rel="noreferrer">学习</a></p><p><a href="https://antfu.me/posts/why-not-prettier-zh" target="_blank" rel="noreferrer">为什么不用prettier</a></p><p>随着前端的发展，各种提升开发效率的工具层出不穷，而浏览器只识别<code>html</code>、<code>css</code>和<code>js</code>，构建需要做的事情有以下这些</p><p>代码转换：将<code>TypeScript</code>编译成<code>JavaScript</code>、将<code>scss</code>编译成<code>css</code>等</p><p>文件优化：压缩<code>JavaScript</code>、<code>css</code>、<code>html</code>代码，压缩合并图片等</p><p>代码分割：提取公共代码，提取不需要立即执行的代码让其懒加载或异步加载</p><p>热更新：监听本地源代码的变化，自动重新构建、刷新浏览器</p><p><code>tree shaking</code>：去除没用到的代码</p><h2 id="webpack" tabindex="-1">Webpack <a class="header-anchor" href="#webpack" aria-hidden="true">#</a></h2><p>打包流程</p><p>1、读取配置</p><p>2、启动<code>webpack</code>，创建<code>Compiler</code>对象并开始解析项目</p><p>3、从入口文件（<code>entry</code>）开始，找到其导入的依赖模块，递归遍历分析，生成依赖关系树</p><p>4、对不同文件类型的文件使用对应的<code>loader</code>编译，最终转为<code>JavaScript</code>文件</p><p>5、编译过程中会通过发布订阅模式，向外抛出一些<code>hooks</code>，<code>webpack</code>的<code>plugin</code>可通过监听事件节点执行插件功能</p><h2 id="webpack和vite开发环境对比" tabindex="-1">Webpack和Vite开发环境对比 <a class="header-anchor" href="#webpack和vite开发环境对比" aria-hidden="true">#</a></h2><p>Webpack：分析依赖 =&gt; 编译打包 =&gt; 交给本地服务进行渲染。首先分析各个模块之间的依赖，然后进行打包，在启动webpack-dev-server，浏览器请求开发服务器时，直接显示打包结果。Webpack打包之后存在的问题：随着项目体积的增大，会造成bundle体积增加，影响冷启动和热更新的速度</p><p>Vite：启动开发服务器 =&gt; 浏览器请求模块时按需动态编译显示。是先开启开发服务器，请求某个模块时再对该模块进行实时编译构建，现代浏览器本身支持ESM，会自动向依赖的Module发出请求，所以Vite就将开发环境下的模块文件作为浏览器的执行文件，而不是像Webpack进行打包后交给本地服务器</p><p>Vite启动时不需要打包，不需要分析模块间的依赖关系，不用进行编译，但是是先启动开发服务器，等浏览器请求模块时，再对模块进行编译构建（不压缩），因此首屏加载时请求模块多的时候渲染速度会比较慢</p><p>Vite的依赖预构建：1、兼容其他规范（cjs转esm） 2、修改导入路径 3、将有依赖关系的esm模块合并成一个模块，减少请求数量</p><p>热更新方面：改动模块后，Vite只需要让浏览器重新请求该模块，Webpack则需要重新编译打包一次，但是Webpack的热更新会以当前修改的文件为入口重新打包，所有涉及到的依赖也都会被重新加载一次，因此速度也比不上Vite</p><h2 id="优化" tabindex="-1">优化 <a class="header-anchor" href="#优化" aria-hidden="true">#</a></h2><p>有一些核心思想是各个层面通用的：按需加载、缓存</p><h3 id="网络层面" tabindex="-1">网络层面 <a class="header-anchor" href="#网络层面" aria-hidden="true">#</a></h3><p>升级http2</p><p>开启g-zip压缩减少传输时间</p><p>iconfont代替图片图标：将图标制作成一个字体，使用时就跟字体一样，可以设置属性，例如 font-size、color 等，非常方便，并且字体图标是矢量图，不会失真。还有一个优点是生成的文件特别小，无论是加载还是打包所消耗的资源都相对较小一些</p><p>图片优化：包括图片懒加载、适当降低图片质量、尽量用css代替图片、使用webp图片（存在兼容性问题）</p><p>减少无用的请求头数据（这个有点鸡肋）</p><p>以往http1.1时代的域名拆分、文件合并、开启keep-alive这些优化手段在http2可以丢弃掉</p><h3 id="项目方面" tabindex="-1">项目方面 <a class="header-anchor" href="#项目方面" aria-hidden="true">#</a></h3><p>减小构建产物大小</p><p>减少编译打包时间</p><p>代码预加载和按需加载</p><p>图片使用CDN</p><p>压缩<code>js</code>和<code>css</code>文件</p><h3 id="代码层面" tabindex="-1">代码层面 <a class="header-anchor" href="#代码层面" aria-hidden="true">#</a></h3><p>第三方库按需引入</p><p>css嵌套最好不要超过3层，过度嵌套会导致css文件变大，影响渲染速度</p><p>事件的防抖节流</p><p>去除console.log，console.log引用的数据不会被垃圾回收，传进去的对象太大容易造成内存泄漏</p><p><code>package.json</code>：① 区分<code>devDependencies</code>和<code>dependencies</code>，开发环境的依赖不打包进生产环境的构建包② 去除项目中没用到的包 ③ <code>browserslist</code>：如果是内部人员使用，可以不用兼容过旧的版本(查询目标浏览器：<a href="https://browsersl.ist" target="_blank" rel="noreferrer">https://browsersl.ist</a>)</p><h2 id="调试" tabindex="-1">调试 <a class="header-anchor" href="#调试" aria-hidden="true">#</a></h2><p>查看返回的<code>json</code>数据大小</p><h2 id="构建" tabindex="-1">构建 <a class="header-anchor" href="#构建" aria-hidden="true">#</a></h2><p>合理配置<code>hash</code>，改过的文件需要更新<code>hash</code>值，这样才能保证上线后，浏览器访问没有改变的文件时能命中缓存，而改过的文件会重新请求</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// webpack.base.js</span></span>
<span class="line"><span style="color:#A6ACCD;">modules</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">export </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">...</span></span>
<span class="line"><span style="color:#A6ACCD;">    output: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">path</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> path</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">resolve</span><span style="color:#A6ACCD;">(__dirname</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">../dist</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">        </span><span style="color:#676E95;font-style:italic;">// 给js文件加上contenthash</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">filename</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">js/chunk-[contenthash].js</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">        </span><span style="color:#F07178;">clean</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><h2 id="缓存" tabindex="-1">缓存 <a class="header-anchor" href="#缓存" aria-hidden="true">#</a></h2><p>缓存：文件名加入hash，有效时间内用强缓存，缓存失效用协商缓存</p><h2 id="工程化和工具链" tabindex="-1">工程化和工具链 <a class="header-anchor" href="#工程化和工具链" aria-hidden="true">#</a></h2><p>狭义上的工程化和工具链是指开发时有关的工具库集合，广义点的工程化和工具链概念是包含前端开发一整套流程的，从搭建开发环境，启动，开发，提交，部署，错误监控等等，流程每个节点都会存在一些问题，继而会有方案去解决，如此形成了工具链</p><p>例如写代码时，为了提示错误、规范统一等，需要用到<code>eslint</code>，提交代码时，为了<code>remote repository</code>上的代码格式统一，需要用到<code>eslint</code>校验代码和<code>prettier</code>格式化代码，而为了做到这点需要在<code>git hooks</code>上动手脚，用到<code>husky</code></p>`,52),l=[o];function c(t,r,d,i,h,D){return a(),s("div",null,l)}const b=e(n,[["render",c]]);export{F as __pageData,b as default};