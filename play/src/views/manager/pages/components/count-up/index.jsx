import { ref } from 'vue'
import CipCountUp from '@xigefish/components/cip-count-up'
import { componentScheme } from '@xigefish/components/cip-count-up/component.scheme'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'
import { CipForm } from '@xigefish/d-render'
export default {
  setup () {
    const testProps = ref({})
    const testSlots = ref({
      default: () => 'test'
    })
    const test = ref({
      a: '1',
      b: '2'
    })
    const testEvents = ref({})
    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <CipForm v-model:model={test.value} fieldList={[{ key: 'a', config: { type: 'testInput', otherKey: 'b', label: 'testInput', placeholder: '123' } }]}></CipForm>
            <ExampleBlock title="基础">
              <CipCountUp modelValue={123132}></CipCountUp>
            </ExampleBlock>
            <ExampleBlock title={'设置显示的小数位置'}>
              <CipCountUp modelValue={99.123} decimalPlaces={2}></CipCountUp>
            </ExampleBlock>
            <ExampleBlock title={'起始值和前置后置文字'}>
              <CipCountUp startVal={50} endVal={100} duration={3} prefix="前置￥" suffix="后置%"></CipCountUp>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipCountUp {...testProps.value}/>
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
