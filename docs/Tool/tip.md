## 请求封装

```ts
export const get = (url: string, params = {}, config: RequestConfig = {}): Promise<any> =>
  axios
    .get(url, { params, ...config })
    .then((res) => [null, res])
    .catch((err) => [err, undefined]); // 参考了await-to-js进行错误处理
export const post = (url: string, params = {}, config: RequestConfig = {}): Promise<any> =>
  axios
    .post(url, data: params, ...config)
    .then((res) => [null, res])
    .catch((err) => [err, undefined]); // 参考了await-to-js进行错误处理
假设code === 0，成功，返回data  res = { code: number, data: any }
特殊错误码，[1001, 1002, 1003].includes(code), 失败，代表无权限，无授权等情况，不需要toast 
其它code，失败，需要toast提示 res = { code: number, msg: string }
axios.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    if (specialErrorCode.includes(error.data.code)) {
        specialErrorHandle(error.data);
    } else {
        Toast.show(error.data.msg);
    }
    return Promise.reject(error.data);
  },
);
const specialErrorCode = [1001, 1002, 1003], 失败，代表无权限，无授权等情况，不需要toast 
const specialErrorHandle = (res) => {
    const { code, msg } = res
    switch code {
        case 1001:
            toLoginPage
        case 1002: 
            toBindMobilePage
        case 1003:
            Modal.error(msg)
        default:
            Toast.error(msg)
    }
}
// page.tsx
const getList = async () => {
    const [err, data] = await getListApi()
    if (err) return; // 特殊错误码和其它错误码都属于失败
    or
    if (data) {
        ...
        return;
    }
    if (err.code === 1001) {
        ....
    }
}
```

## 轮询接口

需求背景：人脸认证后回调结果需要3到5秒才获取到，获得成功则跳到首页，不成功则停留在原页面

```tsx
const getVeriFaceStatus = async () => {
    Taro.showLoading({
      title: '认证结果获取中',
    });
    const generateSequence = async function* () {
      for (let i = 0; i < 10; i++) {
        const res = await new Promise((resolve) => {
          setTimeout(async () => {
            const [err, data] = await GET_SIGNMAN_INFO();
            if (err) resolve(false);
            resolve(data.face_auth_status === VeriFaceStatus.success);
          }, 500); // 500ms发送一次，轮询10次
        });
        yield res;
      }
    };
    const generator = generateSequence();
    for await (const value of generator) {
      if (value) {
        setStorageSync('face_auth_status', 1);
        Taro.switchTab({
          url: '/modules/approve/pages/approveList/index',
        });
        return;
      }
    }
    Taro.showToast({
      title: '认证未通过，请稍后再试',
      icon: 'none',
    });
  };
```

## Big.js

```ts
// big.js
经过big操作后的变量类型为Big，要与其它值做比较需要转化成number类型
import Big from 'big.js'
const amount = +Big(detailInfo.amount).plus(detailInfo.interest)
typeof amount === 'number' // true
```

## 拦截重复请求

不采用axios自带的取消请求原因是它实际还是会发送请求给后端

```ts
const pending = new Map()
let repeatConfig = {}
const addPending = (config) => {
    const key = config.url
    if (!pending.has(key)) {
        pending.set(key, JSON.stringify(config.data))
    }
}
const removePending = (config) => {
    const key = config.url
    const value = typeof config.data === 'object' ? JSON.stringify(config.data) : config.data
    if (pending.has(key) && pending.get(key) === value) {
        pending.delete(key)
        return true
    }
    return false
}
axios.interceptors.request.use(
    (config) => {
        repeatConfig = { url: config.url, method: 'post', data: config.data }
        if (removePending(config)) {
            return Promise.reject({ // 会走响应拦截器的失败回调
                config,
                code: 'repeat',
                msg: '重复请求被拦截'
            })
        }
        addPending(config)
       	repeatConfig = config;
        return config
    },
    async (err) => {
        return Promise.reject(err)
    }
)

axios.interceptors.response.use(

    async (res) => {
        removePending(repeatConfig)
        repeatConfig = {}
        return res
    },
    async (err) => {
	   removePending(repeatConfig)
	   repeatConfig = {}
	   return Promise.reject(err)
    }
)
```

## 等某个接口完成后再进行其它逻辑

需求背景：在做了权限管理的系统中，要等调用权限接口获取到权限码数组后，匹配当前菜单页的权限码是否在权限码数组中，不在说明没有权限不予展示

```ts
// 定义全局promise
let globalResolve = null;
const globalPromise = new Promise((resolve) => { globalResolve = resolve; });

Vue.prototype.$globalResolve = globalResolve;
Vue.prototype.$globalPromise = () => globalPromise;
```

```vue
<script>
// 在进入首页时
async created() {
	const [err, data] = await getPermissionInfo() // 获取目前角色对应的权限信息
    if (err) return
    ....
    setRoute(route) // 设置路由表
    setMenu(menu) // 设置菜单
    this.$globalResolve([]);
}
</script>
<script>
// 在具体的业务页时
created () {
    this.$globalPromise().then(() => {
   		... // 做具体逻辑，此时的逻辑会在获取完权限信息后执行
    });
  }
</script>
```

## 限制字数

需求描述：某些地方要限制字数显示，过长用省略号代替，由于`string.length`效果不好（一个中文文字宽度是英文两倍，但还是返回1），一般是通过限制width来进行字数限制，但是在移动端上不同设备分辨率不同可能会导致字数多一个或少一个

```ts
function strLen(str) {
  var len = 0
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i)
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}
// strLen('是是') 4
// strLen('ss') 2
```

## pc模拟移动端双指放大

`chrome`浏览器按住`shift`，鼠标按住左键上下移动即可放大缩小

## 支持换行符或<br/>

