[Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)  
[参考资料1](https://dev.to/bespoyasov/clean-architecture-on-frontend-4311)  
[参考资料2](https://herbertograca.com/2017/11/16/explicit-architecture-01-ddd-hexagonal-onion-clean-cqrs-how-i-put-it-all-together/#components)  
[项目参考](https://github.com/bespoyasov/frontend-clean-architecture)

除了Clean Architecture，还有Hexagonal Architecture、Onion Architecture、Screaming Architecture、DCI、BCE等系统架构，它们都非常相似，核心观点都是关注点分离，分层（计算机领域经典名言：没有什么是多加一层解决不了的）

这些架构思想形成了一种系统：

1、不依赖于特定框架和库，框架和库只是构建系统的工具

2、可测试，测试业务逻辑（最内层）不依赖UI、数据库、Web服务器和其它任何外部因素（这些都是最外层）

3、独立与任何外层（UI、数据库），即修改它们不会影响系统其它部分，如Vue2升级Vue3、Mongo替换MySQL

总体思想就是内层逻辑不依赖外层，修改外层也不会影响到内层，但是外层运行依赖内层，内层不可以知道外层任何事情，外层声明的变量、函数等也不能在内层里用，而外层得用内层提供的变量、函数等，这样才能保证外层不会影响到内层，内层不直接调用外层的数据，而是调用接口，这个接口由外层去实现

## domain层
也叫Business Layer业务层，用实体和数据描述领域，核心业务，与UI层使用框架（React、Vue等)无关

domain层包含entities（实体）和use cases（用例函数）

### entities
封装着企业范围的业务规则，可以是具有方法的对象，可以是一组数据结构和函数，只要可以被企业中的不同应用程序使用就行，以商店系统举例，entities可以是用户、商品、购物车、订单等，包括数据类型，创建实体的工厂，以及改变这些实例数据的函数

### use cases
会转换实体数据的函数，描述了一类场景，添加购物车、计算总额，功能是负责响应事件发生后对应去做某件事，逻辑对外层屏蔽，只返回结果

use cases层输出（数据和函数）和UI层打交道，输入（获取数据）和services层打交道

 ## Interface Adapters

在前端，通常是UI层和services层

### UI层
组合各个组件拼成页面，并绑定事件调用use cases层提供的用例函数，并获取调用结果，改变UI层代码（如Vue迁移到React）不会影响use cases层和domain层

UI层（也有的叫Presentation Layer表现层）只做纯粹的数据展示和函数绑定，消费services层提供的数据、触发use cases层的用例函数

例如结账页面，点击结账按钮 => 检索购物车 => 调用生成订单接口 => 支付订单 => 如果失败则通知用户 => 清空购物车并展示订单

从检索购物车到支付订单只需要调用use cases提供的用例函数，该用例函数专门描述结账场景，而UI层只需要在用户结账按钮去调用触发这个用例函数，并且响应结账结果即可

### services层
负责提供服务和数据（请求接口、转化数据提供给ui层等），外部服务需要和我们需求相适配，如果不适配那么需要一个适配器（即派生出一个Adapter层），我需要什么样的数据，外层服务就给我做成什么样

网上关于Clean Architecture的文章，划分的层次名称与层级不一定相同，但大体思想是一样的

```ts
export function useAddToCart() {
  const storage: CartStorageService = useCartStorage();

  // 用例函数：添加到购物车
  function addToCart(user: User, product: Product): void {
    const { cart } = storage; // 获取购物车
    const updated = addProduct(cart, product); // 获取添加购物车后的最新值
    storage.updateCart(updated); // 更新购物车
  }

  // 提供给UI层的"添加到购物车"按钮绑定
  return { addToCart };
}
```
