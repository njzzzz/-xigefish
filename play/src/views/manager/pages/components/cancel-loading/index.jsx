import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import CipCancelLoading from '@xigefish/components/cip-cancel-loading/Loading'
import { componentScheme } from '@xigefish/components/cip-cancel-loading/component.scheme'
import CipButton from '@xigefish/components/cip-button'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import ComponentController from '@/components/component-controller'
export default {
  setup () {
    const testProps = ref({
      message: '加载中。。。',
      btnName: '取消',
      onCancel: () => { console.log('onCancel') }
    })

    const handleClick = (props) => {
      if (Object.keys(props).length === 0) {
        CipCancelLoading({
          duration: 100000,
          onCancel: () => {
            console.log('onCancel')
          }
        })
      } else {
        CipCancelLoading(props)
      }
    }
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock>
              <CipButton onClick={handleClick.bind(null, {})}>Open</CipButton>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipButton onClick={handleClick.bind(null, testProps.value)}>test</CipButton>
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={testProps.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
