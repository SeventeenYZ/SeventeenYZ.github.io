## 元素隐藏的区别

```scss
display: none; // 隐藏后不占据原本显示的空间，好像消失了一样
visibility: hidden; // 隐藏后仍占据空间，不会触发事件
opacity = 0; // 隐藏后仍占据空间，也可触发事件
```

## position

① `relative`（相对定位）：基于自身移动，不脱离文档流

```scss
#el {
	position: relative;
    //移动到距离原来位置的上边-20px的地方，相当于向上移20px
	top: -20px; 
    // 距离原来的位置左边20px，即向右移20px
	left: 20px;
}
```

② `absolute`（绝对定位）：基于父元素的位置移动（父元素必须有非`static`的`position`属性），脱离文档流

③ `fixed`（固定定位）：只基于视窗定位，即使页面滚动，元素位置不变，脱离文档流

④ `sticky`（粘性定位）：依赖于用户的滚动，在`relative`与`fixed`定位之间切换，适合用在导航栏（兼容性差）

`z-index`：用来给发生重叠的元素中设置堆叠顺序，值大的元素覆盖在值小的元素上面

## BFC

`BFC`就是一个独立的容器，容器中的子元素不会影响到外面的布局（脱离文档流），触发`BFC`的方法：

1、`float`不为`none` 2、`position`不为`relative`和`static` 3、`overflow`为`auto`、`scroll`或`hidden` 4、`display`为`inline-block`或`table-cell`

## 居中

有`line-height`属性就不用设置`height`属性，`line-height`会撑开元素的高度

当`inline-block`元素内没有文字的时候，`line-height`会对该元素实现垂直居中，若有文字，则只对文字生效（`text-align`同理）

## 响应式布局

① 媒体查询

```scss
@media screen and (max-width: 360px) { // 屏幕宽度小于360px时显示的样式
    html {
        font-size: 20px;
    }
}
@media screen and (min-width: 960px) { // 屏幕宽度大于360px时显示的样式
    ul {
        padding: 0 3rem;
    }
    ul li {
        font-size: 1.2rem;
    }
}
html { font-size: 62.5% } // 使得 1rem = 10px，为了计算方便
```

