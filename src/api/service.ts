import Taro from '@tarojs/taro'

const BASE_URL = 'https://api.feijiuwuziwang.com.cn'

type IOptions = {
  method?: "POST" | "GET";
  url: string;
  data?: Record<any, any>;
};

const request = (options: IOptions) => {
  return Taro
    .request({
      url: BASE_URL + options.url,
      data: options.data,
      header: {
        "Content-Type": "application/json",
      },
      method: options.method || "POST",
      timeout: 60000,
    })
    .then((res) => {
      // uni.hideLoading();
      let { statusCode, data: resData } = res;
      let data = resData as unknown as any;
      //console.log(data);
      if (statusCode >= 200 && statusCode < 300) {
        if (data.code !== 0) {
          Taro.showToast({
            icon: "none",
            title: "网络连接异常",
          });
        }
        return data || res;
      } else {
        Taro.showToast({
          icon: "none",
          title: "网络连接异常",
        });
        throw new Error(`网络请求错误，状态码${statusCode}`);
      }
    });
};


/** 左侧导航 */
export const getCateGoryApi = () => {
  return request({ url: '/metal/getCategoryType', method: 'GET' })
}

/** 省份 */
export const getProvinceApi = () => {
  return request({ url: '/metal/getProvince', method: 'GET' })
}

export const getPriceApi = (data) => {
  return request({ url: '/metal/getPrice', method: 'GET', data })
}

/** 获取反馈类型 */
export const getFeedbackTypeApi = (data) => {
  return request({ url: '/feedback/getType', method: 'GET', data })
}

/** 提交反馈 */
export const submitFeedbackApi = (data) => {
  return request({ url: '/feedback/submit', method: 'POST', data })
}