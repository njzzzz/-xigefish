import { defineComponent, h, ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { ElIcon } from 'element-plus'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { sensor } from '@xigefish/utils/sensor'
import { debounce } from '@xigefish/d-render-shared'
// import './index.less'
export default defineComponent({
  name: 'CipScrollPanel',
  props: {
    scrollDistance: {
      type: Number, // 默认滑动距离，统一框架那边移动的宽度，一般4个字无icon的长度*2
      default: 192
    },
    activeClass: {
      type: String, // 默认激活class类名，触发滚动需要
      default: 'is-active'
    }
  },
  setup (props, { slots, expose }) {
    const hasNavArrow = ref(false)
    let observe = null
    const nav$ = ref(null)
    const navScroll$ = ref(null)
    const arrows$ = ref(null)
    const scrollLeftDisabled = ref(true)
    const scrollRightDisabled = ref(false)

    const scrollLeft = (toLeft) => {
      if ((toLeft && scrollLeftDisabled.value) || (!toLeft && scrollRightDisabled.value)) {
        return
      }
      // 判断左滑动还是右滑动
      scrollLeftTo(toLeft ? -props.scrollDistance : props.scrollDistance)
    }
    const scrollLeftTo = (instance) => {
      navScroll$.value.scrollLeft += instance
    }
    const initScroll = () => {
      // 隐藏按钮的临界值：如果存在右侧滑动按钮，并且子节点内容宽度 - 按钮宽度(避免按钮遮盖导航所添加的内容快) <= 父节点宽度，那么就不需要按钮就能显示全部的字节点了
      if (hasNavArrow.value && (navScroll$.value.scrollWidth - arrows$.value.clientWidth) <= navScroll$.value.clientWidth) {
        hasNavArrow.value = false
      } else if (!hasNavArrow.value && (navScroll$.value.scrollWidth > navScroll$.value.clientWidth)) {
        // 显示按钮的临界值: 如果子节点内容宽度大于父节点宽度，就需要右侧滑动按钮(这时候没有按钮，所以不用考虑按钮的宽度)
        hasNavArrow.value = true
      }
      // 由于右侧按钮显示隐藏，所以需要等按钮节点渲染之后再执行滚动，要不然会出现滚动误差
      nextTick().then(() => {
        scrollToActiveTab() // 一触发滚动到激活的菜单之类方法
      })
    }
    const scrollToActiveTab = () => {
      // 如果没有滚动条，那么就不需要滚动
      if (!hasNavArrow.value) {
        return
      }
      const activeTab = nav$.value.querySelector(`.${props.activeClass}`)
      if (!activeTab) return
      const navScroll = navScroll$.value
      const navScrollBounding = navScroll.getBoundingClientRect()
      const activeTabBounding = activeTab.getBoundingClientRect()
      // 如果激活菜单在视觉范围内(需要减去右侧按钮)，那么就不需要滚动，避免多余的抖动
      if (activeTabBounding.left - navScrollBounding.left < (navScrollBounding.width - props.scrollDistance) && activeTabBounding.left - navScrollBounding.left > 0) {
        initDisabledScroll() // 一般每次滚动之后执行初始化判断能否左右滑动，此处会return，所以需要执行一遍
        return
      }
      scrollLeftTo(activeTabBounding.left - navScrollBounding.left)
    }
    const debounceListenerScroll = debounce(() => {
      initDisabledScroll()
    }, 300)
    const initDisabledScroll = () => {
      // 如果没有滚动条，那么就不需要判断
      if (!hasNavArrow.value) {
        return
      }
      const navScroll = navScroll$.value
      // 左侧到底了，那么左点击就不可点击
      scrollLeftDisabled.value = navScroll.scrollLeft === 0
      // 右侧到底了，那么右点击就不可点击
      scrollRightDisabled.value = navScroll.clientWidth + navScroll.scrollLeft === navScroll.scrollWidth
    }
    // 图表resize
    const bindResize = () => {
      observe = sensor(navScroll$.value)
      observe.bind(() => {
        initScroll()
      })
    }
    onMounted(() => {
      bindResize()
      // 销毁实例
      navScroll$.value.addEventListener('scroll', debounceListenerScroll)
      onBeforeUnmount(() => {
        observe.destroy()
        navScroll$.value.removeEventListener('scroll', debounceListenerScroll)
      })
    })
    expose({
      scrollToActiveTab
    })
    return () => h('div', {
      class: ['cip-scroll-panel--horizontal', { 'cip-scroll-panel--has-arrow': hasNavArrow.value }],
      ref: navScroll$
    }, [
      h(
        'div', {
          ref: nav$,
          class: 'cip-scroll-panel--horizontal-content'
        },
        { default: () => slots.default?.() }
      ),
      h(
        'div',
        {
          class: 'cip-scroll-panel---arrows',
          ref: arrows$
        },
        [
          h(ElIcon, {
            size: '20',
            disabled: scrollLeftDisabled.value,
            onClick: () => {
              scrollLeft(true)
            }
          },
          { default: () => h(ArrowLeft) }
          ),
          h(ElIcon, {
            size: '20',
            disabled: scrollRightDisabled.value,
            onClick: () => {
              scrollLeft(false)
            }
          },
          { default: () => h(ArrowRight) }
          )
        ]
      )
    ])
  }
})
