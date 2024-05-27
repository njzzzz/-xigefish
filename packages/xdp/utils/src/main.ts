export const isNotEmpty = (val) => {
  return val !== undefined && val !== null
}

/**
 * 是否为没有空对象
 * @param value {Object} 待判断对象
 * @return {boolean}
 */
export const isEmptyObject = (value) => {
  return Object.keys(value).length === 0
}
/**
 * 判断值是否为数组
 * @param value {*}
 * @return {boolean}
 */
export const isArray = (value) => {
  return Object.prototype.toString.call(value) === '[object Array]'
}
/**
 * 判断是否对象
 * @param value
 * @return {boolean}
 */
export const isObject = (value) => {
  return Object.prototype.toString.call(value) === '[object Object]'
}


/**
 * 从对象获取一个property
 * @param target {Object} 目标对象
 * @param propertyName {String} 属性名
 */
export const getFieldValue = (target, propertyName) => {
  if (isNotEmpty(propertyName)) {
    const keys = propertyName.split('.')
    for (let i = 0; i < keys.length; i++) {
      if (i === keys.length - 1 && isNotEmpty(target[keys[i]])) {
        return target[keys[i]]
      } else if (isObject(target[keys[i]])) {
        target = target[keys[i]]
      } else if (isArray(target[keys[i]])) {
        if (isNaN(Number(keys[i]))) target = target[keys[i]]
      } else {
        return undefined
      }
    }
  } else {
    return undefined
  }
}
/**
 * 向对象添加一个property
 * @param target {Object} 目标对象
 * @param propertyName {String} 属性名
 * @param value
 * @param hasArray {boolean} 遇到数字是否认为是数组
 */
export const setFieldValue = (target, propertyName, value, hasArray = false) => {
  if (isNotEmpty(propertyName)) {
    const keys = propertyName.split('.')
    const len = keys.length - 1
    keys.reduce((cur, key, index) => {
      if (index < len) {
        if (!cur[key]) {
          // 判断下一个key是否为数字
          if (hasArray && !isNaN(Number(keys[index + 1]))) {
            cur[key] = []
          } else {
            cur[key] = {}
          }
        }
      }
      if (index === len) {
        cur[key] = value
      }
      return cur[key]
    }, target)
  }
}
