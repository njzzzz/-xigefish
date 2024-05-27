import { ref, computed } from 'vue'
import { Field as VantField, Popup as VanPopup, Picker as VanPicker } from 'vant'
import { useFormInput, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { nextTime, compareTime } from '@xigefish/d-render-plugin-cci/esm/input/basic/time-select/utils'
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { proxyValue, placeholder, width } = useFormInput(props, context)
    const start = computed(() => {
      return props.config?.start ?? '00:00'
    })
    const end = computed(() => {
      return props.config?.end ?? '24:00'
    })
    const step = computed(() => {
      return props.config?.step ?? '00:30'
    })
    // picker中的列表值
    const columns = computed(() => {
      const result = []
      if (start.value && end.value && step.value) {
        let current = start.value
        while (!compareTime(current, end.value)) {
          result.push(current)
          current = nextTime(current, step.value)
        }
      }
      return result
    })

    const show = ref(false)
    const openPopup = () => {
      show.value = true
    }
    const confirm = (val) => {
      proxyValue.value = val
      show.value = false
    }
    const cancel = () => {
      show.value = false
    }
    return () => <div style={{ width: width.value }}>
      <VantField modelValue={proxyValue.value}
        placeholder={placeholder.value}
        readonly
        is-link
        onclick={openPopup}></VantField>
      <VanPopup show={show.value} position="bottom" style="height: 40%">
        <VanPicker title='选择时间'
          modelValue={proxyValue.value}
          columns={columns.value}
          onConfirm={confirm}
          onCancel={cancel} />
      </VanPopup>
    </div>
  }
}
