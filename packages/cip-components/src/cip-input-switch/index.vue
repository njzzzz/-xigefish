<template>
  <div class="cip-input-switch">
    <el-checkbox v-model="effective" class="cip-input-switch__switch"></el-checkbox>
    <slot name="input" :model-value="modelValue" :update-model-value="updateModelValue" :disabled="!effective"></slot>
  </div>
</template>
<script>
import { ref, watchEffect, watch } from 'vue'
import { ElCheckbox } from 'element-plus'
import { isNotEmpty } from '@xigefish/d-render-shared'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
export default {
  name: 'CipInputSwitch',
  components: { ElCheckbox },
  props: generateProps(componentScheme),
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const effective = ref(false)
    watchEffect(() => {
      if (isNotEmpty(props.modelValue)) {
        effective.value = true
      }
    })
    watch(effective, (val) => {
      if (!val) {
        emit('update:modelValue', undefined)
      } else {

      }
    })
    const updateModelValue = (val) => {
      if (effective.value) {
        emit('update:modelValue', val)
      } else {
        emit('update:modelValue', undefined)
      }
    }

    return {
      effective,
      updateModelValue
    }
  }
}
</script>
