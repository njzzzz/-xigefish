import { ElIcon } from 'element-plus'
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { computed, onMounted, ref } from 'vue'
import { sensor } from '@xigefish/utils/sensor'
export default {
  name: 'boxToggle',
  setup (props, { slots }) {
    const isShowToggle = ref(true)
    const isClose = ref(true)
    const boxRef = ref()

    const toggle = () => {
      isClose.value = !isClose.value
    }
    // 获取单行元素
    const getBoxStyle = () => {
      const _el = boxRef.value
      const parentWidth = _el?.clientWidth
      const parentHeight = _el?.offsetHeight
      const childHeight = _el?.firstElementChild?.offsetHeight
      const clientWidth = [...(_el?.children || [])].reduce((total, current) => {
        total += current.offsetWidth + 10
        return total
      }, 0)
      const rows = Math.ceil((clientWidth + 10) / parentWidth)
      return {
        parentWidth,
        parentHeight,
        childHeight,
        clientWidth,
        el: _el,
        rows
      }
    }
    // 页面加载时添加计算是否需要收缩按钮
    const computedHeight = () => {
      const { el } = getBoxStyle()
      const _sensor = sensor(el)
      _sensor.bind(() => {
        const { clientWidth, parentWidth } = getBoxStyle()
        if (clientWidth > parentWidth) {
          isShowToggle.value = true
        } else {
          isShowToggle.value = false
          isClose.value = true
        }
      })
    }
    const toggleIcon = computed(() => {
      return isClose.value ? <ArrowDown></ArrowDown> : <ArrowUp></ArrowUp>
    })
    onMounted(() => {
      computedHeight()
    })
    return () => <div className="cip-input-tags-wrapper">
      <div class={['cip-input-tags-wrapper--items', !isClose.value && 'checked']}ref={boxRef}>
        { slots.default() }
      </div>
      {isShowToggle.value && <ElIcon onClick={toggle} class="toggle-icon">{toggleIcon.value}</ElIcon>}
    </div>
  }
}
