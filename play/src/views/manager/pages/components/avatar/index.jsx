import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseAvatars from '@/views/manager/example/avatar/base'
import SizeAvatars from '@/views/manager/example/avatar/size'
import { componentScheme } from '@xigefish/components/cip-avatar/component.scheme'
import ComponentController from '@/components/component-controller'
import CipAvatar from '@xigefish/components/cip-avatar/index'
import { useTry } from '@/hooks/use-try'
export default {
  setup () {
    const { tryProps, trySlots, tryEvents } = useTry()
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseAvatars.Raw} title='头像'>
              <BaseAvatars />
            </ExampleBlock>
            <ExampleBlock code={SizeAvatars.Raw} title='不同尺寸头像'>
              <SizeAvatars />
            </ExampleBlock>
          </>,
          try: () => <><ExampleBlock title={'试一试'}>
          <CipAvatar
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
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
