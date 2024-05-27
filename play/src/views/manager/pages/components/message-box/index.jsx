import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
// eslint-disable-next-line import/no-duplicates,import/no-webpack-loader-syntax
import BaseMessageBoxRaw from '!raw-loader!@/views/manager/example/message-box'
// eslint-disable-next-line import/no-duplicates
import BaseMessageBox from '@/views/manager/example/message-box'
export default {
  setup () {
    return () => <LayoutInfoThemeOne class={'component-input'}>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseMessageBoxRaw} title={'MessageBox对话框'}>
              <BaseMessageBox />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
