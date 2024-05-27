import { ref } from 'vue'
import CipDatePicker from '@xigefish/d-render-plugin-cci/esm/input/basic/date-picker'
import CipDatePickerRange from '@xigefish/d-render-plugin-cci/esm/input/extension/date-range'
import { ElDatePicker } from 'element-plus'
import ExampleRow from '@/components/example-row'

export default {
  setup () {
    const dateRange = ref('')
    const baseConfig = {
      width: '240px'
    }
    const types = [
      {
        title: '选择日',
        modelValue: ref(''),
        config: {
          formatter: 'YYYY/MM/DD',
          placeholder: '请选择日期'
        }
      },
      {
        title: '选择周',
        modelValue: ref(''),
        config: {
          viewType: 'week',
          formatter: 'YYYY/第ww周',
          placeholder: '请选择周'
        }
      },
      {
        title: '选择月',
        modelValue: ref(''),
        config: {
          viewType: 'month',
          formatter: 'YYYY/MM',
          placeholder: '请选择月份'
        }
      },
      {
        title: '选择年',
        modelValue: ref(''),
        config: {
          viewType: 'year',
          formatter: 'YYYY',
          placeholder: '请选择年份'
        }
      }
    ]
    return () => (
      <div>
        {types.map((i) => (
          <ExampleRow label={i.title}>
            <CipDatePicker
              v-model={i.modelValue.value}
              config={{ ...baseConfig, ...i.config }}
            />
          </ExampleRow>
        ))}
        <ExampleRow label="选择日期范围 el组件">
          <ElDatePicker
            class='cip-form-picker'
            type="daterange"
            rangeSeparator="—"
            startPlaceholder="开始时间"
            endPlaceholder="结束时间"/>
        </ExampleRow>
        <ExampleRow label="选择日期范围 cip组件">
          <CipDatePickerRange
            v-model={dateRange.value}
            config={{
              width: '500px',
              formatter: 'YYYY/MM/DD',
              placeholder: '开始时间',
              otherPlaceholder: '结束时间'
            }}
          />
        </ExampleRow>
      </div>
    )
  }
}
