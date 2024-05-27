import { computed, defineComponent, h } from 'vue'
import { ElButton } from 'element-plus'
import { useConfig, useComponentProps } from '@xigefish/config'
import { setFieldValue, generateProps, generateEmits } from '@xigefish/d-render-shared'
import { componentScheme } from './component.scheme'
import { useButtonConfigMap } from './use-button-config-map'
import { getFieldValue } from '@xigefish/d-render-shared'
export default defineComponent({
  name: 'CipButton',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, context) {
    const xdpConfig = useConfig()
    const buttonConfigMap = useButtonConfigMap()

    const buttonConfig = computed(() => {
      const config = (buttonConfigMap.value[props.buttonType as any] || {})
      return Object.keys(config).reduce((acc, key) => {
        if (config[key]) {
          setFieldValue(acc, `button.${key}`, config[key])
        }
        return acc
      }, {})
    })
    const buttonPropsKey = [
      ['size', 'default'],
      'type',
      'plain',
      // 'text', 此text不需要拦截
      'bg',
      'link',
      'round',
      'circle',
      'loading',
      'loadingIcon',
      'disabled',
      'icon',
      'autofocus',
      'nativeType',
      'autoInsertSpace',
      'color',
      'dark'
    ]
    // 自定义， 非el-table提供功能 是否地图按钮，是否为方形
    const customPropsKey = [
      'square',
      'map'
    ]

    const elButtonProps = useComponentProps(props, 'button', buttonPropsKey, [buttonConfig, xdpConfig]) // getComponentProps('button', buttonPropsKey)
    const customProps = useComponentProps(props, 'button', customPropsKey, [buttonConfig, xdpConfig])
    const buttonText = getFieldValue(buttonConfig.value, 'button.text')
    return () => h(
      ElButton,
      {
        class: [
          'cip-button',
          {
            'cip-button--square': customProps.value.square,
            'cip-button--map': customProps.value.map,
            'cip-button-text': elButtonProps.value.link,
            [`cip-button-text--${elButtonProps.value.size}`]: elButtonProps.value.link
          }
        ],
        text: props.text,
        ...elButtonProps.value,
        onClick: (...args) => context.emit('click', ...args)
      },
      {
        // 原型按钮和方型按钮不支持文字展示
        default: (customProps.value.circle || customProps.value.square)
          ? undefined
          : () => (context.slots.default?.({ text: buttonText ?? '' }) || buttonText),
        icon: !elButtonProps.value.icon
          ? undefined
          : () => typeof elButtonProps.value.icon === 'string'
              ? h('i', { class: elButtonProps.value.icon })
              : h(elButtonProps.value.icon)
      }
    )
  }
})
