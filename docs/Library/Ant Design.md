## Table

### table的column配置

可以只设置key或只设置dataIndex，（都设置的话会以dataIndex为主）

有render的话两者都可，没有render的话要有dataIndex

```tsx
 {
            title: '款项金额',
            key: 'commission_amount', // 如果是key，record就是列表行对象
            render: (record: any) => (
                <>
                    <span>{record.commission_amount}</span>
                </>
            )
        },
```

```tsx
 {
            title: '款项金额',
            dataIndex: 'commission_amount', // 如果是dataIndex，此时record就是想取的值
            render: (record: any) => (
                <>
                    <span>{record}</span>
                </>
            )
        },
```

### 树状表格

expandable里设置childrenColumnName，但不能指定子表格的rowKey
对于父子表格key不同的用不了，如父表格rowKey是县id，子表格rowKey是镇id
解决办法，expandedRowRender自定义渲染

展开子表格时最下方出现滚动条原因：设置子表格左和上两个边距，使其对齐父表格左上角后，再设置子表格的右边距，让子表格能获得的最终宽度和父表格除第一列（展开收缩按钮列）外其余列之和相同，这样表格内部自适应分配宽度后，子表格和父表格刚好能够对齐并且没有滚动条

```tsx
<Table
  columns={columns}
  dataSource={tableData}
  bordered
  rowKey='county_id'
  scroll={{ x: '1000' }}
  expandable={{
  //  childrenColumnName: 'townList' // pass,通过townList数组来渲染，但不能指定rowKey为town_id
      expandedRowRender,
      rowExpandable: (record) => record.townList && record.townList.length
  }}
  pagination={{
                      showSizeChanger: false,
                      total: total,
                      current: pageIndex,
                      pageSize: PAGE_SIZE,
                      onChange: async (currentPageIndex: number) =>
                        Promise.resolve(getTableList(currentPageIndex))
    }} />
 const expandedRowRender = (record) => {
        const columns = [
            {
                title: '镇名',
                dataIndex: 'town_name',
                key: 'town_name',
                width: 200
            },
        	... // 父表格有定义width的项都要定义width，为了对齐父表格
            {
                title: '上交时间',
                key: 'created_on',
                dataIndex: 'created_on' 
            }
        ]

        return (
          <Table
            className={styles['expand-table-box']}
            showHeader={false}
            columns={columns}
            rowKey='project_id'
            dataSource={record.projects}
            pagination={false}
          />
        )
    }
 
 const columns = [...] // 父表格的columns定义，格式与子表格一样
 // index.less
.expand-table-box {
	padding: 0 10px 0 8px; // 为了让子表格对齐父表格
    margin-top: 10px;                  
}
```

## 三层多选框

按照父模块 => 子模块 => 权限点的三级结构进行勾选

