import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseAlert from '@/views/manager/example/alert/base'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () =>
            <ExampleBlock code={BaseAlert.Raw} title={'警报'}>
              <BaseAlert/>
            </ExampleBlock>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
