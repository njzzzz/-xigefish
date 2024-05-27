import { getRequestPath, notifyErrorMessage } from './util'
import type { IMethod } from './util'
import axios from 'axios'
import store from './store'
export interface IAnyObject {
  [propname: string]: any
}
const CancelToken = axios.CancelToken
export type RequestFileConstructorParams = {
  method?: IMethod,
  apiName: string,
  url: string,
  pathParams?: IAnyObject,
  params?: IAnyObject,
  config?: IAnyObject,
  data?: IAnyObject,
  headers?: Record<string, string>
}
export class RequestFile {
  cancelMessage = ''
  method: IMethod
  path: string
  data: IAnyObject
  params: IAnyObject
  cancel: (...args: any) => void
  config: IAnyObject
  constructor ({ method, apiName, url, pathParams, params, config, data, headers }: RequestFileConstructorParams) {
    this.method = method.toLocaleLowerCase() as IMethod
    this.path = getRequestPath(apiName, url, pathParams)
    this.data = data
    this.params = params
    config.timeout = 0
    this.cancel = () => {} // noop
    this.abort = this.abort.bind(this) // 显示的绑定
    const _this = this
    config.cancelToken = new CancelToken(function (c) {
      _this.cancel = c
    })
    config.headers = Object.assign({}, config.headers, headers)
    this.config = config
  }

  request () {
    const { method, params, data, path, config } = this
    return axios({ ...config, url: path, method, params, data })
  }

  send () {
    throw new Error('overwrite [send] method')
  }

  notifyError (err) {
    notifyErrorMessage(err).then(message => {
      store.config.MessageError?.(message)
    })
  }

  abort () {
    this.cancel(this.cancelMessage)
  }
}
