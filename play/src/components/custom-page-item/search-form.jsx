import { CipSearchForm } from '@xigefish/d-render'
import { watch, ref, computed, inject, toRaw } from 'vue'
import { getFieldValue } from '@xigefish/d-render-shared'

const uesBridge = (props, emit, key) => {
  const value = ref()
  watch(() => getFieldValue(props, key), (val) => {
    value.value = val
    console.log('watch', key)
  }, { immediate: true })
  watch(value, (val) => {
    console.log('value change', val)
    emit(`update:${key}`, val)
  }, { deep: true })
  return value
}

export default {
  props: {
    data: {},
    config: {}
  },
  setup (props, { emit }) {
    const inputProps = computed(() => props.config?.props)
    const dataBridge = uesBridge(props, emit, 'data')
    const tempData = ref({ ...(dataBridge.value || {}) })
    const onSearch = () => {
      dataBridge.value = tempData.value
      emitEvents('searchFormA.onSearch', toRaw(dataBridge.value))
    }
    const emitEvents = inject('emit-events')

    return () => <CipSearchForm
      v-model:model={tempData.value}
      fieldList={inputProps.value.fieldList}
      onSearch={onSearch}
    />
  }
}
