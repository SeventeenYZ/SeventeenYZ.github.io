如非必要，不要用状态管理库，例如用redux只存了两部分数据userInfo和listData，而且两种数据都不需要修改，单纯只需要有个地方存储用，不如换成useContext（存储userInfo），SWR（自动缓存列表数据）

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