```tsx
const getData = () => {
    const [err, data] = await getXXXData({...})
    if (err) return
    transformAuthList(data.items)
}

 const transformAuthList = (list: IAuthority[]) => {
        list.forEach((item: IAuthority) => {
            item.checkedList = []
            item.indeterminate = false
            item.checkAll = false
            item.children.forEach((subItem: IAuthority) => {
                subItem.checkedList = []
                subItem.indeterminate = false
                subItem.checkAll = false
                subItem.children.forEach((leastItem: IAuthority) => {
                    if (leastItem.is_checked) {
                        subItem.checkedList.push(leastItem.auth_code)
                    }
                })
                item.checkedList = item.checkedList.concat(subItem.checkedList)
            })
        })
        setSelected(list)
    }
 
  const onCheckAllChange = (e: CheckboxChangeEvent, index: number) => {
        const newAuthList = JSON.parse(JSON.stringify(authList))
        let authority_id = [] as string[]
        newAuthList[index].children.forEach((item: any) => {
            const codeArr = item.children.map((subItem: any) => subItem.auth_code)
            item.checkedList = e.target.checked ? codeArr : []
            authority_id = authority_id.concat(codeArr)
        })
        newAuthList[index].checkedList = e.target.checked ? authority_id : []
        setSelected(newAuthList)
    }

    const onSubCheckAllChange = (e: CheckboxChangeEvent, index: number, subIndex: number) => {
        const newAuthList = JSON.parse(JSON.stringify(authList))
        const codeArr = authList[index].children[subIndex].children.map(item => item.auth_code)
        if (e.target.checked) {
            newAuthList[index].checkedList = newAuthList[index].checkedList.filter((item: string) => !codeArr.includes(item)).concat(codeArr)
            newAuthList[index].children[subIndex].checkedList = authList[index].children[subIndex].children.map(item => item.auth_code)
        } else {
            newAuthList[index].checkedList = newAuthList[index].checkedList.filter((item: string) => !codeArr.includes(item))
            newAuthList[index].children[subIndex].checkedList = []
        }
        setSelected(newAuthList)
    }

 const onCheckChange = (list: string[], index: number, subIndex: number) => {
     const newAuthList = JSON.parse(JSON.stringify(authList))
     newAuthList[index].children[subIndex].checkedList = list
     newAuthList[index].checkedList = []
     newAuthList[index].children.forEach((item: IAuthority) => {
         newAuthList[index].checkedList.push(...item.checkedList)
     })
     setSelected(newAuthList)
 }

const setSelected = (newAuthList: any[]) => {
    newAuthList.forEach((item: any) => {
        let subItemLength = 0
        item.children.forEach((subItem: any) => {
            subItemLength += subItem.children.length
            subItem.checkAll = subItem.checkedList?.length === subItem.children.length
            subItem.indeterminate =
                subItem.checkedList?.length > 0 && subItem.checkedList?.length < subItem.children.length
        })
        item.checkAll = item.checkedList?.length === subItemLength
        item.indeterminate = item.checkedList?.length > 0 && item.checkedList?.length < subItemLength
        })
	setAuthList(newAuthList)
}
                                  
 const save = async () => {
      let auth_id = [] as string[]
      authList.forEach((item: any) => {
          auth_id = auth_id.concat(item.checkedList)
      })
      const { code } = await SAVE_ROLE_AUTH({...})
      if (err) return
      message.success('保存成功')
}
        
return {!!authList.length && <div className={styles['card-list-box']}>
            {authList.map((card, index) =>
                          <div className={styles['card-box']} key={index}>
                                 <div className={styles['card-header']}>
                                     <Checkbox indeterminate={card.indeterminate}
                                         checked={card.checkAll}
                                         className={styles['card-title']}
                                         onChange={(e) => onCheckAllChange(e, index)}>{card.auth_name}</Checkbox>
                              	</div>
                                <div className={styles['card-content']}>
                                    {card.children.map((checkbox, subIndex) =>
                                    <div
                                        className={styles['checkbox-group-box']} key={subIndex}>
                                        <Checkbox indeterminate={checkbox.indeterminate}
                                                  checked={checkbox.checkAll}
                                                  className={styles['checkbox-group-title']}
                                                  onChange={(e) => onSubCheckAllChange(e, index, subIndex)}>										{checkbox.auth_name}</Checkbox>
                                        <div className={styles['checkbox-group-divider']} />
                                        <CheckboxGroup
                                            options={checkbox.children.map((child) => ({
                                                label: child.auth_name,
                                                value: child.auth_code
                                        	}))}
                                            value={checkbox.checkedList}
                                            onChange={(value: string[]) => onCheckChange(value, index, subIndex)}/>
                                    </div>)}
                                </div>
                            </div>)
                        }
                        <div className={styles['button-box']}>
                            <Button
                                onClick={save}
                            >
                                保存
                            </Button>
                        </div>
                    </div>}

```

需求变更：上面的情况只针对严格存在父模块 => 子模块 => 权限点的理想情况，实际父模块下可能没有子模块，子模块下可能没有权限点，沿用上面的方法判断条件过多，并且后端需要将父模块和子模块的id一并传过去，而`checkList`收集到的只是权限点，因此不适合用`CheckboxGroup`而改用`Checkbox`

