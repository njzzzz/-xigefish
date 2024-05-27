import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseTimeline from '@/views/manager/example/timeline/base'
export default {
  setup () {
    return () => <LayoutInfoThemeOne class='tag-example'>
      <ExampleTabs>
        {{
          example: () => <>
          <ExampleBlock code={BaseTimeline.Raw} title={'时间轴'}>
              <BaseTimeline />
          </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
