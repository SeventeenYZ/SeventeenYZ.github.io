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