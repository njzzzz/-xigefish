<!-- 秒,分钟 -->
<template >
  <div class="cip-cron__field">
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="1">每{{label}}</el-radio>
      <span></span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="3">从</el-radio>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.start" :min="0" :max="59"></cip-number>
      <span>{{label}}开始，每隔</span>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.end" :min="1" :max="59"></cip-number>
      <span>{{label}}执行</span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="2">周期从</el-radio>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.start" :min="1" :max="59"></cip-number>
      <span >到</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.end" :min="2" :max="59"></cip-number>
      <span>{{label}}</span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="4">指定</el-radio>
    </div>
    <div class="cip-cron__checkbox-group">
      <el-checkbox-group :disabled="disabled" v-model="appoint">
        <template v-for="i in 6" :key="`${valType}${i}`" style="margin-left: 10px; line-height: 25px;">
          <el-checkbox
            @change="type = '4'"
            v-for="j in 10"
            :key="`${valType}${j}`"
            :label="(i - 1) + '' + (j - 1)"
          />
        </template>
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
    label: String,
    valType: String,
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
