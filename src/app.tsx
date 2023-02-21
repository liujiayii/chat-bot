import Taro from '@tarojs/taro'
import { RecoilRoot } from 'recoil'
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
  return <RecoilRoot>{props.children}</RecoilRoot>
}

export default App
