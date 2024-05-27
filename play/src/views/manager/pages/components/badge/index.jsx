import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleTabs from '@/components/example-page'
import ExampleBlock from '@/components/example-block'
import UIStandard from '@/views/manager/example/badge/ui-standard'
export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock title={'UI标准'} code={UIStandard.Raw}>
              <UIStandard/>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
