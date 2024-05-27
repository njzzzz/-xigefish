<template>
  <el-input ref="inputRef"
            v-model="proxyValue"
            :placeholder="placeholder"
            :clearable="clearable"
            :disabled="disabled"
            :maxlength="limit"
            :show-word-limit="!!limit"
            type="textarea"
            :autosize="autosize"
            resize="none"
            :style="{...inputStyle,width}"></el-input>
</template>
<script>
import { ElInput } from 'element-plus'
import { computed, watch, ref, nextTick, onMounted } from 'vue'
import {
  useFormInput,
  formInputProps,
  fromInputEmits,
  getFieldValue,
  useCipConfig,
  getUsingConfig
} from '@xigefish/d-render-shared'
export default {
  components: { ElInput },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const cipConfig = useCipConfig()
    const { width, clearable, securityConfig, proxyValue, inputStyle, ...formInput } = useFormInput(props, context)
    const inputRef = ref()
    const limit = computed(() => {
      return getUsingConfig(
        securityConfig.value.limit,
        getFieldValue(cipConfig, 'limit.textarea')
      ) // props.config?.limit ?? cipConfig?.limit?.textarea ?? ''
    })
    const autosize = computed(() => {
      return Object.assign({}, { minRows: 2, maxRows: 6 }, securityConfig.value.autosize) // props.config?.autosize || { minRows: 2, maxRows: 6 }
    })
    onMounted(() => {
      watch(() => securityConfig.value.autosize, () => {
        nextTick(() => {
          // 必须在nextTick中触发否则无效
          inputRef.value.resizeTextarea()
        })
      }, { deep: true }) // 需要深度监听才可以正常触发
    })

    return {
      ...formInput,
      inputRef,
      clearable,
      proxyValue,
      autosize,
      width,
      inputStyle,
      limit
    }
  }
}
</script>
