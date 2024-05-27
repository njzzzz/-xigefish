import { computed, ref, defineComponent } from 'vue'
import { ElLoading } from 'element-plus'
import { useConfig as useCipConfig } from '@xigefish/config' /// components/hooks/use-cip-config'
import { getFieldValue } from '@xigefish/d-render-shared'
import { useMain } from '@xigefish/hooks/use-main'
import CipBreadcrumb from '@xigefish/components/main/cip-main-breadcrumb'
import CipFormValidate from '@xigefish/components/cip-form-validate'
import { commonHandleProps, usePageLayout, useSetPageConfig } from '@xigefish/page-layout-shared'

export default defineComponent({
  name: 'CipPageLayoutHandleStandard',
  props: {
    ...commonHandleProps,
    width: {
      type: String, // eg: 1px
      default: '100%'
    }
  },
  directives: {
    loading: ElLoading.directive
  },
  setup (props, { slots }) {
    const { inPageLayout } = usePageLayout()
    const { closeTab } = useMain()
    const cipConfig = useCipConfig()
    const formValidateRef = ref()
    const waiting = ref(false)

    const confirm = async (cb) => {
      if (typeof cb !== 'function') cb = props.onConfirm
      waiting.value = true
      try {
        await formValidateRef.value.validate()
        // 校验通过
        const res = await new Promise((resolve, reject) => {
          if (typeof cb === 'function') {
            cb(resolve, reject)
          } else {
            reject(new TypeError('onConfirm is not a function'))
          }
        })
        return res ?? true
      } finally {
        waiting.value = false
      }
    }

    const usingHideHeader = computed(() => {
      if (props.hideHeader !== undefined) {
        return props.hideHeader
      } else if (inPageLayout.value) {
        // 布局组件内，隐藏
        return true
      } else {
        return getFieldValue(cipConfig, 'layout.hideHeader') === true
      }
    })
    const usingHideHandler = computed(() => {
      if (props.hideHandler !== undefined) {
        return props.hideHandler
      } else {
        return getFieldValue(cipConfig, 'layout.hideHandler') === true
        // return cipConfig.layout.hideHandler === true
      }
    })
    useSetPageConfig({
      table: {
      },
      searchForm: {
      },
      form: {
      }
    })
    return () => <div
      class={['cip-page-layout-handle cip-page-layout-handle--standard layout-overflow-auto', { 'in-page-layout': inPageLayout.value }]}
      style={{ width: props.width }}
      v-loading={props.loading}
    >
      {!usingHideHeader.value && <div class={'cip-page-layout-handle__breadcrumb'}>
        <CipBreadcrumb canBack={props.canBack} back={() => closeTab()} />
      </div>}
      <div class={'cip-page-layout-handle__main'}>
        {props.title && <div>{props.title}</div>}
        <CipFormValidate ref={formValidateRef}>
          {slots.default?.()}
        </CipFormValidate>
      </div>
      <template>
      </template>
      { !usingHideHandler.value && <div class={'cip-page-layout-handle__handler'} >
        {(slots.handler || slots.handle)?.({ waiting: waiting.value, confirm })}
      </div>}
    </div>
  }
})
