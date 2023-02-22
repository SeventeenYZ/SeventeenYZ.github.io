[官网](https://beta.reactjs.org)

## 声明计算属性

```ts
const [amount1, setAmount1] = useState(0)
const [amount2, setAmount2] = useState(0)
const totalAmount = useMemo(() => amount1 + amount2, [amount1, a mount2]) // 相当于vue的computed
const totalAmount = amount1 + amount2 // 和useMemo区别是触发渲染会重新计算
```

## useRef

可以读取或写入，写入时不会触发渲染，当修改值不需要重新渲染时，使用`useRef`节省开销

```ts
const ref = useRef(0) // ref.current = 0
```

## <Fragment>(<></>)

相当于`Vue`的<template>，<Fragment>大多数情况下等同于<></>，区别在于渲染列表时，<></>不能设定key而<Fragment>可以
