import { computed, h, watch, ref } from 'vue'
import FileRow from './file-row'
import { formInputViewProps, useFormView } from '@xigefish/d-render-shared'

import { isString } from '@xigefish/d-render-shared'
export default {
  props: formInputViewProps,
  setup (props) {
    const { securityConfig } = useFormView(props)
    const FileComponent = (file) => h(FileRow, {
      file: file,
      config: securityConfig.value,
      dependOnValues: props.dependOnValues
    })
    const useStringValue = computed(() => {
      return securityConfig.value.stringValue
    })
    const objectValue = computed(() => { // 返回的数据是一个对象
      return securityConfig.value.objectValue
    })
    const fileList = ref()
    watch(() => props.modelValue, () => {
      if (props.modelValue) {
        if (!useStringValue.value) {
          // 兼容未配置stringValue但存储结果为string的modelValue
          if (isString(props.modelValue)) {
            fileList.value = props.modelValue.split(',').map(v => ({ url: v }))
          } else if (objectValue.value) {
            fileList.value = [props.modelValue]
          } else {
            fileList.value = props.modelValue
          }
        } else {
          fileList.value = props.modelValue.split(',').map(v => ({ url: v }))
        }
      } else {
        fileList.value = []
      }
    }, { immediate: true })
    const FileRows = () => (fileList.value || []).map(FileComponent)
    return () => h('div', { style: { width: '100%' } }, { default: FileRows })
  }
}
