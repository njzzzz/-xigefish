import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import ExampleBlock from '@/components/example-block'
import CipOverflowTooltip from '@xigefish/components/cip-overflow-tooltip'
import { componentScheme } from '@xigefish/components/cip-overflow-tooltip/component.scheme'
import ComponentController from '@/components/component-controller'
import ExampleTabs from '@/components/example-page'

const commonStyle = {
  width: '80px',
  display: 'inline-block',
  'margin-right': '20px'
}

export default {
  name: 'overflow-tooltip',
  setup () {
    const triggers = ['click', 'focus', 'hover', 'manual']
    const placements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']

    const testSlots = ref({
      default: () => 'testtsetsetsssssssssssssssssss'
    })
    const testProps = ref({})

    return () => <LayoutInfoThemeOne>
      <ExampleTabs>
        {{
          example: () => <>
            <ExampleBlock>
              {
                triggers.map(trigger =>
                  <div>
                    <div style={commonStyle}>
                      <CipOverflowTooltip trigger={trigger}>
                        {{
                          default: () => `${trigger}触发`
                        }}
                      </CipOverflowTooltip>
                    </div>
                    <div style={commonStyle}>
                      <CipOverflowTooltip trigger={trigger}>
                        {{
                          default: () => `${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发${trigger}触发`
                        }}
                      </CipOverflowTooltip>
                    </div>
                  </div>
                )
              }
            </ExampleBlock>
            <ExampleBlock>
              {
                placements.map(placement => <div style={commonStyle}>
                  <CipOverflowTooltip placement={placement}>
                    {{
                      default: () => `${placement} placement`
                    }}
                  </CipOverflowTooltip>
                </div>)
              }
            </ExampleBlock>
          </>,
          try: () => <>
            <ExampleBlock title={'试一试'}>
              <div style={commonStyle}>
                <CipOverflowTooltip {...testProps.value} v-slots={testSlots.value}/>
              </div>
            </ExampleBlock>
            <ComponentController
              v-model:propsConfig={testProps.value}
              v-model:slotsConfig={testSlots.value}
              scheme={componentScheme}
            />
          </>
        }}
      </ExampleTabs>
    </LayoutInfoThemeOne>
  }
}
