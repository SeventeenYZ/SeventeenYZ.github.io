## 关于使用TypeScript

个人看法与这篇文章一致：[编程语言的类型系统并不是核心问题，不要迷信银弹](https://zhuanlan.zhihu.com/p/407711884)

以下摘自作者观点：

不要掉进类型的坑里。类型复杂难以理解的时候直接 any，不要有负罪感和心里负担。因为那不是银弹

`js`的动态类型是故意这样设计的，这样开发效率高

```tsx
type Exclude<T, U> = T extends U ? never : T;
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const InjectColor =
<Props extends { color: string }>(Component: React.ComponentType<Props>): React.ComponentClass<Omit<Props, “color”>> =>
class extends React.Component<Omit<Props, “color”>, any> {
    public render() {
        return <GetColor>{color => <Component {…this.props} color={color} />}</GetColor>;
    }
};
```

这一坨一坨的泛型，比臭名昭著的C++模板还复杂，即便我能理解、有效的使用，团队中的其它人呢？对于软件工程来说，这个风险和成本并不是不用考虑的。这种“类型体操”，多半是危险行为，开发维护成本都很高，并不值得推崇

对于系统的可靠性，**真正重要的是充分的测试、测试、测试**

作者结论：没有银弹，类型系统不是，TypeScript也不是。认真细致的设计、遵守规范的开发，严密充分的测试，才是软件质量的重要保证

## 类型语言

这些概念本身就只是一种通俗的说法，并没有严格的定义，强和弱只是相对的

弱类型：语言提供了大量可以用作类型转换的潜规则，使得运行时大部分类型转换都会成功。从而难以判断是否使用了错误的类型

强类型：类型转换潜规则较少，尽量不允许未授意的类型转换

静态类型：编译时进行数据类型检查

动态类型：运行时才做类型检查



## 字面量类型

``` ts
const handleRequest = (url: string, method: 'GET' | 'POST') {
    ...
}
```

## 非空断言

```ts
function getArea(shape: Shape) {
    return Math.PI * shape.radius! ** 2; // 属性名后加!表示一定不为空
}
```

## 泛型函数

```ts
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

`<Type>`声明一个类型参数，在输入值和输出值中使用，创建一个关联