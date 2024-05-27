import type { AxiosInstance } from "axios"

export const defaultAxiosConfig = (axios: AxiosInstance) => {
  axios.interceptors.request.use(config => {
    // 此代码用于支持 get 修改content-type [注： axios的get请求默认不支持content-type修改]
    if (config.method === 'get') config.data = true
    return config
  }, err => Promise.reject(err))
  axios.interceptors.response.use(
    response => {
      if (response?.data && typeof response.data === 'object' && process.env.NODE_ENV === 'development') {
        response.data.$config = response.config
      }
      return response
    },
    err => {
      if (err.__CANCEL__) {
        err.message = '请求已取消'
      }
      if (err && err.code) {
        if (err.code === 'ECONNABORTED') {
          err.message = '请求超时'
        }
      }
      if (err && err.response) {
        const status = err.response.status
        const errorMessage =
          err.response?.data?.data?.message ||
          err.response?.data?.message
        switch (status) {
          case 400:
            err.message = errorMessage
            break
          case 401:
            err.message = errorMessage
            break
          case 403:
            err.message = errorMessage
            break
          case 404:
            err.message = errorMessage || `请求地址出错: ${err.response.config.url}`
            break
          case 408:
            err.message = errorMessage || '请求超时'
            break
          case 500:
            err.message = errorMessage || '服务器内部错误'
            break
          case 501:
            err.message = errorMessage || '服务未实现'
            break
          case 502:
            err.message = errorMessage || '网关错误'
            break
          case 503:
            err.message = errorMessage || '服务不可用'
            break
          case 504:
            err.message = errorMessage || '网关超时'
            break
          case 505:
            err.message = errorMessage || 'HTTP版本不受支持'
            break
          default:
            err.message = errorMessage || '未知的错误'
        }
      }

      return Promise.reject(err)
    }
  )
}