```tsx
const transformAuthList = (list: IAuthority[]) => {
    list.forEach((item: IAuthority) => {
        item.indeterminate = false
        item.checkAll = false
        item.children.forEach((subItem: IAuthority) => {
            subItem.indeterminate = false
            subItem.checkAll = false
            subItem.children.forEach((leastItem: IAuthority) => {
                leastItem.checkAll = leastItem.is_checked
            })
        })
    })
    setSelected(list)
}

const onCheckAllChange = (e: CheckboxChangeEvent, index: number) => {
    // 勾选了父模块，它下层所有都勾选
    const newAuthList = JSON.parse(JSON.stringify(authList))
    newAuthList[index].checkAll = e.target.checked
    newAuthList[index].is_checked = e.target.checked
    newAuthList[index].indeterminate = false
    newAuthList[index].children.forEach((subItem: IAuthority) => {
        subItem.checkAll = e.target.checked
        subItem.is_checked = e.target.checked
        subItem.indeterminate = false
        subItem.children.forEach((leastItem: IAuthority) => {
            leastItem.checkAll = e.target.checked
            leastItem.is_checked = e.target.checked
        })
    })
    setAuthList(newAuthList)
}

const onSubCheckAllChange = (e: CheckboxChangeEvent, index: number, subIndex: number) => {
    // 勾选子模块，联动效果由setSelected方法去完成
    const newAuthList = JSON.parse(JSON.stringify(authList))
    newAuthList[index].children[subIndex].checkAll = e.target.checked
    newAuthList[index].children[subIndex].is_checked = e.target.checked
    newAuthList[index].children[subIndex].indeterminate = false
    newAuthList[index].children[subIndex].children.forEach((leastItem: IAuthority) => {
        leastItem.checkAll = e.target.checked
        leastItem.is_checked = e.target.checked
    })
    setSelected(newAuthList)
}

 const onCheckChange = (e: CheckboxChangeEvent, index: number, subIndex: number, leastIndex: number) => {
      // 勾选权限点，联动效果由setSelected方法去完成
     const newAuthList = JSON.parse(JSON.stringify(authList))
     newAuthList[index].children[subIndex].children[leastIndex].checkAll = e.target.checked
     newAuthList[index].children[subIndex].children[leastIndex].is_checked = e.target.checked
     setSelected(newAuthList)
 }
 
 const setSelected = (newAuthList: any[]) => {
     newAuthList.forEach((item: any) => {
         if (item.children.length === 0) {
             item.checkAll = item.is_checked
             item.indeterminate = false
         } else {
             let leastItemLength = 0 // 权限点的数量
             item.children.forEach((subItem: any) => {
                 if (subItem.children.length === 0) {
                     subItem.checkAll = subItem.is_checked
                     subItem.indeterminate = false
                 } else {
                     leastItemLength += subItem.children.length
                     const checkedLength = // 权限点选中个数
                           subItem.children.filter((leastItem: IAuthority) => leastItem.is_checked).length
                     subItem.checkAll = subItem.children.length === checkedLength
                     subItem.indeterminate = checkedLength > 0 && checkedLength < subItem.children.length
                 }
             })
             if (item.children.every((subItem: IAuthority) => subItem.checkAll)) {
                 item.checkAll = true
             } else {
                 item.checkAll = false
             }
             const subCheckAllLength = // 子模块选中个数
                   item.children.filter((subItem: IAuthority) => subItem.checkAll).length
             if (subCheckAllLength > 0 && subCheckAllLength < item.children.length) {
                 item.indeterminate = true
             } else if (item.children.filter((subItem: IAuthority) => subItem.indeterminate).length) {
                 item.indeterminate = true
             } else {
                 item.indeterminate = false
             }
         }
     })
     setAuthList(newAuthList)
 }
 
 const save = async () => {
     const auth_id = [] as string[]
     authList.forEach((item: any) => {
         if (item.checkAll) {
             auth_id.push(item.id)
         }
         item.children.forEach((subItem: IAuthority) => {
             if (subItem.checkAll) {
                 auth_id.push(subItem.id)
             }
             subItem.children.forEach((leastItem: IAuthority) => {
                 if (leastItem.checkAll) {
                     auth_id.push(leastItem.id)
                 }
             })
         })
     })
     const [err] = await SAVE_ROLE_AUTH({
         auth_id,
         role_id: roleId
     })
     if (err) return
     message.success('保存成功')
 }
 
 return  <CheckboxGroup
             options={checkbox.children.map((child) => ({
                 label: child.auth_name,
                 value: child.auth_code
    	 	}))}
             value={checkbox.checkedList}
             onChange={(value: string[]) => onCheckChange(value, index, subIndex)}/>
 // 将CheckboxGroup改为Checkbox
 {subItem.children.map((leastItem, leastIndex) =>
      <Checkbox
          key={leastIndex}
          checked={leastItem.checkAll}
          onChange={(e) => onCheckChange(e, index, subIndex, leastIndex)}>
    	 {leastItem.auth_name}
 	</Checkbox>
)}

```

