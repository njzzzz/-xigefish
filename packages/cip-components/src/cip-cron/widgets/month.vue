<template >
  <div class="cip-cron__field">
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="1" >每月</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="3" >从</el-radio>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.start" :min="1" :max="12"  ></cip-number>
      <span >月开始，每隔</span>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.end" :min="1" :max="12"  ></cip-number>
      月执行
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="2" >周期</el-radio>
      <span >从</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.start" :min="1" :max="12"  ></cip-number>
      <span >到</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.end" :min="2" :max="12"  ></cip-number>
      月
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="5" >不指定</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="4" >指定</el-radio>
    </div>
    <div class="cip-cron__checkbox-group">
      <el-checkbox-group :disabled="disabled" v-model="appoint">
        <el-checkbox @change="type = '4'"  v-for="i in 12" :key="i" :label="(i+'').padStart(2,'0')"></el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
import { ElCheckboxGroup, ElCheckbox, ElRadio } from 'element-plus'
import CipNumber from '../../cip-number'
import { useCronItem } from './use-cron-item'
export default {
  components: {
    ElCheckboxGroup, ElCheckbox, ElRadio, CipNumber
  },
  props: {
    modelValue: {
      type: String,
      default: '?'
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
