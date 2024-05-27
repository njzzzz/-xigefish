// 默认为左侧固定，右侧自由伸缩
import { computed, inject } from 'vue'
import { ElScrollbar } from 'element-plus'
import CipBreadcrumb from '@xigefish/components/main/cip-main-breadcrumb'
import { useMain } from '@xigefish/hooks/use-main'
import { commonLeftRightProps, usePageLayout, useSetPageConfig, useTitle } from '@xigefish/page-layout-shared'
import { useCanBack } from './hooks/use-back'
import BackButton from './widgets/back-button'
import { getFieldValue } from '@xigefish/d-render-shared'
import { useConfig as useCipConfig } from '@xigefish/config'

export default {
  name: 'LeftRightSupergravity',
  props: commonLeftRightProps,
  setup (props, { slots }) {
    const cipConfig = useCipConfig()
    const { inPageLayout } = usePageLayout()
    const { closeTab } = useMain()
    const cipMenu = inject('cipMenu', { })
    const canBackBridge = useCanBack(props, inPageLayout)
    const { titleBridge, withTitleBridge } = useTitle(props, inPageLayout, cipMenu)
    const usingHideHeader = computed(() => {
      if (props.hideHeader !== undefined) {
        return props.hideHeader
      } else if (inPageLayout.value) {
        // 布局组件内，隐藏
        return true
      } else {
        return getFieldValue(cipConfig, 'layout.hideHeader') === true// cipConfig.layout.hideHeader === true
      }
    })
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
      {!usingHideHeader.value && <div class={'cip-page-layout__breadcrumb page-layout-left-right__breadcrumb'}>
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
