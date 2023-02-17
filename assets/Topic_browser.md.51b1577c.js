import{_ as o,c as d,o as c,a as e,b as a}from"./app.21825fd9.js";const i="/assets/request.88b02662.png",r="/assets/negotiate-caching-success.d2e35271.png",t="/assets/negotiate-caching-fail.6035dc62.png",f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"浏览器渲染机制","slug":"浏览器渲染机制","link":"#浏览器渲染机制","children":[{"level":3,"title":"渲染流程","slug":"渲染流程","link":"#渲染流程","children":[]},{"level":3,"title":"布局和回流","slug":"布局和回流","link":"#布局和回流","children":[]}]},{"level":2,"title":"浏览器缓存","slug":"浏览器缓存","link":"#浏览器缓存","children":[{"level":3,"title":"强制缓存的缓存规则","slug":"强制缓存的缓存规则","link":"#强制缓存的缓存规则","children":[]},{"level":3,"title":"协商缓存","slug":"协商缓存","link":"#协商缓存","children":[]}]},{"level":2,"title":"本地存储","slug":"本地存储","link":"#本地存储","children":[]},{"level":2,"title":"请求内容类型","slug":"请求内容类型","link":"#请求内容类型","children":[]},{"level":2,"title":"内核、渲染引擎、js引擎","slug":"内核、渲染引擎、js引擎","link":"#内核、渲染引擎、js引擎","children":[]},{"level":2,"title":"关于app内核的讨论","slug":"关于app内核的讨论","link":"#关于app内核的讨论","children":[]},{"level":2,"title":"app自带内核和系统WebView","slug":"app自带内核和系统webview","link":"#app自带内核和系统webview","children":[]},{"level":2,"title":"小程序内核","slug":"小程序内核","link":"#小程序内核","children":[]}],"relativePath":"Topic/browser.md"}'),p={name:"Topic/browser.md"},l=e('<h2 id="浏览器渲染机制" tabindex="-1">浏览器渲染机制 <a class="header-anchor" href="#浏览器渲染机制" aria-hidden="true">#</a></h2><p><a href="https://developer.chrome.com/blog/inside-browser-part1/" target="_blank" rel="noreferrer">chrome渲染机制</a></p><h3 id="渲染流程" tabindex="-1">渲染流程 <a class="header-anchor" href="#渲染流程" aria-hidden="true">#</a></h3><ol><li><p>解析<code>html</code>文件构造<code>DOM</code>树（也叫做<code>content</code>树）</p></li><li><p>解析<code>css</code>文件，和<code>html</code>里的<code>visual instuctions</code>（应该指的是能展示的标签，即不包括<code>script</code>等）构造<code>render树</code></p><p><code>DOM</code>构造：浏览器将接收到的<code>HTML</code>代码通过<code>HTML</code>解析器解析构建成一颗<code>DOM</code>树，同时将接收到的<code>CSS</code>代码通过<code>CSS</code>解析器构建出样式表规则（<code>CSSOM</code>），然后将这些规则分别放到对应的<code>DOM</code>树节点上，得到一颗带有样式属性的<code>DOM</code>树（<code>render树</code>）</p></li><li><p><code>layout</code>（布局）：浏览器按从上到下，从左到右的顺序读取<code>DOM</code>树的<code>node</code>，然后开始获取<code>node</code>的坐标和大小等<code>css</code>属性，把每个<code>node</code>定位到对应的坐标</p></li><li><p><code>painting</code>（绘制）：遍历<code>render</code>树，用<code>UI backend layer</code>把每个<code>node</code>绘制出来</p></li></ol><h3 id="布局和回流" tabindex="-1">布局和回流 <a class="header-anchor" href="#布局和回流" aria-hidden="true">#</a></h3><p>一个意思，<code>Webkit rendering engine</code>把将元素放置在屏幕的某个位置的操作叫做<code>layout</code>，而在<code>Gecko rendering endgine</code>中叫做<code>Reflow</code>（回流）</p><h2 id="浏览器缓存" tabindex="-1">浏览器缓存 <a class="header-anchor" href="#浏览器缓存" aria-hidden="true">#</a></h2><p><img src="'+i+'" alt="图片加载失败"></p><p>强制缓存有三种情况：</p><p>不存在缓存结果和标识，则说明强制缓存失效或不存在，直接向服务器发起请求</p><p>存在缓存结果和标识，但结果失效，携带标识发起请求（协商缓存）</p><p>存在缓存结果和标识，未失效，则直接应用缓存</p><h3 id="强制缓存的缓存规则" tabindex="-1">强制缓存的缓存规则 <a class="header-anchor" href="#强制缓存的缓存规则" aria-hidden="true">#</a></h3><p>控制强制缓存的字段是响应头中的<code>Expires</code>和<code>Cache-Control</code>，后者优先级更高</p><p><code>Expires</code>：http1.0时控制缓存的字段，原理是使用客户端时间与服务端返回的时间做对比，但是客户端和服务端时间可能有误差（例如时区不同），如果客户端时间晚于服务端则资源还未过期就重新请求，反之则资源过期了客户端还在使用，在http1.1被<code>Cache-Control</code>取代</p><p><code>Cache-Control</code>取值主要为</p><ul><li>public：所有内容都被缓存（客户端和代理服务器都可缓存）</li><li>private：所有内容只有客户端缓存，默认值</li><li>no-cache：客户端缓存内容，但是是协商缓存</li><li>no-store：所有内容都不缓存，每次都请求新的</li><li>max-age=xxx：缓存内容在xxx秒后失效</li></ul><p>强制缓存顺序是先内存（from memory cache）后硬盘（from disk cache），内存缓存读取速度快，进程关闭时清空</p><p>刷新时、无痕模式是内存缓存，退出重进、大型css、js文件是硬盘缓存，</p><h3 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-hidden="true">#</a></h3><p><img src="'+r+'" alt="图片加载失败"></p><p><img src="'+t+'" alt="图片加载失败"></p><p>协商缓存的标识有<code>Last-Modified/If-Modified-Since</code>和<code>Etag/If-None-Match</code>，后者优先级更高</p><p><code>Last-Modified</code>：响应头字段，表示返回该资源最后被修改的时间 <code>If-Modified-Since</code>：请求头字段，服务器用来与最后被修改时间对比，一致则返回304，同意缓存，不一致则重新返回资源，状态码为200</p><p><code>Etag</code>：响应头字段，服务器对该资源的唯一标识 <code>If-None-Match</code>：请求头字段，服务器用来与自己保存的<code>Etag</code>值作对比</p><h2 id="本地存储" tabindex="-1">本地存储 <a class="header-anchor" href="#本地存储" aria-hidden="true">#</a></h2><p><code>Local Storage</code>：保存的数据没有过期时间，需要手动删除，存储空间5M</p><p><code>Session Storage</code>：保存的数据在页面关闭后会被删除，存储空间5M</p><p><code>Cookies</code>：过期时间自己设置，安全性不高，容易被拦截，存储空间4k</p><p>相同点：都是保存在客户端，且同源共享</p><p>不同点：<code>Cookies</code>数据由服务端设置，参与通信；<code>Session Storage</code>和<code>Local Storage</code>由客户端设置，不参与通信</p><p><code>Cookies</code>属性： ① <code>Domain</code>：域，表示请求的<code>url</code>符合这个格式的请求时才会带上这个<code>cookie</code> ② <code>Path</code>：路径前缀，符合这个路径的请求<code>url</code>才会带上 ③ <code>Secure</code>：为true时表示使用<code>https</code>协议才发送这个<code>cookie</code> ④ <code>HttpOnly</code>：为true时表示无法通过<code>js</code>脚本读取到这个<code>cookie</code>，防止<code>XSS</code>攻击 ⑤ <code>Expires/Max-Age</code>：过期时间</p><h2 id="请求内容类型" tabindex="-1">请求内容类型 <a class="header-anchor" href="#请求内容类型" aria-hidden="true">#</a></h2><p>x-www-form-urlencoded格式：name=xxx&amp;age=xxx</p>',34),n=a("p",{"name:":"","xxx,":"","age:":"",xxx:""},"json格式:",-1),s=e('<p>formData：一般传文件用</p><p>x-www-form-urlencoded不需要contentType，json需要contentType: &#39;application/json;charset=UTF-8’，并且json可以有嵌套结构，可以支持更丰富的数据类型</p><h2 id="内核、渲染引擎、js引擎" tabindex="-1">内核、渲染引擎、js引擎 <a class="header-anchor" href="#内核、渲染引擎、js引擎" aria-hidden="true">#</a></h2><p>内核包括渲染引擎、<code>js</code>引擎和其它组件，虽然我们现在习惯单独称呼<code>js</code>引擎，但在内核架构图里，<code>js</code>引擎始终是包含在内核里的，只不过可以单独拎出来，因为它和内核之间不是集成关系，而是调用关系，所以如果魔改内核的话可以替换成其它<code>js</code>引擎</p><h2 id="关于app内核的讨论" tabindex="-1">关于app内核的讨论 <a class="header-anchor" href="#关于app内核的讨论" aria-hidden="true">#</a></h2><p>app自带内核的好处：当初微信团队是主动找到X5内核的。原因是安全和可控。安全的原因是如果微信使用系统内核，一旦爆出安卓、chromium的漏洞，将非常被动。很难甚至无法修复。而且如果不是X5统一了标准（虽然之前落后了点），你们要所有机型一个个的适配，甚至包括安卓4.4以前的<code>webview</code>。这个工作量远比适配X5高N倍</p><p>知乎有条回答：微信6.1版本以上的android用户，都是使用的QQ浏览器的X5内核。5.4-6.1之间的版本，若用户安装了QQ浏览器就是使用的X5内核，若用户未安装浏览器，使用的是系统内核。系统没有qq浏览器就用系统的浏览器，有 qq 浏览器会用 qq 浏览器的内核（但评论里也有人反馈高版本微信依然使用的是系统内核的情况）</p><p>还有人回答：在高版本的安卓系统上新版本的微信，之前看过好像也是基于WebView的（当时是看的安卓10）。x5现在只用在兼容低版本系统这个场景</p><p>自测手机系统android system webview版本是87，自带浏览器打开<a href="https://ie.icoa.cn/%E7%BD%91%E7%AB%99%E6%A3%80%E6%B5%8B%E6%98%AF89%EF%BC%8C%E5%BE%AE%E4%BF%A1%E6%B5%8F%E8%A7%88%E5%99%A8%E6%89%93%E5%BC%80%E6%98%AF86%EF%BC%8C%E8%AF%B4%E6%98%8E%E8%87%AA%E5%B8%A6%E6%B5%8F%E8%A7%88%E5%99%A8%E5%92%8C%E5%BE%AE%E4%BF%A1%E9%83%BD%E6%98%AF%E7%94%A8%E5%AE%83%E4%BB%ACapp%E8%87%AA%E5%B8%A6%E7%9A%84%E5%86%85%E6%A0%B8" target="_blank" rel="noreferrer">https://ie.icoa.cn/网站检测是89，微信浏览器打开是86，说明自带浏览器和微信都是用它们app自带的内核</a></p><p>还有一种检测办法，打开<a href="http://soft.imtt.qq.com/browser/tes/feedback.html%EF%BC%8C%E6%98%BE%E7%A4%BA000000%E8%A1%A8%E7%A4%BA%E5%8A%A0%E8%BD%BD%E7%9A%84%E6%98%AF%E7%B3%BB%E7%BB%9F%E5%86%85%E6%A0%B8%EF%BC%8C%E6%98%BE%E7%A4%BA%E5%A4%A7%E4%BA%8E0%E7%9A%84%E6%95%B0%E5%AD%97%E8%A1%A8%E7%A4%BA%E5%8A%A0%E8%BD%BD%E4%BA%86x5%E5%86%85%E6%A0%B8%EF%BC%88%E6%95%B0%E5%AD%97%E6%98%AFx5%E5%86%85%E6%A0%B8%E7%89%88%E6%9C%AC%E5%8F%B7%EF%BC%89" target="_blank" rel="noreferrer">http://soft.imtt.qq.com/browser/tes/feedback.html，显示000000表示加载的是系统内核，显示大于0的数字表示加载了x5内核（数字是x5内核版本号）</a></p><h2 id="app自带内核和系统webview" tabindex="-1">app自带内核和系统WebView <a class="header-anchor" href="#app自带内核和系统webview" aria-hidden="true">#</a></h2><p>遇到过一个问题：遇到一个跑在企微端的H5项目在Android 9手机上白屏，app版本已经是最新，排查半天是系统内置<code>WebView</code>版本过低，只有68，升级系统<code>WebView</code>后才解决</p><p>原因：企微自带了x5内核，可能是默认禁用掉了app自带内核才会调用系统内置<code>Webview</code>来进行渲染加载（google play商店版本的微信默认就是使用系统<code>WebView</code>内核，这也是很多人觉得觉得 Play 商店版本的微信体验会比国内版本的微信好的原因之一）</p><p>X5 WebView 内核是在APP 第一次初始化时，动态下载到APP 的内部存储空间，因为TBS SDK(Android x5 webview)采用了后台动态下发内核的方案。由于Google Play 禁止任何二进制代码的下发（包括so、dex、jar）和插件化技术的使用，故使用X5 内核的app不支持在海外Google Play上架新版本微信已经从x5内核切换到xweb内核，可以通过<code>Navigator.userAgent.toLowerCase().includes(&#39;xweb&#39;)换成xweb</code>，旧版X5内核是<code>includes(&#39;tbs&#39;)</code></p><p>组里也有人说现在企微自带的x5内核是直接在系统自带<code>WebView</code>简单封装了一下（为了减小app体积），运行的时候是调用系统<code>WebView</code>在渲染执行，所以系统<code>WebView</code>版本低会导致白屏（此条存疑）</p><h2 id="小程序内核" tabindex="-1">小程序内核 <a class="header-anchor" href="#小程序内核" aria-hidden="true">#</a></h2><p>小程序内核其实就是微信内置的内核，安卓端的还是X5内核，它是基于chromium（blink和v8）的腾讯魔改版，小程序官网不写x5，写的是chromium</p>',17),h=[l,n,s];function E(A,x,b,_,u,B){return c(),d("div",null,h)}const m=o(p,[["render",E]]);export{f as __pageData,m as default};
