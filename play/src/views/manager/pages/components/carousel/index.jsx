import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseCarousels from '@/views/manager/example/carousel'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseCarousels.Raw} title='走马灯'>
              <BaseCarousels />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
