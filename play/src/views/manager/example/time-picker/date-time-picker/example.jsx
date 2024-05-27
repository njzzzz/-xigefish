import { ref } from 'vue'
import CipDatePicker from '@xigefish/d-render-plugin-cci/esm/input/basic/date-picker'
import CipDatePickerRange from '@xigefish/d-render-plugin-cci/esm/input/extension/date-range'
import { ElDatePicker } from 'element-plus'
import ExampleRow from '@/components/example-row'

export default {
  setup () {
    const dateTime = ref('')
    const dateRange = ref('')

    const baseConfig = {
      width: '500px',
      viewType: 'datetime',
      formatter: 'YYYY/MM/DD HH:mm:ss'
    }
    return () => (
      <div>
        <ExampleRow label="日期时间选择">
          <CipDatePicker v-model={dateTime.value} config={{ ...baseConfig, placeholder: '请选择时间日期' }} />
        </ExampleRow>
        <ExampleRow label="日期时间范围选择 el组件">
          <ElDatePicker
            class='cip-form-picker'
            type="datetimerange"
            rangeSeparator="—"
            startPlaceholder="开始时间"
            endPlaceholder="结束时间"/>
        </ExampleRow>
        <ExampleRow label="日期时间范围选择 cip组件">
          <CipDatePickerRange
            v-model={dateRange.value}
            config={{ ...baseConfig, placeholder: '开始时间', otherPlaceholder: '结束时间' }}
          />
        </ExampleRow>
      </div>
    )
  }
}
