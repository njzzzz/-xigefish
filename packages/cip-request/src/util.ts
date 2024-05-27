import store from './store'
import template from 'url-template'
import qs from 'qs'
import type { IPostOptions } from './request'
import type { AxiosError, AxiosResponse } from 'axios'
export { cloneDeep } from '@xigefish/d-render-shared'

export interface IAnyObject {
  [propname: string]: any
}
export type IMethod = 'get' | 'post' | 'put' | 'delete'
export const isObject = (val) => Object.prototype.toString.call(val) === '[object Object]'
export const isNotEmpty = (val) => val !== undefined && val !== null
// 判断返回是否成功
export const isSuccess = (res, options, defaultSuccessCode = store.config.DEFAULT_SUCCESS_CODE) => {
  const code = res.data.code === undefined ? res.data.result : res.data.code
  const successCode = options.successCode !== undefined ? options.successCode : defaultSuccessCode
  return (code === successCode || options.noSuccessCode)
}

// application/octet-stream文件下载获取文件名
export const getFileNameFormHeader = (disposition) => {
  let result = null
  const reg = /filename=.*/ig
  if (disposition && reg.test(disposition)) {
    result = disposition.match(reg)
    return decodeURI(result[0].split('=')[1])
  } else {
    return null
  }
}
// 下载流
export const downloadByStream = (stream: BlobPart, filename: string) => {
  const blob = new Blob([stream])
  const eLink = document.createElement('a')
  eLink.download = filename
  eLink.style.display = 'none'
  eLink.href = URL.createObjectURL(blob)
  document.body.appendChild(eLink)
  eLink.click()
  URL.revokeObjectURL(eLink.href)
  document.body.removeChild(eLink)
}

export const notifyErrorMessage = async (res: AxiosError) => {
  // 如果请求为blob类型
  let data = res.response?.data
  if (Object.prototype.toString.call(data) === '[object Blob]') {
    data = await blobToJson(data)
    if (data && typeof data === 'string') {
      return data
    } else { // blob中为对象时
      return data.message
    }
  }
  // res : AxiosResponse
  if ((res as unknown as AxiosResponse)?.data?.message) return (res as unknown as AxiosResponse).data.message
  if (res?.response?.data?.message) return res.response.data.message
  if (res.message) return res.message
  return '发生了未知的错误'
}

const blobToJson = (blob: Blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsText(blob, 'utf-8')
    reader.onload = function () {
      resolve(JSON.parse(reader.result as string))
    }
  })
}

export const getArgs = (args) => {
  if (isObject(args[0])) {
    return args[0]
  } else {
    let [method, apiName, url, params, options = {}] = args
    let data = {}
    method = method.toLocaleLowerCase()
    if (['put', 'post'].includes(method)) {
      data = params
      params = options.params
      Reflect.deleteProperty(options, 'params')
    }
    const pathParams = options.pathParams
    Reflect.deleteProperty(options, 'pathParams')
    return {
      method,
      apiName,
      url,
      data, // post | put 请求
      params,
      pathParams,
      options
    }
  }
}

export const getRequestPath = (apiName: string|undefined, path: string, params: IAnyObject): string => {
  const apiContextPath = store.apiConfig[apiName]
  let requestPath = apiContextPath ? apiContextPath + path : path
  if (requestPath.indexOf?.('{') > -1) {
    requestPath = template.parse(requestPath).expand(params)
  }
  return requestPath
}

export const getRequestData = (data: IAnyObject, options: IPostOptions) => {
  if (options.form) {
    data = qs.stringify(data)
  }
  return data
}

export const getRequestConfig = (params: IAnyObject, options= {} as IPostOptions, appendTimestamp = true) => {
  const config = options as (IPostOptions & { params: IAnyObject })
  // 是否需要添加时间戳
  if (appendTimestamp) params._t = Date.now()
  // post/put使用formData
  if (options.form) {
    config.headers = { ...config.headers, 'Content-Type': 'application/x-www-form-urlencoded' }
    Reflect.deleteProperty(options, 'form') // options.form
  }
  config.params = params
  return config
}

/**
 *
 * @description 2个对象值进行比较
 * @param objectA {Object}
 * @param objectB {Object}
 * @return {boolean}
 */
export const objectEqual = (objectA = {}, objectB = {}) => {
  if (objectA === objectB) return true
  const keysA = Object.keys(objectA)
  const keysB = Object.keys(objectB)
  if (keysA.length !== keysB.length) return false
  const keysLength = keysA.length
  for (let i = 0; i < keysLength; i++) {
    const keyA = keysA[i]
    if (!keysB.includes(keyA)) return false
    const valueA = objectA[keyA]
    const valueB = objectB[keyA]
    if (typeof valueA === 'object' && typeof valueB === 'object') {
      if (!objectEqual(valueA, valueB)) return false
    } else {
      if (valueA !== valueB) return false
    }
  }
  // 排除所有不想等的情况
  return true
}
