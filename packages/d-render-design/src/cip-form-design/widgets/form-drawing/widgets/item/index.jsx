import { ref } from 'vue'
import { CipFormItem } from '@xigefish/d-render'
import { drawingContentProps } from '../common-props'
import { useFormDrawingItem } from '../use-form-drawing-item'
export default {
  name: 'FormDrawingItem',
  inheritAttrs: false,
  props: drawingContentProps,
  emits: ['delete', 'copy'],
  setup (props, { emit, attrs }) {
    const model = ref({})

    const { computedConfig } = useFormDrawingItem({ props, emit })
    console.log(computedConfig, 'computedConfig')
    return () => (
      <>
        <div class={'form-drawing__item__mask'}/>
        <CipFormItem
          {...attrs}
          model={model.value}
          style={{
            width: computedConfig.value.width
          }}
          onUpdate:model={(val) => { model.value = val }}
          fieldKey={props.fieldKey}
          formLabelPosition={props.formLabelPosition}
          config={computedConfig.value}
          showTemplate={true}
        />
      </>
    )
  }
}
