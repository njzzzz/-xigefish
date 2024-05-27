import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'
import CipSvgIcon from '@xigefish/components/cip-svg-icon'
import { componentScheme } from '@xigefish/components/cip-svg-icon/component.scheme'
import './index.less'

export default {
  name: 'svg-icon',
  setup () {
    const testProps = ref({
      name: 'moon-night'
    })
    return () => <LayoutInfoThemeOne class='svg-icon-example'>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock>
              <CipSvgIcon style='font-size: 14px;' name='moon-night'></CipSvgIcon>
              <CipSvgIcon style='font-size: 14px;' name='toilet-paper'></CipSvgIcon>
            </ExampleBlock>
            <ExampleBlock title='使用font-size改变大小'>
              <CipSvgIcon style='font-size: 12px;color: red;' name='moon-night'></CipSvgIcon>
              <CipSvgIcon style='font-size: 16px;color: red;' name='moon-night'></CipSvgIcon>
              <CipSvgIcon style='font-size: 24px;color: red;' name='moon-night'></CipSvgIcon>
              <CipSvgIcon style='font-size: 12px;color: orange' name='toilet-paper'></CipSvgIcon>
              <CipSvgIcon style='font-size: 16px;color: orange' name='toilet-paper'></CipSvgIcon>
              <CipSvgIcon style='font-size: 24px;color: orange' name='toilet-paper'></CipSvgIcon>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipSvgIcon {...testProps.value} />
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
