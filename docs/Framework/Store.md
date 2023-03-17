如非必要，不要用状态管理库，例如用redux只存了两部分数据userInfo和listData，而且两种数据都不需要修改，单纯只需要有个地方存储用，不如换成useContext（存储userInfo），SWR（自动缓存列表数据）

不同于列表数据，用户信息在一个访问周期内只会调用一次

SWR：提供了自动重新验证数据是否更新的功能，不用去手动加载新数据

## Vuex

[官网](https://vuex.vuejs.org/zh/guide/)

[Pinia](https://pinia.web3doc.top/)

### mapState和mapGetters

```js
...mapState({
    supplier: state => state.fallback.supplier
})
...mapGetters([
    'supplier'  // supplier只在state里有，没有getter照样可以引进来
])
```

## React Redux

[参考资料](https://taro-docs.jd.com/taro/docs/redux/)

![图片加载失败](assets/5018f42ab810250517a39554b5eebb0.jpg)


## useQuery

大概原理是维护一个缓存cachedMap

监听事件触发useQuery

比较key，key相同则从缓存中取出`const data = cachedMap.get(key)`，不存在则获取，而后存入缓存

### 常规获取远程数据hook

```ts
export const useAsyncFunction = (asyncFunc) => {
    const [state, setState] = useState({})
    
    useEffect(() => {
        asyncFunc()
            .then(data => setState({ data, err: undefined }))
            .catch(err => setState({ data: undefined, err }))
    }, [asyncFunc])
    
    return state
}
export const MyComponent = () => {
    const { err, data } = useAsyncFunction(fetchALLGames)
    // ...
}
```

### 缓存功能hook

添加缓存

```ts
const cache = new Map()

export const useAsyncFunction = (key, asyncFunc) => {
    const [err, setErr] = useState(undefined)
    useEffect(() => {
        asyncFunc()
            .then(data => {
                cache.set(key, data)
        	})
            .catch(err => setErr(err))
        })
    }, [key, asyncFunc])
    
    const data = cache.get(key)
    return { err, data }
}
```

允许mutate来更新缓存中的数据

```ts
const mutate = useCallback((data) => void cache.set(key, data), [key])
return { err, data ,mutate }
```

为了提供重新加载功能，把加载的实现提取出来

```ts
const load = useCallback(() => {
    asyncFunc()
    	.then(data => {
        	mutate(data) // 调用mutate代替cache.set
            cache.set(key, data)
        })
        .catch(err => setErr(err))
})

useEffect(load, load) // 仅当组件挂载或props变化时执行

return { err, data, mutate, reload: load }
```

参考资料：https://juliangaramendy.dev/blog/how-swr-works

## 使用useContext存储用户信息

背景：用户信息是调用接口返回的，在有多个入口页的情况下（如点击链接直接进入某某页），入口页之间切换都要调用一遍，选择集中在入口组件`app.tsx`中调用

由于是全局状态且不支持修改，不考虑放在状态管理库中，用`useContext`即可

```tsx
export const UserContext = createContext({})
const App = () => {
    const [userInfo, setUserInfo] = useState({})
    
    const getUserInfo = async () => {
        const [err, data] = await GET_USERINFO()
        // ... 判断有无权限，token等
    }
    
    useEffect(() => {
        getUserInfo() 
    }, [])
    
    return <UserContext.Provider value={userInfo}>
        ...
    </UserContext.Provider>
}
```

```tsx
// 入口页
export const MyPage = () => {
    const userInfo = useContext(UserContext)
    
    useEffect(() => {
        if (!userInfo.id) return
    }, [userInfo.id])
}
```

