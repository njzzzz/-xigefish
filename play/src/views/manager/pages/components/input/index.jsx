import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import BaseInput from '@/views/manager/example/input/base'
import TextareaExample from '@/views/manager/example/input/textarea'
import EditorExample from '@/views/manager/example/input/editor'
import ComponentController from '@/components/component-controller'
import CipInput from '@xigefish/components/cip-input'
import { componentScheme } from '@xigefish/components/cip-input/component.scheme'
import { useTry } from '@/hooks/use-try'
export default {
  setup () {
    const { tryProps, trySlots, tryEvents } = useTry()
    return () => <LayoutInfoThemeOne class={'component-input'}>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock code={BaseInput.Raw} title={'单行输入框'}>
              <BaseInput />
            </ExampleBlock>
            <ExampleBlock code={TextareaExample.Raw} title={'多行输入框'}>
              <TextareaExample />
            </ExampleBlock>
            <ExampleBlock code={EditorExample.Raw} title={'多行输入框'}>
              <EditorExample />
            </ExampleBlock>
          </>,
          try: () => <><ExampleBlock title={'试一试'}>
            <CipInput
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
