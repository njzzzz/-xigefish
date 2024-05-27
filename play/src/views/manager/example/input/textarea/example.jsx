import { ref } from 'vue'
import CipInput from '@xigefish/components/cip-input'
import CipForm from '@xigefish/d-render/cip-form'
export default {
  setup () {
    const containerStyle = {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gridGap: '20px'
    }
    const item = ref({
      complete: '一切为了人民美好的生活'
    })
    return () => <div style={containerStyle}>
      <div>
        默认
        <CipInput type={'textarea'} />
      </div>
      <div>
        完成
        <CipInput type={'textarea'} v-model={item.value.complete} />
      </div>
      <div>
        禁用
        <CipInput type={'textarea'} disabled modelValue={'一切为了人民美好的生活'} />
      </div>
      <div class={'el-form-item is-error'} style={{ display: 'block' }}>
        告警
        <CipInput type={'textarea'} modelValue={'一切为了人民美好的生活'} />
      </div>
      <div>
        常用语言 【注：无常用语言功能】
        <CipInput type={'textarea'} />
      </div>
      <div>
        字数限制
        <CipInput type={'textarea'} maxlength={50} showWordLimit={true}/>
      </div>
      <CipForm model={item.value} fieldList={[
        {
          key: 'innerForm',
          config: {
            label: '表单内使用',
            labelPosition: 'top',
            required: true,
            type: 'textarea',
            limit: 50
          }
        }]}></CipForm>
    </div>
  }
}
