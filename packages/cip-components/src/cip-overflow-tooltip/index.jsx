import { defineComponent, onMounted, ref, watch, nextTick } from 'vue'
import { ElPopover } from 'element-plus'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './component.scheme'

export default defineComponent({
  name: 'CipOverflowTooltip',
  props: generateProps(componentScheme),
  setup (props, { slots }) {
    const wrapperRef = ref()
    const isOverflow = ref(false)
    const computeOverflow = () => {
      const el = wrapperRef.value
      el.style.whiteSpace = 'nowrap'
      const parentElement = el.parentElement
      parentElement.style.overflow = 'hidden'
      // isOverflow.value =
      return el.scrollWidth > parentElement.offsetWidth
    }

    onMounted(() => {
      watch(() => props.rowKey, () => {
        isOverflow.value = false
        nextTick(() => {
          isOverflow.value = computeOverflow()
        })
      }, { immediate: true, deep: true })
    })
    return () => {
      return <div ref={wrapperRef}>
        {!isOverflow.value && slots.default?.()}
        {isOverflow.value &&
          <ElPopover trigger={props.trigger} placement={props.placement}>
            {{
              reference: () => <div class={'cip-text-ellipsis'}>{slots.default?.()}</div>,
              default: () => slots.default?.()
            }}
          </ElPopover>
        }
      </div>
    }
  }
})
