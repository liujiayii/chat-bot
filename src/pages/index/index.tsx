import { useState, Suspense, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import { useShareAppMessage, showLoading, hideLoading } from "@tarojs/taro";
import {
  Tabs,
  Table,
  Button,
  NavBar,
  Popup,
  Form,
  Cell,
  Picker
} from "@nutui/nutui-react-taro";
import { type TableColumnProps } from "@nutui/nutui-react-taro/dist/types/packages/table/types";
import TrendArrow from "./trend-arrow";
import { Filter, ArrowRight } from "@nutui/icons-react-taro";
import { getCateGoryApi, getProvinceApi, getPriceApi } from '@/api/service'

import "./index.scss";

const TableArea = (props) => {
  const [data4, setData4] = useState([]);
  useEffect(() => {
    if (props.value === props.categoryType) {
      showLoading()
      getPriceApi({
        categoryType: props.categoryType,
        provinceId: props.searchParams?.provinceId?.[0] || '0'
      }).then(res => {
        if (res.code === 0) {
          setData4(res.data?.list || [])
        }
      }).finally(() => {

        hideLoading()
      })
    } else {
      setData4([])
    }
  }, [props.categoryType, props.searchParams, props.value])
  const [columns4, setColumns4] = useState<TableColumnProps[]>([
    {
      title: "品名",
      key: "categoryName",
      align: "center",
      width: 100,
      render: (record) => {
        return (
          <View>
            <View>{record.categoryName}({record.specs || '-'})</View>
            <View>{record.quoteDate}</View>
          </View>
        );
      },
    },
    {
      title: "来源",
      key: "source",
      align: "center",
      width: 100,
      render: (record) => {
        return (
          <View>
            <View>{record.provinceName}</View>
            <View>
              <TrendArrow symbol value={record.diff} digits={0}></TrendArrow>
            </View>
          </View>
        );
      },
    },
    {
      title: "价格",
      key: "price",
      align: "center",
      fixed: "right",
      width: 100,
      render: (record) => {
        return (
          <View>
            <View>{record.price}{record.unit}</View>
          </View>
          // <Animate type='ripple' loop>
          //   <Lock
          //     size='18px'
          //     color='#FA2C19'
          //     onClick={() => {
          //       console.log(record.price);
          //       showToast({
          //         icon: "none",
          //         title: `${record.price}${record.unit}`,
          //       });
          //     }}
          //   />
          // </Animate>
        );
      },
    },
  ]);
  return <ScrollView scrollY style={{ height: "calc(100vh - 88rpx)" }}><Table
    columns={columns4}
    data={data4}
    striped
    bordered={false}
  /></ScrollView>
}

const Index = () => {
  const [tab1value, setTab1value] = useState("0");
  const [tab4value, setTab4value] = useState(1);
  const [showBasic, setShowBasic] = useState(false);
  const [list4, setList4] = useState([])
  const [provinceList, setProvinceList] = useState([])
  const [searchParams, setSearchParams] = useState({})
  useEffect(() => {
    getCateGoryApi().then(res => {
      if (res.code === 0) {
        setList4(res.data || [])
        if (res.data?.length) {
          setTab4value(res.data[0].categoryType)
        }
      }
    })
    getProvinceApi().then(res => {
      if (res.code === 0) {
        setProvinceList((res.data || []).map(item => ({ value: item.provinceId, text: item.name })))
      }
    })
  }, [])
  const submitSucceed = (values: any) => {
    console.log(values);
    setSearchParams(values)
    setShowBasic(false);
  };
  useShareAppMessage(() => {
    return {}
  })
  return (
    <Suspense fallback={<View>loading……</View>}>
      <NavBar
        back={null}
        titleAlign='left'
        right={
          <View
            onClick={() => {
              setShowBasic(true);
            }}
          >
            <Filter size='30rpx'></Filter>
            <span>筛选</span>
          </View>
        }
        fixed
      >
        {/* <div style={{ width: "100%" }}>
          <Tabs
            value={tab1value}
            onChange={(paneKey) => {
              setTab1value(paneKey);
            }}
            style={{
              "--nutui-tabs-titles-padding": 0,
              "--nutui-tabs-titles-gap": 0,
            }}
            activeType='card'
            align='left'
          >
            <Tabs.TabPane title='废金属报价'></Tabs.TabPane>
            <Tabs.TabPane title='现货/有色'></Tabs.TabPane>
          </Tabs>
        </div> */}
      </NavBar>
      <View className='wrap'>
        <Tabs
          value={tab4value}
          style={{ height: "calc(100vh - 88rpx)" }}
          onChange={(value) => {
            setTab4value(value);
          }}
          direction='vertical'
        >
          {list4.map((item) => (
            <Tabs.TabPane key={item.categoryType} title={item.name} value={item.categoryType}>
              <TableArea categoryType={tab4value} searchParams={searchParams} value={item.categoryType} />
            </Tabs.TabPane>
          ))}
        </Tabs>
      </View>
      <Popup
        visible={showBasic}
        onClose={() => {
          setShowBasic(false);
        }}
        closeable
        position='bottom'
        round
        title='数据筛选'
      >
        <Form
          style={{ "--nutui-form-item-label-width": "120px" }}
          footer={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button style={{ width: ' 50%' }} nativeType='submit' type='primary'>
                提交
              </Button>
              <Button nativeType='reset' style={{ marginLeft: "20px", width: '50%' }}>
                重置
              </Button>
            </div>
          }
          onFinish={(values) => submitSucceed(values)}
        >
          <Form.Item label='省份' name='provinceId' trigger='onConfirm'
            getValueFromEvent={(...args) => args[1]}
            onClick={(event, ref: any) => {
              ref.open()
            }}
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
                        : '请选择'
                    }
                    extra={<ArrowRight />}
                    align='center'
                  />
                )
              }}
            </Picker>
          </Form.Item>
        </Form>
      </Popup>
    </Suspense>
  );
};

export default Index;
