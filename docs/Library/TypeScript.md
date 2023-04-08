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

泛型Generics：使用参数的类型，为了实现类型复用

```ts
funticon identity<T>(arg: T): T { return arg }

// 当调用的时候，type system会自动根据传参类型推断返回值类型
const output = identity('myString') // output是string类型
```

`<Type>`声明一个类型参数，在输入值和输出值中使用，创建一个关联，可以看成任何类型，`<>`是声明形式，里面值可以用其它名称，如`<Type>`、`<Input>`

### 泛型接口的用法

```ts
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

const myIdentity: GenericIdentityFn<number> = identity
```

### keyof

```ts
type Point = { x: number, y: number }
type P = keyof Point // p的类型是"x | y"
```

和映射类型mapped types搭配会很有用

## typeof

```ts
let s = 'hello'
let n: typeof s // 推断出n是string类型
```

typeof对于基本类型没什么用，一般结合其它类型运算符使用

```ts
type Predicate = (x: unknown) => boolean
type K = ReturnType<Predicate> // 推断出K是boolean类型
```

`ReturnType<T>`是预定义类型predefined type

### typeof的用法

```ts
function f() { return true }
type P = ReturnType<typeof f>
```

上面的`ReturnType`不能直接传f，因为函数f是一个值，值和类型两个不同的东西，`ReturnType`要传类型而不是值

## Index Access Types

### 对象索引

```ts
type Person = { age: number; name: string; alive: boolean }
type Age = Person['age'] // 推断出Age是number类型
type I1 = Person["age" | "name"] // I1 = string | number
type I2 = Person[keyof Person] // I2 = string | number | boolean
type AliveOrName = "alive" | "name"
type I3 = Person[AliveOrName] // I3 = string | boolean
```

### 数组索引

```ts
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
]
type Person = typeof MyArray[number] // Person = { name: string; age: number }
type Age = typeof MyArray[number]["age"] // Age = number
type Age2 = Person["age"] // Age2 = number
```

## Conditional Types

格式为`SomeType extends OtherType ? TrueType : FalseType`

```ts
interface Animal {
  live(): void;
}
interface Dog extends Animal {
  woof(): void;
}
type Example1 = Dog extends Animal ? number : string
// Example1 = number
 
type Example2 = RegExp extends Animal ? number : string;
// Example2 = string
```

条件类型的强大之处在于可以和泛型结合使用

```ts
interface IdLabel {
  id: number
}
interface NameLabel {
  name: string
}
 
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}
```

对于两种类型的输入，需要声明三个重载函数，一个用于number，一个用于string，一个包含两者

而用条件类型搭配泛型可以改成以下不需要重载的形式

```ts
type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

let a = createLabel("typescript") // a = NameLabel
let b = createLabel(2.8) // a = IdLabel
let c = createLabel(Math.random() ? 'hello' : 42) // c = NameLabel | IdLabel
```
