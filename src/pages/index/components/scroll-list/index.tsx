import { Image, ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { useMemo } from 'react'
import { Ellipsis, Animate } from '@nutui/nutui-react-taro'
import userImg from '../../../../assets/image/user.jpeg'
import serverImg from '../../../../assets/image/server.jpeg'
import './index.scss'
import { IMsgItem } from '../../types'

const setClipboard = (data) => {
  Taro.setClipboardData({
    data: JSON.stringify(data),
  })
}

const userDom = (item) => <Animate id={`t_${item.timestamp}`} type='slide-bottom' action='initial'>
  <View className='new-lf'>
    <View className='new-txt'>
      <Ellipsis onClick={() => setClipboard(item.title)} content={item.title}
        rows={3} expandText='展开'
        collapseText='收起'
      />
    </View>
    <View style='width: 11vw; height: 11vw;'>
      <Image className='new-image' src={userImg}></Image>
    </View>
  </View>
</Animate>

const serverDom = (item) =><Animate id={`t_${item.timestamp}`} type='slide-bottom' action='initial'> <View className='new-rl'>
  <View style='width: 11vw; height: 11vw;'>
    <Image className='new-image' src={serverImg}></Image>
  </View>
  <View className='new-txt'>
    <Ellipsis onClick={() => setClipboard(item.title)} content={item.title}
      rows={3} expandText='展开'
      collapseText='收起'
    />
  </View>
</View>
</Animate>

type IProps = {
  loading: boolean
  msgList: IMsgItem[]
}
const ScrollList: React.FC<IProps> = (props) => {
  const lastId = useMemo<string>(()=>{
    const last = props.msgList[props.msgList.length-1]
    return `t_${last.timestamp}`
  },[props.msgList])
  console.log(lastId)
  return (
    <ScrollView scrollY className='scroll-wrap' enableFlex scrollWithAnimation scrollIntoView={lastId}>
        {props.msgList.map((item, index) => (<View key={index}>
          {item.speaker === 'user' ? userDom(item) : serverDom(item)}
        </View>))}
        <Animate type='float' action='initial' loop>{props.loading &&
          serverDom({ title: <>我正在努力思考~ </> })}</Animate>
    </ScrollView>)
}
export default ScrollList
