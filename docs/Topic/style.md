好的规范不会让使用者感到约束，而是帮助他们快速定位问题，会提升开发效率

为什么要代码规范：技术是要在能解决问题的同时方便你我他的，不是用来胡乱炫技的，好的代码规范排查问题更容易，比如有的函数过程复杂，一长串代码，没有注释，每个函数每个变量都要上下跳动才能明白来龙去脉，对于没接触过这片代码的人，看懂代码花费的时间以及改完之后检查会不会影响其它范围花的时间可能比改代码本身更多

## if - else

原则： 尽可能地维持正常流程代码在最外层

```ts
// 异常情况只有一种
const { code, data } = await GET_USER_LIST()
if (code === 0) { // code为0是成功
    setUserList(data.items)
}
// 替换为
if (code !== 0) return
setUserList(data.items)
// 多个if-else改用switch或多个if
```

## 抽离公共逻辑

思想：做后台管理的项目过程中，很多页面的逻辑都是相似的，列表、新增或修改弹窗、删除等，因此可以抽离出一套模板来，新增页面时，只需要复制整套模板过去再进行细节上的加减，包括很多命名，如果不是特定于该页面的存在，命名要考虑通用性

```tsx
// intex.tsx
const XXXPage = () => {
    const [detailModalVisible, setDetailModalVisible] = useState('') // 新增或修改弹窗
    const getList = () => {} //  获取xxx列表可以统一命名为getList
    return <div className='page-box'>
        <div className='tab-box'></div> // 页签切换
        <div className='form-box'></div> // 列表查询条件
        <div className='button-box'></div> // 列表按钮，查询、清空、导出等
        <div className='table-box'></div> // 列表
        <DetailModal
            visible={detailModalVisible}
            detailInfo={detailInfo}
            close={() => setDetailModalVisible(false)}
            refresh={getList} /> // 新增或修改成功后刷新列表
    </div>
}
// api.ts
import { get, post } from '@/request'

// 获取列表
export const GET_LIST = async (params = {}): Promise<any> => {
    return get('/v1/limit-config/list', { params }).then((res): any => res)
}

// 详情
export const GET_DETAIL = async (params = {}): Promise<any> => {
    return get('/v1/limit-config/detail', { params }).then((res): any => res)
}

// 删除
export const DELETE = async (params = {}): Promise<any> => {
    return get('/v1/limit-config/del', { params }).then((res): any => res)
}

// 新增
export const ADD = async (params = {}): Promise<any> => {
    return post('/v1/limit-config/create', params).then((res): any => res)
}

// 修改
export const EDIT = async (params = {}): Promise<any> => {
    return post('/v1/limit-config/edit', params).then((res): any => res)
}
```

## 能用中文表示则用中文表示

如下，`activeTab`只是个切换页签的值，也不需要传给后端，没必要用数字表示

```tsx
const [activeTab, setActiveTab] = useState('会签归档')
<Radio.Group
    value={activeTab}
    size='large'
    buttonStyle='solid'
    onChange={(e) => setActiveTab(e.target.value)}
    >
    <Radio.Button value='会签归档'>会签归档</Radio.Button>
    <Radio.Button value='会签终止'>会签终止</Radio.Button>
</Radio.Group>
{activeTab === '会签归档' && ...}
{activeTab === '会签终止' && ...}
```

对于需要和后端通信的字段也不要用数字表示，在接收后转化成中文字符串，发送请求前转化成数字

```ts
export const optionsItems = [
    {text: '普通类型', value: 0 },
    {text: '高级类型', value: 1 },
    {text: '特殊类型', value: 2 },
]
export const formatValue = (items, text) => items.find((item) => item.text === text).value;
export const formatText = (items, value) => items.find((item) => item.value === value).text;
const [err, data] = await getDetail({
	type: formatValue(type),
});
// 方便知道定义和维护，不然改代码还要去查每个这种字段的对应的中文意思
<div v-if="type === '普通类型'">...</div>
```

## 函数功能纯粹

```tsx
const getOrgList = async () => {
    setLoading(true); // 严格来说，加载动画也不应该在这里面，提高复用性
    const [err, data] = await GET_ORG_LIST();
    setLoading(false);
    setOrganizationList(err ? [] : data.items);
};

return <div onClick={() => {
              setShowOrgList(true) // 打开选择弹框的操作不应该在getOrgList里
              getOrgList()
            }}>选择租户
	</div>
```





