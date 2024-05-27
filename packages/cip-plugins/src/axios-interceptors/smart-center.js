import { isEmpty } from '@xigefish/d-render-shared'
import { store } from '@xigefish/request'

const needTransform = (url, realBasePaths) => {
  if(realBasePaths.length > 0){
    return realBasePaths.some(v => url.indexOf(v)===0)
  } else {
    return true
  }
}

const transformSuccessResponse = (response, realBasePaths) => {
  if (response?.data &&  needTransform(response.config.url, realBasePaths) && !(response.data instanceof Blob)) {
    let transData = {}
    const { msg, status, code, data } = response.data
    if (msg) transData.message = msg
    transData.code = isEmpty(code) ? status : code
    // 在特殊情况下code与status同时存在切需要使用status
    transData.status = status
    // 进入时已添加code status message数据
    if (data?.data) {
      // 接收参数转换
      const { page, ...otherInfo } = data
      // 非page对象原因塞入
      transData = { ...transData, ...otherInfo }
      // transData.data = data.data
      // 处理分页
      const offset = (page.pageNum - 1) * page.pageSize
      transData.pageNum = page.pageNum
      transData.limit = page.pageSize
      transData.total = page.total
      // 返回offset异常会导致table组件塌缩
      transData.offset = isNaN(offset) ? 0 : offset
      // transData.fields = data.fields
    } else {
      transData.data = data
    }
    response.data = transData
  }
  return response
}




export const smartCenterInterceptors = (axios, includes = []) => {
  const realBasePaths = includes.map(v=>store.apiConfig[v])
  // 转换分页参数
  axios.interceptors.request.use(config => {
    const { params, url } = config
    if (params && needTransform(url, realBasePaths)) {
      config.params.pageNum = params.limit ? (params.offset / params.limit) + 1 : undefined
      config.params.pageSize = params.limit
      config.params.limit = undefined
      config.params.offset = undefined
    }
    return config
  }, err => {
    return Promise.reject(err)
  })

  // 转换数据结构
  axios.interceptors.response.use(response => {
    return transformSuccessResponse(response, realBasePaths)
  }, err => {
    if (err && err.response) {
      const errorMessage =
        err.response?.data?.data?.msg ||
        err.response?.data?.msg
      // 将错误信息转换为message供下次处理
      err.response.data.message = errorMessage
    }
    return Promise.reject(err)
  })
}
