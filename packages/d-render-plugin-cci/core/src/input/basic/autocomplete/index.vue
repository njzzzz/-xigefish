<template>
  <el-autocomplete
    ref="inputRef"
    v-bind="inputProps"
    :disabled="disabled"
    :placeholder="placeholder"
    :clearable="clearable"
    :style="{...inputStyle,width }"
    v-model="proxyValue"
    :fetch-suggestions="querySearchAsync"
  />
</template>
<script>
import { ElAutocomplete } from 'element-plus'
import { useFormInput, useInputProps, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  components: { ElAutocomplete },
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, content) {
    const { width, securityConfig, proxyValue, placeholder, clearable, inputRef, inputStyle } = useFormInput(props, content)

    const inputProps = useInputProps(props, [
      'icon',
      'debounce',
      'placement',
      'popperClass',
      'triggerOnFocus',
      'name',
      'selectWhenUnmatched',
      'label',
      'prefixIcon',
      'suffixIcon',
      'hideLoading',
      'teleported',
      'highlightFirstItem',
      'fitInputWidth'
    ])

    const querySearchAsync = async (query, cb) => {
      if (securityConfig.value.asyncOptions) {
        const options = await securityConfig.value.asyncOptions(query)
        cb(options)
      } else {
        // eslint-disable-next-line standard/no-callback-literal
        cb([])
        throw new Error('autocomplete 类型的 config 需要编写 asyncOptions')
      }
    }
    return {
      inputRef,
      inputStyle,
      width,
      securityConfig,
      proxyValue,
      placeholder,
      clearable,
      inputProps,
      querySearchAsync
    }
  }
}
</script>
