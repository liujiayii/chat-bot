import {Image, ScrollView, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, {useMemo} from 'react'
import {useRecoilValue} from 'recoil'
import {Ellipsis, Animate} from '@nutui/nutui-react-taro'
import userImg from '../../../../assets/image/user.jpeg'
import serverImg from '../../../../assets/image/server.jpeg'
import './index.scss'
import {loadingState, msgListState} from '../../store'
import {IMsgItem} from '../../types'

const handleChoose = (list, props) => {
  switch (list.key) {
    case 'copy':
      Taro.setClipboardData({
        data: JSON.stringify(props.title),
      })
      break
    default:
      break
  }
}

const Message: React.FC<IMsgItem> = (props) => {
  return (
    <View className={props.speaker === 'user' ? 'new-lf' : 'new-rl'}>
      <View className='new-txt'>
        <Ellipsis onClick={()=> handleChoose({key: 'copy'}, props)} content={props.title} rows={3} expandText='展开' collapseText='收起' />
      </View>
      <View style='width: 11vw; height: 11vw;'>
        <Image className='new-image' src={props.speaker === 'user' ? userImg : serverImg}></Image>
      </View>
    </View>
  )
}

const ScrollList: React.FC = () => {
  const msgList = useRecoilValue(msgListState)
  const loading = useRecoilValue(loadingState)
  const lastId = useMemo<string>(() => {
    const last = msgList[msgList.length - 1]
    return `t_${last.timestamp}`
  }, [msgList])
  console.log('scroll-list render')
  return (
    <ScrollView scrollY className='scroll-wrap' enableFlex scrollWithAnimation scrollIntoView={lastId}>
      {msgList.map((item) => (
        <Animate key={item.timestamp} id={`t_${item.timestamp}`} type='slide-bottom' action='initial'>
          <Message {...item}></Message>
        </Animate>))}
      <Animate type='float' action='initial' loop>
        {loading && <Message {...{title: '我正在努力思考~', speaker: 'server'}}></Message>}
      </Animate>
    </ScrollView>
  )
}
export default ScrollList
