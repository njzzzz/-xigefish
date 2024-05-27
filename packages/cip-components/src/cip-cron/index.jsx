import { watch, reactive, h, watchEffect, computed } from 'vue'
import { ElRadioGroup, ElRadioButton } from 'element-plus'
import * as ExpressComponents from './widgets'
import { toUpperFirstCase } from '@xigefish/d-render-shared'
import { useElFormInject } from '@xigefish/d-render-shared'

export default {
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: undefined
    }
  },
  setup (props, { emit }) {
    const data = reactive({
      active: 'second'
    })
    const updateVal = () => {
      const arr = props.modelValue ? props.modelValue.split(' ') : []
      console.log(arr)
      data.secondVal = arr[0] ?? '*'
      data.minuteVal = arr[1] ?? '*'
      data.hourVal = arr[2] ?? '*'
      data.dayVal = arr[3] ?? '*'
      data.monthVal = arr[4] ?? '*'
      data.weekVal = arr[5] ?? '?'
      data.yearVal = arr[6] || ' '
    }
    watch(() => props.modelValue, () => {
      updateVal()
    }, { immediate: true })

    const ActiveComponent = (props) => {
      return h(ExpressComponents[toUpperFirstCase(props.type)], props)
    }

    watchEffect(() => {
      const result = `${data.secondVal} ${data.minuteVal} ${data.hourVal} ${data.dayVal} ${data.monthVal} ${data.weekVal} ${data.yearVal}`
      emit('update:modelValue', result.trim())
    })

    const elFormRef = useElFormInject()
    const disabled = computed(() => props.disabled ?? elFormRef.disabled)

    return () => <div class={'cip-cron'}>
      <ElRadioGroup v-model={data.active}>
        <ElRadioButton label={'second'}>秒</ElRadioButton>
        <ElRadioButton label={'minute'}>分</ElRadioButton>
        <ElRadioButton label={'hour'}>时</ElRadioButton>
        <ElRadioButton label={'day'}>日</ElRadioButton>
        <ElRadioButton label={'month'}>月</ElRadioButton>
        <ElRadioButton label={'week'}>周</ElRadioButton>
        <ElRadioButton label={'year'}>年</ElRadioButton>
      </ElRadioGroup>
      {
        ['second', 'minute', 'hour', 'day', 'month', 'week', 'year'].map(key => {
          return key === data.active && <ActiveComponent key={key} v-model={data[`${key}Val`]} disabled={disabled.value} type={key}/>
        })
      }
      {/* <ActiveComponent v-model={data[`${data.active}Val`]} text={config}/> */}
    </div>
  }
}
