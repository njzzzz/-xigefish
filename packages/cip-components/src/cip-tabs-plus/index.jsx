import { ref, onMounted, nextTick, getCurrentInstance, inject, watch } from 'vue'
import { ElTabs, ElIcon, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { MoreFilled } from '@element-plus/icons-vue'
import CipDropdown from '../cip-dropdown'
import { isArray } from '@xigefish/d-render-shared'
import { generateProps } from '@xigefish/shared'
import { componentScheme } from './tabs.scheme'
import useIntersectionObserver from './hooks/useIntersectionObserver'
import Tab from './tab'

const Tabs = {
  name: 'CipTabsPlus',
  props: generateProps(componentScheme),
  emits: ['update:modelValue'],
  setup (props, { emit, slots, attrs }) {
    // 继承attrs
    const { class: _class, style, ...inheritAttrs } = attrs
    const onUpdate = (name) => {
      emit('update:modelValue', name)
    }

    // 从 slots 中获取标签页信息
    const tabPanes = ref([])
    const getTabPane = () => {
      let children = slots.default?.()
      if (isArray(children) && typeof children[0]?.type === 'symbol') {
        children = children[0].children
      }
      tabPanes.value = children.filter(child => ['ElTabPane', 'CipTabPane'].includes(child.type?.name))
      if (!props.modelValue) {
        onUpdate(getDefaultTabName(tabPanes.value))
      }
    }
    const getDefaultTabName = (tabs) => {
      return tabs.filter(tab => !tab?.props?.disabled)[0]?.props?.name
    }
    getTabPane()

    // 获取隐藏的tab页
    const { namespace } = inject('cip-config')
    const ins = getCurrentInstance()
    const id = `cip-tabs-plus_${ins.uid}` // 元素id
    const canUseIntersectionApi = !!IntersectionObserver
    const canScroll = ref(true)
    const hiddenTabs = ref([])

    if (canUseIntersectionApi) { // 如果不兼容IntersectionObserver api，则恢复element默认ui行为
      const handler = (entries) => entries.map(entry => {
        const id = entry.target.attributes.id.value
        if (id.indexOf('cip-tabs-plus') > 0) {
          return {}
        }
        return { name: id.substring(4), isIntersecting: entry.isIntersecting }
      })
      const { entries } = useIntersectionObserver(`.${namespace}-tabs__item`, {
        multiple: true,
        scope: `#${id}`,
        handler,
        options: { threshold: 0.75 }
      })

      const hiddenEntries = ref([])
      watch(() => entries.value, (val) => {
        const hidden = val.filter(item => item.name && !item.isIntersecting).map(v => v.name)
        const show = val.filter(item => item.name && item.isIntersecting).map(v => v.name)
        hiddenEntries.value = Array.from(new Set([...hiddenEntries.value, ...hidden])).filter(name => !show.includes(name))
        hiddenTabs.value = tabPanes.value.filter(tab => hiddenEntries.value.includes(tab?.props?.name?.toString?.())).map(item => item?.props)
      })

      // 根据 ui进行样式调整
      onMounted(() => {
        nextTick(() => { // tabPane可能未挂载完成
          const cipTabsEl = document.querySelector(`#${id}`)
          const scroller = cipTabsEl.querySelector(`.${namespace}-tabs__nav-wrap`)
          canScroll.value = scroller.className.indexOf?.('is-scrollable') > -1 // 有这个类说明溢出需要更多展示

          if (canScroll.value) {
            const el = cipTabsEl.querySelector('.cip-tabs-plus__more')
            const width = scroller.offsetWidth
            // const tabsHeader = cipTabsEl.querySelector(`.${namespace}-tabs__header`)

            if (props.tabPosition === 'left') {
              el.style.left = `${width / 2 - 7}px`
            }
            if (props.tabPosition === 'right') {
              el.style.right = `${width / 2 - 7}px`
            }
          }
        })
      })
    }
    return () =>
      <div class={`cip-tabs-plus ${canUseIntersectionApi ? 'use-intersection' : ''}`} id={id}>
        <ElTabs
          {...inheritAttrs}
          {...props}
          onUpdate:modelValue={onUpdate}
          class={props.underline ? '' : 'no-underline'}
          style={{ height: props.height }}
        >
          {slots.default?.()}
        </ElTabs>
        {/* ...更多按钮 ↓↓↓ */}
        {
          canUseIntersectionApi && canScroll.value &&
            <div class={`cip-tabs-plus__more ${props.tabPosition}`} id={`${id}__more`}>
              <CipDropdown onCommand={onUpdate}>
                {{
                  default: () => <ElIcon><MoreFilled/></ElIcon>,
                  dropdown: () =>
                    <ElDropdownMenu>
                      {
                        hiddenTabs.value.length && hiddenTabs.value.map((tab, index) =>
                          <ElDropdownItem key={tab.name} command={tab.name} disabled={tab.disabled}>{tab.label ?? tab.name}</ElDropdownItem>
                        )
                      }
                    </ElDropdownMenu>
                }}
              </CipDropdown>
            </div>
        }
      </div>
  }
}

Tabs.Tab = Tab
export default Tabs
