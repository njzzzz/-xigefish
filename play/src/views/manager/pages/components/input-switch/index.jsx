import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import { componentScheme } from '@xigefish/components/cip-input-switch/component.scheme'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'
import CipInputSwitch from '@xigefish/components/cip-input-switch'
import CipInput from '@xigefish/d-render-plugin-cci/esm/input/basic/input'
import CipSelect from '@xigefish/d-render-plugin-cci/esm/input/basic/select'

import './index.less'

export default {
  name: 'input-switch',
  setup () {
    const inputValue = ref(null)
    const selectValue = ref(null)
    const width = '300px'
    const selectConfig = {
      width,
      options: [
        { label: '1', value: 1 },
        { label: '2', value: 2 }
      ]
    }
    const testProps = ref({
      modelValue: undefined
    })
    const testSlots = ref({
      input: ({ modelValue, updateModelValue, disabled }) => <CipInput
        modelValue={modelValue}
        onUpdate:modelValue={updateModelValue}
        disabled={disabled}
        config={{
          width
        }}>
      </CipInput>
    })

    return () => <LayoutInfoThemeOne class='input-switch'>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock class='input-switch__block' title='当checkbox选中时才能对输入组件进行输入'>
              <CipInputSwitch v-model={inputValue.value}>
                {{
                  input: ({ modelValue, updateModelValue, disabled }) => <CipInput
                    modelValue={modelValue}
                    onUpdate:modelValue={updateModelValue}
                    disabled={disabled}
                    config={{
                      width
                    }}>
                  </CipInput>
                }}
              </CipInputSwitch>
              <CipInputSwitch v-model={selectValue.value}>
                {{
                  input: ({ modelValue, updateModelValue, disabled }) => <CipSelect
                    modelValue={modelValue}
                    onUpdate:modelValue={updateModelValue}
                    disabled={disabled}
                    config={selectConfig}>
                  </CipSelect>
                }}
              </CipInputSwitch>
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <CipInputSwitch v-model={testProps.value.modelValue} v-slots={testSlots.value}></CipInputSwitch>
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
