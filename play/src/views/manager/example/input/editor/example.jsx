import { ref } from 'vue'
import CipEditor from '@xigefish/d-render-plugin-cci/esm/input/basic/editor'
export default {
  setup () {
    const item = ref({
      editorValue: '一切为了人民美好的生活'
    })
    return () => <div >
      <CipEditor v-model={item.value.editorValue} config={{}}/>
    </div>
  }
}
