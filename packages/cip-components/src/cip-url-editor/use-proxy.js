import { computed } from 'vue'
import { getFieldValue, getUsingConfig } from '@xigefish/d-render-shared'
export const useProxy = (props, keys, emit) => {
  return [].concat(keys).map(key => {
    return computed({
      get () {
        return getFieldValue(props, key)
      },
      set (val) {
        emit(`update:${key}`, val)
      }
    })
  })
}

export const useDisabled = (props, keys) => {
  return []
    .concat(keys)
    .map(key =>
      computed(() =>
        getUsingConfig(props.disabled, getFieldValue(props.disabledConfig, key))
      )
    )
}
