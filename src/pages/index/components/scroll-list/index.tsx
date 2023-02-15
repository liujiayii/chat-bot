import { Image, ScrollView, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from 'react'
import userImg from '../../../../assets/image/user.jpeg'
import serverImg from '../../../../assets/image/server.jpeg'
import './index.scss'
import { IMsgItem } from '../../types'

const setClipboard = (data) => {
  Taro.setClipboardData({
    data: JSON.stringify(data),
  })
}

const userDom = (item) => <View className='new-lf' onClick={()=>setClipboard(item.title)}>
  <View className='new-txt'>
    {item.title}
  </View>
  <View style='width: 11vw; height: 11vw;'>
    <Image className='new-image' src={userImg}></Image>
  </View>
</View>

const serverDom = (item)=> <View className='new-rl' onClick={()=>setClipboard(item.title)}>
  <View style='width: 11vw; height: 11vw;'>
    <Image className='new-image' src={serverImg}></Image>
  </View>
  <View className='new-txt'>
    {item.title}
  </View>
</View>

type IProps = {
  loading: boolean
  msgList: IMsgItem[]
}
const ScrollList:React.FC<IProps> = (props)=>{
  return (
  <ScrollView scrollY scrollTop={20} className='scroll-wrap' enableFlex>
    <View className='list'>
      <View className='chat-news'>
        {props.msgList.map((item, index) => (<View key={index}>
          {item.speaker === 'user' ? userDom(item):  serverDom(item)}
        </View>))}
        {props.loading && serverDom({title: <>我正在努力思考~ </>})}
      </View>
    </View>
  </ScrollView>)
}
export default ScrollList
