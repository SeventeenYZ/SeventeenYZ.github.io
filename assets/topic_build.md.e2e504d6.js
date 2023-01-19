import{_ as e,c,o,a as d}from"./app.493724d9.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"Webpack","slug":"webpack","link":"#webpack","children":[]}],"relativePath":"topic/build.md"}'),p={name:"topic/build.md"},t=d('<p><a href="https://antfu.me/posts/why-not-prettier-zh" target="_blank" rel="noreferrer">为什么不用prettier</a></p><p>随着前端的发展，各种提升开发效率的工具层出不穷，而浏览器只识别<code>html</code>、<code>css</code>和<code>js</code>，构建需要做的事情有以下这些</p><p>代码转换：将<code>TypeScript</code>编译成<code>JavaScript</code>、将<code>scss</code>编译成<code>css</code>等</p><p>文件优化：压缩<code>JavaScript</code>、<code>css</code>、<code>html</code>代码，压缩合并图片等</p><p>代码分割：提取公共代码，提取不需要立即执行的代码让其懒加载或异步加载</p><p>热更新：监听本地源代码的变化，自动重新构建、刷新浏览器</p><p><code>tree shaking</code>：去除没用到的代码</p><h2 id="webpack" tabindex="-1">Webpack <a class="header-anchor" href="#webpack" aria-hidden="true">#</a></h2><p>打包流程</p><p>1、读取配置</p><p>2、启动<code>webpack</code>，创建<code>Compiler</code>对象并开始解析项目</p><p>3、从入口文件（<code>entry</code>）开始，找到其导入的依赖模块，递归遍历分析，生成依赖关系树</p><p>4、对不同文件类型的文件使用对应的<code>loader</code>编译，最终转为<code>JavaScript</code>文件</p><p>5、编译过程中会通过发布订阅模式，向外抛出一些<code>hooks</code>，<code>webpack</code>的<code>plugin</code>可通过监听事件节点执行插件功能</p>',14),a=[t];function r(s,i,n,_,l,h){return o(),c("div",null,a)}const m=e(p,[["render",r]]);export{b as __pageData,m as default};