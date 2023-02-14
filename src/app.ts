import { Component, PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import './app.scss'

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    this.updateVersion()
  }

  componentDidShow () {}

  componentDidHide () {}
  updateVersion() {
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
  render () {
    // this.props.children 是将要会渲染的页面
    return this.props.children
  }
}

export default App
