import { computed, inject } from 'vue'
import { ElLoading } from 'element-plus'
import CipBreadcrumb from '@xigefish/components/main/cip-main-breadcrumb'
import { getUsingConfig, useConfig as useCipConfig } from '@xigefish/config'
import { getFieldValue } from '@xigefish/d-render-shared'
import BackButton from './widgets/back-button'
import { useBack } from '@xigefish/components/hooks/use-back'
import { useCanBack } from './hooks/use-back'
import { useTitle, usePageLayout, useSetPageConfig, pageLayoutCommonProps } from '@xigefish/page-layout-shared'
export default {
  name: 'DgCommonLayout',
  inheritAttrs: false,
  props: {
    ...pageLayoutCommonProps,
    type: String,
    hideHandler: { type: Boolean, default: undefined },
    hideFooter: { type: Boolean, default: undefined },
    ignoreParentLayout: { type: Boolean, default: undefined },
    noPadding: { type: Boolean, default: undefined }
  },
  directives: {
    loading: ElLoading.directive
  },
  setup (props, { slots, attrs }) {
    const { inPageLayout } = usePageLayout(props)
    const canBackBridge = useCanBack(props, inPageLayout)
    const { onBack } = useBack(props)
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
        return getFieldValue(cipConfig, 'layout.hideHeader') === true// cipConfig.layout.hideHeader === true
      }
    })
    // 控制back按钮出现的位置，title对应出现在title前面，breadcrumb对应出现在面包屑前面
    const backPosition = computed(() => getUsingConfig(getFieldValue(cipConfig, 'layout.backPosition'), 'breadcrumb'))
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
    const layoutClass = computed(() => {
      return [
        `${namespace}-${props.type}--${theme}`,
        `${namespace}--${theme}`,
        { 'in-page-layout': inPageLayout.value }
      ].concat(attrs.class)
    })
    return () => <div
      v-loading={props.loading}
      class={layoutClass.value}>
      <div class={[`${namespace}__header`, `${namespace}-${props.type}__header`]}>
        {!usingHideHeader.value && <div class={[
          `${namespace}-${props.type}__breadcrumb`,
          `${namespace}__breadcrumb`
        ]}>
            {
              canBackBridge.value && backPosition.value === 'breadcrumb' && <BackButton class={`${namespace}__back-button`} onClick={() => onBack()}/>
            }
          <CipBreadcrumb canBack={false} back={() => onBack()}/>
        </div>}
        {withTitleBridge.value && <div class={`${namespace}__title__container`}>
          { canBackBridge.value && backPosition.value === 'title' && <BackButton class={`${namespace}__back-button`} onClick={() => onBack()}/>}
          <div class={[
            `${namespace}-${props.type}__title font-bold font-18`,
            `${namespace}__title`
          ]}>
            {titleBridge.value}
          </div></div>}
      </div>
      <div class={[
        `${namespace}__main`,
        'layout-overflow-auto',
        `${namespace}-${props.type}__main`,
        `${props.noPadding ? 'no-padding' : null}`
      ]
      }>{slots.default?.()}</div>
      {!props.hideFooter && <div class={[
        `${namespace}__footer`,
        `${namespace}-${props.type}__footer`
      ]}>{slots.footer?.()}</div>}
    </div>
  }
}
