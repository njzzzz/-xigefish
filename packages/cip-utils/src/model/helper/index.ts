import Model from '../model'
export function decorate (handleDescriptor: any, entryArgs: any) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, [])
  } else {
    return function () {
      return handleDescriptor(...Array.prototype.slice.call(arguments), entryArgs)
    }
  }
}

/**
 * 判断是否为 descriptor
 * @param desc
 * @return {boolean}
 */
export function isDescriptor (desc: any) {
  if (!desc || !desc.hasOwnProperty) {
    return false
  }

  const keys = ['value', 'initializer', 'get', 'set']

  for (let i = 0, l = keys.length; i < l; i++) {
    // eslint-disable-next-line no-prototype-builtins
    if (desc.hasOwnProperty(keys[i])) {
      return true
    }
  }

  return false
}

/**
 * 判断是否为实体
 * @param value
 * @return {boolean}
 */
export function isModel (value: any) {
  return value instanceof Model
}

export function bind (fn: any, context: any) {
  if (fn.bind) {
    return fn.bind(context)
  } else {
    return function __autobind__ () {
      return fn.apply(context, arguments)
    }
  }
}
