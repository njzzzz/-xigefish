import { computed, defineComponent } from 'vue'
import { formInputProps } from '@xigefish/d-render-shared'
import { ElLink, ElTooltip } from 'element-plus'
export default defineComponent({
  props: formInputProps,
  inheritAttrs: false,
  setup (props) {
    const text = computed(() => {
      return props.otherValue || props.modelValue
    })

    return () => (
      <>
        { props.modelValue && <ElTooltip content={`链接地址: ${props.modelValue}`} placement={'top'}>
          <ElLink href={props.modelValue} target={props.config.target || '_block'} type={props.config.linkType || 'primary'}>
            {text.value}
          </ElLink>
        </ElTooltip>
        }
      </>
    )
  }
})
