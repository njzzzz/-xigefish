import { ref } from 'vue'
import LayoutInfoThemeOne from '@xigefish/page-layout/handle'
import CipForm from '@xigefish/d-render/cip-form'
import { formFieldList } from './config'
import CipButton from '@xigefish/components/cip-button'
export default {
  setup () {
    const formRef = ref()
    const triggerValidate = () => {
      const cb = (e) => {
        console.log('e', e)
      }
      formRef.value.validate(cb)
    }
    const model = ref({
      table: [
        { username: 'ZhangSan', userName: '张三', sex: 'M', birthday: '2022-10', status: 1 },
        { username: 'LiSi', userName: '李四', sex: 'F', birthday: '2022-08', status: 0 }
      ],
      tableRadio: [
        { username: 'ZhangSan', userName: '张三', sex: 'M', birthday: '2022-10', status: true },
        { username: 'LiSi', userName: '李四', sex: 'F', birthday: '2022-08', status: false },
        { username: 'WangWu', userName: '王五', sex: 'F', birthday: '2022-06', status: false }
      ]
    })
    return () => <LayoutInfoThemeOne>
      {{
        handler: () => <CipButton onClick={() => triggerValidate()}>触发表单验证</CipButton>,
        default: () => <>
          <div style={'display: flex; width: 100%; padding: 20px;box-sizing: border-box;'}>
            <CipForm
              ref={formRef}
              useDirectory={true}
              style={'flex-grow:2'}
              v-models={[[model.value, 'model']]}
              fieldList={formFieldList}
            />
            <div style={'width: 300px;flex-shrink: 0; margin-left: 20px;'}>
              <CipForm
                showOnly={true}
                model={model.value}
                fieldList={formFieldList}
              />
            </div>
            <div style={'width: 300px;flex-shrink: 0; margin-left: 20px; padding:0 12px;background: #ddd'}>
              <CipForm
                showOnly={true}
                model={{ value: JSON.stringify(model.value, null, 2) }}
                fieldList={[{ key: 'value', config: { type: 'textarea' } }]}
              />
            </div>
          </div>
        </>
      }}

    </LayoutInfoThemeOne>
  }
}
