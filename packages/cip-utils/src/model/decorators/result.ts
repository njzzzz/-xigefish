import { isArray } from '../../util'
import { decorate, isModel } from '../helper'

function handleDescriptor (_target, _name, descriptor: any, [Entity]: any) {
  return {
    ...descriptor,
    async value (...args: any) {
      const entity = isModel(Entity) ? Entity : this
      const res = await descriptor.value.apply(this, args)
      if (res?.data && typeof res.data === 'object') {
        const formMethod = isArray(res.data) ? 'fromDataSet' : 'fromData'
        res.data = entity[formMethod](res.data)
      }
      return res
    }
  }
}

export function result (...args: any) {
  return decorate(handleDescriptor, args)
}
