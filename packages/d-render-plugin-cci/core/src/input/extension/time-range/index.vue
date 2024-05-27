<template>
  <div
    :class="['basic-time-range',{'is-focus': isFocus}]"
    :style="{width}"
  >
    <cip-time-select
      class="cip-time-range"
      v-bind="{...attrs,...startInputProps}"
      v-model="proxyValue"
      :disabled="disabled"
      :maxTime="maxTime"
      :no-icon="true"
      @focus="onValueFocus"
      @blur="onValueBlur"
    />
    <span class="basic-time-range__link"> — </span>
    <cip-time-select
      class="cip-time-range"
      v-bind="{...attrs,...endInputProps}"
      v-model="proxyOtherValue[0].value"
      :disabled="disabled"
      :minTime="minTime"
      @focus="onOtherValueFocus"
      @blur="onOtherValueBlur"
    />
  </div>
</template>
<script>
import { computed } from 'vue'
import CipTimeSelect from '@xigefish/components/cip-time-select'
import {
  formInputProps,
  fromInputEmits,
  useFormInput,
  useInputProps
} from '@xigefish/d-render-shared'
import { useFocusInput } from '../date-range/use-focus-input'

export default {
  components: { CipTimeSelect },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const formInput = useFormInput(props, context, { maxOtherKey: 1 })
    const { width, securityConfig, proxyValue, proxyOtherValue } = formInput

    const startInputProps = useInputProps(props, [
      ['startPlaceholder', 'placeholder'],
      ['start', { defaultValue: '00:00' }],
      ['end', { defaultValue: '23:30' }],
      ['step', { defaultValue: '00:30' }]
    ])

    const endInputProps = useInputProps(props, [
      ['endPlaceholder', 'placeholder'],
      ['start', { defaultValue: '00:00' }],
      ['end', { defaultValue: '23:30' }],
      ['step', { defaultValue: '00:30' }]
    ])

    const attrs = computed(() => {
      return props.config?.attrs ?? {}
    })

    const startTransValue = computed(() => {
      return proxyValue.value ?? securityConfig.value.startDefaultValue
    })

    const endTransValue = computed(() => {
      return proxyOtherValue[0].value ?? securityConfig.value.endDefaultValue
    })

    const minTime = computed(() => {
      return startTransValue.value ?? securityConfig.value.start
    })
    const maxTime = computed(() => {
      return endTransValue.value ?? securityConfig.value.end
    })

    const [isValueFocus, onValueFocus, onValueBlur] = useFocusInput()
    const [isOtherValueFocus, onOtherValueFocus, onOtherValueBlur] = useFocusInput()
    const isFocus = computed(() => {
      return isValueFocus.value || isOtherValueFocus.value
    })

    return {
      proxyValue,
      proxyOtherValue,
      startTransValue,
      endTransValue,
      attrs,
      width,
      minTime,
      maxTime,
      startInputProps,
      endInputProps,

      isFocus,
      onValueFocus,
      onValueBlur,
      onOtherValueFocus,
      onOtherValueBlur
    }
  }
}
</script>
