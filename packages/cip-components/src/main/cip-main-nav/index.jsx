import { defineComponent, h, ref, inject, watch, computed, nextTick, onMounted } from 'vue'
import { ElMenu, ElSubMenu as ElSubmenu, ElMenuItem, ElTag, ElMenuItemGroup } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import { isArray, isEmpty, isNotEmpty, getFieldValue, getUsingConfig } from '@xigefish/d-render-shared'
import { getMenuTitle } from '../helper'
import CipMainIcon from '../cip-main-icon'
import { getFirstMenuItem, findMenu, getActiveNameByMatchedMenu, isLink } from './util'
import CipScrollPanel from '../../cip-scroll-panel'
import { useCipConfig } from '@xigefish/d-render-shared'
export default defineComponent({
  name: 'CipMainNav',
  props: {
    navMenu: Array, // 菜单项
    iconDepth: Number, // 展示图标的最大深度 不设置时为无限
    mode: String, // 菜单模式 horizontal-水平(此模式下 isCollapse无效) vertical-垂直
    isCollapse: Boolean, // 是否收缩
    topMenuOnly: Boolean, // 是否子渲染一级菜单
    badgeMap: Object,
    uniqueOpened: { type: Boolean, default: true },
    defaultOpeneds: Array,
    theme: String,
    ellipsis: { type: Boolean, default: undefined } // 自动折叠
  },
  emits: ['update:activeMenu', 'triggerGetBadge', 'menuItemClick'],
  setup (props, { emit }) {
    const router = useRouter()
    const route = useRoute()
    // const privileges = usePrivileges()
    const cipMenu = inject('cipMenu', {})
    // 此处为需要展示的menu, 故需要过滤掉不需要的值
    const menu = computed(() => props.navMenu) // 由上曾过滤
    const getDeepChildren = (children) => {
      return children.map(child => {
        if (child.children && child.children.length > 0) {
          return getDeepChildren(child.children).concat(child.name)
        } else {
          return child.name
        }
      }).flat(Infinity).filter(v => v !== undefined)
    }
    // 分析顶层菜单和 子菜单的关系
    const analysisRelationship = computed(() => {
      if (props.topMenuOnly === true) {
        return menu.value.reduce((acc, b) => {
          if (b.children) {
            acc[b.name] = getDeepChildren(b.children)
          }
          return acc
        }, {})
      } else {
        // 非topMenuOnly不进行分析
        return {}
      }
    })

    // 判断是否有可展示子菜单
    const checkChildren = (children) => {
      return isArray(children) && children.length > 0
    }
    // 兼容老版本菜单从路由中获取对_cache开通的路由的特殊处理
    // 处理起始字符串为_cache的父路由
    const checkCacheRoute = (route) => {
      if (/^_cache/.test(route.name)) {
        return route.children
      } else {
        return route
      }
    }
    // 渲染菜单货子菜单的内容[注: 内容包含子菜单和菜单项]
    const renderMenu = (menuContentList, depth = 0) => {
      depth++
      return menuContentList.map(item => {
        const route = checkCacheRoute(item)
        // 如果是数组则调用自身
        if (isArray(route)) {
          return renderMenu(route, depth)
        }
        // 对子模块进行过滤
        if (checkChildren(route.children)) {
          if (route.type === 'group') return renderMenuGroup(route, depth)
          return renderSubmenu(route, depth)
        } else {
          return renderMenuItem(route, depth) // 渲染为 menu-item
        }
      })
    }
    // 根据子菜单项计算子菜单的badge
    const computedSubBadge = (childNodeList) => {
      let count = 0
      childNodeList.forEach(childNode => {
        const badge = childNode?.props?.badge
        if (typeof badge === 'number') {
          count += badge
        }
      })
      if (count > 0) return count
      return undefined
    }
    // 渲染子菜单[注: 如果没有可渲染的菜单项, 将会本身渲染为菜单项]
    const renderSubmenu = (submenu, depth) => {
      // v4.x由filterMenu代替
      if (submenu.children.length > 0) {
        // 子菜单存在需要显示的菜单进行此渲染
        let subBadge
        if (props.topMenuOnly !== true || (props.topMenuOnly && depth > 1)) {
          const childrenVnode = renderMenu(submenu.children, depth + 1) // renderMenu(submenu.children, depth + 1) // 渲染为节点
          if (!submenu.hideBadge) {
            subBadge = !isEmpty(submenu.badge) ? submenu.badge : computedSubBadge(childrenVnode)
          }
          return h(ElSubmenu, {
            popperClass: `cip-menu-popper cip-menu-popper--${props.mode} main-theme main-theme--${props.theme}`,
            key: submenu.name,
            index: submenu.name,
            popperOffset: 1,
            badge: subBadge
          }, {
            title: () => [renderMenuIcon(submenu, depth), renderMenuItemTitle(submenu), renderMenuBadge(subBadge)],
            default: () => childrenVnode
          })
        } else {
          // 存在子路由
          // 需要定向到默认选中的第一个
          // const firstItem = getFirstMenuItem(submenu)
          // const redirectName = firstItem.name
          // const redirectRoute = firstItem.route
          // const { children, ...item } = submenu
          // return renderMenuItem({ ...item, name: redirectName, route: redirectRoute, originName: item.name }, depth)
          // REFACTOR: [6.0.19]将此处的功能转移到renderMenuItem的onClick中
          return renderMenuItem(submenu, depth)
        }
      } else {
        // 其他情况页渲染为item
        return renderMenuItem(submenu, depth)
      }
    }

    // 渲染菜单组
    const renderMenuGroup = (menuGroup, depth) => {
      if (menuGroup.children.length > 0) {
        const childrenVnode = renderMenu(menuGroup.children, depth + 1)
        return h(ElMenuItemGroup, {
          popperClass: `cip-menu-popper cip-menu-popper--${props.mode} main-theme--${props.theme}`,
          key: menuGroup.name,
          index: menuGroup.name
          // badge: subBadge
        }, {
          title: () => [renderMenuIcon(menuGroup, depth), renderMenuItemTitle(menuGroup)],
          default: () => childrenVnode
        })
      }
    }
    // 渲染菜单内容的icon[注: 包含子菜单及菜单项] 控制菜单icon的最大层级
    const renderMenuIcon = (menuContent = {}, depth = 0) => {
      // 非空且 当前层级>iconDepth时不渲染icon
      if (isNotEmpty(props.iconDepth) && depth > props.iconDepth) return undefined
      const iconName = menuContent.meta?.icon || menuContent.icon
      return <CipMainIcon name={iconName}/>
    }
    const renderMenuBadge = (badge) => {
      if (badge) {
        return <ElTag size={'small'} effect={'dark'} type={'danger'} round class={'cip-menu__badge'}>{badge}</ElTag>
      } else {
        return undefined
      }
    }
    const renderMenuItemTitle = (menuContent) => {
      return <span class={'cip-menu__title'}>{getMenuTitle(menuContent)}</span>
    }
    const getCurrentBadge = (item) => {
      if (props.topMenuOnly && analysisRelationship.value[item.originName]) {
        return analysisRelationship.value[item.originName].reduce((acc, childName) => {
          if (props.badgeMap[childName]) {
            acc += props.badgeMap[childName]
          }
          return acc
        }, 0)
      } else {
        return props.badgeMap[item.name] ?? item.badge
      }
    }
    // 渲染菜单项 [注：隐藏的、没有权限的、以_开头但是不是只渲染一层菜单的模式下的菜单项将不渲染]
    const toMenuItem = (item) => {
      const { route, name, link } = item
      // open页面的处理
      if (isLink(item)) {
        // route 也可能是是网页完整地址
        window.open(link || route)
        const originActiveName = currentActiveName.value
        // 赋予不一样的name 不然会导致menu-item处于激活状态
        currentActiveName.value = name // Symbol('')
        nextTick().then(() => {
          currentActiveName.value = originActiveName
        })
        return
      }
      // 本地及micro-app页面的处理
      if (route) {
        router.push(route)
      } else {
        router.push({ name })
      }
    }

    const renderMenuItem = (item, depth) => {
      // 过滤隐藏及权限的菜单 v4.x由filterMenu代替
      // if (isHideInMenu(item) || !hasPrivilege(item)) return null
      // 过滤name以_开通的菜单 v4.x由filterMenu代替
      // if (item.name.indexOf('_') === 0 && props.topMenuOnly !== true) return null
      // 获取badge

      const badge = getCurrentBadge(item) // props.badgeMap[item.name] ?? item.badge
      emit('triggerGetBadge', item.name) // 通知触发
      return h(ElMenuItem, {
        key: item.name,
        index: item.name,
        route: item.route,
        badge,
        onClick: (instance) => {
          emit('menuItemClick')
          if (instance.active.value) return
          if (props.topMenuOnly) {
            activeMenu.value = item
            const firstItem = getFirstMenuItem(item)
            toMenuItem(firstItem)
            emit('update:activeMenu', item)
          } else {
            toMenuItem(item)
          }
          // topMenuOnly的使用进行其他处理
        }
      }, {
        default: () => renderMenuIcon(item, depth),
        title: () => [renderMenuItemTitle(item), renderMenuBadge(badge)]
      })
    }

    // 当前激活菜单项名称
    const currentActiveName = ref()
    const activeMenu = ref()
    // 将当前激活的菜单的children发送给父组件 会修改currentActiveName 和emit activeMenu
    // REFACTOR: [6.0.19] 重构此处的实现
    // const emitActiveChildren = () => {
    //   // 此处的menu需要很完善才能正常使用(需要包含详情页等非展示视图的菜单信息)
    //   // 未进行未匹配处理[注：仅在激活的路由不再navMenu中才会导致未找到]
    //   // const isSubAppRoute = isSubApp(route.name)
    //
    //   const menuMatched = cipMenu.routeMatched
    //   if (menuMatched) {
    //     // 此处activeName与实际currentActiveName存在区别
    //     const activeName = menuMatched[0].name
    //     const activeMenu = findMenu(props.navMenu, activeName)
    //     // menuMatched存在保证了activeMenu的存在
    //     if ((activeMenu.children || []).length > 0) {
    //       currentActiveName.value = getFirstMenuItem(findMenu(menu.value, activeName))?.name
    //     }
    //     emit('update:activeMenu', activeMenu)
    //   } else {
    //     emit('update:activeMenu', undefined)
    //     // BROKEN: [6.0.19]: 因为微应用到穿擦问题，不在进行此中处理
    //     // if (isSubAppRoute) {
    //     //   const activeName = `_${route.name.replace('Sub', '')}`
    //     //   const activeMenu = findMenu(props.navMenu, activeName)
    //     //   // 不能保证activeMenu的存在，故需要判断
    //     //   if (activeMenu) {
    //     //     if ((activeMenu.children || []).length > 0) {
    //     //       currentActiveName.value = getFirstMenuItem(findMenu(menu.value, activeName))?.name
    //     //     }
    //     //     emit('update:activeMenu', activeMenu)
    //     //   } else {
    //     //     // 不变是否可行
    //     //     // emit('update:activeMenu', undefined)
    //     //   }
    //     // } else {
    //     // }
    //   }
    // }
    const scrollPanel$ = ref(null)
    watch(menu, () => {
      // 判断当前是否在rootPath
    }, { immediate: true })
    // PREF: 此处逻辑需要优化
    onMounted(() => {
      // 如果有标签页，keep-alive,切换标签页，也需要滑动导航，不用immediate执行，CipScrollPanel那边绑定会执行一次
      if (props.mode === 'horizontal') {
        watch(() => route.fullPath, () => {
          nextTick(() => {
            scrollPanel$.value?.scrollToActiveTab()
          })
        })
      }
    })
    const menu$ = ref()
    // let unwatchActiveChildren
    onMounted(() => {
      watch([() => cipMenu.routeMatched, () => cipMenu.showMenu], ([val]) => {
        if (!props.topMenuOnly) {
          const activeName = getActiveNameByMatchedMenu(val)
          if (activeName.indexOf('_') === 0) {
            menu$.value.open(activeName)
          }
          currentActiveName.value = activeName
          // currentActiveName.value = getActiveNameByMatchedMenu(val)
        } else {
          if (val) {
            currentActiveName.value = val[0].name
            // routeMatched不携带children
            if (activeMenu.value?.name !== val[0].name) {
              const newActiveMenu = findMenu(cipMenu.showMenu, val[0].name)
              // 没有进行过滤啊啊啊啊啊啊啊啊啊
              emit('update:activeMenu', newActiveMenu)
            }
          } else {
            currentActiveName.value = undefined
          }
        }
      }, { immediate: true })
    })

    // REFACTOR: [6.0.19] 使用index.vue provide的信息
    // 如果监听name会出现名字不变化的情况
    // watch([() => route.fullPath, () => props.navMenu], () => {
    //   // 针对Sub结尾的路径进行特殊处理
    //   if (!/Sub$/.test(route.name)) {
    //     if (currentActiveName.value !== route.name) {
    //       const menuMatch = matchMenuByRouteName(props.navMenu, route.name)
    //       currentActiveName.value = getActiveNameByMatchedMenu(menuMatch) // route.name // 此处也需要处理
    //     }
    //   } else { // 认为是子路由 子路由统一对fullPath进行匹配
    //     // console.warn(`[cip-main-nav]: route.name以Sub结尾的为子应用特有，请确认\`${route.name}\`路由为子应用路由`)
    //     const menuMatched = matchMenuByRoutePath(props.navMenu, route.fullPath)
    //     currentActiveName.value = getActiveNameByMatchedMenu(menuMatched) // .pop().name
    //   }
    //   if (props.topMenuOnly === true) {
    //     emitActiveChildren()
    //   }
    // }, { immediate: true })
    // 水平情况使用可滚动组件
    const cipConfig = useCipConfig()
    const ellipsisBridge = computed(() => {
      return getUsingConfig(props.ellipsis, getFieldValue(cipConfig, 'main.menu.ellipsis'), false)
    })
    const Framework = (props, { slots }) => props.mode === 'horizontal' && !ellipsisBridge.value
      ? h(CipScrollPanel, {
        ref: scrollPanel$
      },
      { default: () => slots.default?.() })
      : slots.default()
    return () => h(Framework, {
      mode: props.mode
    },
    {
      default: () => h(ElMenu, {
        ref: menu$,
        class: ['cip-main-nav'],
        defaultActive: currentActiveName.value,
        defaultOpeneds: props.defaultOpeneds,
        uniqueOpened: props.uniqueOpened,
        collapse: props.isCollapse,
        mode: props.mode,
        ellipsis: ellipsisBridge.value
      }, { default: () => renderMenu(menu.value) })
    })
  }
})
