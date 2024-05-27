import { RequestFileConstructorParams, RequestFile } from './request-file'
import { downloadByStream, getFileNameFormHeader } from './util'
import type { IMethod } from './util'

export class DownloadFile extends RequestFile {
  constructor ({ type, method = 'get', apiName, url, params = {}, data, config = {}, pathParams = {}, headers = {} }: RequestFileConstructorParams & {type: string}) {
    method = (type || method) as IMethod
    super({ method, apiName, url, data, pathParams, params, config, headers })
    this.config.responseType = 'blob'
    this.cancelMessage = '已取消下载'
  }

  async send () {
    try {
      const res = await this.request()
      const filenameISO = getFileNameFormHeader(res.headers['content-disposition'])
      const filename = this.config.encodeType === 'iso' ? decodeURI(escape(filenameISO)) : filenameISO//
      downloadByStream(res.data, filename)
    } catch (err) {
      this.notifyError(err)
      throw err
    }
  }
}
