## 进子页面添加数据后返回，父页面数据不更新

```js
window.history.go(-1); // 返回不刷新
window.addEventListener('pageshow', function(e) {
    if (e.persisted) { // 如果检测到页面是从"缓存"中读取的，重新加载页面
        window.location.reload();
    }
});
```

## npm run serve进度条卡住不动

进度一直卡在编译`axios`下某个模块不动，或者报错`core-js`下某个模块没找到

原因：代码问题

```vue
<div>
    <div class="common-table">
        <el-table...>
    </div>
    <el-pagination...>
</div>
```

因为把最外层的`div`删除了，而实际编译时不报错，因为`el-pagination`是在运行时才会转换成`div`标签，这就违背了一个`template`只能存在一个`root`元素的原则

解决办法：补回`div`，回滚`package.json`和`package-lock.json`文件然后再

```js
npm clean cache --force // 清除npm缓存
// 删除掉node_modules包，重新安装
npm install
```

## Date对象

```ts
new Date('2022-07-10 11:08:46').getMonth() // 返回的是0-11，要想获得实际月份要加1
new Date('2022-07-10 11:08:46').getDay() // 返回的是0-6，代表星期日到星期六，要想获取实际日期用getDate()
new Date(date) // ios上的解析会出错，要把-替换成/
new Date((date.replace(/-/g, '/')));
```

## 列表类数据出错

例如筛选出错等，可能是因为绑定的`key`重复了，后端返回的列表存在重复数据

检查方法：在接口响应的`Preview`里选择`expand recursively`展开列表数据，再`ctrl + F`查找出错的数据是否存在两个

## webpack打包遇到的问题

webpack开发环境没问题，生产环境报找不到模块
最终排查原因：导入模块大小写不对，目录名是orgCheckList，import语句里是OrgCheckList，但IDE能正常跳转，开发环境表现正常
开发环境window不区分大小写，生产环境linux对大小写敏感

## Chrome吞请求

问题描述：进入A页面，会同时发起三个请求（获取当前tab的信息概览，记录访问日志，获取选项列表），切换到B页面再切回A页面，会只发两个，再切到B页面再切回，又是正常发三个，再继续切就是一直循环

原因：chrome锁定缓存，并在再次请求相同资源之前等待查看一次请求的结果

解决方法：找到使请求唯一的方法，例如在记录日志接口的参数中添加随机数，如time: Date.now()

另一种解决方法是看能不能将其中某个接口的触发改到别的时间点，

最后选择了第二种方法，将获取选项列表从useEffect换到useUpdateEffect中，!canGetList && setCanGetList(true)
