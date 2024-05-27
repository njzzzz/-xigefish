import { layoutProps, useFormLayoutOptions } from '@xigefish/d-render-shared'

export default {
  name: 'BasicGridMobile',
  props: layoutProps,
  setup (props, { slots, emit }) {
    const { options, updateConfig, ...handler } = useFormLayoutOptions({ props, emit })
    return () => <div>
      {options.value.map(
        ({ children }, optionIndex) => <div key={optionIndex}>
          {slots.item({
            children,
            optionIndex,
            isShow: props.config._isShow,
            ...handler
          })}
        </div>
      )}
    </div>
  }
}
