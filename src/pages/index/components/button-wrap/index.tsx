import {View} from '@tarojs/components'
import {Button} from '@nutui/nutui-react-taro'
import Taro from '@tarojs/taro'
import {useRecoilValue} from "recoil";
import React from 'react'
import './index.scss'
import {msgListState, requestTaskState} from "../../store";

const ButtonWrap: React.FC = () => {
  const msgList = useRecoilValue(msgListState)
  const requestTask = useRecoilValue(requestTaskState)
  const setClipboard = () => {
    Taro.setClipboardData({
      data: JSON.stringify(msgList),
    })
  }
  const cancelRequest = () => {
    Taro.showModal({
      title: '温馨提示',
      content: '如果网络环境不好可以点我重置连接哦~是否继续？',
      success(res) {
        if (res.confirm) {
          requestTask?.abort()
        }
      },
    })
  }
  console.log('button-wrap render')
  return (
    <View className='button-wrap nut-fixednav__list'>
      <Button className='btn nut-fixednav__list-item' type='danger' size='small'
        onClick={cancelRequest}
      >重置连接</Button>
      <Button className='btn nut-fixednav__list-item' type='success' size='small' onClick={setClipboard}
        color='#0E4AFB'
      >复制对话</Button>
    </View>
  )
}
export default ButtonWrap
