import { computed, inject } from 'vue'
import CipBreadcrumb from '../../../main/cip-main-breadcrumb'
import { useMain } from '@xigefish/hooks/use-main'
import { useCipConfig } from '../../../hooks/use-cip-config'
import { usePageLayout, useSetPageConfig } from '../use-page-layout'
import { useTitle } from '../use-title'
import { pageLayoutCommonProps } from '../common'
import { ElLoading } from 'element-plus'
import { getFieldValue } from '@xigefish/d-render-shared'

export default {
  name: 'DgCommonLayout',
  inheritAttrs: false,
  props: {
    ...pageLayoutCommonProps,
    type: String,
    hideHandler: { type: Boolean, default: undefined },
    hideFooter: { type: Boolean, default: undefined }
  },
  directives: {
    loading: ElLoading.directive
  },
  setup (props, { slots }) {
    const { inPageLayout } = usePageLayout()
    const { closeTab } = useMain()
    const cipConfig = useCipConfig()
    const cipMenu = inject('cipMenu', { })
    const { titleBridge, withTitleBridge } = useTitle(props, inPageLayout, cipMenu)
    const usingHideHeader = computed(() => {
      if (props.hideHeader !== undefined) {
        return props.hideHeader
      } else if (inPageLayout.value) {
        // 布局组件内，隐藏
        return true
      } else {
        return getFieldValue(cipConfig, 'layout.hideHeader') === true // cipConfig.layout.hideHeader
      }
    })
    const namespace = 'cip-page-layout'
    const theme = 'dg'
    useSetPageConfig({
      type: props.type,
      table: {
        border: true
      },
      searchForm: {
        labelPosition: 'top'
      },
      form: {
        // labelPosition: 'top',
        border: true
      },
      dialogType: 'drawer'
    })
    return () => <div
      v-loading={props.loading}
      class={[
      `${namespace}-${props.type}--${theme}`,
      `${namespace}--${theme}`,
      { 'in-page-layout': inPageLayout.value }
      ]}>
      <div class={[`${namespace}__header`, `${namespace}-${props.type}__header`]}>
        {!usingHideHeader.value && <div class={[
          `${namespace}-${props.type}__breadcrumb`,
          `${namespace}__breadcrumb`
        ]}>
          <CipBreadcrumb canBack={props.canBack} back={() => closeTab()} />
        </div>}
        {withTitleBridge.value && <div class={[
          `${namespace}-${props.type}__title font-bold font-18`,
          `${namespace}__title`
        ]}>
          {titleBridge.value}
        </div>}
      </div>
      <div class={[
        `${namespace}__main`,
        'layout-overflow-auto',
        `${namespace}-${props.type}__main`]
      }>{slots.default?.()}</div>
      {!props.hideFooter && <div class={[
        `${namespace}__footer`,
        `${namespace}-${props.type}__footer`
      ]}>{slots.footer?.()}</div>}
    </div>
  }
}
