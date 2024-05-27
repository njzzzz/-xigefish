import axios from 'axios'
import type { AxiosPromise } from 'axios'
import store from './store'
import { objectEqual, cloneDeep, isNotEmpty } from './util'
import { IAnyObject } from './request-file'

const CancelToken = axios.CancelToken

interface IRequestSign {
  url: string
  query: string
  data: IAnyObject
}
const equalRequest = (requestSignA: IRequestSign, requestSignB: IRequestSign) => {
  const { url: urlA, query: queryA, data: dateA } = requestSignA
  const { url: urlB, query: queryB, data: dateB } = requestSignB
  if (urlA !== urlB) return false
  if (!objectEqual(queryA, queryB)) return false
  if (!objectEqual(dateA, dateB)) return false
  return true
}
export class RequestQueue {
  isSending: boolean
  collectionTime: number
  requestQueue: any[]
  constructor (collectionTime = 50) {
    this.isSending = false
    this.collectionTime = collectionTime
    this.requestQueue = [] // 二维数组
  }
  judgeMerge ({ method, url, data, config }) {
    if(isNotEmpty(config.merge)) return config.merge
    if(typeof store.config.mergeFn !== 'function'){
      return method === 'get'
    } else {
      const mergeRes = store.config.mergeFn({ method, url, data, config })
      if (mergeRes) {
        return true
      } else {
        return method === 'get'
      }
    }
  }
  // delete或者get时第二个参数为config
  request<T>({ method, url, data, config }): AxiosPromise<T> { // 需要合并get请求
    config.cancelToken = new CancelToken(function (c) {
      config._cancel = c
    })
    if (!(this.judgeMerge({method, url, data, config}))) { // 非get请求直接放行
      return axios({ method, url, data, ...config })
    } else {
      if (this.isSending === false) {
        this.isSending = true
        setTimeout(() => {
          this.isSending = false
          this.send()
        }, this.collectionTime)
      }
      return new Promise((resolve, reject) => {
        this.requestQueue.push({ method, url, data, config, resolve, reject })
      })
    }
  }

  mergeRequestQueue (requestQueue) {
    const result = []
    requestQueue.forEach(request => {
      const { method, url, data, config, resolve, reject } = request
      const { _t, ...query } = config.params // 排除_t对相同判断的影响
      const requestSign = { url, query, data } // 使用path、query、header判断是否为同一个请求
      const queueSigns = result.map(requests => requests[0])
      const queueIndex = queueSigns.findIndex(queueSign => equalRequest(queueSign, requestSign))
      if (queueIndex > -1) {
        result[queueIndex].push({ resolve, reject })
      } else {
        result.push([requestSign, { method, url, data, config }, { resolve, reject }])
      }
    })
    return result
  }

  send () {
    const sendRequestQueue = this.mergeRequestQueue(this.requestQueue)
    this.requestQueue = []
    sendRequestQueue.map(async requestGroup => {
      const { method, url, data, config } = requestGroup[1]
      axios({ method, url, data, ...config }).then(res => {
        this.returnResult(res, 'resolve', requestGroup)
      }).catch(err => {
        this.returnResult(err, 'reject', requestGroup)
      })
    })
  }

  returnResult (res, type, requestGroup) {
    if (requestGroup.length > 3) console.log(requestGroup[0].url, '合并', requestGroup.length - 2, '次')
    for (let i = 2; i < requestGroup.length; i++) {
      if (type === 'reject') {
        requestGroup[i][type](res)
      } else {
        // 深克隆
        requestGroup[i][type](cloneDeep(res))
      }
    }
  }
}
