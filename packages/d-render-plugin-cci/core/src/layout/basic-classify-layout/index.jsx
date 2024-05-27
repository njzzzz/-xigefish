import { computed } from 'vue'
import { layoutProps } from '@xigefish/d-render-shared'
export default {
  props: layoutProps,
  setup (props, { slots }) {
    const grid = computed(() => {
      return props.config._isGrid
    })
    const Item = (option, index) => {
      const { children: classify, ...classifyConfig } = option
      // const title = !props.config.hideIndex ? `第${index + 1}步：${stepConfig.title}` : stepConfig.title
      return <div class={'basic-classify-layout__item'} key={index}>
        {classifyConfig.title && <h2 class={'basic-classify-layout__item__title'}>{classifyConfig.title}</h2>}
        <div
          class={{ 'cip-form--grid': grid.value }}
          style={{ gridTemplateColumns: `repeat(${typeof grid.value === 'number' ? grid.value : 3},1fr)` }} >
          {slots.item?.({ children: classify })}
        </div>
      </div>
    }
    return () => (
      <div class={'basic-classify-layout'}>
        {props.config.options?.map(Item)}
      </div>
    )
  }
}
