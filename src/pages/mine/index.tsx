import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import {
  Form,
  Input,
  Cell,
  TextArea,
  Picker,
  Button,
} from '@nutui/nutui-react-taro'
import { ArrowRight } from '@nutui/icons-react-taro'
import {View} from '@tarojs/components'
import {getFeedbackTypeApi, getProvinceApi,submitFeedbackApi} from '@/api/service'

const Demo7 = () => {
  const [ feedbackType, setFeedbackType] = useState<{value: string; label: string}[]>([])
  const [provinceList, setProvinceList] = useState([])
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(()=>{
    getFeedbackTypeApi({}).then(res=>{
      if(res.code===0){
        setFeedbackType(res.data?.map(item=> ({ value: item.type, text: item.name})))
      }
    })
    getProvinceApi().then(res => {
      if (res.code === 0) {
        setProvinceList((res.data || []).map(item => ({ value: item.provinceId, text: item.name })))
      }
    })
  },[])

  const submitSucceed = (values: any) => {
    Taro.showModal({
      title: '确定要提交吗？',
      success:(result) =>{
        if(result.confirm){
          setLoading(true)
          submitFeedbackApi({
            ...values,
            provinceId: values.provinceId[0],
            type: values.type[0],
          }).then(res=>{
            if(res.code===0){
              Taro.showToast({
                title: res.message || "提交成功"
              })
              form.resetFields()
            }
          }).finally(()=>{
            setLoading(false)
          })
        }
      },
    })
    console.log(values)
    
  }
  return (
    <View style={{background:'#f1f1f1', padding: '10px'}}>
      <View style={{
        color: '#909ca4',
        fontSize: '14px',
        fontWeight: 400,
        marginBottom: '10px',
        padding: '0 10px',
      }}
      >意见反馈</View>
      <Form
        style={{ '--nutui-form-item-label-width': '60px' }}
        form={form}
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Button nativeType='submit' type='primary' loading={loading}>
              提交
            </Button>
          </div>
        }
        onFinish={(values) => submitSucceed(values)}
      >
        <Form.Item label='您的姓名' name='userName' 
          rules={[
            { required: true, message: '请输入您的姓名' },
          ]}
        >
          <Input placeholder='请输入您的姓名' />
        </Form.Item>
        <Form.Item label='您的手机号' name='userPhone'  rules={[
            { required: true, message: '请输入您的手机号' },
          ]}
        >
          <Input placeholder='请输入您的手机号' />
        </Form.Item>
        <Form.Item label='省份' name='provinceId' trigger='onConfirm' 
          getValueFromEvent={(...args) => args[1]}
          onClick={(event, ref: any) => {
              ref.open()
            }}
          rules={[
              { required: true, message: '请选择省份' },
            ]}
        >
            <Picker options={provinceList}>
              {(value: any) => {
                return (
                  <Cell
                    style={{
                      padding: 0,
                      '--nutui-cell-divider-border-bottom': '0',
                    }}
                    className='nutui-cell--clickable'
                    title={
                      value.length
                        ? provinceList.filter((po) => po.value === value[0])[0]
                          ?.text
                        : '请选择省份'
                    }
                    extra={<ArrowRight />}
                    align='center'
                  />
                )
              }}
            </Picker>
          </Form.Item>
        <Form.Item
          label='反馈类型'
          name='type'
          trigger='onConfirm'
          getValueFromEvent={(...args) => args[1]}
          onClick={(event, ref: any) => {
            ref.open()
          }}
          rules={[
            { required: true, message: '请选择反馈类型' },
          ]}
        >
          <Picker options={[feedbackType]}>
            {(value: any) => {
              return (
                <Cell
                  style={{
                    padding: 0,
                    '--nutui-cell-divider-border-bottom': '0',
                  }}
                  className='nutui-cell--clickable'
                  title={
                    value.length
                      ? feedbackType.filter((po) => po.value === value[0])[0]
                          ?.text
                      : '请选择反馈类型'
                  }
                  extra={<ArrowRight />}
                  align='center'
                />
              )
            }}
          </Picker>
        </Form.Item>
        <Form.Item label='问题内容' name='content'  rules={[
            { required: true, message: '请输入问题内容' },
          ]}
        >
          <TextArea placeholder='请输入问题内容' />
        </Form.Item>
      </Form>
    </View>
  )
}

export default Demo7
