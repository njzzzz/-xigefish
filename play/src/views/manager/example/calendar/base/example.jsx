import { ref } from 'vue'
import CipCalendar from '@xigefish/components/cip-calendar'
import { ElSelect, ElOption } from 'element-plus'
import './index.less'

export default {
  setup () {
    const option = ref(1)
    return () => <CipCalendar>
      {{
        'headerLeft': () => <ElSelect v-model={option.value}>
          <ElOption key='1' label='行政区划' value={1}/>
        </ElSelect>,
        'titleRight': () => <div class='title-btn' onClick={() => {console.log('调班')}}>调班</div>,
        'dayDetail': (date) => <ul class='day-detail'>
          <li>detail{date}</li>
          <li>detail{date}</li>
          <li>detail{date}</li>
        </ul>
      }}
    </CipCalendar>
  }
}
