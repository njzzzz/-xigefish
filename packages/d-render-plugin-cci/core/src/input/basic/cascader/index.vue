<template>
  <div :style="{width}">
    <el-cascader
      style="width:100%"
      popper-class="cip-popper-class"
      v-bind="inputProps"
      :style="inputStyle"
      v-model="proxyValue"
      :ref="setRef"
      :options="options"
      :props="optionProps"
      :disabled="disabled"
    />
  </div>
</template>
<script>
import { ElCascader } from 'element-plus'
import { formInputProps, fromInputEmits, useInputProps, useFormInput, useOptions } from '@xigefish/d-render-shared'
import { computed, ref } from 'vue'
export default {
  components: { ElCascader },
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const cascader$ = ref()
    const cascader = ref()
    const { securityConfig, proxyValue, width, updateStream, inputStyle, inputRef } = useFormInput(props, context, {
      fromModelValue: (modelValue) => getValue(modelValue),
      toModelValue: (value) => {
        const modelValue = getModelValue(value)
        if (otherKey.value) {
          const node = cascader$.value.getCheckedNodes()
          const otherValue = node.map(i => i.data[optionProps.value.label]).join(splitKey.value)
          updateStream.appendOtherValue(otherValue)
          updateStream.appendOtherValue(node, 2)
        }
        return modelValue
      },
      maxOtherKey: 2
    })

    const setRef = ($el) => {
      cascader.value = $el // 保留兼容性
      cascader$.value = $el // 保留兼容性
      inputRef.value = $el // 标准值
    }
    // input组件上的直接信息
    const inputProps = useInputProps(props, [
      ['multiple', { defaultValue: false }],
      'showAllLevels',
      ['filterable', { defaultValue: false }],
      ['clearable', { defaultValue: true }],
      'placeholder'
    ])
    // 是否多选,ElCascader的多选比较特殊,multiple是在props里面,所以特殊处理
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { options, getValue, getModelValue } = useOptions(props, multiple, updateStream)

    const splitKey = computed(() => {
      return props.config?.splitKey ?? ','
    })
    // 另一个键
    const otherKey = computed(() => {
      return securityConfig.value.otherKey ?? ''
    })
    // 懒加载在optionProps中配置
    const optionProps = computed(() => {
      return {
        value: 'value',
        label: 'label',
        children: 'children',
        multiple: multiple.value,
        ...securityConfig.value.optionProps
      }
    })

    return {
      cascader$,
      cascader,
      inputRef,
      setRef,
      proxyValue,
      options,
      optionProps,
      inputProps,
      inputStyle,
      width
    }
  }
}
</script>
