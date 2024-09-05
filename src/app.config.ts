export default defineAppConfig({
  pages: [
   'pages/index/index',
    'pages/mine/index',
  ],
  tabBar:{
    list: [{
      pagePath: 'pages/index/index',
      text: '行情报价'
    }, {
      pagePath: 'pages/mine/index',
      text: '问题反馈'
    }]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '再生行情',
    navigationBarTextStyle: 'black',
  },
  style: 'v2',
})
