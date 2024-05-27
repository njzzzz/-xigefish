import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipTimeSelect from '@xigefish/components/cip-time-select'
export default {
  name: 'time-select',
  setup () {
    const time = ref()
    const sizes = ['large', 'default', 'small']
    const handleChange = (e) => {
      console.log(e)
    }
    const handleBulr = (e) => {
      console.log(e)
    }
    const handleFocus = (e) => {
      console.log(e)
    }
    return () => <LayoutInfoThemeOne>
      <ExampleBlock>
        <CipTimeSelect
          v-model={time.value}
          onChange={handleChange}
          onBlur={handleBulr}
          onFocus={handleFocus}
        >
        </CipTimeSelect>
      </ExampleBlock>
      <ExampleBlock>
        <CipTimeSelect
          editable={false}
          v-model={time.value}
        >
        </CipTimeSelect>
      </ExampleBlock>
      <ExampleBlock title="隐藏icon">
        <CipTimeSelect
          v-model={time.value}
          noIcon={true}
        >
        </CipTimeSelect>
      </ExampleBlock>
      <ExampleBlock title='设置开始时间、结束时间、步长'>
        <CipTimeSelect
          start='00:00'
          end='23:59'
          step='01:00'
          v-model={time.value}
        >
        </CipTimeSelect>
      </ExampleBlock>
      <ExampleBlock title='设置可选择的最大时间、最小时间'>
        <CipTimeSelect
          minTime='11:00'
          maxTime='14:00'
          v-model={time.value}
        >
        </CipTimeSelect>
      </ExampleBlock>
      <ExampleBlock>
        {
          sizes.map(size => <CipTimeSelect
            style='margin-right: 20px;'
            size={size}
            v-model={time.value}
          >
          </CipTimeSelect>)
        }
      </ExampleBlock>
    </LayoutInfoThemeOne>
  }
}
