<template>
  <div class="cip-cron__field">
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="1">每日</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="3">从</el-radio>
      <cip-number @change="type = '3'" v-model="loop.start" :disabled="disabled" :min="1" :max="31" ></cip-number>
      <span >日开始，每隔</span>
      <cip-number @change="type = '3'" v-model="loop.end" :disabled="disabled" :min="1" :max="31" ></cip-number>
      <span >日执行</span>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="2">周期</el-radio>
      <span >从</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.start" :min="1" :max="31" ></cip-number>
      <span>到</span>
      <cip-number :disabled="disabled" @change="type = '2'" v-model="cycle.end" :min="2" :max="31" ></cip-number>
      日
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="8">工作日</el-radio>
      <span>本月</span>
      <cip-number :disabled="disabled" @change="type = '8'" v-model="work" :min="1" :max="7" ></cip-number>
      号，最近的工作日
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="6">本月最后一天</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="5">不指定</el-radio>
    </div>
    <div class="cip-cron__row">
      <el-radio :disabled="disabled" v-model="type" label="4">指定</el-radio>
    </div>
    <div class="cip-cron__checkbox-group">
      <el-checkbox-group :disabled="disabled" v-model="appoint">
        <template  v-for="i in 4" :key="i" style="margin-left: 10px;  line-height: 25px;">
          <template v-for="j in 10" :key="j">
            <el-checkbox
              @change="type = '4'"
              v-if="parseInt((i - 1) + '' + (j - 1)) < 32 && !(i === 1 && j === 1)"
              :label="(i - 1) + '' + (j - 1)"
            />
          </template>
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
      ...toRefs(data),
      type
    }
  }
}
</script>
