import { useReducer, useRef } from 'react'
import Taro,{type RequestTask} from '@tarojs/taro'
import { View, ScrollView, Image, Input } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro';
import serverImg from '../../assets/image/server.jpeg'
import userImg from '../../assets/image/user.jpeg'
import sendImg from '../../assets/image/send.png'
import './index.scss'
import { GlobalStore, initState, stateReducer, IActionType } from './store'

const serverDom = (item) => <View className='new-lf'>
  <View className='new-txt'>
    {item.title}
  </View>
  <View style='width: 11vw; height: 11vw;'>
    <Image className='new-image' src={userImg}></Image>
  </View>
</View>

const userDom = (item)=> <View className='new-rl'>
  <View style='width: 11vw; height: 11vw;'>
    <Image className='new-image' src={serverImg}></Image>
  </View>
  <View className='new-txt'>
    {item.title}
  </View>
</View>

const Index = () => {
  const request = useRef<RequestTask<{ code: number; result: string }>>()
  //const {state,dispatch} = useGlobalStore()
  const [state, dispatch] = useReducer(stateReducer, initState)
  Taro.useShareAppMessage(()=>{
    return {}
  })
  Taro.useShareTimeline(()=>{
    return {}
  })
  const sendSubmit = () => {
    if(state.loading){
      return
    }
    if (!state.value.length) {
      Taro.showToast({
        icon: 'none',
        title: '请输入内容~',
      })
      return
    }
    dispatch({type: IActionType.LOADING_UPDATE, payload: true})
    dispatch({type: IActionType.MSG_LIST_UPDATE, payload: [...state.msgList, { speaker: 'user', title: state.value },{ speaker: 'server', title: '我正在努力思考~' }]})
    request.current = Taro.request({
      url: 'https://api.zhiyanxx.com/wx/wxamp/search',
      method: 'POST',
      data: { s: state.value },
      success: (res => {
        if (res.data.code == 0) {
          dispatch({type: IActionType.VALUE_UPDATE, payload: ''})
          dispatch({type: IActionType.MSG_LIST_UPDATE, payload: [...state.msgList, { speaker: 'server', title: res.data.result }]})
        }
      }),
      fail:()=>{

      },
      complete: () => {
        dispatch({type: IActionType.LOADING_UPDATE, payload: false})
      },
    })
  }
  console.log('render')
  const setClipboard = () => {
    Taro.setClipboardData({
      data: JSON.stringify(state.msgList)
    })
  }
  const cancelRequest = ()=>{
    Taro.showModal({
      title: '温馨提示',
      content: '如果网络环境不好可以点我重置连接哦~是否继续？',
      success(res) {
        if (res.confirm) {
          request.current?.abort()
        }
      }
    })
  }

  return (
    <GlobalStore.Provider value={{state, dispatch}}>
      <View className='wrap'>
        <ScrollView scrollY scrollTop={20} className='scroll-wrap' enableFlex>
          <View className='list'>
            <View className='chat-news'>
              {state.msgList.map((item, index) => (<View key={index}>
                {item.speaker !== 'server' ? serverDom(item):  userDom(item)}
              </View>))}
            </View>
          </View>
        </ScrollView>
        <View className='button-wrap'>
          <Button className='btn' type='danger' size='small' onClick={cancelRequest}>重置连接</Button>
          <Button className='btn' type='success' size='small' onClick={setClipboard} color='#0E4AFB'>复制对话</Button>
        </View>
        <View className='message-warp'>
          <Input className='message-text' cursor-spacing='80'
            placeholder='说点什么…'
            value={state.value}
            onInput={e => dispatch({type: IActionType.VALUE_UPDATE, payload: e.detail.value})}
          />
          <View className={`message-btn ${state.loading ? 'loading' : ''}`} onClick={sendSubmit}>
            <Image className='message-btn-icon' src={sendImg}></Image>
          </View>
        </View>
      </View>
    </GlobalStore.Provider>
  )
}

export default Index
