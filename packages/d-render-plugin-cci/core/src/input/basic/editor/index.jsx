import WangEditor from 'wangeditor'
import { onMounted, onBeforeUnmount, ref, watchEffect, watch, markRaw } from 'vue'
import { formInputProps, fromInputEmits, useFormInput } from '@xigefish/d-render-shared'
import { useEditorConfig } from './use-editor-config'
import { clearEmptyKey } from './util'
export default {
  name: 'BasicEditor',
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { securityConfig, proxyValue, proxyOtherValue, width, inputStyle } = useFormInput(props, context)
    const containerRef = ref()
    const editorConfig = useEditorConfig(securityConfig)

    const instance = ref()

    const getHtml = () => {
      const html = instance.value.txt.html()
      return html === '<p><br></p>' ? '' : html
    }
    // 老版本的el-table 在fixed时会创建2个实例，会导致更新错乱
    // 2.2.17后无次需求故去除此处判断代码
    const noChangeValue = (dom) => {
      // const noInstanceClass = props.config.fixed ? 'el-table__body-wrapper' : 'el-table__fixed-body-wrapper'
      // if (dom.parentElement.classList.contains('el-table') || dom.parentElement === document.body) return false
      // if (!dom.parentElement.classList.contains(noInstanceClass)) {
      //   return noChangeValue(dom.parentElement)
      // } else {
      //   return true
      // }
      return false
    }

    onMounted(() => {
      // 组件销毁时销毁editor的实例
      onBeforeUnmount(() => { destroyInstance() })
      // 实例化时判断是否在el-table__fixed-body-wrapper下
      createEditor()
      if (!props.tableData || (props.tableData && !noChangeValue(containerRef.value))) {
        watchEffect(() => {
          const old = getHtml()
          if (proxyValue.value !== old) { instance.value.txt.html(proxyValue.value) }
        })
      }

      // 得到config配置初始化及表单设计渲染
      watch(() => props.config, () => {
        if (props.showTemplate) { // ERROR:由于table对config进行了一次浅拷贝导致数据不停变化的临时处理方案
          // 重新渲染修改过config配置的editor，待优化
          createEditor()
          // 初始载入内容
          if (instance.value.txt.html() === '') instance.value.txt.html(proxyValue.value)
        }
      }, { deep: true })
    })
    const createEditor = () => {
      if (instance.value) instance.value.destroy()
      instance.value = markRaw(new WangEditor(containerRef.value))
      Object.assign(instance.value.config, clearEmptyKey({
        height: editorConfig.height,
        menus: editorConfig.menus,
        colors: editorConfig.colors,
        fontNames: editorConfig.fontNames,
        fontSizes: editorConfig.fontSizes,
        emotions: editorConfig.emotions,
        showFullScreen: editorConfig.showFullScreen,
        showMenuTooltips: editorConfig.showMenuTooltips,
        menuTooltipPosition: editorConfig.menuTooltipPosition,
        pasteFilterStyle: editorConfig.pasteFilterStyle,
        pasteIgnoreImg: editorConfig.pasteIgnoreImg,
        customUploadImg: editorConfig.customUploadImg,
        placeholder: editorConfig.placeholder,
        focus: false,
        zIndex: 0
      }), {
        onchange (val) {
          proxyValue.value = val
          proxyOtherValue[0].value = instance.value.txt.text()
        }
      })
      instance.value.create()
    }

    const destroyInstance = () => {
      instance.value.destroy()
      instance.value = null
    }

    return () => (
      <div ref={containerRef} style={{ ...inputStyle.value, width: width.value }} />
    )
  }
}
