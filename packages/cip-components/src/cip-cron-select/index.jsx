import { ref, computed } from 'vue'
import { ElPopover } from 'element-plus'
import { CipButton } from '@xigefish/button'
import { useElFormInject } from '@xigefish/d-render-shared'
import CipCron from '../cip-cron'
import CipInput from '../cip-input'

export default {
  props: {
    modelValue: String,
    disabled: {
      type: Boolean,
      default: undefined
    }
  },
  setup (props, { emit }) {
    const tempCronValue = ref(props.modelValue)
    const popperSwitch = ref(false)
    const openPopper = () => {
      if (disabled.value) {
        return
      }
      popperSwitch.value = true
    }
    // WARN 需要等待初始化完成后再进行cron表达式渲染，不然可能导致更新冲突
    const initReady = ref(false)
    const initCom = () => {
      tempCronValue.value = props.modelValue
      initReady.value = true
    }
    const beforeLeave = () => {
      initReady.value = false
    }

    const confirm = () => {
      emit('update:modelValue', tempCronValue.value)
      close()
    }
    const cancel = () => {
      close()
    }

    const close = () => {
      popperSwitch.value = false
    }

    const elFormRef = useElFormInject()
    const disabled = computed(() => props.disabled ?? elFormRef.disabled)
    return () => <ElPopover
      v-model:visible={popperSwitch.value}
      onBefore-enter={() => initCom()}
      onAfter-leave={() => beforeLeave()}
      trigger={'focus'}
      width={'418px'}
    >
      {{
        default: () => initReady.value === true && <div style={{ width: '100%' }}>
            <CipCron v-model={tempCronValue.value} />
            <div class={'cip-cron-select__footer'}>
              <div>{tempCronValue.value}</div>
              <div>
                <CipButton onClick={() => cancel()}>取消</CipButton>
                <CipButton type={'primary'} onClick={() => confirm()}>确认</CipButton>
              </div>
            </div>
          </div>,
        reference: () => <CipInput readonly disabled={disabled.value} modelValue={props.modelValue} onClick={() => openPopper()}/>
      }}
    </ElPopover>
  }
}
