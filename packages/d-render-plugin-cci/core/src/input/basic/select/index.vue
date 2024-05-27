<template>
  <el-select v-model="proxyOptionsValue"
             :clearable="clearable"
             :placeholder="placeholder"
             :filterable="filterable || allowCreate || securityConfig.remote"
             :allow-create="allowCreate"
             :disabled="disabled"
             :multiple="multiple"
             :remote="securityConfig.remote"
             :remoteMethod="securityConfig.remoteMethod && remoteMethod"
             :collapse-tags="securityConfig.collapseTags"
             :loading="remoteSearchLoading"
             class="cip-basic-select"
             :style="{width}">
    <el-option v-for="(option, index) in options"
               :key="index"
                 :disabled="option[optionProps.disabled]"
               :label="option[optionProps.label] ?? option"
               :value="option[optionProps.value] ?? option">
    </el-option>
  </el-select>
</template>
<script>
import { ElSelect, ElOption } from 'element-plus'
import { computed, ref } from 'vue'
import { useFormInput, useOptions, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'

export default {
  components: { ElSelect, ElOption },
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const remoteSearchLoading = ref(false)
    const { width, securityConfig, proxyOtherValue, updateStream, ...formInput } = useFormInput(
      props,
      context,
      { maxOtherKey: 2 },
      { autoGet: !props.config?.remoteMethod }
    )
    // 是否多选
    const multiple = computed(() => {
      return securityConfig.value.multiple ?? false
    })
    const { optionProps, options, proxyOptionsValue } = useOptions(props, multiple, updateStream, context)
    // 是否可搜索
    const filterable = computed(() => {
      return securityConfig.value.filterable ?? false
    })
    // 是否允许创建
    const allowCreate = computed(() => {
      return securityConfig.value.allowCreate ?? false
    })
    // 关闭远程搜索loading
    const closeRemoteLoading = () => {
      remoteSearchLoading.value = false
    }
    const remoteMethod = async (query) => {
      remoteSearchLoading.value = true
      try {
        options.value = await securityConfig.value.remoteMethod(query, props.dependOnValues)
      } finally {
        closeRemoteLoading()
      }
    }
    if (securityConfig.value.remoteMethod) {
      const query = proxyOtherValue[0] ? proxyOtherValue[0].value : ''
      remoteSearchLoading.value = true
      remoteMethod(query).finally(closeRemoteLoading)
    }
    return {
      ...formInput,
      remoteSearchLoading,
      securityConfig,
      width,
      multiple,
      filterable,
      allowCreate,
      remoteMethod,
      optionProps,
      options,
      proxyOptionsValue
    }
  }
}
</script>
