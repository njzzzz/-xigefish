import { computed } from 'vue'
import { layoutProps } from '@xigefish/d-render-shared'
export default {
  props: layoutProps,
  setup (props, { slots }) {
    const grid = computed(() => {
      return props.config._isGrid
    })
    const classifyOptions = computed(() => {
      return props.config.classifyOptions || []
    })

    const getClassifyChildren = (options = [], classifyConfig) => {
      const { key } = classifyConfig
      return options.filter(v => {
        return v.config.classify === key
      })
    }
    const Item = (classifyConfig, index) => {
      const children = getClassifyChildren(props.config.options , classifyConfig)
      // 无children是需要隐藏classify
      if (children.length === 0) return undefined
      return <div class={'basic-classify-layout__item'} key={index}>
        {classifyConfig.title && <h2 class={'basic-classify-layout__item__title'}>{classifyConfig.title}</h2>}
        <div
          class={{ 'cip-form--grid': grid.value }}
          style={{ gridTemplateColumns: `repeat(${typeof grid.value === 'number' ? grid.value : 3},1fr)` }} >
          {slots.item?.({ children: children })}
        </div>
      </div>
    }
    return () => (
      <div class={'basic-classify-layout'}>
        {classifyOptions.value.map(Item)}
      </div>
    )
  }
}
