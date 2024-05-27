import { ref } from 'vue'
import { ElTag } from 'element-plus'
import { activities } from '@/views/manager/example/timeline/base/config.js'
import CipTimeline from '@xigefish/components/cip-timeline'
import CipTimelineItem from '@xigefish/components/cip-timeline-item'
import { formFieldListTag } from '@/views/manager/pages/components/select/config.js'
import CipForm from '@xigefish/d-render/cip-form'
export default {
  setup () {
    const colorOptions = [
      {
        type: '',
        name: '蓝色'
      }, {
        type: 'success',
        name: '绿色'
      }, {
        type: 'warning',
        name: '黄色'
      }, {
        type: 'danger',
        name: '红色'
      }
    ]
    const select3 = ref({
      disabled: '选中',
      click: '选中',
      float: '选中',
      multiplyDisabled: [1, 2],
      multiplySearch: []
    })
    return () => <>
      <div>基础标签</div>
      <div>
        <span style="margin-left: 0.5rem;">
          <ElTag type="info">默认标签</ElTag>
        </span>
        <span style="margin-left: 0.5rem;">
          <ElTag type="info" effect="plain">默认标签</ElTag>
        </span>
      </div>
      <br/>
      <div>标签可删除</div>
      <div>
        <span style="margin-left: 0.5rem;">
          <ElTag type="info" closable>标签可删除</ElTag>
        </span>
        <span style="margin-left: 0.5rem;">
          <ElTag type="info" effect="plain" closable >标签可删除</ElTag>
        </span>
      </div>
      <br/>
      <div>色彩样式一</div>
      <div>
        {colorOptions.map(type =>
          <span style="margin-left: 0.5rem;">
            <ElTag
              key={type.type}
              type={type.type}>
                {type.name}
            </ElTag>
        </span>)}
      </div>
      <br/>
      <div>色彩样式二</div>
      <div>
        {colorOptions.map(type =>
          <span style="margin-left: 0.5rem;">
            <ElTag
              effect='dark'
              key={type.type}
              type={type.type}>
                {type.name}
            </ElTag>
        </span>)}
      </div>
      <br/>
      <div>使用样例</div>
      <br/>
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
        <br/>
        <CipForm fieldList={formFieldListTag} v-model:model={select3.value} grid={3}></CipForm>
    </>
  }
}
