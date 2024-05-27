import { getArgs, getRequestConfig, getRequestData, getRequestPath, isSuccess, notifyErrorMessage } from './util'
import type { IAnyObject } from './util';
import store from './store'
import type { IConfig } from './store'
import { RequestQueue } from './request-queue'
const requestQueue = new RequestQueue()
export interface IResponsePagingData<T> {
  code: number
  data: T
  message: string
  offset?: number
  pageNum?: number
  limit?: number
  total?: number
}

interface IGetOptions {
  autoNotify?: boolean
  headers?: IAnyObject
  timeout?: number
  enableCancel?: boolean
  merge?: boolean
  _cancel?: () => void
}

export interface IPostOptions extends IGetOptions {
  form?: boolean
}

export interface IPostParams {
  method: 'post' | 'put'
  apiName: string
  url: string
  params?: IAnyObject
  pathParams?: IAnyObject
  data?: IAnyObject
  options?: IPostOptions
}
export interface IGetParams {
  method?: 'get' | 'delete'
  apiName: string
  url: string
  params?: IAnyObject
  pathParams?: IAnyObject
  options?: IGetOptions
}

export type Params = T extends { methods: infer U }
? U extends 'post'
  ? IPostParams
  : IGetParams
: unknown


export const request: {
  <T>(
  params: IPostParams | IGetParams // (P extends { method: 'post'|'put' } ? IPostParams : IGetParams) | Params<U>
  ): Promise<IResponsePagingData<T>>
} = async <T>(...args) => {
  // 此处需要兼容以前的data和params
  let { method = 'get', apiName, url, data, params = {}, pathParams = {}, options={} } = getArgs(args) as  IPostParams
  method = method.toLocaleLowerCase()
  if (!['get', 'delete', 'post', 'put'].includes(method)) {
    const message = `未经过允许的请求类型${method}`
    store.config.MessageError?.(message)
    throw new Error(message)
  }
  // let config: IPostOptions
  // 合并data、params、pathParams的参数 为了兼容老代码
  const requestUrl = getRequestPath(apiName, url, Object.assign({}, data, params, pathParams))
  // 针对application/x-www-form-urlencoded的data进行格式化
  if (['post', 'put'].includes(method)) {
    data = getRequestData(data, options)
  }
  const config = getRequestConfig(params, options, store.config.appendTimestamp)
  let cancelLoading: ReturnType<IConfig['CancelLoading']>
  try {
    // 可取消的接口弹出框配置 {message: string, btnName: string, duration: number }
    if (options.enableCancel) {
      // 跳出弹出框, 弹出框点击取消调用config._cancel()，取消接口
      cancelLoading = store.config.CancelLoading?.({
        enableCancel: options.enableCancel,
        onCancel: () => {
          config._cancel()
        }
      })
    }
    const res = await requestQueue.request<IResponsePagingData<T>>({
      method: method,
      url: requestUrl,
      data,
      config
    })
    if (isSuccess(res, options, store.config.DEFAULT_SUCCESS_CODE)) {
      return res.data
    } else {
      // 此异常数据将页面代码中使用
      throw res.data
    }
  } catch (e) {
    if (options.autoNotify !== false) {
      const message = await notifyErrorMessage(e)
      store.config.MessageError?.(message)
    }
    throw e
  } finally {
    if (options.enableCancel) {
      // 如果弹出框存在的话，隐藏弹出框；
      cancelLoading.hide()
    }
  }
}


