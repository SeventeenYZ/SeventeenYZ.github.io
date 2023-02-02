## 核心实现（hash模式）

例如：`xxx.com/index.html/#/order`

不同页面对应#后面的url不一样，hash改变的时候，浏览器会暴露`hashchange`事件，这样我们就可以监听该事件，去展示不同`UI`而不用刷新整个页面

```ts
class Router {
    constructor(routes = []) {
        this.routes = routes // 路由映射
        this.currentHash = ''
        this.refresh = this.refresh.bind(this)
        window.addEventListener('load', this.refresh, false)
        window.addEventListener('hashchange', this.refresh, false)
    }
    
    getUrlPath(url) { // 获取hash
        return url.includes('#') ? url.slice(url.indexOf('#') + 1) : '/'
    }
    
    refresh(event) {
        // URL hash改变时，获取新的hash显示对应的component
        let newHash = '', oldHash = null
        if (event.newURL) {
            oldHash = this.getUrlPath(event.oldURL || '')
            newHash = this.getUrlPath(event.newURL || '')
        } else {
            newHash = this.getUrlPath(location.hash)
        }
        this.currentHash = newHash
        this.matchComponent()
    }
    
    matchComponent() {
        let curRoute = this.routes.find(route => route.path === this.currentHash)
        if (!curRoute) {
            curRoute = this.routes.find(route => route.path === '/')
        }
        const { component } = curRoute
        document.querySelector('#content').innerHTML = component
    }
}

const routes = new Router([
    { path: '/', name: 'home', component: '<div>首页</div>'}
    { path: '/order', name: 'order', component: '<div>订单页</div>'}
])
```

## 核心实现（history模式）

基于浏览器的history对象，有go、forward、back、pushState、replaceState等方法

而history路由的实现，主要就是依靠于pushState与replaceState实现的，它们都会改变url，但不会刷新页面

```ts
window.addEventListener('pushState', e => {
    // 拿到pushState的参数，做出对应的页面渲染，处理思路与hash相似
    console.log(...e.args)
})
```

## Vue Router

[官网](https://router.vuejs.org/installation.html)

### 动态路由匹配

```js
 // 动态路径参数 以冒号开头
{ path: '/user/:id', component: User }
```

`/user/foo` 和 `/user/bar` 都将映射到相同的路由，动态参数会被存到`this.$route.params`对象中

### 嵌套路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        // 当 /user/:id 匹配成功，
        // UserHome 会被渲染在 User 的 <router-view> 中
        { path: '', component: UserHome }
        // 当 /user/:id/profile 匹配成功，
        // UserProfile 会被渲染在 User 的 <router-view> 中
        { path: 'profile', component: UserProfile },
        // ...其他子路由
      ]
    }
  ]
})
```

### 编程式导航

```js
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效，这也是路由表设置name属性的用处
router.push({ path: '/user', params: { userId }}) // -> /user
```

### 命名视图

如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo, // 当匹配到'/'路径时，Foo组件渲染到default视图
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### 路由守卫

```js
// 全局守卫
beforeEach (to, from, next)
beforeResolve (to, from, next)
afterEach (to, from)
// 路由守卫
beforeEnter (to, from, next)
// 组件守卫
beforeRouteEnter (to, from, next)
beforeRouteUpdate (to, from, next)
beforeRouteLeave (to, from, next)
```

### 导航解析流程

```js
1.触发路由导航
2.在要离开路由的组件中调用 beforeRouteLeave
3.调用全局 beforeEach
4.在重用的组件里调用 beforeRouteUpdate
5.调用在路由配置里的 beforeEnter
6.解析异步路由组件
7.在将要进入的路由组件中调用 beforeRouteEnter
8.调用全局 beforeResolve
9.导航确认完成
10.调用全局 afterEach
11.触发 DOM 更新
12.执行 beforeRouteEnter 中传给 next 的回调函数。
```

## React Router

### 简单的路由鉴权

需求描述：权限工作台菜单只有接口返回的用户信息中标识为超管才有权限访问

项目背景：项目采用了`react-router-config`静态路由配置

难点：获取用户信息接口之后再去配置菜单和路由，如果路由表是只在`app.tsx`中渲染，那么不知道何时用户信息接口完成

思路：将菜单和路由的配置放在获取用户信息接口的逻辑中调用

```tsx
// routes.tsx
const routes = [
    { path: '/login', component: Login },
    {
        path: ['/'],
        exact: true,
        render: () => {
            return <Redirect to={'/first-menuItem'} />
        }
    },
    {
        component: Index, // 把菜单和路由的加载放到该页面中
        routes: [
            {
                path: '/secord-menu-item',
                component: SecordMenuItem
            },
            ...
            {
                path: '/last-menu-item',
                component: LastMenuItem,
                admin: true // 标识该路由只有超管权限可访问，菜单列表同理
            },
        ]
    }
]
// app.tsx
import { renderRoutes } from 'react-router-config'
import routes from '/routes'
function App() {
    return (
        <ConfigProvider locale={zhCN}>
            <div className="App">{renderRoutes(routes)}</div> // 渲染最外层路由（Login、Index） 
        </ConfigProvider>
    )
}
// page/index/index.tsx
import { renderRoutes } from 'react-router-config'
import { menuList } from './data' // 全部菜单
import routes from '@/routes' // 全部路由
const Index = () => {
    const [authMenuList, setAuthMenuList] = useState([]) // 权限菜单
    const [authRoutes, setAuthRoutes] = useState([]) // 权限路由表
    useEffect(() => {
        getUserinfo()
    }, [])
    const getUserinfo = () => {
        const [err, data] = await GET_USERINFO()
        if (err) return
        dispatch(setUserinfo(data))
        const { is_admin } = data
        setAuthMenuList(is_admin ? menuList : menuList.filter((item) => !item.admin))
        setAuthRoutes(is_admin ? routes : routes.filter((item) => !item.admin))
    }
    return <div className='page-box'>
        <Menu>
            {authMenuList.map((item) =>....}
        </Menu>
        <div>
            {renderRoutes(authRoutes)}
        </div>
    </div>
}
```

