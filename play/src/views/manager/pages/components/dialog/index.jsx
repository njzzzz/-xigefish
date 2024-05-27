import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
// eslint-disable-next-line import/no-duplicates,import/no-webpack-loader-syntax
import BaseDialogRaw from '!raw-loader!@/views/manager/example/dialog'
// eslint-disable-next-line import/no-duplicates
import BaseDialog from '@/views/manager/example/dialog'
export default {
  setup () {
    return () => <LayoutInfoThemeOne class={'component-input'}>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseDialogRaw} title={'对话框'}>
              <BaseDialog />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
