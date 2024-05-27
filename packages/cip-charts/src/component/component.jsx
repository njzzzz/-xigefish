import { defineComponent, onMounted, ref, computed, watch, toRefs, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { sensor } from '@xigefish/utils/sensor'
import { NAME, GROUP, VALUE, OPTION, CONFIG_ERROR, BAR_OPTION } from './const'
import { Encode } from './method'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'
/**
 * 组件提供默认option, 也支持自定义
 * dataset为数据集，传入时需要指定绑定字段，默认为name，value;当存在多维数据时需要指定group
 * dataset example
 * [
 *  { name: '邮件营销', value: 120, group: '周一' },
    { name: '邮件营销', value: 110, group: '周二' },
    { name: '邮件营销', value: 99, group: '周三' },
    { name: '联盟广告', value: 11, group: '周一' },
    { name: '联盟广告', value: 21, group: '周二' },
    { name: '联盟广告', value: 31, group: '周三' },
    { name: '视频广告', value: 91, group: '周一' },
    { name: '视频广告', value: 41, group: '周二' },
    { name: '视频广告', value: 41, group: '周三' }
  ]
 */
export default defineComponent({
  name: 'CipCharts',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { emit }) {
    const chartRef = ref()
    let charts = null
    let observe = null
    const { dataset, options, bindProps } = toRefs(props)
    const groupData = computed(() => {
      const key = bindProps.value.group ?? GROUP
      return dataset.value.reduce((result, current) => {
        const _isArray = Array.isArray(result[current[key]])
        if (_isArray) result[current[key]].push(current)
        else result[current[key]] = [current]
        return result
      }, {})
    })
    // 判断是否存在group
    const isSingleGroup = computed(() => {
      return Object.keys(groupData.value)[0] === 'undefined'
    })
    // 获取dataset
    const _dataset = computed(() => {
      const keys = Object.keys(groupData.value)
      const _name = bindProps.value.name
      const _value = bindProps.value.value
      if (isSingleGroup.value) return dataset.value.map(item => ({ ...item, [VALUE]: item[_value], name: item[_name] }))
      const result = keys.map(currentKey => {
        const currentData = groupData.value[currentKey].reduce((obj, item) => {
          obj[item[_name]] = item[_value]
          return obj
        }, {})
        return {
          name: currentKey,
          ...currentData
        }
      })
      return result
    })
    // 获取dimensions
    const dimensions = computed(() => {
      const groups = [...new Set(dataset.value.map(item => item[bindProps.value.name]))]
      return (groups?.length && !isSingleGroup.value) ? [NAME, ...groups] : [NAME, VALUE]
    })
    // 判断series是否存在，不存在则给默认值;series中如何存在data,则data的优先级高
    const series = computed(() => {
      const EncodeInstance = new Encode(props.bindProps)
      if (options.value.series?.length) return EncodeInstance.checkEncode(options.value.series)
      else {
        const generateSeries = Array.from({ length: dimensions.value.length - 1 }).map(() => ({
          ...BAR_OPTION
        }))
        return generateSeries.length > 1 ? generateSeries : EncodeInstance.checkEncode(generateSeries)
      }
    })
    // 处理option数据
    const chartsOption = computed(() => {
      return Object.assign({},
        OPTION,
        options.value,
        isHasDataset.value
          ? {}
          : {
              dataset: {
                dimensions: dimensions.value,
                source: _dataset.value
              }
            }, { series: series.value })
    })
    // 判断option中是否存在dataset, 存在在则使用option配置
    const isHasDataset = computed(() => {
      return 'dataset' in options.value
    })
    // 图表resize
    const bindResize = () => {
      observe = sensor(chartRef.value)
      observe.bind(() => {
        charts && charts.resize()
      })
    }
    // 组合echats的options
    onMounted(() => {
      charts = echarts.init(chartRef.value)
      try {
        charts.setOption(chartsOption.value)
        bindResize()
        emit('chart-init', charts)
      } catch (error) {
        console.error(CONFIG_ERROR)
      }
    })
    // 销毁实例
    onBeforeUnmount(() => {
      if (observe) {
        observe.destroy()
      }
      if (charts) {
        charts.dispose()
        charts = null
      }
    })
    watch([options, dataset], () => {
      try {
        charts.clear()
        charts.setOption(chartsOption.value)
      } catch (error) {
        console.error(CONFIG_ERROR)
      }
    }, {
      deep: true
    })
    return () => <div ref={chartRef} class="cip-chart-wrapper"></div>
  }
})
