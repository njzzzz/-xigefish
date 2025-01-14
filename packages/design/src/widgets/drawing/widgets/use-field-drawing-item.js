import { computed, inject } from 'vue'
import { DR_DESIGN_KEY } from '@xigefish/d-render-design/constant'
export const useFieldDrawingItem = ({ props, emit }) => {
  // FEAT: drawType优先级高于type
  const pageDesign = inject(DR_DESIGN_KEY, {})
  const computedConfig = computed(() => {
    let result = props.config || {}
    if (result.drawType) {
      result = { ...result, type: result.drawType }
    }
    return result
    // return handleFormConfig(props.config)
  })
  const drawType = computed(() => {
    return pageDesign.drawTypeMap?.[computedConfig.value.type]
  })
  const deleteItem = (e) => {
    emit('delete')
    e.stopPropagation()
  }
  const copyItem = (e) => {
    emit('copy')
    e.stopPropagation()
  }
  const putStrategy = pageDesign.putStrategy || {}
  return {
    computedConfig,
    deleteItem,
    copyItem,
    drawType,
    putStrategy
  }
}
