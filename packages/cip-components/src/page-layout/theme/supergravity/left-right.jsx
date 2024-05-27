// 默认为左侧固定，右侧自由伸缩
import { inject } from 'vue'
import { commonLeftRightProps } from '../common'
import { ElScrollbar } from 'element-plus'
import CipBreadcrumb from '../../../main/cip-main-breadcrumb'
import { usePageLayout, useSetPageConfig } from '../use-page-layout'
import { useTitle } from '../use-title'
import BackButton from './widgets/back-button'
import { useMain } from '@xigefish/hooks/use-main'
import { useCanBack } from './hooks/use-back'

export default {
  name: 'LeftRightSupergravity',
  props: commonLeftRightProps,
  setup (props, { slots }) {
    const { inPageLayout } = usePageLayout()
    const { closeTab } = useMain()
    const cipMenu = inject('cipMenu', { })
    const canBackBridge = useCanBack(props, inPageLayout)
    const { titleBridge, withTitleBridge } = useTitle(props, inPageLayout, cipMenu)
    useSetPageConfig({
      type: 'left-right',
      table: {
        border: true
      },
      searchForm: {
        labelPosition: 'top'
      },
      form: {
        border: true,
        labelPosition: 'top'
      },
      dialogType: 'dialog'
    })
    return () => <div class={['page-layout-left-right--supergravity cip-page-layout--supergravity', { 'in-page-layout': inPageLayout.value }]}>
      {!inPageLayout.value && <div class={'cip-page-layout__breadcrumb page-layout-left-right__breadcrumb'}>
        {/* canBack={props.canBack} */}
        <CipBreadcrumb canBack={false}/>
      </div>}
      <div class={'page-layout-left-right__content'}>
        <div class={['page-layout-left-right__left', { 'page-layout-left-right__divider': props.divider }]} style={props.leftStyle}>
          <ElScrollbar>
            { (canBackBridge.value || withTitleBridge.value) && <div class={'cip-page-layout__title__wrapper page-layout-left-right__title__wrapper'}>
              { canBackBridge.value && <BackButton class={'cip-page-layout__back-button'} onClick={() => closeTab()}/>}
              { withTitleBridge.value && <div class={'cip-page-layout-left-right__title font-bold font-18'}>
                {titleBridge.value}
              </div>}
            </div>}

            {slots.left?.()}
          </ElScrollbar>
        </div>
        <div class={'page-layout-left-right__right layout-overflow-auto'} style={props.rightStyle}>{slots.default?.()}</div>
      </div>
    </div>
  }
}
