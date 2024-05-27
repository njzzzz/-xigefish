import { activities, imgActivities, customActivities, imgFoldActivities } from './config.js'
import CipTimeline from '@xigefish/components/cip-timeline'
import CipTimelineItem from '@xigefish/components/cip-timeline-item'

export default {
  setup () {
    return () => <>
      <div style="display:flex;justify-content:space-around;align-items:center">
        <div>基础样式(时间在右)</div>
        <CipTimeline>
        {activities.map(obj =>
          <CipTimelineItem
            key={obj.key}
            title={obj.content}
            timestamp={obj.timestamp}
            hollow={obj.hollow}
            color={obj.color}>
              {obj.desc}
          </CipTimelineItem>)}
        </CipTimeline>

        <div>带标签</div>
        <CipTimeline>
        {activities.map(obj =>
          <CipTimelineItem
            key={obj.key}
            title={obj.content}
            timestamp={obj.timestamp}
            hollow={obj.hollow}
            color={obj.color}>
              {obj.desc}
              {obj.addon && obj.addon()}
          </CipTimelineItem>)}
        </CipTimeline>
      </div>
      <div style="display:flex;justify-content:space-around;align-items:center">
        <div>基础样式(时间在左)</div>
          <CipTimeline mode="right">
          {activities.map(obj =>
            <CipTimelineItem
              key={obj.key}
              title={obj.content}
              timestamp={obj.timestamp}
              hollow={obj.hollow}
              color={obj.color}
              >
                {obj.desc}
            </CipTimelineItem>)}
          </CipTimeline>

          <div>附件收折</div>
          <CipTimeline>
          {imgFoldActivities.map(obj =>
            <CipTimelineItem
              key={obj.key}
              title={obj.content}
              timestamp={obj.timestamp}
              hollow={obj.hollow}
              color={obj.color}>
                {obj.desc}
                {obj.addon && obj.addon()}
            </CipTimelineItem>)}
          </CipTimeline>
      </div>
      <div style="display:flex;justify-content:space-around;align-items:center">
        <div>自定义点样式</div>
          <CipTimeline>
          {customActivities.map(obj =>
            <CipTimelineItem
              key={obj.key}
              title={obj.content}
              timestamp={obj.timestamp}
              hollow={obj.hollow}
              color={obj.color}
              icon={obj.icon}>
                {obj.desc}
            </CipTimelineItem>)}
          </CipTimeline>

          <div>基础样式(附件平铺)</div>
          <CipTimeline>
          {imgActivities.map(obj =>
            <CipTimelineItem
              key={obj.key}
              title={obj.content}
              timestamp={obj.timestamp}
              hollow={obj.hollow}
              color={obj.color}>
                {obj.desc}
                {obj.addon && obj.addon()}
            </CipTimelineItem>)}
          </CipTimeline>
      </div>
    </>
  }
}
