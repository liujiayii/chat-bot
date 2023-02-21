import {useState, Suspense} from 'react'
import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {useSetRecoilState} from "recoil";
import ScrollList from './components/scroll-list'
import MessageWrap from './components/message-wrap'
import FixedMenu from "./components/fixd-menu";
import {withTimesState} from "./store";
import './index.scss'

const Index = () => {
  const setWithTimes = useSetRecoilState(withTimesState);
  const [eventList, setEventList] = useState<Array<() => void>>([])
  const onShareSuccess = () => {
    Taro.showToast({
      icon: 'none',
      title: '分享成功~赠送5次次数~'
    })
    onUpdateWithTimes(5)
  }
  Taro.useShareAppMessage(() => {
    setEventList(list => [...list, onShareSuccess])
    return {}
  })
  Taro.useShareTimeline(() => {
    setEventList(list => [...list, onShareSuccess])
    return {}
  })
  Taro.useDidShow(() => {
    eventList.forEach(func => {
      func()
    })
  })

  const onUpdateWithTimes = (times: number) => {
    setWithTimes(n => n + times)
  }
  console.log('render')
  return (
    <Suspense fallback={<View>loading……</View>}>
      <View className='wrap'>
        <ScrollList></ScrollList>
        <MessageWrap onUpdateWithTimes={onUpdateWithTimes}></MessageWrap>
        <FixedMenu></FixedMenu>
      </View>
    </Suspense>
  )
}

export default Index
