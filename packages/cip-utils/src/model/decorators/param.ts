import { isArray } from '../../util'
import { decorate, isModel } from '../helper'

function handleDescriptor (_target, _name, descriptor: any, [Entity]: any) {
  return {
    ...descriptor,
    value (...args: any) {
      const entity = isModel(Entity) ? Entity : this
      const toMethod = isArray(args[0]) ? 'toDataSet' : 'toData'
      args[0] = entity[toMethod](args[0])
      return descriptor.value(...args)
    }
  }
}

/**
 * 按传入实体转换异步返回的res.data
 * @return {function(*, *, *): *&{value(...[*]): *}}
 * @param args
 */

export function param (...args: any) {
  return decorate(handleDescriptor, args)
}
