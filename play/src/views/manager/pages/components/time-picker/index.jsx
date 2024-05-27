import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import DatePickerExample from '@/views/manager/example/time-picker/date-picker'
import TimeSelectExample from '@/views/manager/example/time-picker/time-select'
import DateTimePickerExample from '@/views/manager/example/time-picker/date-time-picker'

export default {
  name: 'time-picker',
  setup () {
    return () => (
      <LayoutInfoThemeOne>
        <ExampleTabs>
          {{
            example: () => (
              <>
                <ExampleBlock title="日期选择" code={DatePickerExample.Raw}>
                  <DatePickerExample />
                </ExampleBlock>
                <ExampleBlock title="时间选择" code={TimeSelectExample.Raw}>
                  <TimeSelectExample />
                </ExampleBlock>
                <ExampleBlock title="日期+时间选择" code={DateTimePickerExample.Raw}>
                  <DateTimePickerExample />
                </ExampleBlock>
              </>
            )
          }}
        </ExampleTabs>
      </LayoutInfoThemeOne>
    )
  }
}
