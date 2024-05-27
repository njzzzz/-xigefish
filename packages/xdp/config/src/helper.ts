import { isNotEmpty } from '@xigefish/d-render-shared'
export const getUsingConfig = (...args) => {
  for (let i = 0; i < args.length; i++) {
    const value = args[i]
    if (isNotEmpty(value)) {
      return value
    }
  }
}

export const getKeyAndDefault = (config) => {
  let key, defaultValue
  if (typeof config === 'object') {
    key = config[0]
    defaultValue = config[1]
  } else {
    key = config
  }
  return [key, defaultValue]
}
