import {computed, defineAsyncComponent} from 'vue'
import { formInputProps, fromInputEmits, useFormInput, useElementFormEvent } from '@xigefish/d-render-shared'
import { CipButtonText } from '@xigefish/button'
import { Plus } from '@element-plus/icons-vue'
const CipFormItem = defineAsyncComponent(() => import('@xigefish/d-render/cip-form-item'))
export default {
  props: formInputProps,
  emits: [...fromInputEmits],
  setup (props, context) {
    const { handleChange } = useElementFormEvent()
    const formInput = useFormInput(props, context)
    const { securityConfig, emitModelValue } = formInput
    const updateModelValue = (val, index) => {
      const data = props.modelValue
      data[index] = val
      emitModelValue(data)
    }
    const tableItems = computed(() => {
      return securityConfig.value.options[0]?.children || []
    })
    const addItem = () => {
      const val = Array.isArray(props.modelValue) ? props.modelValue : []
      val.push({})
      handleChange(val)
      emitModelValue(val)
    }

    return () => <div class={'basic-table__mobile'}>
      {
        (props.modelValue || []).map((row, rowIndex) =>
          <div>
            <div>{rowIndex + 1}</div>
            {tableItems.value.map((option, optionIndex) => {
              const inputConfig = { ...option.config }
              inputConfig.width = '100%'
              inputConfig.ruleKey = `${props.fieldKey}.${rowIndex}.${option.key}`
              return <CipFormItem
                key={`${rowIndex}-${optionIndex}`}
                model={row}
                fieldKey={option.key}
                config={inputConfig}
                inTable={true}
                tableData={props.modelValue}
                tableDependOnValues={props.dependOnValues}
                onUpdate:model={(val) => {
                  row = val
                  updateModelValue(val, rowIndex)
                }}
              />
            })}
          </div>
        )
      }
      <CipButtonText size="large" icon={Plus} onClick={() => addItem()}/>
    </div>
  }
}
