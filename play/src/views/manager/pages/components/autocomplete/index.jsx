import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseAutocomplete from '@/views/manager/example/autocomplete/base'

export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () =>
            <ExampleBlock code={BaseAutocomplete.Raw} title={'警报'}>
              <BaseAutocomplete/>
            </ExampleBlock>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
