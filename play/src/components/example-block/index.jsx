import './index.less'
import { defineAsyncComponent, ref, KeepAlive } from 'vue'
import { ElCollapseTransition, ElTooltip } from 'element-plus'
import CipTableButton from '@xigefish/components/cip-table-button'
import CipSvgIcon from '@xigefish/components/cip-svg-icon'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/theme/material-palenight.css'
const CipCodeMirror = defineAsyncComponent(() => import('@xigefish/code-mirror'))
export default {
  props: {
    title: String,
    code: String
  },
  setup (props, { slots }) {
    const sourceControl = ref(false)
    const toggleSourceCode = () => {
      sourceControl.value = !sourceControl.value
    }
    return () => {
      const title = slots.title?.() || props.title
      return <div class={'example-block'}>
        {title && <h4 class={'example-block__header'}>{title}</h4>}
        <div class={'example-block__content'}>
          {slots.default?.()}
        </div>
        {props.code && <>
          <div class={'example-block__control'}>
            <CipTableButton onClick={() => toggleSourceCode()}>
              <ElTooltip content="查看原代码">
                <CipSvgIcon name="code" style="margin-right: 4px;"/>
              </ElTooltip>
            </CipTableButton>
          </div>
          <ElCollapseTransition>
            <KeepAlive>
              {sourceControl.value && <div class={'example-block__code'}>
                <CipCodeMirror modelValue={props.code} type={'jsx'} theme={'material-palenight'} lineNumbers={false} />
              </div>
              }
            </KeepAlive>
          </ElCollapseTransition>
        </>}
      </div>
    }
  }
}
