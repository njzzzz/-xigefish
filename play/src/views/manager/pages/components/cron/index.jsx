import { ref } from 'vue'
import { ElInput } from 'element-plus'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ExampleTabs from '@/components/example-page'
import { componentScheme } from '@xigefish/components/cip-cron/component.scheme'
import CipCron from '@xigefish/components/cip-cron'
import CipCronSelect from '@xigefish/components/cip-cron-select'
import ComponentController from '@/components/component-controller'

import './index.less'

export default {
  name: 'cron',
  setup () {
    const cronValue = ref(undefined)
    const cronSelectValue = ref('')
    const testProps = ref({ value: '' })
    const testSlots = ref({})
    const testEvents = ref({})

    return () => <LayoutInfoThemeOne class='cron-example'>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock title='不同size(内部输入组件的尺寸)'>
              {cronValue.value}
              <ElInput v-model={cronValue.value}></ElInput>
               <CipCron v-model={cronValue.value}></CipCron>
            </ExampleBlock>
            <ExampleBlock>
              <CipCronSelect v-model={cronSelectValue.value}></CipCronSelect>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipCron
                {...testProps.value}
                {...testEvents.value}
                v-slots={testSlots.value}
                v-model:value={testProps.value.value}/>
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:slotsConfig={testSlots.value}
              v-model:eventsConfig={testEvents.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
