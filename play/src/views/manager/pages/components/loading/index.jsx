import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import UIStandard from '@/views/manager/example/loading/ui-standard'
export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={UIStandard.Raw} title={'UI标准'}>
              <UIStandard />
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
