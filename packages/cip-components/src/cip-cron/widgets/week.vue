<template>
  <div class="cip-cron__field">
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="1" >每周</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="3" >从周</el-radio>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.start" :min="1" :max="7"  ></cip-number>
      <span >开始，每隔</span>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.end" :min="1" :max="7"  ></cip-number>
      天执行
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="2" >周期</el-radio>
      <span >从周</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.start" :min="1" :max="7"  ></cip-number>
      <span >到周</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.end" :min="2" :max="7"  ></cip-number>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="7" >指定本月第</el-radio>
      <cip-number :disabled="disabled" @change="type = '7'" v-model="week.start" :min="1" :max="4"  ></cip-number>
      <span >周，周</span>
      <cip-number :disabled="disabled" @change="type = '7'" v-model="week.end" :min="1" :max="7"  ></cip-number>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="6" >本月最后一个</el-radio>
      <span >周</span>
      <cip-number :disabled="disabled" @change="type = '6'" v-model="last" :min="1" :max="7"  ></cip-number>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="5" >不指定</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="4" >指定</el-radio>
    </div>
    <div class="cip-cron__checkbox-group">
      <el-checkbox-group :disabled="disabled" v-model="appoint" >
        <el-checkbox @change="type = '4'"  v-for="i in 7" :key="i" :label="(i+'').padStart(2,'0')"></el-checkbox>
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
      default: '*'
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
