import { useRef, useState } from 'react'
import Taro,{type RequestTask} from '@tarojs/taro'
import {FixedNav,Drag } from '@nutui/nutui-react-taro'
import { View } from '@tarojs/components'
import './index.scss'
import ScrollList from './components/scroll-list'
import ButtonWrap from './components/button-wrap'
import MessageWrap from './components/message-wrap'
import { IMsgItem } from './types'

const Index = () => {
  const requestTask = useRef<RequestTask<{ code: number; result: string }>>()
  const [msgList,setMsgList] = useState<IMsgItem[]>([
    { speaker: 'server', title: '您好，很高兴遇见您~你想知道的，我都能告诉你哦~', timestamp: Date.now() }])
  const [loading, setLoading] = useState(false)
  Taro.useShareAppMessage(()=>{
    return {}
  })
  Taro.useShareTimeline(()=>{
    return {}
  })
  const [visible, setVisible] = useState(false);
  const change = (value: any) => {
    setVisible(value);
  };
  console.log('render')
  return (
      <View className='wrap'>
        <ScrollList msgList={msgList} loading={loading}></ScrollList>
        {/*<ButtonWrap requestTask={requestTask} msgList={msgList}></ButtonWrap>*/}
        <MessageWrap requestTask={requestTask} loading={loading} setLoading={setLoading} setMsgList={setMsgList}></MessageWrap>
        <Drag direction='y' style={{ right: 0, bottom: 240 }} boundary={{bottom: 80,top: 0, left: 0, right: 0}}>
          <FixedNav
            slotList={<ButtonWrap requestTask={requestTask} msgList={msgList} />}
            unActiveText='打开菜单'
            visible={visible}
            onChange={change}
          />
        </Drag>
      </View>
  )
}

export default Index
