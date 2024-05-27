import { ElSwitch } from 'element-plus'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: [...fromInputEmits, 'change'],
  setup (props, context) {
    const { proxyValue, securityConfig } = useFormInput(props, context)
    // el-switch组件监听checked值未做nextTick报错，对错误进行处理
    // onErrorCaptured(() => false)
    return () => <div class={'cip-switch__wrapper'}>
      <ElSwitch
        v-model={proxyValue.value}
        disabled={props.disabled}
        activeText={securityConfig.value.activeText ?? ''}
        inactiveText={securityConfig.value.inactiveText ?? ''}
        activeValue={securityConfig.value.activeValue ?? true}
        inactiveValue={securityConfig.value.inactiveValue ?? false}
        onChange={val => context.emit('change', val)}
      />
    </div>
  }
}