② `meta`

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
// 表示将网页的宽度设定为手机屏幕的宽度，体验不好，需要手指放大查看
```

## 背景半透明

```scss
opacity: 0.3; // 透明度会影响子元素
background-color:rgba(0,0,0,0.3); // 透明度不会影响子元素
```

## flex布局

### 父容器属性

① **flex-direction**：主轴方向，即子元素的排列方向（row、column）

② **flex-wrap**： 子元素的换行方式（nowrap、wrap）

③ **flex-flow**：**flex-direction**和**flex-wrap**的简写

④ **justify-content**：主轴上子元素的对齐方式

```scss
justify-content: flex-start; // 左对齐,默认值
justify-content: flex-end; // 右对齐
justify-content: center; // 居中对齐
justify-content: space-between; // 两端对齐
justify-content: space-around; // 分散对齐
```

⑤ **align-items**：交叉轴上子元素的对齐方式

```scss
align-items: flex-start; // 上对齐
align-items: flex-end; // 下对齐
align-items: center; // 居中对齐
align-items: baseline; // 子元素中第一行文字的基线对齐
align-items: stretch; // 子元素若没有设置高度或auto，则撑满容器，默认值
```

⑥ **align-content**：各行的对齐方式

```scss
align-content: flex-start; // 上对齐
align-content: flex-end; // 下对齐
align-content: center; // 居中对齐
align-content: space-between; // 两端对齐
align-content: space-around; // 分散对齐
align-content: stretch; // 所有行撑满交叉轴，行与行之间是有间隙的
```

### 子元素属性

① **order** ：定义子元素的排列顺序，数值小的排在前面，默认为`0`

② **flex-grow**：定义子元素的放大比例，默认为 `0`，即如果存在空间，也不会放大

如果某个子元素的`flex-grow`属性为 `2`，其他子元素都为`1`，则前者占据的剩余空间是其他子元素的两倍

③ **flex-shrink**：定义子元素的缩小比例，默认为`1`，即如果空间不足，该子元素将缩小

如果所有子元素的`flex-shrink`属性都为`1`，当空间不足时，都将等比例缩小

如果某个子元素的`flex-shrink`属性为`0`，其他子元素都为`1`，则空间不足时，前者不缩小

④ **flex**：**flex-grow**（必选），**flex-shrink**（可选）和**flex-basis**（可选）的简写

有两个快捷值：`auto` ( `1 1 auto` ) 和 `none` ( `0 0 auto` )

⑤ **align-self** ：设置单个子元素在交叉轴上的对齐方式。默认为 `auto`，表示继承父元素的`align-items`属性

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

## grid布局

### 父容器属性

① **grid-template-columns**：定义每一列的列宽，可用`px`、`%`或`auto`

 **grid-template-rows**：定义每一行的行高

```scss
// repeat()函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。
#father {
	display: grid;
	grid-template-columns: repeat(3, 100px);
    // 表示生成三列，每列宽度100px
}
// auto-fill关键字表示自动填充
#father {
	display: grid;
	grid-template-columns: repeat(auto-fill, 100px);
	//表示每列宽度100px，然后自动填充，直到容器不能放置更多的列
}
// fr关键字表示比例关系
#father {
	display: grid;
	grid-template-columns: 150px 1fr 2fr;
	//表示一共有三列，第一列宽度为150px，而第三列宽度是第二列的两倍
}
// minmax()函数接受两个参数，分别为最小值和最大值
#father {
	display: grid;
	grid-template-columns: 1fr 1fr minmax(100px,1fr);
    // 表示第三列宽度不小于100px，不大于1fr
}
// 网格线名称
#father {
	display: grid;
	grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4];
    // 表示生成三行三列，方括号内依次是八根网格线的名字。
}
// 行间距和列间距属性
#father {
	...
	row-gap: 20px; // 行间距20px
	column-gap: 30px; // 列间距30px
	gap: 20px 30px; // row-gap和column-gap的简写
    // 如果省略第二个值，浏览器认为第二个值等于第一个值
}
```

② **grid-template-areas**：定义区域

```scss
#father {
	display: grid;
	grid-template-columns: 100px 100px 100px;
	grid-template-rows: 100px 100px 100px;
	grid-template-areas: 'a a b'
                     	 'c d d'
                     	 'e e e';
    // 子元素通过grid-template-areas: a;来匹配
}
```

③ **grid-auto-flow**：子元素的排列顺序，默认值是`row`，即先行后列，可选`column`

```scss
grid-auto-flow: row // 默认值，先行后列
grid-auto-flow: column // 先列后行
grid-auto-flow: row dense // 先行后列，并且尽可能填满空单元格。
grid-auto-flow: column dense // 先列后行，并且尽可能填满空单元格。
```

④ **align-items**：单元格内容的垂直对齐方式

 **justify-items**：单元格内容的水平对齐方式

```scss
justify-items: start // 左对齐
justify-items: end // 右对齐
justify-items: center // 水平居中
justify-items: stretch // 拉伸，占满单元格的宽度，默认值
// align-items用法相同
```

**place-items** ：**align-items**和**justify-items**的简写，如果省略第二个值，浏览器认为第二个值等于第一个值

⑤ **align-content**：整个内容区域在容器里面的垂直位置

 **justify-content**：整个内容区域在容器里面的水平位置

### 子元素属性

```scss
#child1 {
  grid-column-start: 1; // 指定该子元素的列网格线开始是第1根
  grid-column-end: 3; // 指定该子元素的列网格线结束是第3根
  grid-row-start: 2; // 指定该子元素的行网格线开始是第2根
  grid-row-end: 4; // 指定该子元素的行网格线开始是第4根
  grid-column：1 3 // grid-column-start和grid-column-end的简写
  grid-row：2 4 // grid-row-start和grid-row-end的简写
}
#child1 {
	grid-area: c; // 指定该子元素在c区域
