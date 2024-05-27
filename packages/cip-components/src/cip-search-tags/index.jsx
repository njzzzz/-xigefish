import CheckTags from './tags'
import ToggleBox from './toggle'
import { computed, reactive, watch } from 'vue'
import { props } from './props'
import { isEmpty } from '@xigefish/d-render-shared'
const DEFAULT_ALL = '全部'
export default {
  props: props,
  name: 'searchTags',
  setup (props, context) {
    const emitInput = (val) => {
      context.emit('update:modelValue', val)
    }
    // 属性值
    const dataValue = computed(() => {
      return props.optionProps.value
    })
    // 显示值
    const dataLabel = computed(() => {
      return props.optionProps.label
    })
    // 数值
    const number = computed(() => {
      return props.optionProps?.number || 'number'
    })
    // 是否需要数字显示
    const hideNumber = computed(() => {
      return props.optionProps?.hideNumber || 'hideNumber'
    })
    // 全部选择项id
    const addIds = computed(() => {
      return props.options.map(item => item[dataValue.value])
    })
    // 数据代理
    const _proxy = computed(() => {
      const _value = isEmpty(props.modelValue) ? [] : props.modelValue
      return Array.isArray(_value) ? _value : [_value]
    })
    // 全部按钮
    const ALL = reactive({
      [dataLabel.value]: DEFAULT_ALL,
      [dataValue.value]: addIds.value.toString(),
      [number.value]: '',
      [hideNumber.value]: true,
      isChecked: false
    })
    const handleChange = (val, data) => {
      if (data.label === DEFAULT_ALL) {
        handleAll(val)
        return
      }
      // 单选
      if (!props.multiple) {
        ALL.isChecked = false
        handleItemEmit(val, data)
        return
      }
      handleItemEmit(val, data)
    }
    // 选择项被点击时调用
    const handleItemEmit = (val, data = {}) => {
      let filterChecked = [..._proxy.value]
      const index = filterChecked.findIndex(item => item === data.value)
      if (props.multiple) {
        if (ALL.isChecked) {
          ALL.isChecked = false
          filterChecked = []
        }
        val ? filterChecked.push(data.value) : filterChecked.splice(index, 1)
      } else {
        filterChecked = [data.value]
      }
      emitInput(props.multiple ? filterChecked : filterChecked.pop())
    }
    // 处理列表选中
    const optionsList = computed(() => {
      return [...props.options].map(item => ({
        ...item,
        isChecked: ALL.isChecked ? false : _proxy.value?.includes(item[dataValue.value]) ?? false
      }))
    })
    // 渲染选择项
    const tagsList = computed(() => {
      const _firstItem = props.multiple ? [ALL] : []
      return [..._firstItem, ...optionsList.value]
    })
    // 多选点击全部时生效
    const handleAll = (val) => {
      ALL.isChecked = val
      optionsList.value.forEach(item => {
        val && (item.isChecked = false)
      })
      val ? emitInput(ALL[dataValue.value].split(',')) : emitInput([])
    }
    watch(() => _proxy.value, (val) => {
      if (val.length === 0) {
        ALL.isChecked = false
      }
    })
    return () => <ToggleBox>
            {
              tagsList.value.map((item) => <CheckTags
                v-model:modelValue={item.isChecked}
                label={item[dataLabel.value]}
                value={item[dataValue.value]}
                number={item[number.value]}
                hide-number={item[hideNumber.value]}
                onUpdate:modelValue={handleChange}
                key={item[dataValue.value]}
              ></CheckTags>)
            }
      </ToggleBox>
  }
}
