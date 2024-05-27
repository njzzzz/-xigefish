<template>
  <div class="cip-input-audit--status">
    <span>{{viewValue}}</span>
    <template v-if="isShowOtherValue && otherValue">
      <el-popover :title="config.otherLabel" :content="otherValue" placement="top" trigger="hover">
        <template #reference>
          <el-icon class="cip-danger-color" style="margin-left:4px"><WarningFilled/></el-icon>
        </template>
      </el-popover>
    </template>
  </div>
</template>
<script>
import { computed, readonly } from 'vue'
import { ElPopover, ElIcon } from 'element-plus'
import { formInputViewProps, useFormView } from '@xigefish/d-render-shared'
import { WarningFilled } from '@element-plus/icons-vue'
export default {
  components: { ElPopover, ElIcon, WarningFilled },
  props: formInputViewProps,
  setup (props) {
    const { securityConfig } = useFormView(props)
    const isShowOtherValue = computed(() => {
      if (!securityConfig.value.showOtherValue) return false
      // 转为数组
      const showOtherValue = [].concat(securityConfig.value.showOtherValue)
      return showOtherValue.includes(props.modelValue)
    })
    const viewValue = computed(() => {
      const { formatter } = securityConfig.value
      if (typeof formatter === 'function') return formatter(props.modelValue, readonly(securityConfig.value))
      return props.modelValue
    })
    return {
      isShowOtherValue,
      viewValue
    }
  }

}
</script>
