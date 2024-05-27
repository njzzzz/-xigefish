import { computed } from 'vue'
import { schemeToTableData } from '@/components/component-controller/widgets/props-controller/utils'
import { tableColumns } from './config'
import { CipTable } from '@xigefish/d-render'
import { isInputEmpty } from '@xigefish/d-render-shared'
export default {
  props: {
    scheme: {},
    modelValue: Object
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const data = computed({
      get () {
        const propList = schemeToTableData(props.scheme || {})
        propList.forEach(item => {
          item.value = props.modelValue[item.key]
        })
        return propList
      },
      set (propList) {
        const modelValue = propList.reduce((acc, prop) => {
          if (!isInputEmpty(prop.value)) {
            acc[prop.key] = prop.value
          }
          return acc
        }, {})
        emit('update:modelValue', modelValue)
      }
    })
    // const updateModelValue = (propList) => {
    // /*  const modelValue = propList.reduce((acc, prop) => {
    //     acc[prop.key] = prop.value
    //     return acc
    //   }, {}) */
    //   console.log(propList)
    //   // emit('update:modelValue', modelValue)
    // }
    return () => <CipTable
      v-model:data={data.value}
      // update:data={(val) => updateModelValue(val)}
      columns={tableColumns}
    />
  }
}
