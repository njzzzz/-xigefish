<template>
  <div class="custom-color-picker" :style="{width}">
    <el-color-picker
      ref="inputRef"
      v-model="proxyValue"
      :disabled="disabled"
      :predefine="predefineColors">
    </el-color-picker>
  </div>
</template>

<script>
import { defineProps, defineEmits } from 'vue'
import { ElColorPicker } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { predefineColors } from './default'
export default {
  name: 'color'
}
</script>

<script setup>
const props = defineProps(formInputProps)
const emit = defineEmits(fromInputEmits)

const {
  inputRef,
  proxyValue,
  // securityConfig,
  width
} = useFormInput(props, { emit })
</script>

<style lang="less">
.custom-color-picker {
  .@{elNamespace}-color-picker {
    width: 100%;
  }
  .@{elNamespace}-color-picker__color {
    border: none;
  }
  .@{elNamespace}-color-picker__color-inner {
    border-radius: 4px;
    box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.10);
    & .@{elNamespace}-icon {
      display: none;
    }
  }
  .@{elNamespace}-color-picker__trigger {
    width: 100%;
    border-radius: var(~'--@{elNamespace}-border-radius-base');
  }
  .@{elNamespace}-color-picker__mask {
    width: 100%;
    height: 32px;
    box-sizing: border-box;
  }
}

</style>
