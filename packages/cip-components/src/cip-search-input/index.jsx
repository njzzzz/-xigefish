import CipButton from '../cip-button'
import { Search } from '@element-plus/icons-vue'
import { generateProps, generateEmits } from '@xigefish/shared'
import { componentScheme } from './component.scheme'

export default {
  name: 'CipSearchInput',
  props: generateProps(componentScheme),
  emits: generateEmits(componentScheme),
  setup (props, { emit, slots }) {
    const emitValue = (e) => {
      emit('update:modelValue', e.target.value)
    }
    return () => <div class={'cip-search-input__wrapper'}>
      <div class={'cip-search-input'}>
        <input class={'cip-search-input__input'} value={props.modelValue} onInput={(e) => emitValue(e)}/>
        <CipButton
          class={'cip-search-input__button'}
          type={'primary'}
          icon={Search}
          onClick={() => emit('search')}
          loading={props.loading}
        >{props.buttonText || slots.buttonText?.() || '搜索'}</CipButton>
      </div>
      {slots?.append && <div style={{ marginLeft: '12px' }}>{slots?.append()}</div>}
    </div>
  }
}
