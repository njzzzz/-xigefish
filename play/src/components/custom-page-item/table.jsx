import { computed, watch, ref } from 'vue'
import { getFieldValue } from '@xigefish/d-render-shared'
import { CipTable } from '@xigefish/d-render'
export default {
  props: {
    data: {},
    config: {},
    dataMap: {},
    relevance: {}
  },
  setup (props) {
    const outParams = computed(() => props.relevance.reduce((acc, r) => {
      acc[r.targetKey] = getFieldValue(props.dataMap, r.sourceKey)
      return acc
    }, {}))
    const data = ref([])
    const getItemList = () => {
      // if (isEmptyObject(outParams.value.searchFilter)) return []
      return (new Array(10)).fill(outParams.value.searchFilter)
    }
    const configProps = computed(() => props.config?.props || {})

    return () => <CipTable data={data.value} columns={configProps.value.columns}></CipTable>
  }
}
