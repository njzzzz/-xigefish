import { Picker as VanPicker, CheckboxGroup as VanCheckboxGroup, Checkbox as VanCheckbox, CellGroup as VanCellGroup, Cell as VanCell } from 'vant'
import { computed, ref, onBeforeUpdate } from 'vue'
import { useOptions, formInputProps, fromInputEmits } from '@xigefish/d-render-shared'
export default {
  props: { ...formInputProps, customFieldName: {}, columns: {} },
  emits: [...fromInputEmits, 'confirm', 'cancel'],
  setup (props, { emit }) {
    // 是否多选
    const multiple = computed(() => {
      return props.config?.multiple ?? false
    })
    const { options, getValue } = useOptions(props, multiple)
    const confirm = (value) => {
      if (multiple.value) {
        emit('confirm', checked.value)
      } else {
        if (props.customFieldName.children) {
          value = value[value.length - 1]
        }
        emit('confirm', value)
      }
    }
    const cancel = (val) => {
      if (multiple.value) {
        checked.value = getValue(props.modelValue)
      }
      emit('cancel', val)
    }

    // 多选
    console.log('init', getValue(props.modelValue), props.modelValue)
    const checked = ref(getValue(props.modelValue))
    const checkboxRefs = ref([])
    const toggle = (index) => {
      checkboxRefs.value[index]?.toggle()
    }
    onBeforeUpdate(() => {
      checkboxRefs.value = []
    })
    const Buttons = () =>
      <div class="van-picker__toolbar">
        <button type="button" class="van-picker__cancel" onclick={cancel}>取消</button>
        <div class="van-picker__title van-ellipsis">{props.config.label}</div>
        <button type="button" class="van-picker__confirm" onclick={confirm}>确认</button>
      </div>
    const CellSlot = (item, index) => <VanCell key={index}
      title={item[props.customFieldName.text] ?? item}
      onclick={toggle(index)}>
      {{
        'right-icon': () => <VanCheckbox name={item?.value ?? item} ref={el => { checkboxRefs[index] = el }} />
      }}
    </VanCell>
    const CellSlots = () => options.value.map((v, idx) => CellSlot(v, idx))
    const Checkbox = () => <VanCheckboxGroup v-model={checked.value}>
      {Buttons()}
      <VanCellGroup inset>
        {CellSlots()}
      </VanCellGroup>
    </VanCheckboxGroup>

    // 单选
    const Picker = () => <VanPicker title={props.config.label}
      columns={props.columns}
      columns-field-names={props.customFieldName}
      onConfirm={confirm}
      onCancel={cancel} />

    return () => multiple.value ? Checkbox() : Picker()
  }
}
