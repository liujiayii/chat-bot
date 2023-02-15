import { View } from '@tarojs/components'
import { Button } from '@nutui/nutui-react-taro'
import Taro, { RequestTask } from '@tarojs/taro'
import React from 'react'
import './index.scss'
import { IMsgItem } from '../../types'

type IProps = {
  requestTask: React.MutableRefObject<RequestTask<{ code: number; result: string }> | undefined>;
  msgList: IMsgItem[]
}
const ButtonWrap: React.FC<IProps> = (props) => {
  const setClipboard = () => {
    Taro.setClipboardData({
      data: JSON.stringify(props.msgList),
    })
  }
  const cancelRequest = () => {
    Taro.showModal({
      title: '温馨提示',
      content: '如果网络环境不好可以点我重置连接哦~是否继续？',
      success (res) {
        if (res.confirm) {
          props.requestTask.current?.abort()
        }
      },
    })
  }
  return <View className='button-wrap'>
    <Button className='btn' type='danger' size='small'
      onClick={cancelRequest}
    >重置连接</Button>
    <Button className='btn' type='success' size='small' onClick={setClipboard}
      color='#0E4AFB'
    >复制对话</Button>
  </View>
}
export default ButtonWrap
