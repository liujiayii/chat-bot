export default defineAppConfig({
  pages: [
   'pages/index/index',
    'pages/mine/index',
  ],
  tabBar:{
    list: [{
      pagePath: 'pages/index/index',
      text: '首页'
    }, {
      pagePath: 'pages/mine/index',
      text: '我的'
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
