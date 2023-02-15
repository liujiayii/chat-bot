import Taro from '@tarojs/taro'
import './app.scss'

const App = (props) =>{
  const updateVersion =() =>{
    const updateManager = Taro.getUpdateManager();
    updateManager.onUpdateReady(() => {
      Taro.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      })
    })
  }

  Taro.useLaunch(()=>{
    updateVersion()
  })
  return props.children
}

export default App
