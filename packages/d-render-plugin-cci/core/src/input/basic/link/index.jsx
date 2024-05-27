import { defineComponent } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@xigefish/d-render-shared'
import { ElInput } from 'element-plus'
export default defineComponent({
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, proxyOtherValue } = useFormInput(props, context)
    return () => <div class={'cip-basic-link'}>
      <ElInput
        class={'cip-basic-link__name'}
        v-model={proxyOtherValue[0].value}
        clearable={true}>
        {{
          prepend: () => <span>链接名称</span>
        }}
      </ElInput>
      <ElInput
        class={'cip-basic-link__href'}
        v-model={proxyValue.value}
        clearable={true}>
        {{
          prepend: () => <span>链接地址</span>
        }}
      </ElInput>
    </div>
  }
})
