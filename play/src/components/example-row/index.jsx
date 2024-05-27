import './index.less'
const ExampleRow = (props, { slots }) => <div class={'example-row'}>
  <label class={'example-row__label'} style={{ flexBasis: '120px' }}>{slots.label ? slots.label() : props.label}</label>
  <div class={'example-row__content'}>{slots.default()}</div>
</div>

ExampleRow.props = {
  label: String
}

export default ExampleRow
