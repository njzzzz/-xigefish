import { h } from 'vue'
import { formInputViewProps, getFieldValue, useCipConfig } from '@xigefish/d-render-shared'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(advancedFormat)
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
/**
 * @description 参数配置
 * @param viewType 显示日期格式, 默认全时间格式
 * @param format 显示日期格式 优先级最高
 * @return modelValue
*/
export default {
  props: formInputViewProps,
  setup (props) {
    const cipConfig = useCipConfig()
    const typeToFormatter = {
      year: 'YYYY',
      month: 'YYYY-MM',
      week: 'YYYY 第 ww 周',
      date: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm:ss'
    }
    // [注：props.config.format在input组件未实现，考虑兼容问题故保留 ]
    props.config.format && console.warn('date的展示组件的format属性即将废弃，将在v5.x移除请使用formatter代替')
    const format = props.config.format || props.config.formatter || typeToFormatter[props.config.viewType] || typeToFormatter.date
    const date = () => {
      // modelValue和cip-table配置默认参数一致，返回modelValue
      if (props.modelValue === getFieldValue(cipConfig, 'table.defaultViewValue')) return props.modelValue
      return props.modelValue ? dayjs(props.modelValue).format(format) : ''
    }
    return () => h('span', {}, [date()])
  }
}
