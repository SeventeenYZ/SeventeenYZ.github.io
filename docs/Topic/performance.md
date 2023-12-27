笔记摘抄自[Performance Patterns](https://www.patterns.dev/posts/loading-sequence)

## Why not optimal loading difficult to achieve?

根据性能指标FCP、LCP和FID的顺序，最佳的加载顺序是：满足FCP所需的资源最先加载，然后是LCP，最后是FID

### Sub-optional sequencing

在大多数情况下，资源都没有被正确的按优先级排序，在理想情况下，当FCP触发时，LCP所需的资源应该已处在可用状态。当LCP触发时，JS应该已经下载、解析完成甚至已经执行，来避免阻塞交互（FID）

### Network/CPU Utilization

综合考虑网络利用率和CPU利用率的平衡，举例来说，在有多个脚本需要加载时，无论是并发加载还是顺序加载，总的下载时间以及耗费的带宽是一样的，但如果是并发加载，加载过程中CPU是空闲的。而如果是顺序加载，CPU便可以在第一个脚本加载完成时就开始处理，这样可以有更好的CPU和网络利用率

### Third-Party (3P) Products

第三方库常用来增强网站的功能，但第三方库本身不会对网站加载性能做太多考虑，它可能有沉重的JS代码执行导致可交互状态的延迟，或是阻碍了其它关键资源的加载

### Platform Quirks

平台差异性，不同浏览器或不同版本内部对资源请求的优先级排序不同，如`<Link rel=preload>`

### HTTP2 Prioritization

协议本身没有给开发者提供太多调整资源顺序和优先级的选项，服务器或CDN对资源优先级的排序也无法预测

### Resource level optimization

要想资源可以按高效的顺序加载，也就是说资源需要能够被排序。关键的CSS （critical CSS) 指的是FCP所需的最少量的CSS，关键的CSS需要内联，图片需要正确设置大小，JS需要进行代码分割然后增量传输。关键的CSS使用内联比从其它CSS文件导入更好，并且最好只下载当前路由所需的CSS，所有的关键CSS都基于路由对应地拆分。如果无法做到内联，关键的CSS应该被预加载preload并且由文档相同源提供（和HTML文件是同源），避免从多个域名提供关键的CSS或者直接使用第三方关键的CSS如Google Fonts，自己的服务器应该作为第三方关键性CSS的代理

过多内联CSS会造成HTML膨胀（HTML bloating）和主线程上样式解析时间过长，这反而会影响FCP。因此识别什么CSS是关键的以及代码拆分是必要的

代码分割是一个分割粒度和性能之间的平衡问题，粒度小了请求就多了但是单次加载就快了，粒度大了请求少了但是单次加载就慢了

获取CSS的延迟和不正确的顺序会影响FCP和LCP，为了避免这种情况，非内联CSS的优先级和顺序应该在1P JS和ATF图片之上

跟critical CSS一样，critical fonts也应该被内联，如果不能内联则脚本应该用preconnect指定加载。获取fonts的延迟，例如google fonts或者其它域的fonts会影响FCP，可以用preconnect告诉浏览器与这些资源尽早建立连接

内联字体会导致HTML显著地膨胀并且延迟了其它关键性资源的获取，Font fallback可以不阻塞FCP并且有文字可用。但是使用font fallback会由于字体切换而影响CLS，当真正用的字体可用时，由于主线程上可能有大量的style和layout task，所以它也会影响FID

内联CSS和字体加载快，但是太多会造成HTML膨胀bloating，需要找一个平衡

### Above the Fold(ATF) Images

ATF Images指的是页面加载时最先可见的图片，所有的ATF图片都应该被设置大小，未设置大小的图片在全部渲染的时候会造成布局偏移（layout shift），这会影响CLS指标，ATF图片的占位符（placeholders）应该由服务端渲染

延迟的图片和空白的占位符会导致LCP延后，另外，如果占位符大小与实际图片的intrinsic size不匹配，且图像在替换时没有覆盖，则 LCP 会重新触发。理想情况下，ATF图片不会影响FCP，但实际情况下，一张图片有可能触发FCP

### Below the Fold（BTF）Images

BTF Images是那些在页面加载时不会立刻对用户可见的图片，这些图片适合做懒加载（lazy loading），确保它们不会和页面所需的1P JS或者重要的第三方资源产生竞争，而如果BTF图片在1P JS或重要的第三方资源之前加载，FID将会被延迟

### 1P JS

inline scripts：在加载的HTML页面内`<script>`标签中编写的脚本

First-party scripts：简称1P JS，包含在.js文件中，并且和HTML页面是同一域名的脚本

Third-party script：简称3P JS，包含在.js文件但位于另一个域的脚本

1P JS会影响应用程序的交互准备情况。它可能会网络传输上顺序排在图片和3P JS后面或者主线程执行时排在3P JS后面，这会导致延迟。因此它应该在网络传输上，在ATF图片之前进行加载，在主线程上，比3P JS先执行。在采用服务端渲染的情况下，1P JS不会阻塞FCP和LCP

### 3P JS

在HTML中的3P同步脚本会阻塞CSS和字体的解析从而影响FCP，在`<head>`的同步脚本也会影响HTML body的解析，3P JS在主线程上的执行会延迟1P JS的执行、push out hydration（大概意思是推迟了页面交互性的激活）和FID。因此，控制3P JS的加载的有必要的

### 加载优先级

CSS和字体一般是最高优先级加载

scripts根据它们在文档的位置以及是否是async、defer或者blocking优先级不同，如果blocking scripts（即`<script>`标签）在`<img>`之前，那么它比这个标签所引用的图片有更高的优先级，如果是在之后，则优先级比图片低。而async/defer/injected（外部导入.js文件）的scripts，不管它们在document中的位置如何，都是最低优先级，因此可以为一些`<script>`添加async或者defer来降低它们的优先级

ATF图片比BTF图片有更高优先级

## Static Import

当使用静态导入的时候，所有模块会聚合成一个，这意味着渲染到用户屏幕上时需要加载和解析所有模

## Dynamic Import

按需导入部分代码，例如将非立即展示的组件改为动态导入，常用的API有React的Suspense和Vue的defineAsyncComponent

## Import On Visibility

可见时导入，例如查看图片列表时，不全部一次性加载，滚动时才进行加载，减少了初次加载时间

为了知道组件是否在当前viewport，可以用IntersectionObserver API或者一些工具库如react-lazyload或react-loadable-visibility来可见时导入组件

## Import On Interaction

交互时导入，例如点击按钮展示视频播放器，聊天框等，如果加载这些资源是成本很高的，在一开始就加载的话会阻塞主线程，影响FID，Total Blocking Time和Time to Interactive。因此在某个恰当的时间点再加载它们会更好，例如点击、滚动、推迟组件加载直到浏览器是空闲的（通过requestIdleCallback）

### 不同的加载资源的方式

立即加载的资源

基于路由的懒加载，当用户导航到特定路由或组件

基于交互的懒加载，例如点击按钮展示聊天框

基于viewport的懒加载，当滚动到组件位置

prefetch预获取，在需要之前加载，但顺序在关键性资源之后

preload预加载，最高程度地加载
