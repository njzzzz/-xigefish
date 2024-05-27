// 默认为左侧固定，右侧自由伸缩
import { ElScrollbar } from 'element-plus'
import { usePageLayout, useSetPageConfig } from '../use-page-layout'
import { commonLeftRightProps } from '../common'
export default {
  name: 'LeftRightStandard',
  props: commonLeftRightProps,
  setup (props, { slots }) {
    const { inPageLayout } = usePageLayout()
    useSetPageConfig({ table: {}, searchForm: {} })
    return () => <div class={['page-layout-left-right--standard layout-overflow-auto', { 'in-page-layout': inPageLayout.value }]}>
      <div class={['page-layout-left-right__left', { 'page-layout-left-right__divider': props.divider }]} style={props.leftStyle}>
        <ElScrollbar>
          {slots.left?.()}
        </ElScrollbar>
      </div>
      <div class={'page-layout-left-right__right'} style={props.rightStyle}>{slots.default?.()}</div>
    </div>
  }
}
