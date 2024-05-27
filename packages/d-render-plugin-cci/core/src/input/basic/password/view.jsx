import { h, ref, computed } from 'vue'
import { formInputViewProps } from '@xigefish/d-render-shared'
import { ElIcon } from 'element-plus'
import { View } from '@element-plus/icons-vue'
export default {
  props: formInputViewProps,
  setup (props) {
    const show = ref(false)
    const trigger = () => {
      show.value = !show.value
    }

    const text = computed(() => h('span', {}, show.value ? props.modelValue : '******'))
    return () => <span>
      {text.value}
      <ElIcon style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={trigger}><View/></ElIcon>
    </span>
    // h('span', {}, [
    //   text.value,
    //   h('i', { class: 'el-icon-view', style: { marginLeft: '10px', cursor: 'pointer' }, onClick: trigger })
    // ])
  }
}
