import { ref } from 'vue'
import CipSearchForm from '@xigefish/d-render/cip-search-form'
import { generateSearchFieldList } from '../util'

export default {
  setup () {
    const sizeOptions = ['small', 'default', 'large']
    const searchFilter = ref({})
    return () => <>
      {sizeOptions.map((size, index) => <CipSearchForm
        style={index > 0 ? 'margin-top: 8px' : ''}
        key={size}
        size={size}
        v-model:model={searchFilter.value}
        fieldList={generateSearchFieldList(6)}
      />)}
    </>
  }
}