// 该属性还可以用作grid-row-start、grid-column-start、grid-row-end、grid-column-end的简写
    grid-area: 2/1/4/3;
}
// 单元格内容的对齐方式
	justify-self: start // 左对齐
	justify-self: end // 右对齐
	justify-self: center // 水平居中
	justify-self: stretch // 拉伸，占满单元格的宽度，默认值
	// align-self用法相同
// place-self：align-self和justify-self的简写
```

## 使用技巧

### 单边阴影

```scss
box-shadow: 0 -15px 15px -15px #e0e0e0 // 上方阴影，第三模糊距离和第四阴影尺寸互相抵消
```

### flex布局文本元素不换行

```scss
<div class='flex-box'>
    <span>客户: {custom_name}</span>
	<span class='time'>到访时间: {time}</span>
</div>
.flex-box {
    display: flex;
    justify-content: space-between;
}
// 如何让时间铺满一行，不换行，但是客户名称可以换行
.time {
    flex-shrink: 0;
}
```

### flex布局下中文字符能换行，但英文字符不换行

```less
.flex-item {
	word-break: break-all;
}
```

### flex

① 实现左右分开元素

```scss
<style>
    ul {
		display: flex;
    }
    .right {
		margin-left: auto; // 其他元素都在左边，就它在右边
    }
</style>
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li class="right">4</li>
</ul>
```

② 子元素溢出

在动态变化宽度后，子元素宽度溢出，原因：父元素没有设置宽度

解决方法：在溢出的子元素加`width: 0`或者`overflow: hidden`

③ 设置子元素之间间距

```css
.flex-box {
	display: flex;
	gap: 10px;
}
```

### 选择器

```css
.child-box:not(:first-child) // 选中第一个子元素外其他子元素
```

### 消除默认样式的间距

```scss
<style>
    .link {
        font-size: 0; // 消除间距
    }
    .link a {
        font-size: 1rem; // 把字体大小设置回去
    }
</style>
<div class="link">
	<a href="">跳转链接1</a> // a标签之间默认存在5px的间距
	<a href="">跳转链接2</a> // 同样适用于button等标签
</div> 
```

### iframe

父页面修改`iframe`的样式：

```html
// 父页面html
<iframe src="./bgscfx/qbxx_list.html" id="cgfx-iframe" width="100%" height="100%">
</iframe>
// 父页面js
window.onload = () => {
    let cgfxifram = document.getElementById('cgfx-iframe').contentWindow.document.getElementsByClassName('el-table');
    cgfxiframe[0].style.height = '406px';
}
```

父页面给`iframe`传递参数

第一种方法：

```html
// 父页面html
<span id="urlId" style="display:none"></span>
// 父页面js
sentUrlId() {
    document.getElementById('urlId').innerText = zt_id;
}
created() {
    this.sentUrlId();
}
// 子页面js
let urlId = window.parent.document.getElementById('urlId').innerText;
```

第二种方法：使用`localStorage`

###  自定义折叠面板

```tsx
// 折叠图标
<div className={`arrow-icon-box${isCollapse ? '-active' : ''}`} onClick={() => setIsCollapse(!isCollapse)}>
    <img src={arrowIcon} className={styles['arrow-icon']} alt='^'/>
</div>
// 折叠元素设置最大高度，最大高度不小于内容高度即可
<div className={styles['amountInfo-box']} style={{ 'maxHeight': isCollapse ? '0' : '10rem' }}>
</div>
// css文件中
.arrow-icon-box, .arrow-icon-box-active {
    width: 46px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.arrow-icon-box {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: all ease 0.3s;
    -o-transition: all ease 0.3s;
    transition: all ease 0.3s;
}
.arrow-icon-box-active {
    -webkit-transform: rotate(-180deg);
    -ms-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
.arrow-icon {
    width: 16px;
    height: 16px;
}
.amountInfo-box {
  overflow: hidden;
  transition: max-height .5s;
}
```

### CSS modules

```tsx
<Form.Item label='业务类型'>
    <div className={styles['text-orange']}>代付</div>
</Form.Item>
// 用css module的className自带穿透效果
// 用className='text-orange'的话需要global穿透
// :global{ .xxx-form-item { .text-orange }}
.text-orange {
    color: #FF6600;
}
```



