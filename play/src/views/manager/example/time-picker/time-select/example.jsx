import { ref } from 'vue'
import CipTimeSelect from '@xigefish/components/cip-time-select'
import CipTimeSelectRange from '@xigefish/d-render-plugin-cci/esm/input/extension/time-range'
import ExampleRow from '@/components/example-row'
import { ElTimePicker } from 'element-plus'

export default {
  setup () {
    const time = ref('')
    const time2 = ref('')
    const timeRange = ref('')
    const timeRange2 = ref([])
    return () => (
      <div>
        <ExampleRow label='固定时间点'>
          <CipTimeSelect v-model={time.value} placeholder='请选择时间'/>
        </ExampleRow>
        <ExampleRow label='任意时间点'>
          <ElTimePicker
            class='cip-form-picker'
            style='width: 220px;'
            placeholder='请选择时间'
            v-model={time2.value}>
          </ElTimePicker>
        </ExampleRow>
        <ExampleRow label='选择时间范围 el组件'>
          <ElTimePicker
            v-model={timeRange2.value}
            class='cip-form-picker'
            startPlaceholder='开始时间'
            endPlaceholder='结束时间'
            isRange
            rangeSeparator='—'>
          </ElTimePicker>
        </ExampleRow>
        <ExampleRow label='选择时间范围 cip组件'>
          <CipTimeSelectRange
            v-model={timeRange.value}
            config={{
              width: '500px',
              placeholder: '开始时间',
              endPlaceholder: '结束时间'
            }}/>
        </ExampleRow>
      </div>
    )
  }
}
