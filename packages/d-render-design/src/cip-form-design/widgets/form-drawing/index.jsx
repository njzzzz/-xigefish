import { h, watch } from 'vue'
import VueDraggable from 'vuedraggable'
import { CipForm } from '@xigefish/d-render'
import { isNotEmpty } from '@xigefish/d-render-shared'
import { useFormDrawing, useList } from './use-form-drawing'
import FormDrawingContent from './widgets/content'
export default {
  props: {
    data: { type: Object, default: () => ({}) },
    equipment: { type: String },
    selectId: [Number, String]
  },
  emits: ['updateList', 'select'],
  setup (props, context) {
    const { list, updateList } = useList({ props, emit: context.emit })
    const { selectItem, deleteItem, copyItem } = useFormDrawing({ list, updateList, emit: context.emit })
    const addItem = ({ newIndex }) => {
      const newItem = list.value[newIndex]
      context.emit('select', newItem)
    }
    const updateConfig = (element, val) => {
      const cloneList = props.data?.list || []
      element.config = val
      updateList(cloneList, 'layoutUpdate')
    }

    // 表单内容包含 布局和input && table(特殊)
    const FormContent = (...args) => {
      const { element, index } = args[0]
      const formContentProps = {
        selectId: props.selectId,
        element,
        index,
        formLabelPosition: props.data.formLabelPosition,
        onUpdateConfig: (val) => {
          updateConfig(element, val)
        },
        onClick: () => { selectItem(element) },
        onDelete: () => deleteItem(index),
        onCopy: () => copyItem(index),
        onSelectItem: (element) => selectItem(element)
      }
      return h(FormDrawingContent, { ...formContentProps })
    }
    // 默认选中第一个
    watch(() => props.selectId, (val) => {
      if (!val && list.value.length > 0) {
        selectItem(list.value[0])
      }
    }, { immediate: true })
    return () => <div class={'cip-fd-form-drawing-container'}>
      {list.value.length === 0 && <div class={'empty-form--text'}>从左侧拖拽来添加字段</div>}
      <div class={['cip-fd-form-drawing', `cip-fd-form-drawing--${props.equipment}`]}>
        <CipForm

          fieldList={[]}
          size={props.data.tableSize || 'default'}
          labelWidth={`${props.data.labelWidth}px`}
          labelPosition={props.data.labelPosition}
          labelSuffix={props.data.labelSuffix}
          equipment={props.equipment}
        >
          <VueDraggable
            modelValue={list.value}
            onUpdate:modelValue={(val) => updateList(val)}
            itemKey={'id'}
            group={'components'}
            handle={'.move-icon'}
            ghostClass={'ghost'}
            animation={200}
            componentData={{
              class: 'cip-fd-form-content__wrapper',
              style: isNotEmpty(props.data.grid)
                ? `display: grid; grid-template-columns: repeat(${props.data.grid},1fr);align-content: start;`
                : ''
            }}
            onAdd={({ newIndex }) => addItem({ newIndex })}>
            {{
              item: FormContent
            }}
          </VueDraggable>
        </CipForm>
      </div>
    </div>
  }
}
