import { useContext,createContext } from 'react'

type IMsg = {
  speaker: 'server' | 'user';
  title: string | number
}
type IState = {
  msgList: IMsg[]
  value: string
  loading: boolean
}
export const initState: IState = {
  msgList: [{ speaker: 'server', title: '您好，很高兴遇见您~你想知道的，我都能告诉你哦~' }],
  value: '',
  loading: false
}
export enum IActionType {
  MSG_LIST_UPDATE = 'msgList/update',
  VALUE_UPDATE = 'value/update',
  LOADING_UPDATE = 'loading/update',
}

type IAction = {
  type: IActionType,
  payload: any
}
export const stateReducer = (state, action: IAction)=>{
  console.log(state, action)
  switch (action.type) {
    case IActionType.MSG_LIST_UPDATE:
      return {
        ...state,
        msgList: action.payload
      }
    case IActionType.VALUE_UPDATE:
      return {
        ...state,
        value: action.payload
      }
    case IActionType.LOADING_UPDATE:
      return {
        ...state,
        loading: action.payload
      }
    default:
      return  state
  }
}
export const GlobalStore = createContext({state: initState, dispatch: stateReducer})

export const useGlobalStore = ()=> useContext(GlobalStore)
