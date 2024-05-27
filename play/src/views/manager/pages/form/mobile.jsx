import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/info'
import CipForm from '@xigefish/d-render/cip-form'
import { formFieldList } from './config'
export default {
  setup () {
    const model = ref({})
    return () => <LayoutInfoThemeOne>
      <div style={'display: flex; width: 100%; padding: 20px;box-sizing: border-box;'}>
        <CipForm
          equipment={'mobile'}
          style={'flex-grow:2'}
          v-models={[[model.value, 'model']]}
          fieldList={formFieldList}
        />
        <div style={'width: 300px;flex-shrink: 0; margin-left: 20px; background: #ddd'}>
          <CipForm
            equipment={'mobile'}
            showOnly={true}
            model={model.value}
            fieldList={formFieldList}
          ></CipForm>
        </div>
        <div style={'width: 300px;flex-shrink: 0; margin-left: 20px; padding:0 12px;background: #ddd'}>
          <CipForm
            showOnly={true}
            model={{ value: JSON.stringify(model.value, null, 2) }}
            fieldList={[{ key: 'value', config: { type: 'textarea' } }]}
          ></CipForm>
        </div>
      </div>
    </LayoutInfoThemeOne>
  }
}
