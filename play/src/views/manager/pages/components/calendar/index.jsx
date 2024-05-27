import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseCalendar from '@/views/manager/example/calendar/base'

export default {
  setup () {
    return () => <LayoutInfoThemeOne class={'component-calendar'}>
      <ExampleTabs>
        {{
          example: () =>
            <ExampleBlock code={BaseCalendar.Raw} title={'日历'}>
              <BaseCalendar></BaseCalendar>
            </ExampleBlock>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
