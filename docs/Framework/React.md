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

### re-render和diff的区别

两者发生的时间节点不一样，先re-render后diff
当state改变时，当前组件和所有子孙组件触发re-render
re-render后返回的jsx即新的快照，React拿着这份新的快照去更新dom树的过程是diff

## React的重渲染

`Core Loop`：`initial render` => `React Core do something` => `next render` => `React Core do something` => `next render` ...

React渲染时，调用function返回的JSX就像返回一个可交互的快照（interactive snapshot），然后将快照与屏幕上的UI进行匹配，重渲染就是重新调用一次function，如此循环，渲染就是一个个基于当时`state`生成的一个快照

1. React calls your function again.
2. Your function returns a new JSX snapshot.
3. React then updates the screen to match the snapshot you’ve returned.

`state`改变，排队等候新的渲染 => `React`根据新的`state`值进行重渲染

`React Core do something`：两次渲染之间`React Core`会做一些操作，例如更新`state`

`state`虽然是声明在`function`中，但其实是`function`外部的`React Core`在管理，可以看成`React Core`有一个地方专门存储这些`state`

一次渲染中，`state`是不会变的，`state`改变是通过`setState`函数去通知`React Core`，然后排队等候`React Core`做一些操作后进行新的渲染

这也可以解释官方的一些例子

1. 修改`state`后为什么不能立即获取新的`state`值的原因：因为此时还处在`initial render`的快照中，`state`还是旧的

2. 为什么连续调用三次`setNumber(number + 1)`，是增加1不是增加3：此时还处在`initial render`的快照中，`number`永远都是0，相当于把`number`赋值为1这个操作重复了3次，提交给React Core的新的number值自然是1
3. 放在`setTimeout`也获取不到新的`state`值：`setNumber(number + 5)`，紧接着`setTimeout(() => alert(number), 3000)`，不管延迟多久`alert`的永远是`initial render`里的`number`值

## useMemo and useCallback

因为React的重渲染规则，出来的两个优化的hook，在重渲染时，只当依赖变化时才重新计算返回值

但作为优化的后备手段，React推荐在交互响应慢的时候，排除其它选择或可能的缺陷后才需要用到（If your interactions are fast enough, you don’t need memoization.）

`useCallback(fn, deps)`相当于`useMemo(() => fn, deps)`

```ts
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

`useMemo`：缓存一个计算结果，类似`Vue`的`computed`

`useCallback`：缓存一个函数定义，方便传递给子组件，让子组件跳过重渲染

```ts
const memoValue = useMemo(() => fn, deps) // 返回值memoValue一般是一个变量
const callbackValue = useCallback(fn, deps) // 返回值callbackValue是一个函数
```

阅读资料：https://www.joshwcomeau.com/react/usememo-and-usecallback/

### 声明计算属性

```ts
const [amount1, setAmount1] = useState(0)
const [amount2, setAmount2] = useState(0)
const totalAmount = useMemo(() => amount1 + amount2, [amount1, amount2]) // 相当于vue的computed
const totalAmount = amount1 + amount2 // 和useMemo区别是触发渲染会重新计算
```

## useCallback

在`class component`中，可以使用`extends PureComponent `，当`prop`和`state`不变时，该组件跳过重渲染，而在`function component`中，`useState`的`set function`已经默认当`state`相同时跳过重渲染，而`prop`的优化则用`memo`来实现，传递给`memo`的`function component`会在`prop`相同时会跳过重渲染

`memo`的缺点：父组件中功能函数的定义不管是`function() {}`还是`const xxx = () => {}`，都是一个新函数，因此用`memo`包一层的子组件时是不会跳过重渲染的，因此需要`useCallback`

```tsx
import { memo } from 'react';

// 当prop相同时跳过重渲染，当prop是函数时不生效
const ShippingForm = memo(function ShippingForm({ onSubmit }) { ... });

function ProductPage({ productId, referrer, theme }) {
  // ProductPage每次渲染时，handleSubmit都是一个新创建的函数
  function handleSubmit() { ... }
  
  return (
    <div className={theme}>
      {/* 因此用memo方法的ShippingForm没办法跳过重渲染 */}
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

除了缓存传给子组件的函数外，`useCallback`另一个有价值的地方是当前组件的其它`hook`的依赖为函数时，可以用`useCallback`缓存起来，例如

```tsx
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  function createOptions() {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }
    
 /* const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); */ // 仅当roomId改变时返回新的函数
    
  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]);
 // 如果createOptions不用useCallback缓存起来，那么每次渲染都是新的，造成无限触发
 // 但是更好的写法是将createOptions定义在useEffect里，依赖项为roomId
}
```

### 为什么不所有函数都用useCallback包裹

`function component`中创建内部函数成本是很低的，而用了`useCallback`，每次渲染依然会创建一个新函数，只不过React会忽略它（因为依赖项没有改变）返回一个缓存过的函数，多出了计算依赖项是否改变的计算成本


## useMemo

除了在本组件中充当类似`Vue`的`computed`的作用外，`useMemo`还可以和`useCallback`一样用来跳过子组件的重渲染，传递给子组件的时候，`useCallback`返回值是函数，`useMemo`返回值一般是数组或对象

```tsx
import { useMemo, useCallback } from 'react';

function ProductPage({ productId, referrer }) {
  const product = useData('/product/' + productId);

  const requirements = useMemo(() => { // 缓存函数调用的结果
    return computeRequirements(product);
  }, [product]);

  const handleSubmit = useCallback((orderDetails) => { // 缓存函数本身
   ...
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <ShippingForm requirements={requirements} onSubmit={handleSubmit} />
    </div>
  );
}
```

## useContext

通过`createContext`和`useContext`的配合使用，使得子孙组件可以接收某个上层组件传递的信息（不管隔多少层），类似于`Vue`的`provide`和`inject`

```ts
// 在顶层
const theme = createContext()
// 在底层
const theme = useContext(ThemeContext)
```

## useRef

保存一些和渲染无关的信息，例如DOM节点或timeout ID，修改时不会触发重渲染，当修改值不需要重新渲染时，使用`useRef`节省开销

```ts
const ref = useRef(0) // ref.current = 0
```

## useEvent

保持对函数引用始终一样，包裹这个函数，无论prop或state改变都不会重新创建，而且这个函数可以访问最新的prop和state的最新值

参考资料：https://blog.logrocket.com/what-you-need-know-react-useevent-hook-rfc/

## useEffect

useEffect是为了保持与外部系统同步，例如接口数据，访问DOM等，只涉及到`state`或`prop`等，官方例子：[You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## Fragment (<>...</>)

相当于`Vue`的`<template>`，`<Fragment>`大多数情况下等同于`<>...</>`，区别在于渲染列表时，`<>...</>`不能设定key而`<Fragment>`可以
