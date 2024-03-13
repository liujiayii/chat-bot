import { useState, Suspense } from "react";
import { View } from "@tarojs/components";
import { showToast } from "@tarojs/taro";
import {
  Tabs,
  Table,
  Button,
  Toast,
  Animate,
  NavBar,
  Popup,
} from "@nutui/nutui-react-taro";
import { type TableColumnProps } from "@nutui/nutui-react-taro/dist/types/packages/table/types";
import TrendArrow from "./trend-arrow";
import { Star, Lock, Filter } from "@nutui/icons-react-taro";
import {
  Form,
  Input,
  Cell,
  Switch,
  Checkbox,
  Radio,
  Picker,
  Uploader,
  Rate,
  Range,
} from "@nutui/nutui-react-taro";
import { ArrowRight } from "@nutui/icons-react-taro";

import "./index.scss";

const list4 = Array.from(new Array(10).keys());
const Index = () => {
  const [tab1value, setTab1value] = useState("0");
  const [tab4value, setTab4value] = useState("0");
  const [showBasic, setShowBasic] = useState(false);
  const [columns4, setColumns4] = useState<TableColumnProps[]>([
    {
      title: "品名",
      key: "name",
      align: "center",
      width: 100,
      render: (record) => {
        return (
          <View>
            <View>{record.name}</View>
            <View>{record.date}</View>
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
            <View>{record.source}</View>
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
          <Animate type="ripple" loop>
            <Lock
              size="18px"
              color="#FA2C19"
              onClick={() => {
                console.log(record.price);
                showToast({
                  icon: "none",
                  title: `${record.price}元`,
                });
              }}
            />
          </Animate>
        );
      },
    },
  ]);
  const [data4, setData4] = useState([
    {
      name: "黄杂铜(CU59%)",
      date: "2024-03-12",
      source: "山东临沂",
      diff: 100,
      price: 28,
    },
    {
      name: "#2铜(CU95.5%)",
      date: "2024-03-11",
      source: "山东临沂",
      diff: 80,
      price: 18,
    },
    {
      name: "#1铜(CU97%)",
      date: "2024-03-1",
      source: "天津地区",
      diff: -100,
      price: 8,
    },
  ]);

  const submitSucceed = (values: any) => {
    console.log(values);
  };
  return (
    <Suspense fallback={<View>loading……</View>}>
      <NavBar
        back={null}
        titleAlign="left"
        right={
          <View
            onClick={() => {
              setShowBasic(true);
            }}
          >
            <Filter size="30rpx"></Filter>
            <span>筛选</span>
          </View>
        }
        fixed
      >
        <div style={{ width: "100%" }}>
          <Tabs
            value={tab1value}
            onChange={(paneKey) => {
              setTab1value(paneKey);
            }}
            style={{
              "--nutui-tabs-titles-padding": 0,
              "--nutui-tabs-titles-gap": 0,
            }}
            activeType="card"
            align="left"
          >
            <Tabs.TabPane title="废金属报价"></Tabs.TabPane>
            <Tabs.TabPane title="现货/有色"></Tabs.TabPane>
          </Tabs>
        </div>
      </NavBar>
      <View className="wrap">
        <Tabs
          value={tab4value}
          //style={{ height: "300px" }}
          onChange={(value) => {
            setTab4value(value);
          }}
          direction="vertical"
        >
          {list4.map((item) => (
            <Tabs.TabPane key={item} title={`Tab ${item}`}>
              <Table
                columns={columns4}
                data={data4}
                striped={true}
                bordered={false}
              />
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
        position="bottom"
        round
        title="数据筛选"
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
              <Button nativeType="submit" type="primary">
                提交
              </Button>
              <Button nativeType="reset" style={{ marginLeft: "20px" }}>
                重置
              </Button>
            </div>
          }
          onFinish={(values) => submitSucceed(values)}
          onFinishFailed={(values, errors) => submitFailed(errors)}
        >
          <Form.Item label="Input" name="form_input">
            <Input placeholder="placeholder" />
          </Form.Item>
          <Form.Item label="Switch" name="switch">
            <Switch />
          </Form.Item>
          <Form.Item label="Checkbox" name="checkbox">
            <Checkbox labelPosition="right" label="Option 1" />
          </Form.Item>
          <Form.Item label="Check Group" name="checkbox_group">
            <Checkbox.Group>
              <Checkbox labelPosition="right" label="Option 1" value={1} />
              <Checkbox labelPosition="right" label="Option 2" value={2} />
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Radio" name="radio">
            <Radio value="1">Radio 1</Radio>
          </Form.Item>
          <Form.Item label="Radio Group" name="radio_group">
            <Radio.Group>
              <Radio value="1">Radio 1</Radio>
              <Radio value="2">Radio 2</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Rate" name="rate">
            <Rate defaultValue={0} />
          </Form.Item>
          <Form.Item label="Range" name="range">
            <Range max={10} min={-10} />
          </Form.Item>
          <Form.Item
            label="Uploader"
            name="files"
            initialValue={[
              {
                name: "file1.png",
                url: "https://m.360buyimg.com/babel/jfs/t1/164410/22/25162/93384/616eac6cE6c711350/0cac53c1b82e1b05.gif",
                status: "success",
                message: "success",
                type: "image",
                uid: "122",
              },
            ]}
          >
            <Uploader url="https://my-json-server.typicode.com/linrufeng/demo/posts" />
          </Form.Item>
        </Form>
      </Popup>
    </Suspense>
  );
};

export default Index;
