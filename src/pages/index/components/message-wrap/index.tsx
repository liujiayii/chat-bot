import { Input, View ,Image} from '@tarojs/components'
import Taro, { RequestTask } from '@tarojs/taro'
import React,{useState} from 'react'
import sendImg from '../../../../assets/image/send.png'
import './index.scss'

type IProps = {
  requestTask: React.MutableRefObject<RequestTask<{ code: number; result: string }> | undefined>
  loading: boolean
  setLoading: any
  setMsgList: any
}
const MessageWrap: React.FC<IProps> = (props)=>{
  const [inputValue, setInputValue] = useState('')
  const sendSubmit = () => {
    if(props.loading){
      return
    }
    if (!inputValue.length) {
      Taro.showToast({
        icon: 'none',
        title: '请输入内容~',
      })
      return
    }
    props.setLoading(true)
    props.setMsgList((list)=>[...list, { speaker: 'user', title: inputValue }])
    props.requestTask.current = Taro.request({
      url: 'https://api.zhiyanxx.com/wx/wxamp/search',
      method: 'POST',
      data: { s: inputValue },
      success: (res => {
        if (res.data.code == 0) {
          setInputValue('')
          props.setMsgList((list)=>[...list, { speaker: 'server', title: res.data.result || '我的CPU烧坏了┭┮﹏┭┮' }])
        }
      }),
      fail:()=>{

      },
      complete: () => {
       props.setLoading(false)
      },
    })
  }
  return <View className='message-warp'>
    <Input className='message-text' cursor-spacing='80'
      placeholder='说点什么…'
      value={inputValue}
      onInput={e => setInputValue(e.detail.value)}
    />
    <View className={`message-btn ${props.loading ? 'loading' : ''}`} onClick={sendSubmit}>
      <Image className='message-btn-icon' src={sendImg}></Image>
    </View>
  </View>
}
export default MessageWrap

