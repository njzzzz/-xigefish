import { ElPopconfirm } from 'element-plus'
import CipButtonText from '../cip-button-text'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CipButtonPop',
  props: {
    popTitle: String,
    popPlacement: String
  },
  inheritAttrs: false,
  setup (props, { attrs, slots }) {
    /* 修改danger类型的按钮 转换为primary [注： UI标准中无颜色区分] */
    return () => {
      const { onClick, ...inheritAttrs } = attrs as { onClick: <T>(e?: MouseEvent, bool?: boolean) => T}
      // 将按钮的click设置为noop
      return <ElPopconfirm
        title={props.popTitle || '确定删除该信息'}
        cancelButtonType={'default'}
        onConfirm={(e) => onClick(e, true)}
      >
        {{
          reference: () => <CipButtonText
            {...inheritAttrs}
            onClick={ () => {} }
          >
            {slots.default?.()}
          </CipButtonText>
        }}
    </ElPopconfirm>
    }
  }
})
