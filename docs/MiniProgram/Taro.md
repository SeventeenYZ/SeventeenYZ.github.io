## PC端小程序的windowHeight问题

背景：页面是由自定义导航栏、头部筛选框、无限滚动组件、脚部合计框、Taro内置tabbar组成，

问题：Taro.getSystemInfoSync()返回的screenHeight和windowHeight在移动端是有区别的，screenHeight指的是屏幕整体高度，windowHeight是可以写标签的盒子高度，screenHeight - windowHeight = tarbar高度（如果导航栏不是自定义应该还要减去导航栏的高度），问题出在PC端打开小程序时，screenHeight和windowHeight是一样的，而无限滚动组件的高度是由以下公式计算

```ts
// 屏幕375px时，1rpx = 0.5px，屏幕75opx时，1rpx = 1px
const pxMultiple = Taro.getSystemInfoSync().windowWidth / 750
export const infiniteScrollHeight = Taro.getSystemInfoSync() - navHeight - statusHeight - pxMultiple * 228
// navHeight是导航栏高度，statusHeight是导航栏上面的高度，228是头部和脚部高度之和
// vh、vw在android4.4、ios8以上版本支持
export const infiniteScrollHeight = `calc(100vh - ${navHeight}px - ${statusHeight} - ${pxMultiple * 228}px)`
```

## 去某个页面，返回时保留已勾选数据

```tsx
const [keepAlive, setKeepAlive] = useState(false); // 去详情页返回时不重置勾选数据

useDidShow(() => {
	if (keepAlive) return setKeepAlive(false);
})

const toDetailPage = () => {
    setKeepAlive(true);
    Taro.navigateTo({
        url: 'xxxx'
    })
}
```

##  处理token过期

```tsx
// app.tsx
class App extends Component {
  onLaunch() {
    removeStorageSync('token');
  }

  _refreshToken = false;

  getRefreshToken() {
    return this._refreshToken;
  }

  setRefreshToken(state) {
    this._refreshToken = state;
  }

  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
// 在特殊错误码的处理函数中
const handleSpecialError = (res: ResponseData<any>) => {
  if (res.code === 10001) {
    const appInstance = Taro.getApp().$app;
    if (appInstance.getRefreshToken()) {
      showNoneToast({ title: '登录中' });
    }
    appInstance.setRefreshToken(true);
    getToken();
  }
}

export const getToken = () => {
  Taro.login({
    success: async (res) => {
      if (!res.code) return;
      Taro.showLoading({
        title: '登录中',
      });
      const [err, data] = await SILENT_LOGIN({ wxcode: res.code });
      Taro.hideLoading();
      if (err) return;
      Taro.getApp().$app.setRefreshToken(false);
      const pageArr = Taro.getCurrentPages();
      pageArr[pageArr.length - 1].onShow(); // 获取新token后刷新当前页面
    },
  });
};
```

还有一种办法是在拦截器里做操作，只要不`resolve`或`reject`，页面函数就一直等待，缓存该请求然后获取到新token重发请求后再`resolve`

## 弹窗只在第一次进入时显示

合同页是在分包中，用webview组件承载，src指向bff项目的html文件，用户第一次进入合同页才显示提示弹窗，后续进入不需要

```tsx
// app.tsx
class App extends Component {
  onLaunch() {
    removeStorageSync('token');
  }

  _showOverlay = true;

  getShowOverlay() {
    return this._showOverlay;
  }

  setShowOverlay(state) {
    this._showOverlay = state;
  }

  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
// contract.tsx
const Signature: FC = () => {
  const pdf = useAppSelector((state) => state.common.pdf);
  const contractId = useAppSelector((state) => state.common.contract_id);
  const showOverlay = Taro.getApp().$app.getShowOverlay();

  useDidShow(() => {
    const appInstance = Taro.getApp().$app;
    appInstance.setShowOverlay(false);
  });

  return <WebView
    src={`${getBaseUrl()}/static/pdfview.html?file=${pdf}&contractId=${contractId}&showOverlay=${showOverlay}`}/>;
};
// bff的pdfview.html
 .overlay-box {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.82);
            z-index: 999;
            flex-direction: column;
            align-items: center;
            padding-top: 40%;
}
<script>
 const showOverlay = location.search.split('&showOverlay=')[1];
        if (showOverlay === 'true') {
          $('.overlay-box').css('display', 'flex');
        }
</script>
```

## 签署页返回时根据条件判断是否重置勾选数据

需求描述：列表页勾选完数据后进入bff项目的签署页（webview装载），签署成功后返回需要重置勾选数据，没成功返回保留勾选数据

```tsx
// bff的static.html
function closeDialog() {
    wx.miniProgram.navigateBack()
    wx.miniProgram.postMessage({ data: '签署成功' }) // 建议用 data: { key: value }的形式
}
// 小程序的common-slice.ts
const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: {
        signatureSuccess: false, // 进去签署页后是否签署成功
    }
    reducers: {
    	setSignatureSuccess: (draft, action) => {
          draft.signatureSuccess = action.payload;
        },
	}
}
// 小程序的签署页
const Signature: FC = () => {
  const dispatch = useAppDispatch();
  const pdf = useAppSelector((state) => state.common.pdf);
  const contractId = useAppSelector((state) => state.common.contract_id);
  const showOverlay = Taro.getApp().$app.getShowOverlay();

  useDidShow(() => {
    const appInstance = Taro.getApp().$app;
    appInstance.setShowOverlay(false);
  });

  const onMessage = (e) => {
    const { data } = e.target; // data: ['签署成功']
    if (data && data[0] === '签署成功') {
      dispatch(setSignatureSuccess(true));
    }
  };

  return <WebView
    src={`${getBaseUrl()}/static/pdfview.html?file=${pdf}&contractId=${contractId}&showOverlay=${showOverlay}`}
    onMessage={onMessage} />;
};
// 小程序列表页
const xxxList = () => {
   const signatureSuccess = useAppSelector((state) => state.common.signatureSuccess); // 进去签署页是否签署成功
   const [keepAlive, setKeepAlive] = useState(false);
   useDidShow(() => {
       if (keepAlive) {
           if (!signatureSuccess) return;
           dispatch(setSignatureSuccess(false));
           setKeepAlive(false);
       }
       getList();
   }) 
}
```



