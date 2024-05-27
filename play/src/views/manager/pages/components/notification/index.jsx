import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
// eslint-disable-next-line import/no-duplicates,import/no-webpack-loader-syntax
import BaseNotificationRaw from '!raw-loader!@/views/manager/example/notification'
// eslint-disable-next-line import/no-duplicates
import BaseNotification from '@/views/manager/example/notification'
export default {
  setup () {
    return () => <LayoutInfoThemeOne class={'component-input'}>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseNotificationRaw} title={'通知框'}>
              <BaseNotification />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
