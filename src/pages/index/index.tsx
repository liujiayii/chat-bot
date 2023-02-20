import {useEffect, useRef, useState} from 'react'
import Taro, {type RequestTask} from '@tarojs/taro'
import {FixedNav, Drag} from '@nutui/nutui-react-taro'
import {View} from '@tarojs/components'
import dayjs from "dayjs";
import './index.scss'
import ScrollList from './components/scroll-list'
import ButtonWrap from './components/button-wrap'
import MessageWrap from './components/message-wrap'
import {IMsgItem} from './types'

const getDefaultMsg = (): IMsgItem => {
  return {speaker: 'server', title: '您好，很高兴遇见您~你想知道的，我都能告诉你哦~', timestamp: dayjs().unix()}
}

const Index = () => {
  const requestTask = useRef<RequestTask<{ code: number; result: string }>>()
  const [msgList, setMsgList] = useState<IMsgItem[]>([getDefaultMsg()])
  const [loading, setLoading] = useState(false)
  const [withTimes, setWithTimes] = useState<number>(-1)
  const [eventList, setEventList] = useState<Array<() => void>>([])
  useEffect(() => {
    if (withTimes > -1) {
      const today = dayjs().format('YYYY.MM.DD')
      Taro.setStorage({
        key: 'withTimes',
        data: {[today]: withTimes}
      })
    }
  }, [withTimes])
  const onShareSuccess = () =>{
    Taro.showToast({
      icon: 'none',
      title: '分享成功~赠送5次次数~'
    })
    onUpdateWithTimes(5)
  }
  Taro.useShareAppMessage(() => {
    setEventList(list=> [...list, onShareSuccess])
    return {}
  })
  Taro.useShareTimeline(() => {
    setEventList(list=> [...list, onShareSuccess])
    return {}
  })
  Taro.useDidShow(()=>{
    eventList.forEach(func=>{
      func()
    })
  })

  const [visible, setVisible] = useState(false);
  const change = (value: any) => {
    setVisible(value);
  };
  const getWithTimes = async () => {
    const today = dayjs().format('YYYY.MM.DD')
    try {
      const {data = {}} = await Taro.getStorage({key: 'withTimes'})
      setWithTimes(data[today] ?? 5)

    }catch (e) {
      console.log(e)
      setWithTimes( 5)
    }
  }
  const onUpdateWithTimes = (times: number) => {
    setWithTimes(withTimes + times)
  }

  useEffect(() => {
    getWithTimes()
  }, [])
  console.log('render')
  return (
    <View className='wrap'>
      <ScrollList msgList={msgList} loading={loading}></ScrollList>
      {/*<ButtonWrap requestTask={requestTask} msgList={msgList}></ButtonWrap>*/}
      <MessageWrap requestTask={requestTask} loading={loading} setLoading={setLoading}
        setMsgList={setMsgList}
        withTimes={withTimes}
        onUpdateWithTimes={onUpdateWithTimes}
      ></MessageWrap>
      <Drag direction='y' style={{right: 0, bottom: 240}} boundary={{bottom: 80, top: 0, left: 0, right: 0}}>
        <FixedNav
          slotList={<ButtonWrap requestTask={requestTask} msgList={msgList} />}
          unActiveText='打开菜单'
          visible={visible}
          onChange={change}
          overlay
        />
      </Drag>
    </View>
  )
}

export default Index
