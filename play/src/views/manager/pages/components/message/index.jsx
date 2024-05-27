import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
// eslint-disable-next-line import/no-duplicates,import/no-webpack-loader-syntax
import BaseMessageRaw from '!raw-loader!@/views/manager/example/message'
// eslint-disable-next-line import/no-duplicates
import BaseMessage from '@/views/manager/example/message'
export default {
  setup () {
    return () => <LayoutInfoThemeOne class={'component-input'}>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseMessageRaw} title={'全局提示'}>
              <BaseMessage />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
