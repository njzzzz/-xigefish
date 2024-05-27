import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseTags from '@/views/manager/example/tag/base'
export default {
  setup () {
    return () => <LayoutInfoThemeOne class='tag-example'>
      <ExampleTabs>
        {{
          example: () => <>
          <ExampleBlock code={BaseTags.Raw} title={'基础按钮'}>
              <BaseTags />
          </ExampleBlock>
          </>
        }}
      </ExampleTabs>

    </LayoutInfoThemeOne>
  }
}
