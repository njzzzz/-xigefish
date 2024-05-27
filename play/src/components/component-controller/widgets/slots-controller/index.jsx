import { computed, h } from 'vue'
import { schemeToTableData } from './utils'
import { tableColumns } from './config'
import CipTable from '@xigefish/d-render/cip-table'
import { debounce, isInputEmpty } from '@xigefish/d-render-shared'
export default {
  props: {
    scheme: {},
    modelValue: Object
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const data = computed(
      () => {
        return schemeToTableData(props.scheme || {})
      }
    )

    const updateModelValue = debounce(function (slotsList) {
      const modelValue = slotsList.reduce((acc, prop) => {
        if (!isInputEmpty(prop.value)) {
          try {
            // eslint-disable-next-line no-eval,no-new-func
            acc[prop.key] = new Function('h', `return  ${prop.value}`)(h) // eval(prop.value) //() => h("div",null,["123"])'
          } catch (e) {
            console.log(e)
          }
        }
        return acc
      }, {})
      emit('update:modelValue', modelValue)
    }, 1000, false)

    return () => <CipTable
      data={data.value}
      onUpdate:data={updateModelValue}
      columns={tableColumns}
    />
  }
}
