import { h } from 'vue'
import { formInputViewProps } from '@xigefish/d-render-shared'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(advancedFormat)
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
/**
 * @description 参数配置
 * @param viewType 显示日期格式, 默认年月日
 * @param format 显示日期格式 优先级最高
 * @return modelValue - otherValue
*/
export default {
  props: formInputViewProps,
  setup (props) {
    const typeToFormatter = {
      year: 'YYYY',
      month: 'YYYY-MM',
      week: 'YYYY 第 ww 周',
      date: 'YYYY-MM-DD',
      datetime: 'YYYY-MM-DD HH:mm:ss'
    }
    const format = props.config.format || typeToFormatter[props.config.viewType] || typeToFormatter.date
    const date = () => {
      const startDate = props.modelValue ? dayjs(props.modelValue).format(format) : ''
      const endDate = props.otherValue ? dayjs(props.otherValue).format(format) : ''
      return `${startDate} - ${endDate}`
    }
    return () => h('span', {}, [date()])
  }
}
