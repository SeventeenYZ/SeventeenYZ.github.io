## DownloadFile

```ts
// 打开调试模式可以下载并打开，关闭调试模式就不行了
// 原因：调试模式下不校验合法域名
const openContractDetail = (contract_url: string) => {
    if (!contract_url) return Taro.showToast({
      title: '合同不存在',
      icon: 'none',
    });
    Taro.showLoading({
      title: '正在打开...',
    });
    Taro.downloadFile({
      url: contract_url,
      success: (res) => {
        Taro.hideLoading();
        Taro.openDocument({
          filePath: res.tempFilePath,
        });
      },
      fail: (err) => {
        Taro.showToast({
          title: err.errMsg, // downloadFile:fail url not in domain list
          icon: 'none',
        });
      },
    });
  };
```

解决办法：小程序后台 => 开发管理 => 开发设置 => 服务器域名

把url的域名添加到request合法域名、uploadFile合法域名、downloadFile合法域名中，注意如果url会重定向的话也要把重定向的域名加进去

## toLocaleString

展示金额，每隔三位插入逗号，并且保留两位小数

```tsx
// 后端返回值示例：'2000.00'，格式化为2,000.00
<View>{(+billInfo.total_bill.credit_limit).toLocaleString('zh-CN', { minimumFractionDigits: 2 })}</View>
```

放弃原因：安卓机型上不生效

```ts
export const formatAmount = (amount: number | string): string => {
  const regForm = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
  return amount.toString().replace(regForm, '$1,');
};
export const formatAmount = (amount: string | number) => {
  const initialVal = typeof amount === 'string' ? amount : String(amount);
  let num = initialVal.split('.')[0] || '0';
  const decimal = initialVal.split('.')[1] || '00';
  let result = '';
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return `${result}.${decimal}`;
};
```

## 0.5px的线或边框

直接使用0.5px，在ios上可能显示还是1px或者某一边缺失

```less
// 0.5px的线
.box:after {
      content: '';
      height: 1px; //控制边框宽度
      width: 200%; //控制边框长度
      position: absolute;
      left: 0;
      top: auto;
      right: auto;
      bottom: 0;
      background-color: #e8e8e8;
      border: 0 solid transparent;
      border-radius: 0;
      -webkit-border-radius: 0;
      transform: scale(0.5); //缩放宽度，达到0.5px的效果
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform-origin: top left; //定义缩放基点
      -webkit-transform-origin: top left;
      -moz-transform-origin: top left;
      -ms-transform-origin: top left;
      -o-transform-origin: top left;
}
// 0.5px的边框
<View className='box type-${status}'>formatStatus(status)</View>
.box {
    position: relative;
}
.box:after {
  content: '';
  height: 200%;
  width: 200%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  border: 1px solid;
  border-radius: 0;
  box-sizing: border-box;
  transform: scale(0.5, 0.5);
  transform-origin: 0 0;
  -webkit-transform: scale(0.5, 0.5);
  -webkit-transform-origin: 0 0;
}
.type-2 {
     border-color: #3ACA86; // 不同标签显示不同颜色的边框
}
```

