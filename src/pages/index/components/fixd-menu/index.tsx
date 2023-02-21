import {useState} from 'react'
import {FixedNav, Drag} from '@nutui/nutui-react-taro'
import ButtonWrap from '../button-wrap'

const FixedMenu = () => {
  const [visible, setVisible] = useState(false);
  const change = (value: any) => {
    setVisible(value);
  };
  console.log('fixed-menu render')
  return (
    <Drag direction='y' style={{right: 0, bottom: 240}} boundary={{bottom: 80, top: 0, left: 0, right: 0}}>
      <FixedNav
        slotList={<ButtonWrap />}
        unActiveText='打开菜单'
        visible={visible}
        onChange={change}
        overlay
      />
    </Drag>
  )
}

export default FixedMenu
