import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView, Image, Input } from '@tarojs/components'
import serverImg from '../../assets/image/server.jpeg'
import userImg from '../../assets/image/user.jpeg'
import sendImg from '../../assets/image/send.png'
import './index.css'

type IMsg = {
  speaker: 'server' | 'user';
  title: string | number
}
const Index = () => {
  const [msgList, setMsgList] = useState<IMsg[]>([])
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    setMsgList([{ speaker: 'server', title: '您好，有什么问题需要咨询的吗？' }])
  }, [])
  const sendSubmit = () => {
    if(loading){
      return
    }
    if (!value.length) {
      Taro.showToast({
        icon: 'none',
        title: '请输入内容~',
      })
      return
    }
    setLoading(true)
    setMsgList((list) => [...list, { speaker: 'user', title: value }])
    Taro.request({
      url: 'https://api.zhiyanxx.com/wx/wxamp/search',
      method: 'POST',
      data: { s: value },
      success: (res => {
        if (res.data.code == 0) {
          setValue('')
          setMsgList(
            (list) => [...list, { speaker: 'server', title: res.data.result }])
        }
      }),
      complete: () => {
        setLoading(false)
      },
    })
  }
  console.log('render')
  return (
    <View className='wrap'>
      <ScrollView scrollY scrollTop={20} className='scroll-wrap' enableFlex>
        <View className='list'>
          <View className='chat-news'>
            {msgList.map((item, index) => (<View key={index}>
              {item.speaker !== 'server' ? <View className='new-lf'>
                <View className='new-txt'>
                  {item.title}
                </View>
                <View style='width: 11vw; height: 11vw;'>
                  <Image className='new-image' src={userImg}></Image>
                </View>
              </View> : <View className='new-rl'>
                <View style='width: 11vw; height: 11vw;'>
                  <Image className='new-image' src={serverImg}></Image>
                </View>
                <View className='new-txt'>
                  {item.title}
                </View>
              </View>}
            </View>))}
          </View>
        </View>
      </ScrollView>
      <View className='message-warp'>
        <Input className='message-text' cursor-spacing='80'
          placeholder='说点什么…'
          value={value}
          onInput={e => setValue(e.detail.value)}
        />
        <View className={`message-btn ${loading ? 'loading' : ''}`} onClick={sendSubmit}>
          <Image className='message-btn-icon' src={sendImg}></Image>
        </View>
      </View>
    </View>
  )
}

export default Index
