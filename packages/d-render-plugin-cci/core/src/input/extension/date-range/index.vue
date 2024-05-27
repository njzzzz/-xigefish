<template>
  <div :class="['cip-date-scope',{'is-focus': isFocus, 'is-separate': isSeparate}]" :style="{width}">
      <basic-date-picker
        class="cip-date-range"
        v-model="proxyValue"
        :config="config"
        :disabled="disabled"
        @focus="onValueFocus"
        @blur="onValueBlur"
     />
    <span class="cip-date-scope__link"> — </span>
<!--    此处验证由上级处理-->
      <basic-date-picker
        class="cip-date-range"
        v-model="proxyOtherValue[0].value"
        :config="otherConfig"
        :disabled="disabled"
        @focus="onOtherValueFocus"
        @blur="onOtherValueBlur"
      />
  </div>
</template>

<script>
import BasicDatePicker from '../../basic/date-picker'
import { computed } from 'vue'
import {
  useFormInput, useCipConfig,
  formInputProps, fromInputEmits,
  getFieldValue, getUsingConfig, isInputEmpty
} from '@xigefish/d-render-shared'
import { dateInfoToTimes, getNotEmptyValue } from './util'
import { useFocusInput } from './use-focus-input'
export default {
  components: { BasicDatePicker },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const {
      proxyValue,
      proxyOtherValue,
      securityConfig,
      ...formInput
    } = useFormInput(props, context, {
      maxOtherKey: 1
    })
    const cipConfig = useCipConfig()
    const isSeparate = computed(() => getUsingConfig(
      securityConfig.value.separate,
      getFieldValue(cipConfig, 'range.separate'),
      false
    ))

    const config = computed(() => {
      const config = { ...props.config }
      config.max = Math.min(...dateInfoToTimes(getNotEmptyValue(proxyOtherValue[0].value, props.config.max)))
      config.noIcon = !isSeparate.value // true
      return config
    })

    const otherConfig = computed(() => {
      const config = { ...props.config }
      config.min = Math.max(...dateInfoToTimes(getNotEmptyValue(proxyValue.value, securityConfig.value.otherMin ?? securityConfig.value.min)))
      if (!isInputEmpty(securityConfig.value.otherMax)) config.max = securityConfig.value.otherMax
      config.placeholder = securityConfig.value.otherPlaceholder
      // viewType为date或默认的时候，启用otherDate标记，返回值修改时分秒为23:59:59
      if (['date', undefined].includes(config.viewType)) config.isOtherDate = true
      return config
    })

    const [isValueFocus, onValueFocus, onValueBlur] = useFocusInput()
    const [isOtherValueFocus, onOtherValueFocus, onOtherValueBlur] = useFocusInput()
    const isFocus = computed(() => {
      return isValueFocus.value || isOtherValueFocus.value
    })

    return {
      ...formInput,
      onValueFocus,
      onValueBlur,
      onOtherValueFocus,
      onOtherValueBlur,
      isFocus,
      isSeparate,
      config,
      otherConfig,
      proxyValue,
      proxyOtherValue
    }
  }
}
</script>
