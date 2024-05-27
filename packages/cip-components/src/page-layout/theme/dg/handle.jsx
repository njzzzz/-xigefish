import CommonLayout from './common-layout'
import { commonHandleProps } from '../common'
import { computed, ref } from 'vue'
import { useCipConfig } from '../../../hooks/use-cip-config'
import CipFormValidate from '../../../cip-form-validate'
export default {
  name: 'HandleDg',
  props: commonHandleProps,
  setup (props, { slots }) {
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
    const cipConfig = useCipConfig()

    const usingHideHandler = computed(() => {
      if (props.hideHandler !== undefined) {
        return props.hideHandler
      } else {
        return cipConfig.layout?.hideHandler === true
      }
    })

    return () => <CommonLayout
      type={'handle'}
      hideFooter={usingHideHandler.value}
      hideHeader={props.hideHeader}
      title={props.title}
      withTitle={props.withTitle}
      loading={props.loading}
      canBack={props.canBack}
      back={props.back}
    >
      {{
        // header: () => {},
        default: () => <CipFormValidate ref={formValidateRef}>{slots.default?.()}</CipFormValidate>,
        footer: () => (slots.handler || slots.handle)?.({ waiting: waiting.value, confirm })
      }}
    </CommonLayout>
  }
}
