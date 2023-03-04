import {atom,selector} from 'recoil'
import dayjs from "dayjs";
import Taro, {RequestTask} from "@tarojs/taro";
import {IMsgItem} from "../types";

const getDefaultMsg = (): IMsgItem => {
  return {speaker: 'server', title: '您好，很高兴遇见您~你想知道的，我都能告诉你哦~', timestamp: dayjs().unix()}
}

const getDefaultTimes = () =>{
  const res =  Taro.getSystemInfoSync()
  if(['ios', 'android'].includes(res.platform)){
    return 5
  }
  return 999
}

export const msgListState = atom<IMsgItem[]>({
  key: 'msgListState',
  default: [getDefaultMsg()]
})

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false
})
const getWithTimes = async () => {
  const today = dayjs().format('YYYY.MM.DD')
  try {
    const {data = {}} = await Taro.getStorage({key: 'withTimes'})
    return data[today] ?? getDefaultTimes()
  }catch (e) {
    console.log(e)
    return getDefaultTimes()
  }
}

const proxyWithTimesState = atom({
  key: 'proxyWithTimesState',
  default: undefined
})
export const withTimesState = selector<number>({
  key: 'withTimesState',
  get: async ({get})=>{
    const test = get(proxyWithTimesState)
    console.log(test)
    if(test !== undefined){
      return test
    }
    const res = await getWithTimes()
    console.log(res)
    return res
  },
  set: ({set}, newValue) => {
    set(proxyWithTimesState, newValue)
    console.log(newValue)
    const today = dayjs().format('YYYY.MM.DD')
    Taro.setStorage({
      key: 'withTimes',
      data: {[today]: newValue}
    })
  }
})

export const requestTaskState = atom<RequestTask<{ code: number; result: string }>>({
  key: 'requestTaskState',
  default: undefined
})
