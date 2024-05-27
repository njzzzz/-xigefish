import { computed, inject } from 'vue'
import { ElLoading } from 'element-plus'
import CipBreadcrumb from '@xigefish/components/main/cip-main-breadcrumb'
import { useConfig as useCipConfig } from '@xigefish/config'
import { getFieldValue } from '@xigefish/d-render-shared'
import { useBack } from '@xigefish/components/hooks/use-back'
import { useCanBack } from './hooks/use-back'

import {
  useTitle,
  usePageLayout,
  useSetPageConfig,
  pageLayoutCommonProps
} from '@xigefish/page-layout-shared'

import BackButton from './widgets/back-button'

export default {
  name: 'SupergrvaityCommonLayout',
  inheritAttrs: false,
  props: {
    ...pageLayoutCommonProps,
    type: String,
    top: { type: Boolean, default: undefined },
    hideHandler: { type: Boolean, default: undefined },
    hideFooter: { type: Boolean, default: undefined }
  },
  directives: {
    loading: ElLoading.directive
  },
  setup (props, { attrs, slots }) {
    const { inPageLayout } = usePageLayout()
    const cipConfig = useCipConfig()
    const cipMenu = inject('cipMenu', { })
    const canBackBridge = useCanBack(props, inPageLayout)
    const { titleBridge, withTitleBridge } = useTitle(props, inPageLayout, cipMenu)
    const { onBack } = useBack(props)
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
    const namespace = 'cip-page-layout'

    useSetPageConfig({
      type: props.type,
      table: {
        border: true,
        showDisabledButton: false
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
    const layoutClass = computed(() => {
      return [
        `${namespace}-${props.type}--supergravity`,
        `${namespace}--supergravity`,
        { 'in-page-layout': inPageLayout.value }
      ].concat(attrs.class)
    })
    return () => <div v-loading={props.loading} class={layoutClass.value}>
      <div class={[`${namespace}__header`, `${namespace}-${props.type}__header`]}>
        {!usingHideHeader.value && <div class={[
          `${namespace}-${props.type}__breadcrumb`,
          `${namespace}__breadcrumb`
        ]}>
          {/* 超重力主题面包屑不支持返回页面 canBack={props.canBack} back={() => closeTab()} */}
          <CipBreadcrumb canBack={false}/>
        </div>}
        {(canBackBridge.value || withTitleBridge.value || (!props.hideFooter && props.top)) && <div class={[`${namespace}__title`]}
             style={'display: flex; align-items: center; justify-content: space-between'}>
          <div class={`${namespace}__title__wrapper`}>
            { canBackBridge.value && <BackButton class={`${namespace}__back-button`} onClick={() => onBack()}/>}
            {withTitleBridge.value && <div class={[
              `${namespace}-${props.type}__title font-bold font-18`
            ]}>
             {titleBridge.value}
            </div>}
          </div>
          {!props.hideFooter && props.top && <div>{slots.footer?.()}</div>}
        </div>}
      </div>
      <div class={[
        `${namespace}__main`,
        'layout-overflow-auto',
        `${namespace}-${props.type}__main`]
      }>{slots.default?.()}</div>
      {!props.hideFooter && !props.top && <div class={[
        `${namespace}__footer`,
        `${namespace}-${props.type}__footer`
      ]}>{slots.footer?.()}</div>}
    </div>
  }
}
