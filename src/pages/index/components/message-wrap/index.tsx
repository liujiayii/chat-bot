import {Input, View, Image} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, {useState} from 'react'
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil'
import dayjs from "dayjs";
import sendImg from '../../../../assets/image/send.png'
import './index.scss'
import {loadingState, msgListState, withTimesState, requestTaskState} from '../../store'

type IProps = {
  onUpdateWithTimes: (times: number) => void
}
const MessageWrap: React.FC<IProps> = (props) => {
  const setMsgList = useSetRecoilState(msgListState)
  const setRequestTaskState = useSetRecoilState(requestTaskState)
  const [loading, setLoading] = useRecoilState(loadingState)
  const withTimes = useRecoilValue(withTimesState)
  const [inputValue, setInputValue] = useState('')
  const sendSubmit = () => {
    if (loading) {
      return
    }
    if (!inputValue.length) {
      Taro.showToast({
        icon: 'none',
        title: '请输入内容~',
      })
      return
    }
    if (withTimes < 1) {
      Taro.showModal({
        content: '今日免费问答次数已经用完了哦~点击右上角把小程序分享到好友或朋友圈可以免费获得更多次数~',
        showCancel: false
      })
      return;
    }
    setLoading(true)
    props.onUpdateWithTimes(-1)
    setInputValue('')
    setMsgList((list) => [...list, {speaker: 'user', title: inputValue, timestamp: dayjs().unix()}])
    setRequestTaskState(Taro.request({
      url: 'https://api.zhiyanxx.com/wx/wxamp/search',
      method: 'POST',
      data: {s: inputValue},
      success: (res => {
        if (res.data.code == 0) {
          setMsgList((list) => [...list, {
            speaker: 'server',
            title: res.data.result || '我的CPU烧坏了┭┮﹏┭┮',
            timestamp: dayjs().unix()
          }])
        }
      }),
      fail: () => {
        setMsgList((list) => [...list, {speaker: 'server', title: '我的CPU烧坏了┭┮﹏┭┮', timestamp: dayjs().unix()}])
      },
      complete: () => {
        setLoading(false)
      },
    }))
  }
  console.log('message-wrap render')
  return (
    <View className='message-warp'>
      <Input className='message-text' cursor-spacing='80'
        placeholder='说点什么…'
        value={inputValue}
        onInput={e => setInputValue(e.detail.value)}
      />
      <View className={`message-btn ${loading ? 'loading' : ''}`} onClick={sendSubmit}>
        <Image className='message-btn-icon' src={sendImg}></Image>
      </View>
    </View>
  )
}
export default MessageWrap

