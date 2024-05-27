import { layoutProps } from '@xigefish/d-render-shared'
import { ElTimeline, ElTimelineItem } from 'element-plus'
export default {
  props: layoutProps,
  setup (props, { slots }) {
    const Item = (option, index) => {
      const { children: step, ...stepConfig } = option
      const title = !props.config.hideIndex ? `第${index + 1}步：${stepConfig.title}` : stepConfig.title
      return <ElTimelineItem class={'cip-steps-view__item'} timestamp={title} placement="top">
        {slots.item?.({ col: step })}
      </ElTimelineItem>
    }
    return () => (
      <ElTimeline class={'cip-steps-view'}>
        {props.config.options?.map(Item)}
      </ElTimeline>
    )
  }
}
