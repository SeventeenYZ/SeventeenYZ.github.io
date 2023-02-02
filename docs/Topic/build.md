[为什么不用prettier](https://antfu.me/posts/why-not-prettier-zh)

随着前端的发展，各种提升开发效率的工具层出不穷，而浏览器只识别`html`、`css`和`js`，构建需要做的事情有以下这些

代码转换：将`TypeScript`编译成`JavaScript`、将`scss`编译成`css`等

文件优化：压缩`JavaScript`、`css`、`html`代码，压缩合并图片等

代码分割：提取公共代码，提取不需要立即执行的代码让其懒加载或异步加载

热更新：监听本地源代码的变化，自动重新构建、刷新浏览器

`tree shaking`：去除没用到的代码

## Webpack

打包流程

1、读取配置

2、启动`webpack`，创建`Compiler`对象并开始解析项目

3、从入口文件（`entry`）开始，找到其导入的依赖模块，递归遍历分析，生成依赖关系树

4、对不同文件类型的文件使用对应的`loader`编译，最终转为`JavaScript`文件

5、编译过程中会通过发布订阅模式，向外抛出一些`hooks`，`webpack`的`plugin`可通过监听事件节点执行插件功能

## 优化

区分`package.json`中`devDependencies`和`dependencies`，开发环境的依赖不打包进生产环境的构建包

## 调试

查看返回的`json`数据大小

## 构建

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

