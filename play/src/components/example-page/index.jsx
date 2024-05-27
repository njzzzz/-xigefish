import { ref, KeepAlive } from 'vue'
import CipTabs from '@xigefish/components/cip-tabs'
import './index.less'
export default {
  setup (props, { slots }) {
    const active = ref('example')
    return () => <div class={'example-tabs__container'}>
      <CipTabs class={'example-tabs'} v-model:active={active.value}>
        <CipTabs.Tab name={'example'} >示例</CipTabs.Tab>
        {slots.try && <CipTabs.Tab name={'try'} >试一试</CipTabs.Tab>}
      </CipTabs>
      <div class={'example-tab'}>
        <KeepAlive>
          {slots[active.value]?.()}
        </KeepAlive>
      </div>
    </div>
  }
}