```less
white-space: pre-line;
```

## 采集前端类型

前端需要分析请求客户端是：微信H5，小程序环境 或者 外部浏览器 这三种

前端方案类型：小程序嵌入H5页面、H5挂载公众号、APP嵌入H5页面

```ts
let from;
const ua = navigator.userAgent.toLowerCase();
const isWeixin = ua.indexOf('micromessenger') !== -1;
const isInApp = /(^|;\s)app\//.test(ua);
if (isWeixin) {
    if (ua.match(/miniprogram/i) || window.__wxjs_environment === 'miniprogram') 	{
        from = 'mini_program'; // 小程序
    } else {
        from = 'wx_h5'; // h5
    }
} else {
    if (!isInApp) {
        from = 'browser'; // 浏览器
    } else {
        from = 'app'; // app
    }
}
```

## 前后端数字精度以及类型问题

目前架构：前端 => bff => go

金额方面，go传过来的浮点型数字类型，例如12.32传到前端可能变成12.3199999，初始想法是bff做个别参数的转化处理

```ts
// bff: config/config.middleware.ts
export default KoaMiddleware = () => {
    app.use(async function (ctx: Context, next: any) {
        ...
        // 处理浮点型超过两位的数据
        ctx.body = filterNumber(ctx.body)
        
    })
}

const filterNumber(obj: any) => {
  if (!obj) return obj;
  for (const k in obj) {
    if (obj[k] === '0000-00-00 00:00:00') obj[k] = '';
    if (obj[k] && typeof obj[k] === 'object') {
      obj[k] = filterNumber(obj[k]);
      continue;
    }

    // 例外的key
    if (typeof obj[k] !== 'number' || k.includes('num') || k.includes('count') || k.includes('version')) continue;
    // amount 49个
    // rate 24个
    // _interest 12个
    // total_ 16个
    // fee 11 个
    // tax/_tax 9个
    // charge 7个
    // balance 9个
    if (
      ['tax', 'credit_limit'].includes(k) ||
      k.includes('rate') ||
      k.includes('amount') ||
      k.includes('total_') ||
      k.includes('fee') ||
      k.includes('_interest') ||
      k.includes('_tax') ||
      k.includes('_cost') ||
      k.includes('charge') ||
      k.includes('balance')
    ) {
      const n = Number(obj[k]);
      if (isNaN(n)) continue;
      obj[k] = n ? Big(n).toFixed(2) : n;
    }
  }
  return obj;
}
```

该方法存在弊端，有些是整数也被bff转化成了带两位小数如：7 => '7.00'，因为js不能区分整数和浮点数

插：`typeof`是判断是否是数字类型，`isNaN`是看能否转成数字类型，是则返回`false`

目前是通过参数名去区分，但是此种方法历史包裹中，后续新增字段命名限制大，而且不能保证是符合过滤条件的

最终想法：bff统一返回带两位小数的字符串，字符串类型不会丢失精度，前端根据需要在用到部分参数进行类型转化

```ts
// bff: config/config.middleware.ts
export default KoaMiddleware = () => {
    app.use(async function (ctx: Context, next: any) {
        ...
        // 处理浮点型超过两位的数据
        ctx.body = filterNumber(ctx.body)
    })
}
// 不需要转化为字符串类型的参数名
const filterArr = ['total', 'service_mode', 'submit_source', 'contract_state'] 
const filterNumber(obj: any) => {
  if (!obj) return obj;
  for (const k in obj) {
    if (k === 'code') continue;
    if (obj[k] === '0000-00-00 00:00:00') obj[k] = '';
    if (obj[k] && typeof obj[k] === 'object') {
      obj[k] = filterNumber(obj[k]);
      continue;
    }
    if (typeof obj[k] !== 'number' || filterArr.includes(k)) continue;
    const n = Number(obj[k]);
    if (isNaN(n)) continue;
    obj[k] = Big(n).toFixed(2);
  }
  return obj;
}
```

## 导出

```ts
// get请求类型的导出
const exportReport = () => {
    const params = {...}
    window.location.href = `${prefix}/v1/order/export-list?${Qs.stringify(params)}`
}
// post请求类型导出
const exportReport = () => {
	const params = {...}
	exportPost(`${prefix}/v1/contract/export-contract-matching-detail`, params)
}
// src/utils
const exportPost = () => {
   const form = document.createElement('form')
    form.action = url
    form.target = '_self'
    form.method = 'post'
    form.style.display = 'none'
    for (const key in params) {
        const textarea = document.createElement('textarea')
        textarea.name = key
        if (typeof params[key] === 'object') {
            textarea.value = JSON.stringify(params[key])
        } else {
            textarea.value = params[key]
        }
        form.appendChild(textarea)
        console.log(params)
    }

    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
}
```

## IOS安全区域及禁止回弹

html中设置viewport-fit=cover

```html
<meta name="viewport" content="viewport-fit=cover">
<script src="inobounce.js"></script>
```

通过`env(safe-area-inset-bottom)`设置高度或padding-bottom

```css
height: calc(100vh - 47px - env(safe-area-inset-bottom)); // 47是底部导航栏高度，得是确切高度，100%可能不生效
overflow: auto; // overflow和-webkit-overflow-scrolling是引入inobounce.js需要添加的，有些组件例如弹框overflow是scroll需要改成auto才行
-webkit-overflow-scrolling: touch;
```

```css
position: sticky;
position: -webkit-sticky; // 添加前缀
```

## 移动端组件库兼容PC端touch事件

需求背景：H5项目采用了AntD Mobile移动端组件库，但用户可能也会在电脑上进行操作，部分电脑可能出现某些组件无法点击的问题，需要在桌面端模拟移动端`touch`事件

方法：引入touch-emulator.js
