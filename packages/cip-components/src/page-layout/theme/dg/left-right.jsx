// 默认为左侧固定，右侧自由伸缩
import { commonLeftRightProps } from '../common'
import { ElScrollbar } from 'element-plus'
import CipBreadcrumb from '../../../main/cip-main-breadcrumb'
import { usePageLayout, useSetPageConfig } from '../use-page-layout'
export default {
  name: 'LeftRightDg',
  props: commonLeftRightProps,
  setup (props, { slots }) {
    const { inPageLayout } = usePageLayout()
    useSetPageConfig({ table: {}, searchForm: {} })
    return () => <div class={['page-layout-left-right--gd', { 'in-page-layout': inPageLayout.value }]}>
      <div class={['page-layout-left-right__left', { 'page-layout-left-right__divider': props.divider }]} style={props.leftStyle}>
        <ElScrollbar>
          {!inPageLayout.value && <div class={'page-layout-left-right__breadcrumb'}>
            <CipBreadcrumb canBack={props.canBack}/>
          </div>}
          {slots.left?.()}
        </ElScrollbar>
      </div>
      <div class={'page-layout-left-right__right layout-overflow-auto'} style={props.rightStyle}>{slots.default?.()}</div>
    </div>
  }
}
