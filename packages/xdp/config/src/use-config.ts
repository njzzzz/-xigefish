import { computed, inject, unref } from 'vue'
import { getFieldValue, isNotEmpty } from '@xigefish/d-render-shared'
import { getKeyAndDefault, getUsingConfig } from './helper'
export const xdpConfigKey = 'cip-config' // 兼容,
export const useConfig = () => {
  // 当无法获取provide下发的数据时采用store.state.config
  return inject(xdpConfigKey, { })
}

export const useComponentProps = (props, base, keys, configs) => {
  const xdpConfig = useConfig()
  return computed(() => {
    return keys.reduce((acc, config) => {
      const [key, defaultValue] = getKeyAndDefault(config)
      const value = getUsingConfig(
        getFieldValue(props, key),
        ...(configs || []).map((v) => {
          return getFieldValue(unref(v), `${base}.${key}`)
        }),
        getFieldValue(xdpConfig, `${base}.${key}`),
        defaultValue
      )
      if (isNotEmpty(value)) {
        acc[key] = value
      }
      return acc
    }, {})
  })
}
