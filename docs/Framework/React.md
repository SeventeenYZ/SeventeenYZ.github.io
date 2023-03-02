[官网](https://beta.reactjs.org)

## Core Loop

阅读资料：https://www.joshwcomeau.com/react/why-react-re-renders/

React也是状态驱动视图的思想，保持state与UI的同步

React的每次重渲染都是因为state的改变，这是唯一触发重渲染的条件（prop和context的改变不是触发重渲染的因素）

React每次渲染都是一个快照，展示基于当前state的UI，state改变了，React UI通过重新渲染来修改，创建了一个新的快照，它可以通过比较快照找出需要更改的内容

React重渲染规则：当一个组件重渲染时，它底下的所有子孙组件都会进行重渲染

### 关于prop的重渲染

当一个组件触发重渲染时，它会尝试重渲染所有子孙组件，不管传没传prop

这是React有点违反直觉的地方，如果一个触发重渲染的组件，它的子组件没有接收prop，照样也会跟着重渲染呢，哪怕它是纯静态的，原因是对于React来说，很难确定一个组件有没有直接或间接地受到state改变的影响，如果一个子组件有很多的prop但是没有太多的子孙组件，与直接重新渲染相比，检查哪些prop发生变化并针对性地去渲染会更慢

在理想状态下，React组件都是纯粹的，相同的prop返回的UI一定是相同的，然而在现实情况下，有很多组件是不纯粹的，例如

```tsx
function currentTime() {
    const now = new Date()
    return (
    	<p>It is currently {now.toString()}</p>
    )
}
```

这个组件在任何时候渲染都会展示不一样的值，因为它依赖于当前时间

还有一种情况比如传递一个ref作为prop，React很难分辨需不需要进行重渲染，为了保险起见，它会选择重渲染，因为React的第一原则就是确保用户看到的UI与state保持同步，所以即便可能渲染是无意义的，它也会进行重新渲染

### 纯静态组件的重渲染

React为什么不跳过纯静态组件的重渲染：我们容易高估重渲染的成本，对于React来说，渲染纯静态组件是非常快且成本极小的

## useMemo and useCallback

阅读资料：https://www.joshwcomeau.com/react/usememo-and-usecallback/

## 声明计算属性

```ts
const [amount1, setAmount1] = useState(0)
const [amount2, setAmount2] = useState(0)
const totalAmount = useMemo(() => amount1 + amount2, [amount1, amount2]) // 相当于vue的computed
const totalAmount = amount1 + amount2 // 和useMemo区别是触发渲染会重新计算
```

## useRef

可以读取或写入，写入时不会触发渲染，当修改值不需要重新渲染时，使用`useRef`节省开销

```ts
const ref = useRef(0) // ref.current = 0
```

## Fragment (<>...</>)

相当于`Vue`的`<template>`，`<Fragment>`大多数情况下等同于`<>...</>`，区别在于渲染列表时，`<>...</>`不能设定key而`<Fragment>`可以
