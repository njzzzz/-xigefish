import { ref, computed } from 'vue'
export default {
  name: 'fold',
  props: {
    isExpand: {
      type: Boolean,
      default: true
    }
  },
  setup (props, { slots }) {
    const arrowIcon = computed(() => {
      return isExpand.value ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
    })
    const isExpand = props.isExpand ? ref(false) : ref(true)
    const toggleExpand = () => {
      isExpand.value = !isExpand.value
    }
    const txt = computed(() => {
      return isExpand.value ? '展开附件' : '收起附件'
    })
    return () => <>
      <div onClick={() => toggleExpand()} style="color:#3786fd;font-size: 12px;font-weight: 400;">
        {txt.value}
        <i style="margin-left:4px" class={arrowIcon.value}/>
      </div>
      <div style={['margin-top:8px', isExpand.value ? 'display:none' : 'display:block']}>
        {slots?.default()}
      </div>
    </>
  }
}
