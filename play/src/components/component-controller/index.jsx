import ExampleBlock from '../example-block'
import PropsController from './widgets/props-controller'
import SlotsController from './widgets/slots-controller'
import EventsController from './widgets/events-controller'
export default {
  inheritAttrs: false,
  props: {
    scheme: {
      type: Object,
      default: () => ({})
    },
    propsConfig: {},
    eventsConfig: {},
    slotsConfig: {}
  },
  emits: ['update:propsConfig', 'update:slotsConfig', 'update:eventsConfig'],
  setup (props, { emit }) {
    return () => <>
      {props.scheme.propsScheme && <ExampleBlock title={'Props'}>
        <PropsController
          modelValue={props.propsConfig}
          onUpdate:modelValue={(val) => emit('update:propsConfig', val)}
          scheme={props.scheme.propsScheme}
        />
      </ExampleBlock>}
      {props.scheme.eventsScheme && <ExampleBlock title={'Events'}>
        <EventsController
          modelValue={props.eventsConfig}
          onUpdate:modelValue={(val) => emit('update:eventsConfig', val)}
          scheme={props.scheme.eventsScheme}
        />
      </ExampleBlock>}
      {props.scheme.slotsScheme && <ExampleBlock title={'Slots'}>
        <SlotsController
          modelValue={props.slotsConfig}
          onUpdate:modelValue={(val) => emit('update:slotsConfig', val)}
          scheme={props.scheme.slotsScheme}
        />
      </ExampleBlock>}
    </>
  }
}
