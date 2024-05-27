<template>
  <el-select
    :class="['cip-time-select',{'cip-time-select--no-icon': noIcon }]"
    :model-value="modelValue"
    @update:modelValue="(value) => {
        $emit('change', value)
        $emit('update:modelValue', value)
      }"
    :disabled="!editable"
    :clearable="clearable"
    :clear-icon="clearIcon"
    :suffix-icon="noIcon ? '' : suffixIcon"
    :size="size"
    :placeholder="placeholder"
    default-first-option
    filterable
    @change="
      (value) => {
        $emit('change', value)
        $emit('update:modelValue', value)
      }
    "
    @blur="(event) => $emit('blur', event)"
    @focus="(event) => $emit('focus', event)"
  >
    <el-option
      v-for="item in items"
      :key="item.value"
      :label="item.value"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script>
import { computed } from 'vue'
import { ElSelect, ElOption } from 'element-plus'
import { Clock, CircleClose } from '@element-plus/icons-vue'
import { nextTime, compareTime } from './util'
export default {
  name: 'CipTimeSelect',
  components: { ElSelect, ElOption },
  props: {
    modelValue: String,
    editable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      validator: value => !value || ['large', 'default', 'small'].indexOf(value) !== -1
    },
    placeholder: {
      type: String,
      default: ' '
    },
    start: {
      type: String,
      default: '09:00'
    },
    end: {
      type: String,
      default: '18:00'
    },
    step: {
      type: String,
      default: '00:30'
    },
    minTime: {
      type: String,
      default: ''
    },
    maxTime: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    // prefixIcon: {
    //   type: String,
    //   default: Timer// 'el-icon-time'
    // },
    suffixIcon: {
      type: [String, Object],
      default: Clock
    },
    clearIcon: {
      type: [String, Object],
      default: CircleClose
    },
    noIcon: {
      type: Boolean,
      default: undefined
    }
  },
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup (props, context) {
    const items = computed(() => {
      const result = []
      if (props.start && props.end && props.step) {
        let current = props.start
        while (compareTime(current, props.end) <= 0) {
          result.push({
            value: current,
            disabled:
              compareTime(current, props.minTime || '-1:-1') <= 0 ||
              compareTime(current, props.maxTime || '100:100') >= 0
          })
          current = nextTime(current, props.step)
        }
      }
      return result
    })
    return {
      items
    }
  }
}
</script>
