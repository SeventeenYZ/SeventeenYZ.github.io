[官网](https://feature-sliced.design/docs/intro)

## 介绍

**Feature-Sliced Design** (FSD)是一种架构方法论用来搭建前端应用的脚手架，简单地说， 它设立了对代码组织的规则与约定。这个方法论的主要目的是为了让项目更容易理解，以及设定一个结构用来应对不断变化的业务需求。

![FSD](assets/visual_schema-ca092cc631de8c129dfb48174d0a927a.jpg)

### Layers

1. **Shared** — 可复用的功能，独立于项目或业务的细节
2. **Entities** — 业务实体 (例如用户、产品、订单）
3. **Features** — 逻辑层，响应用户操作的逻辑
4. **Widgets** — 组合层，用来连接Entities层和Features层
5. **Pages** — 组合层，通过Entities层、Features层和Widgets层组合成整个页面
6. **Processes** — 跨页面场景 (例如身份验证、支付）.
7. **App** — 初始化、应用层面上的设置、样式和`store`（`redux`、`vuex`等）

### Slices

例如`user`、`post`、`comment`，按照业务模型划分代码，一层的slice不能使用同一层的slice

### Segments

比较通用的划分是`ui`、`model`、`api`和`lib`，可根据情况省略或添加

- `ui` - UI层
- `model` - 业务逻辑 *(store, effects/actions, hooks/contracts,...)*
- `lib` - 辅助库、辅助函数
- `api` - 与API的交互逻辑
- `config` - 应用程序的配置模块和它的环境

在大多数情况下，建议仅将API和配置放在**Shared**层中

### 结构

```python
└── src/
    ├── app/                    # Layer: App
    |                           #
    ├── processes/              # Layer: Processes (可选)
    |   ├── {some-process}/     #     Slice: (例如购物车支付、身份验证逻辑)
    |   |   ├── lib/            #         Segment: 工具函数等
    |   |   └── model/          #         Segment: 业务逻辑
    |   ...                     #
    |                           #
    ├── pages/                  # Layer: Pages
    |   ├── {some-page}/        #     Slice: (例如用户页面)
    |   |   ├── lib/            #         Segment: 工具函数等
    |   |   ├── model/          #         Segment: 业务逻辑
    |   |   └── ui/             #         Segment: UI
    |   ...                     #
    |                           #
    ├── widgets/                # Layer: Widgets
    ├── {some-widget}/          #     Slice: (例如头部组件)
    |   |   ├── lib/            #         Segment: 工具函数等
    |   |   ├── model/          #         Segment: 业务逻辑
    |   |   └── ui/             #         Segment: UI
    ├── features/               # Layer: Features
    |   ├── {some-feature}/     #     Slice: (例如手机号验证功能)
    |   |   ├── lib/            #         Segment: 工具函数等
    |   |   ├── model/          #         Segment: 业务逻辑
    |   |   └── ui/             #         Segment: UI
    |   ...                     #
    |                           #
    ├── entities/               # Layer: Entities
    |   ├── {some-entity}/      #     Slice: (例如实体User)
    |   |   ├── lib/            #         Segment: 工具函数等
    |   |   ├── model/          #         Segment: 业务逻辑
    |   |   └── ui/             #         Segment: UI
    |   ...                     #
    |                           #
    ├── shared/                 # Layer: shared
    |   ├── api/                #         Segment: API请求的逻辑
    |   ├── config/             #         Segment: 应用层面配置
    |   ├── lib/                #         Segment: 全局函数
    |   └── ui/                 #         Segment: UI库、公共组件
    |   ...                     #
    |                           #
    └── index.tsx/              #
```

## 分解示例

例如一个社交网络应用

- `app/` 包含了路由配置，` store`和全局样式
- `processes/` 包含了身份验证模块，负责读写token
- `pages/` 包含应用中每个页面的路由组件， 主要是各个自定义组件拼成的页面，几乎没有逻辑

在应用中，有一个新闻推送模块中的文章卡片

- `widgets/` 包含了”组装好的“的文章卡片，带着内容和交互按钮（能够调用后端接口）
- `features/` 包含了卡片的交互逻辑（例如按钮）
- `entities/` 包含了卡片的壳，插槽内容和交互元素

例如一个todoApp

#### Pages

1. `TasksListPage` - 任务列表页
   - 查看任务列表
   - 去某个任务详情页
   - 标记某个任务完成 / 未完成
   - 过滤任务列表
2. `TaskDetailsPage` - 任务详情页
   - 查看任务详情信息
   - 把任务标记为完成 / 未完成
   - 返回到任务列表

方法：提取公共实体（Task）与公共方法（标记任务是否完成）

#### Features (用户能做什么操作：标记和过滤)

- `<ToggleTask />` - (组件) 标记任务是否完成
- `<TasksFilters/>` - (组件) 过滤任务列表

#### Entities

- `<TaskCard />` - (组件) 任务卡片，带着信息展示
- `getTasksListFx({ filters })` - (effect) 带参获取任务列表
- `getTaskByIdFx(taskId: number)`- (effect) 通过id获取任务详情

#### Shared

- `<Card />` - UI库组件
- `getTasksList({ filters })` - (api) 带参获取任务列表
- `getTaskById(taskId: number)` - (api) 通过id获取任务详情

```TSX
// (shared)         => (entities)  + (features)     => (pages)
<Card> + <Checkbox> => <TaskCard/> + <ToggleTask/>  => <TaskPage/>
```

#### (entities) Task card

```tsx
entities/task/ui/task-row/index.tsx
import { Link } from "react-router-dom";
import cn from "classnames"; 
import { Row } from "antd";

export const TaskRow = ({ data, titleHref }: TaskRowProps) => {
    return (
        <Row className={cn(styles.root, { [styles.completed]: data.completed })}>
            {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
        </Row>
    )
}
```

#### (entities) 获取任务列表

```tsx
entities/task/model/index.ts
import { createStore, combine, createEffect, createEvent } from "effector";
import { useStore } from "effector-react";

import { TaskApi } from "shared/api";
import type { Task } from "shared/api";

const getTasksListFx = createEffect((params?: TaskApi.GetTasksListParams) => {
  return TaskApi.getTasksList(params);
});

export const $tasks = createStore<Task[]>([])
  .on(getTasksListFx.doneData, (_, payload) => ...)

export const $tasksList = combine($tasks, (tasks) => Object.values(tasks));
```

#### (pages) 连接各个组件和函数组成页面

```tsx
pages/tasks-list/index.tsx
import { useEffect } from "react";
import { useStore } from "effector";
import { Layout, Row, Col, Typography, Spin, Empty } from "antd";

import { TaskRow, taskModel } from "entities/task";
import styles from "./styles.module.scss";

const TasksListPage = () => {
  const tasks = useStore(taskModel.$tasksList);
  const isLoading = useStore(taskModel.$tasksListLoading);
  const isEmpty = useStore(taskModel.$tasksListEmpty);

  useEffect(() => taskModel.getTasksListFx(), []);

  return (
    <Layout className={styles.root}>
      <Layout.Toolbar className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks List</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilters />
    	</Row>
      </Layout.Toolbar>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {isLoading && <Spin size="large" />}
          {!isLoading && tasks.map((task) => (
            <Col key={task.id} span={24}>
              <TaskRow
                data={task}
                titleHref={`/${task.id}`}
                before={<ToggleTask taskId={task.id} withStatus={false} />}
              />
            </Col>
          ))}
          {!isLoading && isEmpty && <Empty description="No tasks found" />}
        </Row>
      </Layout.Content>
    </Layout>
  );
};
```

#### (entities) 切换任务状态

```tsx
entities/task/model/index.ts
export const toggleTask = createEvent<number>();

export const $tasks = createStore<Task[]>(...)
  ...
  .on(toggleTask, (state, taskId) => produce(state, draft => {
    const task = draft[taskId];
    task.completed = !task.completed;
    console.log(1, { taskId, state, draft: draft[taskId].completed });
  }))

export const useTask = (taskId: number): import("shared/api").Task | undefined => {
  return useStoreMap({
    store: $tasks,
    keys: [taskId],
    fn: (tasks, [id]) => tasks[id] ?? null
  });
};
```

#### (features)  任务的勾选框

```tsx
import { Checkbox } from "antd"; // ~ "shared/ui/checkbox"
import { taskModel } from "entities/task";

export const ToggleTask = ({ taskId }: ToggleTaskProps) => {
    const task = taskModel.useTask(taskId);
    if (!task) return null;

    return (
        <Checkbox 
            onClick={() => taskModel.toggleTask(taskId)} 
            checked={task.completed}
        />
    )
}
```

#### (entities) 过滤数据

```tsx
entities/task/model/index.ts
export type QueryConfig = { completed?: boolean };

const setQueryConfig = createEvent<QueryConfig>();

export const $queryConfig = createStore<QueryConfig>({})
  .on(setQueryConfig, (_, payload) => payload)

export const $tasksFiltered = combine(
  $tasksList,
  $queryConfig,
  (tasksList, config) => {
    return tasksList.filter(task => (
      config.completed === undefined ||
      task.completed === config.completed
  ))},
);
```

#### (features) UI控制过滤

```tsx
features/tasks-filters/ui.tsx
import { useStore } from "effector";
import { Radio } from "antd";

import { taskModel } from "entities/task";
import { filtersList, getFilterById, DEFAULT_FILTER } from "./config";

export const const TasksFilters = () => {
  const isLoading = useStore($tasksListLoading);

  return (
    <Radio.Group defaultValue={DEFAULT_FILTER} buttonStyle="solid">
      {filtersList.map(({ title, id }) => (
        <Radio.Button
          key={id}
          onClick={() => taskModel.setQueryConfig(getFilterById(id).config)}
          value={id}
          disabled={isLoading}
        >
          {title}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
```

#### (pages) 任务详情页

```tsx
pages/task-details/index.tsx
import { ToggleTask } from "features/toggle-task";
import { TaskCard, taskModel } from "entities/task";
import { Layout, Button } from "antd"; // ~ "shared/ui/{...}"
import styles from "./styles.module.scss";

const TaskDetailsPage = (props: Props) => {
    const taskId = Number(props.match?.params.taskId);
    const task = taskModel.useTask(taskId);
    const isLoading = useStore(taskModel.$taskDetailsLoading);

    useEffect(() => taskModel.getTaskByIdFx({ taskId }), [taskId]);

    if (!task && !isLoading) {
        return ...
    }

    return (
        <Layout className={styles.root}>
            <Layout.Content className={styles.content}>
                <TaskCard
                    data={task}
                    size="default"
                    loading={isLoading}
                    className={styles.card}
                    bodyStyle={{ height: 400 }}
                    extra={<Link to="/">Back to TasksList</Link>}
                    actions={[
                        <ToggleTask key="toggle" taskId={taskId} />
                    ]}
                />
            </Layout.Content>
        </Layout>
    )
};
```

## 原则

每一层的模块不能使用同层或上层的其它模块，修改一层只会影响到它的上层，不会影响同层和下层

使用下层的模块的时候，不必知道它的内部实现逻辑

## 增量采用

旧项目如何迁移到FSD

1. 建立`app`和`shard`
2. UI层代码分配到 `widgets` 和`pages`，即使他们有违反FSD规则的依赖项
3. 逐渐分离 `features` and `entities`，将 `widgets` 和`pages`从逻辑承载层转换为纯组合层

当重构或只重构项目的某一部分时，建议避免新增一些大的实体

## 总结

1. 很多时候`widgets`层和`page`层是严格绑定的，如果是比较通用的更适合作为公共组件，如果是只绑定单一页面的组件，在`page`层另开个`components`目录更合适
2. 很多场景下前端的`entities`层只是薄薄的一层，顶多是些类型定义，在特定`page`层下另开个`type.d.ts`文件更合适
3. `feature`层很多代码是绑定于框架的，如果只将于框架无关的代码单独抽离出来，代码量不减反增（例如函数先展示loading，调用接口结束后还要关闭弹窗），这样其实还要额外传值，并且会导致有些数据不能作为`page`下的本地数据，而是放在`store`的某个`slice`中作为全局数据，不然feature层访问不到
4. 逻辑承载最多的还是在页面层，无论怎么分离，如果页面层的逻辑写得乱都是无用功，相比应用这些架构，页面注释得体、命名规范等带来的收益有时候还更多一些

用react开发举例：

变量命名能归类的进行归类，不能一眼看出意思的要添加注释

useEffect不一定写在最后面，如果需要进来页面就运行的放在前面

jsx里绑定的函数尽量能单个函数解决，避免嵌套调用

className命名，外层的用`xxx-box`命名，里面可以是`xxx-title`，`xxx-header`，`xxx-content`，css文件的书写以`xxx-box`为维度，这样避免杂乱，例如最外层的叫`page-box`，里面分`page-aside`、`page-header`和`page-content`等，让css看起来也是一个个box拼装起来

文字样式的命名用`text-xxx`等，例如`text-blue`、`text-bold`

```vue
<template>
  <div class="page-title">{{ msg }}</div>

  <div class="card-box">
    <button type="button" @click="count++">count is {{ count }}</button>
    <div class="card-content">
      Edit
    </div>
  </div>
</template>
<style scoped>
.page-box {
  ...
}
.card-box {
    ...
}
.xxx-box {
	...
}
</style>
```



```tsx
    // 表格相关
    const [tableLoading, setTableLoading] = useState(true)
    const [tableData, setTableData] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [total, setTotal] = useState(0)
    // 表单相关
    const [roleList, setRoleList] = useState([])
    const [roleId, setRoleId] = useState('')
    const [orgList, setOrgList] = useState([])
    const [orgId, setOrgId] = useState('')
    const [projList, setProjList] = useState([])
    const [projId, setProjId] = useState('')
    // 弹窗相关
    const [userModalVisible, setUserModalVisible] = useState(false)
    const [deleteModalVisible, setDeleteModalVisible] = useState(false)
    const [lockModalVisible, setLockModalVisible] = useState(false)
```

## 脚手架CLI目录

```python
└── src/
    ├── assets/                 # 静态资源：images、css、js
    |                           #
    ├── components/             # 公共组件
    |   ├── {CMNavBar}/         #
    |   index.ts                # 统一导出
    |                           #
    ├── pages/                  # 页面
    |   ├── {some-page}/        #     例如订单页面
    |   |   ├── index.vue       #         业务逻辑、样式
    |   |   ├── data.ts         #         常量定义、功能函数（formatTime）,相当于集合了薄薄的feature层和entities层
    |   |   └── type.d.ts       #         类型定义（订单类型）
    |   |   └── api.ts          #         特属于此页面的api接口
    |   |   └── components      #         页面组件（弹窗等），如果是vue的话直接建.vue文件
    | 	|   |   └── xxx.vue     #         如警告弹窗warnModal.vue、页面头部headerBox.vue
    |   ...                     #
    |                           #
    ├── api/                    # 请求：接口配置、拦截器、特殊错误处理、公共接口
    |    ├── index.ts           #     接口基础配置
    |    ├── common-api.ts      #     公共接口
    |    ├── interceptor.ts     #     拦截器配置
    ├── store/                  # 状态管理
    |   ├── some-slice.ts/      #     某个页面状态
    |   ├── common-slice.ts/    #     公共状态（用户信息等）
    |   ├── index.ts/           #     基础配置
    |   ...                     #
    |                           #
    ├── utils/                  # 工具：正则校验、路由表、全局函数、后端字段map映射表等
    |   ...                     #
    |                           #
    └── index.tsx/              #
```

### 说明

①  `store`也可像`router`一样集成进`utils`文件夹中（单独一个ts文件或者store文件夹都可以），`some-slice.ts`放到各自页面

②  移动端可能按`tab`分好一些，有独立于`tab`的页面看能不能归类成和`tab`同级，否则往下一级跟实际页同级

页面代码过于混乱，复杂（一个`.tsx`或`.vue`文件近千行，包含了几十个函数）的处理办法：

①  分而治之：一个页面拆分成多个组件独立维护，命名区分，构成页面的组件用Box后缀，弹框用Modal后缀，页面组件单独维护部分变量和函数

②  保留核心逻辑：代码乱的很大一部分原因是判断、数据转化、校验等逻辑比较多（有句玩笑叫100行代码98句是防止用户乱输入），可以只保留核心的业务逻辑代码，其余杂活放到`data.ts`中处理，特别是复杂数据处理函数，抽离后方便确定函数的最小依赖，方便维护
