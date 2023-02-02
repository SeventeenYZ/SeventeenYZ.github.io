##  行内元素和float元素

行内元素：无法设置宽高；内外边距只对左、右两边起作用；行内元素内无法放块元素（可通过设置`display: inline-block`来改变 ）

`float`元素：浮动元素，`display`属性会变为`block`。 `float`元素和`inline-block`元素都可设置宽高和水平排列，区别在于：`float`元素会脱离文档流（除了文字内容，即文字环绕效果），而`inline-block`元素不会

## 本地存储

`Local Storage`：保存的数据没有过期时间，需要手动删除，存储空间5M

`Session Storage`：保存的数据在页面关闭后会被删除，存储空间5M

`Cookies`：过期时间自己设置，安全性不高，容易被拦截，存储空间4k

相同点：都是保存在客户端，且同源共享

不同点：`Cookies`数据由服务端设置，参与通信；`Session Storage`和`Local Storage`由客户端设置，不参与通信

`Cookies`属性：
① `Domain`：域，表示请求的`url`符合这个格式的请求时才会带上这个`cookie`
② `Path`：路径前缀，符合这个路径的请求`url`才会带上
③ `Secure`：为true时表示使用`https`协议才发送这个`cookie`
④ `HttpOnly`：为true时表示无法通过`js`脚本读取到这个`cookie`，防止`XSS`攻击
⑤ `Expires/Max-Age`：过期时间

## 浏览器渲染

浏览器接收到服务器返回的代码后进行解析，经过`DOM`构造、布局和绘制三个步骤来展现

### 渲染流程

1. 解析`html`文件构造`DOM`树（也叫做`content`树）

2. 解析`css`文件，和`html`里的`visual instuctions`（应该指的是能展示的标签，即不包括`script`等）构造`render树`

   `DOM`构造：浏览器将接收到的`HTML`代码通过`HTML`解析器解析构建成一颗`DOM`树，同时将接收到的`CSS`代码通过`CSS`解析器构建出样式表规则（`CSSOM`），然后将这些规则分别放到对应的`DOM`树节点上，得到一颗带有样式属性的`DOM`树（`render树`）

3. `layout`（布局）：浏览器按从上到下，从左到右的顺序读取`DOM`树的`node`，然后开始获取`node`的坐标和大小等`css`属性，把每个`node`定位到对应的坐标

4. `painting`（绘制）：遍历`render`树，用`UI backend layer`把每个`node`绘制出来

### 布局和回流

一个意思，`Webkit rendering engine`把将元素放置在屏幕的某个位置的操作叫做`layout`，而在`Gecko rendering endgine`中叫做`Reflow`（回流）

## 踩坑记录

### table文字换行问题

使用`table`标签时，当需要显示一段很长的文字时，可能不会换行，需要在`table`标签添加以下样式属性

```html
<table style="table-layout: fixed;word-break: break-all">
    <tr height="30pt">
        <td colspan="2">
              <span style="margin-left: 10pt;">{{ dataObj.orderNo }}</span>
        </td>
        <td colspan="4">
            <span style="margin-left: 10pt;">{{ dataObj.phone }}</span>
        </td>
    </tr>
</table>
```

