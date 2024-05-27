import { defineComponent, ref, computed } from 'vue'
import { ElButton } from 'element-plus'
import CipDrawer from './drawer'
import CipDialog2 from './dialog'
import CipFormValidate from '../cip-form-validate'
import { componentScheme } from './component.scheme'
import { generateProps, generateEmits } from '@xigefish/shared'
import { useCipPageConfig } from '../hooks/use-cip-config'
// import { useCipPageConfig } from '../hooks/use-cip-config'
import { getUsingConfig } from '@xigefish/d-render-shared'
export default defineComponent({
  name: 'CipDialog',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { slots, emit }) {
    const cipPageConfig = useCipPageConfig()
    const formValidateRef = ref()
    const waiting = ref(false)
    const _dialogType = computed(() => {
      return getUsingConfig(props.dialogType, cipPageConfig.dialogType, 'dialog')
    })
    const DialogComponent = computed(() => {
      return _dialogType.value === 'drawer' ? CipDrawer : CipDialog2
    })
    // 默认使用props.onConfirm当入参为函数时使用函数
    const confirm = async (cb) => {
      // 防止cb为e导致的错误
      if (typeof cb !== 'function') cb = props.onConfirm
      try {
        waiting.value = true
        await formValidateRef.value.validate()
        const res = await new Promise((resolve, reject) => {
          if (typeof cb === 'function') {
            cb(resolve, reject)
          } else {
            reject(new TypeError('onConfirm is not a function'))
          }
        })
        updateVisible(false)
        return res ?? true
      } finally {
        waiting.value = false
      }
    }
    const cancel = () => {
      updateVisible(false)
      emit('cancel')
    }
    const openHandler = () => {
      formValidateRef.value?.clear()
    }
    const closeHandler = () => {
      emit('close')
    }
    const updateVisible = (val) => {
      emit('update:modelValue', val)
    }

    return () => (
      <DialogComponent.value
        modelValue={props.modelValue}
        onUpdate:modelValue={updateVisible}
        title={props.title}
        closeOnClickModal={props.closeOnClickModal}
        width={props.width}
        size={props.size}
        top={props.top}
        destroyOnClose={props.destroyOnClose}
        onClose={() => closeHandler()}
        onOpen={() => openHandler()}
        fullscreen={props.fullscreen}
      >
        {{
          header: () => <>
            <div class="el-dialog__mainTitle">{ slots.mainTitle?.() || props.title }</div>
            <div class="el-dialog__subTitle">{slots.subTitle?.() || props.subTitle}</div>
          </>,
          default: () => <CipFormValidate ref={formValidateRef}>
            {slots.default?.()}
          </CipFormValidate>,
          footer: props.showOnly && !slots.footer
            ? undefined
            : () => {
                if (!props.showOnly) {
                  const defaultFooter = <>
                {
                  !waiting.value && props.showCancel &&
                  <ElButton
                    onClick={() => cancel()}
                    size={props.buttonSize}>
                    {props.cancelText}
                  </ElButton>
                }
                <ElButton
                  onClick={() => confirm()}
                  size={props.buttonSize}
                  type={'primary'}
                  loading={waiting.value} >
                  {props.confirmText}
                </ElButton>
              </>
                  const footerSlot = slots.footer?.({ confirm, loading: waiting.value, cancel })
                  return slots.footer ? footerSlot : defaultFooter
                } else {
                  return slots.footer?.({ showOnly: true })
                }
              }
        }}
      </DialogComponent.value>
    )
  }
})
