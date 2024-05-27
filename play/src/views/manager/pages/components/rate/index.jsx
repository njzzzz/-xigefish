import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseRates from '@/views/manager/example/rate/base'
import SizeRates from '@/views/manager/example/rate/size'
import { componentScheme } from '@xigefish/components/cip-rate/component.scheme'
import ComponentController from '@/components/component-controller'
import CipRate from '@xigefish/components/cip-rate'
import { useTry } from '@/hooks/use-try'

export default {
  setup () {
    const { tryProps, trySlots, tryEvents } = useTry()
    return () => (
      <LayoutInfoThemeOne>
        <ExampleTabs>
          {{
            example: () => (
              <>
                <ExampleBlock code={BaseRates.Raw} title="基础评分">
                  <span>
                    【注：UI标准中有个双击星星图标，清除当前评分的功能】
                  </span>
                  <BaseRates />
                </ExampleBlock>
                <ExampleBlock code={SizeRates.Raw} title="尺寸">
                  <SizeRates />
                </ExampleBlock>
              </>
            ),
            try: () => (
              <>
                <ExampleBlock title={'试一试'}>
                  <CipRate
                    {...tryProps.value}
                    {...tryEvents.value}
                    v-slots={trySlots.value}
                  />
                </ExampleBlock>
                <ComponentController
                  v-model:propsConfig={tryProps.value}
                  v-model:slotsConfig={trySlots.value}
                  v-model:eventsConfig={tryEvents.value}
                  scheme={componentScheme}
                />
              </>
            )
          }}
        </ExampleTabs>
      </LayoutInfoThemeOne>
    )
  }
}
