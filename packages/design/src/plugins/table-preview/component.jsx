import { CipTableRender } from '@xigefish/d-render'
export default {
  props: {
    schema: {},
    model: {},
    equipment: {}
  },
  emits: ['update:model'],
  setup (props, { emit }) {
    // 初始化model
    emit('update:model', [])
    return () => <CipTableRender schema={props.schema} equipment={props.equipment} model={props.model} class={'dr-table-preview'}></CipTableRender>
  }
}
