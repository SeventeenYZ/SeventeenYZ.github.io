[官网](https://staging.vuejs.org)

## 封装hook

封装的hook`useXXX.ts`本质是将页面的可复用逻辑提取出来，通过一个函数调用得到它里面声明的变量和函数，逻辑跟铺开直接写在页面并无二致

## reactive和ref

[讨论](https://stackoverflow.com/questions/61452458/ref-vs-reactive-in-vue-3)

reactive：

①  仅可创建对象类型（对象、数组、Map、Set），普通类型无效

②  解构后会失去响应性（应该是仅限于属性是普通类型的情况），因为响应式要保持引用是相同的

ref：

可定义任意类型，通过`.value`调用，解构不会失去响应性

最大的区别：ref支持重新赋值，当数组指针会发生变化（即变量指向另一个数组），应该使用ref

其它情况下ref和reactive初始化值为对象时，ref底层使用reactive，会有额外的包装对象，这会带来额外开销，应优先选择reactive

## watch和computed

`watch`：一个数据影响多个数据，一般这个值不需要用到它，而是要用到受它影响的其它数据

watch使用限制，具体看文档：

①  不可直接侦听响应式对象的属性值，而应用getter函数代替

②  深层侦听

`computed`：一个数据受多个数据（依赖）影响，一般会用到它，依赖变更时才重新计算，不会产生副作用，有异步请求或更改DOM的操作应放在watch

`watchEffect`：watch是懒执行，仅当依赖变化才执行，watchEffect是初始时也会执行，并且自动收集依赖

watchEffect和onMounted的调用时机：watchEffect是在前面，初始化时能访问数据但不能访问dom，类似于vue2的created调用时机

## 表单输入绑定

```vue
<input v-model="searchText"/> // 等同于
<input :value="searchText" @input="$emit('input', $event.target.value)"/>
<custom-input v-model="searchText"/> // 等同于
<custom-input :value="searchText" @input="searchText=$event"/>
```

自定义组件的`v-model`默认绑定的是`value`值和`input`事件，如果要修改则在`model`选型里定义

## Prop

### 传递一个数字或表达式时

```vue
<blog-post like="42"></blog-post> // 会被解析成字符串"42"
<blog-post v-bind:like="42"></blog-post> // 加了v-bind才能被解析成数字"42"，表达式同理
```

### 传递一个对象

```vue
<blog-post v-bind="post"></blog-post> // 等价于
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

### 单向数据流

当子组件试图修改props里的值时，控制台会发出警告

解决办法：子组件定义一个变量或计算属性（需要对初始值进行转化时）来接受props的值

注：如果props传递的是对象或数组等引用值则不适用

```text
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

### 非Prop的属性

非Prop属性包含`class`、`id`和`style`等属性以及`emit`事件，默认作用到子组件的根组件上

`$attrs`接收父组件传来的除了`class`、`id`和`style`之外的非`Prop`属性，可用在多个标签上（不过一般没啥用）

`$listeners`接收除了原生事件（即不含`.native`修饰符）之外的事件

如果要指定非`Prop`属性作用到某个标签上

```vue
Vue.component('base-input', {
    inheritAttrs: false,
    props: ['title', 'value'],
    template: `
        <header>...</header>
        <main v-bind="$attrs">...</main> // 父组件传来的非Prop属性会作用到它身上
        <footer>...</footer>
      `
})
```

## 自定义事件

```vue
<text-document
  :title="title"
  @update:title="title = $event"/> // 等同于
<text-document :title.sync="title">
```

和`v-model`区别，因为`v-model`只能有一个，所以多了`v-bind.sync`用来绑定其它需要双向绑定的值（`Vue3`里合并了）

## 插槽

① 公共组件提供插槽并设置默认内容

```vue
<div v-if="propContent">
    <slot name="prepend">{{ propContent }}</slot>
</div> // 缺点：传的值不能是falsy值
<div v-if="$slots.prepend">
    <slot name="prepend">{{ propContent }}</slot>
</div>
```

② 跨组件传slot

```vue
// 祖组件（页面组件等）
<template #label>
	代理性质sada
</template>
// 父组件（公共组件等）
<slot #label name="label"></slot>
// 在用element-ui的时候 要用旧语法匹配组件提供的插槽名
<slot slot="label" name="label"></slot>
// 孙组件
<slot name="label">{{ label }}</slot>
```

## 动态组件 & 异步组件

`keep-alive`的`exclude`属性包含的组件，不会调用`activated`和`deactivated`这两个钩子函数

`created`和`activated`调用后台数据的区别 `created`只调用一次，`activated`每次进入都调用

注意点：keep-alive的exclude包含的组件名，要和.vue文件的name的文件名大小写一致，不然可能缓存不了

## 处理边界情况

### 访问子组件实例或子元素

`this.$refs`可能是`undefined`，因为`$refs`只在组件渲染完成后生效，需要包在`nextTick`里

在`v-for`使用`ref`，索引可能不准

## 服务端渲染

如果我们只是想显示一堆不变的数据，那么我们直接写一个a.html丢到服务器上让客户端访问就可以了。但这是基本不可能的事情，数据一般是变化的。你不可能为每套数据写一个视图，所以我们需要分离数据和视图，然后使用一种技术将数据塞到视图中，这种技术就叫渲染。这工作放在服务器上做就是服务器渲染，放在浏览器做就是浏览器渲染。

这里的渲染，就是指生成html文档的过程，和浏览器渲染html没有关系。 浏览器端渲染，指的是用js去生成html，前端做路由，举例：React、Vue等前端框架，适合单页面应用程序。服务器端渲染，指的是用后台语言通过一些模版引擎生成html。举例：PHP文件、JSP文件、Python的Flask配合Jinja引擎、Django框架、Java配合vm模版引擎、NodeJS配合Jade，适合多页面应用。 所以有时为了让单页面应用利于SEO，让服务器和客户端同构，也使用React/Vue渲染的方案

浏览器渲染：单页应用用的基本都是浏览器渲染。优点很明确，后端只提供数据，前端做视图和交互逻辑，分工明确。服务器只提供接口，路由以及渲染都丢给前端，服务器计算压力变轻了。但是弱点就是用户等待时间变长了，尤其在请求数多而且有一定先后顺序的时候。

服务器渲染：服务器接到用户请求之后，计算出用户需要的数据，然后将数据更新成视图（也就是一串dom字符）发给客户端，客户端直接将这串字符塞进页面即可。这样做的好处是响应很快，用户体验会比较好，另外对于搜索引擎来说也是友好的，有SEO优化。

客户端渲染路线：1. 请求一个html -> 2. 服务端返回一个html -> 3. 浏览器下载html里面的js/css文件 -> 4. 等待js文件下载完成 -> 5. 等待js加载并初始化完成 -> 6. js代码终于可以运行，由js代码向后端请求数据( ajax/fetch ) -> 7. 等待后端数据返回 -> 8. 客户端从无到完整地，把数据渲染为响应页面

服务端渲染路线：2. 请求一个html -> 2. 服务端请求数据( 内网请求快 ) -> 3. 服务器初始渲染（服务端性能好，较快） -> 4. 服务端返回已经有正确内容的页面 -> 5. 客户端请求js/css文件 -> 6. 等待js文件下载完成 -> 7. 等待js加载并初始化完成 -> 8. 客户端把剩下一部分渲染完成( 内容小，渲染快 )

对同一个组件，服务端渲染“可视的”一部分( render/componentWillMount部分代码 )，为确保组件有完善的生命周期及事件处理，客户端需要再次渲染。即：服务端渲染，实际上也是需要客户端做开销很小的二次渲染。

根据以上特点，在用户体验要求比较高的页面（首屏）、重复较多的公共页面可以考虑使用服务器渲染，减少ajax请求和提升用户体验。

比较：

1. 数据请求：由服务端请求数据而不是客户端请求数据，这是“快”的一个主要原因。服务端在内网进行请求，数据响应速度快。客户端在不同网络环境进行数据请求，且外网http请求开销大，导致时间差（主要原因）。
2. 步骤：服务端是先请求数据然后渲染“可视”部分，而客户端是等待js代码下载、加载完成再请求数据、渲染。即：服务端渲染不用等待js代码下载完成再请求数据，并会返回一个已经有内容的页面。
3. 渲染性能：服务端性能比客户端高，渲染速度快
4. 渲染内容：服务端渲染会把”可视“部分先渲染，然后交给客户端再作部分渲染。而客户端渲染，则是从无到有，需要经历完整的渲染步骤。
