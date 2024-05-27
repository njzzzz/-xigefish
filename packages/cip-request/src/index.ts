import axios from 'axios'
import store from './store'
import { defaultAxiosConfig } from './default-config'
import { request } from './request'
import { use } from './use'
import { UploadFile } from './upload-file'
import { DownloadFile } from './download-file'
import { mockRequest } from './mock-request'

export type { IRequestPlugin } from './use'
export type { IConfig, IApiConfig, IProxyConfig } from './store'
// 默认超时10s
axios.defaults.timeout = 10000
// 默认请求内容类型
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
// 加载方法默认配置
defaultAxiosConfig(axios)
// 加载自定义配置
// eslint-disable-next-line no-unused-expressions



const setConfig = store.setConfig
const setApiConfig = store.setApiConfig

const rewriteRequest = request as (typeof request & {
  use: typeof use
  setConfig: typeof setConfig
  setApiConfig: typeof setApiConfig
})

rewriteRequest.use = use
rewriteRequest.setConfig = setConfig
rewriteRequest.setApiConfig = setApiConfig

export {
  request,
  UploadFile,
  DownloadFile,
  mockRequest,
  use,
  store,
  setConfig,
  setApiConfig
}
// 支持历史项目
export default rewriteRequest
