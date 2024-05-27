<template>
  <div class="cip-cron__field">
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="1" >每年</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="2" >周期从</el-radio>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.start" :min="2000" ></cip-number>
      <span style="margin-left: 5px; margin-right: 5px;">到</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.end" :min="2000"></cip-number>
      <span>年</span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="9" >不指定</el-radio>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import { ElRadio } from 'element-plus'
import CipNumber from '../../cip-number'
import { useCronItem } from './use-cron-item'
export default {
  components: {
    ElRadio, CipNumber
  },
  props: {
    modelValue: {
      type: String,
      default: ' '
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const { data, type } = useCronItem(props, { emit })
    return {
      ...toRefs(data), type
    }
  }
}
</script>
