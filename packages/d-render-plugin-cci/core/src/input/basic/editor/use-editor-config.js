import { computed, reactive } from 'vue'
import { isArray, isEmpty } from '@xigefish/d-render-shared'
import { defaultMenus } from './config'

/**
 *
 * @param securityConfig
 * @returns {UnwrapNestedRefs<{showFullScreen: ComputedRef<unknown>, pasteIgnoreImg: ComputedRef<unknown>, emotions: ComputedRef<unknown>, fontNames: ComputedRef<unknown>, pasteFilterStyle: ComputedRef<unknown>, menuTooltipPosition: ComputedRef<unknown>, fontSizes: ComputedRef<unknown>, menus: ComputedRef<unknown>, placeholder: ComputedRef<unknown>, customUploadImg: ComputedRef<unknown>, colors: ComputedRef<unknown>, showMenuTooltips: ComputedRef<unknown>}>}
 */
export const useEditorConfig = (securityConfig) => {
  const height = computed(() => {
    // 编辑器高度配置
    return securityConfig.value.height ?? null
  })
  const menus = computed(() => {
    // 编辑器菜单配置
    const menu = securityConfig.value.menus
    if (isEmpty(menu) || menu === '') return defaultMenus
    if (!isArray(menu)) return menu.split(',')
    return menu
  })
  const colors = computed(() => {
    // 编辑器字体及背景色配置
    return securityConfig.value.colors ?? null
  })
  const fontNames = computed(() => {
    // 编辑器字体配置
    return securityConfig.value.fontNames ?? null
  })
  const fontSizes = computed(() => {
    // 编辑器字号配置
    return securityConfig.value.fontSizes ?? null
  })
  const emotions = computed(() => {
    // 编辑器表情图标配置
    return securityConfig.value.emotions ?? null
  })
  const showFullScreen = computed(() => {
    // 配置全屏功能按钮是否展示
    return securityConfig.value.showFullScreen ?? true
  })
  const showMenuTooltips = computed(() => {
    // 是否显示菜单栏提示
    return securityConfig.value.showMenuTooltips ?? true
  })
  const menuTooltipPosition = computed(() => {
    // 菜单栏提示上标（up）还是下标（down）
    return securityConfig.value.menuTooltipPosition ?? 'up'
  })
  const pasteFilterStyle = computed(() => {
    // 是否开启粘贴样式过滤
    return securityConfig.value.pasteFilterStyle ?? true
  })
  const pasteIgnoreImg = computed(() => {
    // 是否忽略粘贴内容的图片
    return securityConfig.value.pasteIgnoreImg ?? null
  })
  const customUploadImg = computed(() => {
    // 自定义上传图片
    return securityConfig.value.customUploadImg ?? null
  })
  const placeholder = computed(() => {
    // 默认占位符
    return securityConfig.value.placeholder ?? null
  })
  return reactive({
    height,
    menus,
    colors,
    fontSizes,
    emotions,
    fontNames,
    showFullScreen,
    showMenuTooltips,
    menuTooltipPosition,
    pasteFilterStyle,
    pasteIgnoreImg,
    customUploadImg,
    placeholder
  })
}
