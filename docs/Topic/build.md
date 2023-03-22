[学习](https://web.dev/fast/)

[为什么不用prettier](https://antfu.me/posts/why-not-prettier-zh)

随着前端的发展，各种提升开发效率的工具层出不穷，而浏览器只识别`html`、`css`和`js`，构建需要做的事情有以下这些

代码转换：将`TypeScript`编译成`JavaScript`、将`scss`编译成`css`等

文件优化：压缩`JavaScript`、`css`、`html`代码，压缩合并图片等

代码分割：提取公共代码，提取不需要立即执行的代码让其懒加载或异步加载

热更新：监听本地源代码的变化，自动重新构建、刷新浏览器

`tree shaking`：去除没用到的代码

## ESLint

参考资料：https://dev.to/alexeagleson/understanding-the-modern-web-stack-linters-eslint-59pm

## Babel

Babel有两个主要功能：将ES6+代码转换为旧版浏览器支持的ES版本，通过polyfill实现旧浏览器不支持的ES6+的api

两者的不同：ES6+有分`syntax`（语法）和`functionality`（功能性api，如`Array.prototype.includes`、`Promise`），新的`syntax`可以转换成旧`syntax`（如const转var，class转function），而新的`functionality`有自己的底层实现逻辑，简单的转换语法并不能向旧浏览器解释它的底层逻辑如何运作，于是需要polyfill，它会实现运行逻辑和ES6+一样的`api`（core-js）

一般安装babel

```shell
npm install @babel/core @babel/cli @babel/preset-env -D
```

以上三个基础包是Babel ecosystem的一部分

`@babel/core`：通过一组指令来转换代码的主引擎

`@babel/cli`：运行这个程序用于触发核心引擎并输出转换后的`js`文件

`@babel/preset-env`：这是一个预设配置，告诉核心引擎要进行怎样的转换，通过查看配置（`package.json`文件的`browserslist`）来确定所需要支持的浏览器，继而确定如何进行更改

还有一些预设例如用于转换`js`超集，JSX和TypeScript

需要支持的浏览器版本越旧，`babel`就需要进行更多的转换工作，生成的`js`文件体积也会更大

```json
{
  "devDependencies": {
    "@babel/cli": "^7.15.7",
    "@babel/core": "^7.15.5",
    "@babel/preset-env": "^7.15.6"
  },
  "browserslist": ["last 2 Chrome versions"],
  "babel": {
    "presets": [["@babel/preset-env"]]
  }
}
```

参考资料：https://dev.to/alexeagleson/building-a-modern-web-stack-babel-3hfp

## Webpack

打包流程

1、读取配置

2l、启动`webpack`，创建`Compiler`对象并开始解析项目

3、从入口文件（`entry`）开始，找到其导入的依赖模块，递归遍历分析，生成依赖关系树

4、对不同文件类型的文件使用对应的`loader`编译，最终转为`JavaScript`文件

5、编译过程中会通过发布订阅模式，向外抛出一些`hooks`，`webpack`的`plugin`可通过监听事件节点执行插件功能

`webpack`：主要引擎，它会去了解代码和文件如何相互关联以及如何将它们打包

`webpack-cli`：一个程序，运行后触发核心引擎工作，允许我们用命令行运行webpack并进行打包

## Webpack和Vite开发环境对比

Webpack：分析依赖 => 编译打包 => 交给本地服务进行渲染。首先分析各个模块之间的依赖，然后进行打包，在启动webpack-dev-server，浏览器请求开发服务器时，直接显示打包结果。Webpack打包之后存在的问题：随着项目体积的增大，会造成bundle体积增加，影响冷启动和热更新的速度

Vite：启动开发服务器 => 浏览器请求模块时按需动态编译显示。是先开启开发服务器，请求某个模块时再对该模块进行实时编译构建，现代浏览器本身支持ESM，会自动向依赖的Module发出请求，所以Vite就将开发环境下的模块文件作为浏览器的执行文件，而不是像Webpack进行打包后交给本地服务器

Vite启动时不需要打包，不需要分析模块间的依赖关系，不用进行编译，但是是先启动开发服务器，等浏览器请求模块时，再对模块进行编译构建（不压缩），因此首屏加载时请求模块多的时候渲染速度会比较慢

Vite的依赖预构建：1、兼容其他规范（cjs转esm）  2、修改导入路径  3、将有依赖关系的esm模块合并成一个模块，减少请求数量

热更新方面：改动模块后，Vite只需要让浏览器重新请求该模块，Webpack则需要重新编译打包一次，但是Webpack的热更新会以当前修改的文件为入口重新打包，所有涉及到的依赖也都会被重新加载一次，因此速度也比不上Vite

## 优化

有一些核心思想是各个层面通用的：按需加载、缓存

### 网络层面

升级http2

开启g-zip压缩减少传输时间

iconfont代替图片图标：将图标制作成一个字体，使用时就跟字体一样，可以设置属性，例如 font-size、color 等，非常方便，并且字体图标是矢量图，不会失真。还有一个优点是生成的文件特别小，无论是加载还是打包所消耗的资源都相对较小一些

图片优化：包括图片懒加载、适当降低图片质量、尽量用css代替图片、使用webp图片（存在兼容性问题）

减少无用的请求头数据（这个有点鸡肋）

以往http1.1时代的域名拆分、文件合并、开启keep-alive这些优化手段在http2可以丢弃掉

### 项目方面

减小构建产物大小

减少编译打包时间

代码预加载和按需加载

图片使用CDN

压缩`js`和`css`文件

### 代码层面

第三方库按需引入

css嵌套最好不要超过3层，过度嵌套会导致css文件变大，影响渲染速度

事件的防抖节流

去除console.log，console.log引用的数据不会被垃圾回收，传进去的对象太大容易造成内存泄漏

`package.json`：①  区分`devDependencies`和`dependencies`，开发环境的依赖不打包进生产环境的构建包②  去除项目中没用到的包  ③  `browserslist`：如果是内部人员使用，可以不用兼容过旧的版本(查询目标浏览器：https://browsersl.ist)

## 调试

查看返回的`json`数据大小

## 构建

构建工具的作用

![图片加载失败](./assets/bundler.jpg)

合理配置`hash`，改过的文件需要更新`hash`值，这样才能保证上线后，浏览器访问没有改变的文件时能命中缓存，而改过的文件会重新请求

```js
// webpack.base.js
modules.export = {
    ...
    output: {
        path: path.resolve(__dirname, '../dist'),
        // 给js文件加上contenthash
        filename: 'js/chunk-[contenthash].js',
        clean: true,
    }
}
```

现代脚本部署策略（modern script deployment strategy）：使用module/nomodule的特性检测，支持，支持`<script type="module">`的浏览器也支持async/await，class、箭头函数等es6+的功能，同时为不支持这些功能的旧版浏览器提供fallback，做法是生成两套js，一套是es6+，一套是es5

```js
<script type="module" src="main.mjs"></script>
<script nomodule src="main.es5.js"></script>
```

支持ESM的浏览器会加载main.mjs文件，不会加载main.es5.js，而旧版浏览器会加载这个main.es5.js文件

好处：通常ES5版本的文件大小是ES6+版本的两倍还多一点，这样也能节省解析时间

参考资料：https://philipwalton.com/articles/deploying-es2015-code-in-production-today/

## 缓存

缓存：文件名加入hash，有效时间内用强缓存，缓存失效用协商缓存

## 工程化和工具链

狭义上的工程化和工具链是指开发时有关的工具库集合，广义点的工程化和工具链概念是包含前端开发一整套流程的，从搭建开发环境，启动，开发，提交，部署，错误监控等等，流程每个节点都会存在一些问题，继而会有方案去解决，如此形成了工具链

例如写代码时，为了提示错误、规范统一等，需要用到`eslint`，提交代码时，为了`remote repository`上的代码格式统一，需要用到`eslint`校验代码和`prettier`格式化代码，而为了做到这点需要在`git hooks`上动手脚，用到`husky`