## includes判断对象数组

需求描述：使用`antd mobile`组件库组件`check-list`，拉取租户列表，要求第一个为全部租户并默认选中

难点：`check-list`源码中`value`值类型是字符串，判断选中依据是`context.value.includes(props.value)`，因为代码中`value`值为对象，所以`includes`判断的是对象数组中是否包含某个对象，这时要保持默认值的引用是相同的

```tsx
interface IOrgInfo {
  organization_id: string;
  organization_name: string;
};

const defaultValue = { // 选择全部租户的引用值都用defaultValue，includes判断才会生效
  organization_id: '',
  organization_name: '全部租户',
};

const CMOrgList = () => {
    const [value, setValue] = useState<IOrgInfo[]>([defaultValue]);
    const [orgList, setOrgList] = useState<IOrgInfo[]>([])
    
    useEffect(() => {
        getOrgList()
    }, [])
    
    const getOrgList = () => {
        setLoading(true);
        const [err, data] = await reqGetOrganizationList();
        setLoading(false);
        if (err) return;
        const organizationList = data.items;
        organizationList.unshift(defaultValue);
        setOrganizationList(organizationList);
    }
    
    return <CheckList>
        {orgList.map((item: IOrgInfo) => (
          <CheckList.Item key={item.organization_id} value={item} onClick={() => checkItem(item)}>
            {item.organization_name}
          </CheckList.Item>
        ))}
    </CheckList>
}
```

## 列表查询条件重置

由于setState的异步性，没法在reset中setState初始状态后直接去调用getList

```tsx
const [resetKey, setResetKey] = useState(0)
const [searchText, setSearchText] = useState('')
const reset = () => {
    setResetKey(resetKey + 1)
    setSearchText('')
}
const getList = async (page = 1) => {
    ...
}
useEffect(() => {
    getList(page)
}, [resetKey])
```

```tsx
const [searchText, setSearchText] = useState('')
const reset = () => {
    setSearchText('')
    getList(1, true)
}
const getList = async (page = 1, refresh = false) => {
    const params = {
        searchText: refresh ? '' : searchText
    }
    ...
}
useEffect(() => {
    getList()
}, [])
```

## Antd版本4.x使用day.js替换Moment.js

官网示例

```tsx
import { Dayjs } from 'dayjs';
import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generatePicker from 'antd/es/date-picker/generatePicker';

const DatePicker = generatePicker<Dayjs>(dayjsGenerateConfig);

export default DatePicker;
```

存在问题：部分中文显示变成英文了

改进

```tsx
import React from 'react';
import { Dayjs } from 'dayjs'
import dayjsGenerateConfig from 'rc-picker/lib/generate/dayjs'
import generatePicker from 'antd/es/date-picker/generatePicker'
import 'antd/es/date-picker/style/index'
import 'dayjs/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'

const DatePickerConfig = generatePicker<Dayjs>(dayjsGenerateConfig)

const DatePicker = (props: any) => {
    return <DatePickerConfig locale={locale} {...props} />
}

const { RangePicker } = DatePickerConfig // 增加RangePicker

export const RangePickerDayjs = (props: any) => {
    return <RangePicker locale={locale} {...props} />
}

export default DatePicker
```

