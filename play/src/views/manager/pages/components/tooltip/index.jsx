import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseTooltips from '@/views/manager/example/tooltip/base'
import BaseAllTooltips from '@/views/manager/example/tooltip/base-all'
import ThemeTooltips from '@/views/manager/example/tooltip/theme'
import MoreWordsTooltips from '@/views/manager/example/tooltip/more-words'
import SeniorTooltips from '@/views/manager/example/tooltip/senior-extension'
import ControlledTooltips from '@/views/manager/example/tooltip/controlled-mode'
export default {
  setup () {
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseTooltips.Raw} title={'气泡提示'}>
              <BaseTooltips></BaseTooltips>
            </ExampleBlock>
            <ExampleBlock code={BaseAllTooltips.Raw} title={'基础用法'}>
              <BaseAllTooltips></BaseAllTooltips>
            </ExampleBlock>
            <ExampleBlock code={ThemeTooltips.Raw} title={'主题'}>
              <ThemeTooltips></ThemeTooltips>
            </ExampleBlock>
            <ExampleBlock code={MoreWordsTooltips.Raw} title={'更多内容的文字提示'}>
              <MoreWordsTooltips></MoreWordsTooltips>
            </ExampleBlock>
            <ExampleBlock code={SeniorTooltips.Raw} title={'高级扩展'}>
              <SeniorTooltips></SeniorTooltips>
            </ExampleBlock>
            <ExampleBlock code={ControlledTooltips.Raw} title={'受控模式'}>
              <ControlledTooltips></ControlledTooltips>
            </ExampleBlock>
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
