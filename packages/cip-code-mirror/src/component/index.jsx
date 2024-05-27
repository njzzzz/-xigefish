import { defineComponent, ref, onMounted, markRaw, watch, nextTick, computed } from 'vue'
import CodeMirror from 'codemirror'
import { isJson, getUsingConfig } from '@xigefish/d-render-shared'
import { generateProps, generateEmits } from '@xigefish/d-render-shared'
import { componentScheme } from './component.scheme'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'
import 'codemirror/addon/hint/sql-hint'
import 'codemirror/addon/hint/javascript-hint'
import 'codemirror/addon/edit/closebrackets'
// css
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/3024-day.css'

export default defineComponent({
  name: 'CipCodeMirror',
  props: generateProps(componentScheme),
  emit: generateEmits(componentScheme),
  setup (props, { expose, emit }) {
    const codemirror = ref()
    const codemirror$ = ref()
    const modeBridge = computed(() => {
      return getUsingConfig(props.mode, props.type === 'json' ? 'application/json' : `text/${props.type}`)
    })
    const formatterValue = (val) => {
      if (modeBridge.value === 'application/json' && val) {
        let data = val
        if (typeof data === 'string' && isJson(data)) {
          data = JSON.parse(data)
        }
        return JSON.stringify(data, null, 2) ?? ''
      } else {
        return val
      }
    }
    const getCodeMirrorInstance = () => {
      const instance = CodeMirror.fromTextArea(codemirror$.value, {
        value: formatterValue(props.modelValue),
        mode: modeBridge.value,
        theme: props.theme,
        indentUnit: props.indentUnit,
        lineNumbers: props.lineNumbers,
        lineWrapping: props.lineWrapping,
        readOnly: props.readonly,
        extraKeys: {}
      })
      instance.setSize(props.width ?? '100%', props.height ?? 'auto')
      instance.on('change', (instance, obj) => {
        const { origin } = obj
        const value = instance.getValue()
        codemirror.value.save()
        if (origin !== 'setValue') { // 非setValue导致的更新才emit
          emit('update:modelValue', value)
        }
      })
      instance.on('inputRead', function () {
        const defaultHintOptions = { completeSingle: false }
        const hintOptions = props.customHintOption
          ? props.customHintOption(CodeMirror)
          : defaultHintOptions
        instance.showHint(hintOptions)
      })
      return instance
    }

    onMounted(() => {
      // 挂载后初始化codemirror
      codemirror.value = markRaw(getCodeMirrorInstance())
      watch(() => props.modelValue, (val) => {
        const codeMirrorValue = codemirror.value?.getValue?.()
        if (codeMirrorValue === val) return
        codemirror.value.setValue(formatterValue(val) ?? '')
        nextTick().then(() => {
          codemirror.value.refresh()
        })
      }, {
        immediate: true
      })
    })

    // props属性和codemirror的属性对映关系
    const optionMap = {
      readonly: 'readOnly',
      indentUnit: 'indentUnit',
      lineNumbers: 'lineNumbers',
      lineWrapping: 'lineWrapping'
    }
    // 需要监听的props属性
    const needWatchProps = ['readonly', 'indentUnit', 'lineNumbers', 'lineWrapping']
    watch(() => needWatchProps.map(key => props[key]), (valueList, oldValueList) => {
      valueList.forEach((v, index) => {
        if (v !== oldValueList[index]) {
          const key = optionMap[needWatchProps[index]]
          codemirror.value.setOption(key, v)
        }
      })
    })

    expose({
      codemirror
    })
    return () => <div>
            <textarea ref={codemirror$}></textarea>
        </div>
  }
})
