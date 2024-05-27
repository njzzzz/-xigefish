import { computed, watch, onMounted } from 'vue'
import { ElTree } from 'element-plus'
import { useFormInput, useOptions, useInputProps, useElementFormEvent, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
import { depthFirstSearchTree, isNotEmpty } from '@xigefish/d-render-shared'
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { securityConfig, width, proxyValue, inputRef, updateStream } = useFormInput(props, context, { maxOtherKey: 2 })
    const { handleChange } = useElementFormEvent()
    // 注意nodeKey的功能由optionProps.value.value提供
    const inputProps = useInputProps(props, [
      'lazy',
      'load',
      'defaultExpandAll'
    ])
    const multiple = computed(() => {
      return securityConfig.value.multiple // 多选树
    })
    const { optionProps, options } = useOptions(props, multiple)

    const getLeafCheckedNodes = (checkedNodes) => {
      return checkedNodes.filter(v => !v[optionProps.value.children] || v[optionProps.value.children].length === 0)
    }

    const getPathValue = (modelValue, options, optionProps) => { // 注意此处的options,optionProps与 useOptions提供的不是同一个
      const checkedPathNodes = modelValue.map(value => {
        for (let i = 0; i < options.length; i++) {
          // 获取路径中的最后一个 注意最后的pop方法
          const path = depthFirstSearchTree(options[i], value, optionProps.value, optionProps.children)
          if (path) {
            return path.map(node => node[optionProps.value])
          }
        }
      })
      return checkedPathNodes
    }

    const handleCheck = (data, { checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }) => {
      const leafCheckedNodes = getLeafCheckedNodes(checkedNodes)
      const modelValue = leafCheckedNodes.map(v => v[optionProps.value.value])
      context.emit('update:modelValue', modelValue)
      updateStream.appendValue(modelValue)
      const pathValue = getPathValue(modelValue, options.value, optionProps.value)
      updateStream.appendOtherValue(pathValue)
      updateStream.appendOtherValue({ checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys }, 2)
      updateStream.end()
      handleChange(modelValue)
    }
    //
    const setChecked = (optionsValue = [], nextChecked = []) => {
      const checkedNodes = nextChecked.map(value => {
        for (let i = 0; i < optionsValue.length; i++) {
          // 获取路径中的最后一个 注意最后的pop方法
          const path = depthFirstSearchTree(optionsValue[i], value, optionProps.value.value, optionProps.value.children)
          if (path) {
            return path.pop()
          }
        }
      })
      const checkedKeys = checkedNodes
        .filter(v => isNotEmpty(v))
        .filter(v => !v[optionProps.value.children] || v[optionProps.value.children].length === 0)
        .map(v => v[optionProps.value.value])
      inputRef.value.setCheckedKeys(checkedKeys)
    }

    onMounted(() => {
      watch([proxyValue, options], ([value, optionsValue]) => {
        setChecked(optionsValue, value)
      }, { immediate: true, deep: true })
    })

    return () => <div class="cip-tree"><ElTree
      {...inputProps.value}
      ref={inputRef}
      style={{ width: width.value }}
      props={optionProps.value}
      nodeKey={optionProps.value.value}
      showCheckbox={multiple.value}
      data={options.value}
      onCheck={(data, node) => handleCheck(data, node)}
    />
    </div>
  }
}
