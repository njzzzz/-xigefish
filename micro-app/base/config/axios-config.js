
const customAxiosConfig = (axios) => {

  axios.interceptors.request.use(
    config => {
      // 可在请求前进行统一处理
      // 通常在此处处理token
      return config
    },
    err => {
      return Promise.reject(err)
    }
  )
}

export default {
  DEFAULT_SUCCESS_CODE: 200, // 默认的成功的code
  appendTimestamp: false, // 是否添加时间戳
  customAxiosConfig // 自定义axios 配置
}
