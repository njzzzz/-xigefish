import { ref, computed } from 'vue'
import { Field as VanField, Popup as VanPopup, Picker as VanPicker, DatetimePicker as VanDatetimePicker } from 'vant'
import { formInputProps, fromInputEmits, useFormInput } from '@xigefish/d-render-shared'

import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(advancedFormat)
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
export default {
  props: formInputProps,
  emits: fromInputEmits,
  setup (props, context) {
    const { width, clearable, placeholder, emitModelValue } = useFormInput(props, context)
    const show = ref(false)
    const openPicker = () => {
      show.value = true
    }
    const formatter = computed(() => {
      if (props.config?.formatter) {
        return props.config?.formatter
      } else {
        const typeToFormatter = {
          year: 'YYYY',
          month: 'YYYY-MM',
          week: 'YYYY 第 ww 周',
          date: 'YYYY-MM-DD',
          datetime: 'YYYY-MM-DD HH:mm:ss'
        }
        return typeToFormatter[type.value] ?? typeToFormatter.date
      }
    })
    const type = computed(() => {
      const viewType = props.config?.viewType ?? 'date'
      return viewType.includes('range') ? 'date' : viewType
    })
    // vant对dataType的特殊处理
    const vantType = computed(() => {
      if (type.value === 'month') return 'year-month'
      return type.value
    })
    const isTimestamp = computed(() => {
      return props.config?.isTimestamp ?? false
    })

    // 展示的时间转换
    const transValue = computed(() => {
      if (!props.modelValue) return null
      if (isTimestamp.value) {
        return dayjs(props.modelValue).format(formatter.value)
      }
      if (type.value === 'dates') {
        return props.modelValue.split(',')
      }
      return dayjs(props.modelValue).format(formatter.value)
    })
    const pickerValue = computed(() => {
      return props.modelValue ? new Date(props.modelValue) : new Date()
    })
    // 时间选择范围确定，最小时间和最大时间
    const currentYear = new Date().getFullYear()
    const minDate = computed(() => {
      return props.config?.minDate ?? new Date(currentYear - 10, 0, 1)
    })
    const maxDate = computed(() => {
      return props.config?.maxDate ?? new Date(currentYear + 10, 11, 31)
    })
    // 确定按钮
    const confirm = (value) => {
      show.value = false
      emitModelValue(typeToValue(value))
    }
    // 取消按钮
    const cancel = () => {
      show.value = false
    }
    // 不同事件类型传值不同，做转换
    const typeToValue = (val) => {
      if (!val) return ''
      if (isTimestamp.value) {
        return new Date(val).getTime()
      } else if (type.value === 'datetime') {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      }
      return dayjs(val).format(formatter.value)
    }

    // 年/月单独实现
    const times = (n, iteratee) => {
      if (n < 0) return []
      const result = new Array(n)
      let index = -1
      while (++index < n) {
        result[index] = iteratee(index)
      }
      return result
    }
    // 月份前置0
    const padZero = (num, targetLength = 2) => {
      let str = num + ''
      while (str.length < targetLength) {
        str = '0' + str
      }
      return str
    }
    // 年月的选项列表
    const columns = computed(() => {
      const ranges = [
        { type: 'year', range: [dayjs(minDate.value).format('YYYY'), dayjs(maxDate.value).format('YYYY')] }
        // { type: 'month', range: [dayjs(minDate.value).format('MM'), dayjs(maxDate.value).format('MM')] }
      ]
      const { range = null } = ranges.find(v => v.type === type.value)
      if (range) return times(range[1] - range[0] + 1, (index) => padZero(parseInt(range[0]) + index))
      return []
    })
    // 年月的默认选中值设置
    const defaultIndex = computed(() => {
      if (type.value === 'year') {
        return columns.value.findIndex(v => v === new Date().getFullYear().toString())
      }
      if (type.value === 'month') {
        return columns.value.findIndex(v => v === new Date().getMonth().toString())
      }
      return 0
    })
    // 头部标题配置
    const titleMap = {
      year: '选择年',
      month: '选择年月',
      date: '选择年月日',
      datetime: '选择日期时间'
    }
    // 弹窗头部标题
    const title = computed(() => {
      return titleMap[type.value] ?? titleMap.datetime
    })
    return () =>
      <div style={{ width: width.value }}>
        <VanField modelValue={transValue.value}
          placeholder={placeholder.value}
          clearable={clearable.value}
          onclick={openPicker}
          readonly
          is-link />
        <VanPopup show={show.value} position="bottom" style="height: 40%">
          {['year'].includes(type.value)
            ? <VanPicker modelValue={pickerValue.value}
              columns={columns.value}
              default-index={defaultIndex.value}
              title={title.value}
              onConfirm={confirm}
              onCancel={cancel}/>
            : <VanDatetimePicker modelValue={pickerValue.value}
              type={vantType.value}
              title={title.value}
              minDate={new Date(minDate.value)}
              maxDate={new Date(maxDate.value)}
              onConfirm={confirm}
              onCancel={cancel} />}
        </VanPopup>
      </div>
  }
}
