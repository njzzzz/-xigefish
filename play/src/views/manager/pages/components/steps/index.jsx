import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseSteps from '@/views/manager/example/steps'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseSteps.Raw} title='页签'>
              <BaseSteps />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
