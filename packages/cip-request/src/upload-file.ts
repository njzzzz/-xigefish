import store from './store'
import { RequestFile } from './request-file'
import { isSuccess } from './util';
import type { IMethod } from './util'
import type { RequestFileConstructorParams } from './request-file'

export interface UploadFileConstructorParams extends RequestFileConstructorParams{
  type?: IMethod
  formData?: FormData
  resolveCb?: (path: string, servicePath: string) => string
}

export class UploadFile extends RequestFile {
  resolveCb: (path: string, servicePath?: string) => string
  servicePath: string
  // formData 参数即将废弃 使用data代替
  constructor ({ type, method = 'post', apiName, url, formData, data, params = {}, config = {}, pathParams = {}, headers = {}, resolveCb }:UploadFileConstructorParams) {
    data = data ?? formData
    method = (type || method) as IMethod
    super({ method, apiName, url, data, pathParams, params, config, headers })
    this.cancelMessage = '已取消上传'
    this.resolveCb = resolveCb ?? ((_data) => _data)
    this.servicePath = apiName ? store.apiConfig[apiName] : '' // 用于resolveCb的入参
  }

  async send () {
    try {
      const res = await this.request()
      if (isSuccess(res, this.config)) {
        const { servicePath } = this
        const data = this.resolveCb(res.data?.data, servicePath)
        return { ...res.data, data }
      } else {
        // 抛给cache来处理错误
        throw res.data
      }
    } catch (err) {
      this.notifyError(err)
      throw err
    }
  }
}
