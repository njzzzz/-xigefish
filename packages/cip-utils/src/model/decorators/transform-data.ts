import { decorate, isModel, bind } from '../helper'
import { isArray, isNotEmpty, cloneDeep } from '../../util'
import qs from 'qs'
import { cConsole } from '../../c-console'
interface IHandleDescriptorParams {
  params: any
  result: any
  cache: boolean
}
function handleDescriptor (target: any, key: any, descriptor: PropertyDescriptor, [opts]: [Partial<IHandleDescriptorParams>]) {
  const { params, result, cache } = opts || {}
  // value和writeable不可共存
  const { value: callback, writable, ...d } = descriptor
  const fn = async function (...args) {
    const uid = cConsole.open(`${target.constructor.name}.${key}`)
    const fromEntity = isModel(result) ? result : this
    const toEntity = isModel(params) ? params : this
    const reqParams = qs.stringify(args[0])
    const cacheKey = `_${key}Cache&${reqParams}`
    if (cache && this[cacheKey]) {
      // process.env.NODE_ENV === 'development' && cConsole.log(uid, { Service: target.constructor.name, method: key, tips: '使用缓存数据', data: this[cacheKey] })
      return cloneDeep(this[cacheKey])
    }
    if (isNotEmpty(args[0])) {
      const toMethod = isArray(args[0]) ? 'toDataSet' : 'toData'
      args[0] = toEntity[toMethod](args[0])
    }
    cConsole.append(uid, 'params', args[0])
    const res = await callback.apply(this, args)
    if (res.$config) {
      cConsole.append(uid, 'url', `[${res.$config.method}]:${res.$config.url}`)
      Reflect.deleteProperty(res, '$config')
    }
    if (res?.data && typeof res.data === 'object') {
      const formMethod = isArray(res.data) ? 'fromDataSet' : 'fromData'
      res.data = fromEntity[formMethod](res.data)
    }
    cConsole.append(uid, 'result', res)
    cConsole.end(uid)
    if (cache) {
      // process.env.NODE_ENV === 'development' && cConsole.log(uid, { Service: target.constructor.name, method: key, tips: '', data: res })
      this[cacheKey] = res
    }
    return res
  }
  return {
    ...d,
    get () {
      if (this === target) {
        return fn
      }
      const boundFn = bind(fn, this)
      Object.defineProperty(this, key, {
        configurable: true,
        writable: true,
        // NOT enumerable when it's a bound method
        enumerable: false,
        value: boundFn
      })

      return boundFn
    }
  }
}
export function transformData (...args: any) {
  return decorate(handleDescriptor, args)
}
