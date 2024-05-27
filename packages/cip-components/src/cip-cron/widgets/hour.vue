<template >
  <div class="cip-cron__field">
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="1">每时</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="3">从</el-radio>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.start" :min="0" :max="23"></cip-number>
      <span>时开始，每隔</span>
      <cip-number :disabled="disabled" @change="type = '3'" v-model="loop.end" :min="1" :max="23"></cip-number>
      <span>时执行</span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="2">周期</el-radio>
      <span>从</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.start" :min="0" :max="23" ></cip-number>
      <span>到</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.end" :min="2" :max="23"></cip-number>
      <span>时</span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="4">指定</el-radio>
    </div>
    <div class="cip-cron__checkbox-group">
      <el-checkbox-group :disabled="disabled" v-model="appoint" key="day">
        <div  v-for="i in 3" :key="i">
          <template v-for="j in 10" :key="j">
            <el-checkbox
              @change="type = '4'"
              v-if="parseInt((i - 1) + '' + (j - 1)) < 24"
              :label="(i - 1) + '' + (j - 1)"
            />
          </template>
        </div>
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
