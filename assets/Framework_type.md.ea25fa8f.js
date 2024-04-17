import{_ as s,c as a,o as n,a as e}from"./app.f98d1513.js";const l="/assets/image-20210517234155.238a8702.jpg",o="/assets/image-20210517234242.0a381d9e.jpg",u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"服务端渲染","slug":"服务端渲染","link":"#服务端渲染","children":[]},{"level":2,"title":"Nuxt项目中遇到的坑","slug":"nuxt项目中遇到的坑","link":"#nuxt项目中遇到的坑","children":[{"level":3,"title":"其它记录","slug":"其它记录","link":"#其它记录","children":[]}]}],"relativePath":"Framework/type.md"}'),p={name:"Framework/type.md"},c=e('<h2 id="服务端渲染" tabindex="-1">服务端渲染 <a class="header-anchor" href="#服务端渲染" aria-hidden="true">#</a></h2><p><code>SPA</code>返回的是空<code>HTML</code>，所有<code>js</code>代码被打包成一个或多个文件，需要在一开始就加载所有的资源，因此会有几个缺点</p><ol><li>请求网页后白屏时间比传统网页长</li><li>爬虫爬到的是空白页面，没办法做<code>SEO</code></li><li>业务复杂度高的情况下，请求文件大，渲染非常慢</li></ol><p>区别</p><p><img src="'+l+'" alt="图片加载失败"><img src="'+o+`" alt="图片加载失败"></p><p>评价：同构渲染有它自己适用的场景，也有相应的缺点(工程上太麻烦了，性价比不高)，涉及到前端开发和维护成本，运维系统架构的规划，带来的首屏渲染速度和SEO提升可能并不明显</p><h2 id="nuxt项目中遇到的坑" tabindex="-1">Nuxt项目中遇到的坑 <a class="header-anchor" href="#nuxt项目中遇到的坑" aria-hidden="true">#</a></h2><p>1、组件命名，components下组件名不能相同，导致所有不同页面的相同组件都要加一堆前缀或后缀</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">├── components</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── InventoryManagement</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   ├── tableColumns</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js</span></span>
<span class="line"><span style="color:#A6ACCD;">│   ├── BlacklistManagement</span></span>
<span class="line"><span style="color:#A6ACCD;">│   │   └── tableColumns</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">js </span><span style="color:#676E95;font-style:italic;">// 报两个文件名冲突</span></span>
<span class="line"></span></code></pre></div><p>解决办法：取消自动引入组件（不确定是否有效）</p><p>2、所有发后端请求的都要用<code>try...catch</code>包着，不然会切换页面太频繁了会进500页 进页面就发后端请求的要用<code>this.$nextTick</code>包着，不然也会进500页（也有<code>$refs.xxx</code>为<code>undefined</code>等可能）</p><p>3、<code>keep-alive</code>不生效，所有组件都要注册<code>name</code>，<code>index.vue</code>的<code>export default class xxx</code>名要和文件夹名相同，更要和<code>components</code>相对应的文件夹名相同</p><p>4、<code>Cannot convert undefined or null to object</code></p><p>搜索查到是因为<code>Object.keys(xxx)</code>，里面的参数为<code>null</code>或<code>undefined</code></p><p>实际解决办法：删除掉<code>.nuxt</code>文件夹重新启动</p><h3 id="其它记录" tabindex="-1">其它记录 <a class="header-anchor" href="#其它记录" aria-hidden="true">#</a></h3><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#FFCB6B;">searchForm</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> SearchForm[] </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> []</span></span>
<span class="line"><span style="color:#A6ACCD;">searachForm </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> [] </span><span style="color:#89DDFF;font-style:italic;">as</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">SearchForm</span><span style="color:#A6ACCD;">[] </span><span style="color:#676E95;font-style:italic;">// 两种写法没区别</span></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Ref</span><span style="color:#A6ACCD;">() tableDom</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">: BaseTable</span></span>
<span class="line"><span style="color:#A6ACCD;">$refs</span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">: </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">tableDom</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> BaseTable </span><span style="color:#676E95;font-style:italic;">// 值是.vue文件名或者class名</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 两者没区别，$refs多了个提示功能</span></span>
<span class="line"></span></code></pre></div><p>① 编译node-sass出错，不识别/deep/等语法</p><p>原因：sass-loader版本太高</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">node</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">sass</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">^</span><span style="color:#F78C6C;">5.0</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">0</span></span>
<span class="line"><span style="color:#A6ACCD;">sass</span><span style="color:#89DDFF;">-</span><span style="color:#FFCB6B;">loader</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">^</span><span style="color:#F78C6C;">10.0</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">切换成低版本： npm i sass</span><span style="color:#89DDFF;">-</span><span style="color:#A6ACCD;">loader@</span><span style="color:#F78C6C;">7.0</span><span style="color:#89DDFF;">.</span><span style="color:#F78C6C;">3</span></span>
<span class="line"></span></code></pre></div><p>② node-sass问题</p><div class="language-text"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm rebuild node-sass</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,22),t=[c];function r(i,d,y,C,D,F){return n(),a("div",null,t)}const h=s(p,[["render",r]]);export{u as __pageData,h as default};