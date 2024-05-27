
<template>
  <el-tree-select :model-value="modelValue"
                  :data="options"
                  :clearable="clearable"
                  :placeholder="placeholder"
                  :disabled="disabled"
                  :filterable="filterable"
                  :node-key="optionProps.value"
                  :style="{width}"
                  :multiple="multiple"
                  :props="optionProps"
                  :check-strictly="checkStrictly"
                  :expand-on-click-node="false"
                  :current-node-key="modelValue"
                  :default-expanded-keys="defaultExpandedKeys"
                  @change="updateValue">
  </el-tree-select>
</template>
<script>
import { ElTreeSelect } from 'element-plus'
import { computed } from 'vue'
import { useFormInput, useOptions, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { isInputEmpty } from '@xigefish/d-render-shared'

export default {
  components: { ElTreeSelect },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const {
      width,
      updateStream,
      proxyValue,
      securityConfig,
      ...formInput
    } = useFormInput(props, context)
    const multiple = computed(() => securityConfig.value.multiple ?? false)
    const { options, optionProps } = useOptions(props, multiple.value, updateStream)
    const filterable = computed(() => securityConfig.value.filterable ?? false)
    const checkStrictly = computed(() => securityConfig.value.checkStrictly ?? true)

    function genOptionsMap (options, preNode = null, map = {}) {
      for (const item of options) {
        map[item[optionProps.value.value]] = {
          origin: item,
          path: preNode ? [...map[preNode[optionProps.value.value]].path, item[optionProps.value.value]] : [item[optionProps.value.value]]
        }
        if (item[optionProps.value.children]?.length) {
          genOptionsMap(item[optionProps.value.children], item, map)
        }
      }
      return map
    }

    const modelValue = computed(() => {
      if (multiple.value) {
        return proxyValue.value?.length ? proxyValue.value.split(',') : []
      } else {
        return proxyValue.value
      }
    })

    const dataMap = computed(() => {
      return genOptionsMap(options.value)
    })
    const defaultExpandedKeys = computed(() => {
      if (multiple.value) {
        return modelValue.value.reduce((acc, val) => {
          acc.push(dataMap.value[val]?.path ?? [])
          return acc
        }, [])
      } else {
        return dataMap.value[modelValue.value]?.path ?? []
      }
    })
    const clearValue = () => {
      updateStream.appendValue(undefined)
      updateStream.appendOtherValue(undefined)
      updateStream.end()
    }
    const getNodeLabelFromDataMapByValue = (val) => {
      return dataMap.value[val].origin[optionProps.value.label] ?? ''
    }
    const updateValue = (val) => {
      if (isInputEmpty(val) || (multiple.value && !val.length)) {
        clearValue()
        return
      }
      const otherValue = multiple.value ? val.map(item => getNodeLabelFromDataMapByValue(item)).join(',') : getNodeLabelFromDataMapByValue(val)
      const modelValue = multiple.value ? val.join(',') : val
      updateStream.appendValue(modelValue)
      updateStream.appendOtherValue(otherValue)
      updateStream.end()
    }
    return {
      modelValue,
      checkStrictly,
      defaultExpandedKeys,
      ...formInput,
      proxyValue,
      options,
      width,
      optionProps,
      clearValue,
      multiple,
      filterable,
      updateValue
    }
  }
}
</script>
