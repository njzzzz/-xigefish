import { computed, ref } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'
import { useFormLayoutOptions, layoutProps } from '@xigefish/d-render-shared'
export default {
  name: 'BasicCollapse',
  props: layoutProps,
  setup (props, { slots, emit }) {
    const { options, updateConfig, ...handler } = useFormLayoutOptions({ props, emit })
    const grid = computed(() => {
      return props.config._isGrid
    })
    const active = ref('')
    if (props.config.active) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      active.value = props.config.active
    }
    return () => (<ElCollapse v-model={active.value}>
      {options.value.map((option, optionIndex) => {
        const { children, ...itemConfig } = option
        return <ElCollapseItem key={itemConfig.name || optionIndex} name={itemConfig.name} title={itemConfig.title}>
          <div class={{ 'cip-form--grid': grid.value }}
            style={{ gridTemplateColumns: `repeat(${typeof grid.value === 'number' ? grid.value : 3},1fr)` }}>
            {slots.item?.({ children, optionIndex, isShow: props.config._isShow, ...handler })}
          </div>
        </ElCollapseItem>
      })}
    </ElCollapse>)
  }
}
