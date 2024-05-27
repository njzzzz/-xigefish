import { ref, onMounted, watch, nextTick, computed } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem, ElIcon } from 'element-plus'
import { ArrowDown, CaretBottom } from '@element-plus/icons-vue'
import CipButtonText from '../cip-button-text'
import CipButton from '../cip-button'
import CipButtonPop from '../cip-button-pop'
import { getUsingConfig } from '@xigefish/config'
import { useTable } from '@xigefish/d-render-shared'
const getButtonInfo = (vnode) => {
  if (vnode.component) {
    const text = vnode.component.slots.default()
    // console.log(vnode.component.emitsOptions.click)
    const info = { ...vnode.component.ctx._.props, ...vnode.component.ctx._.attrs }
    const { onClick = (e) => vnode.component.ctx._.emit('click', e) } = info
    return {
      ...info,
      onClick,
      text
    }
  }
  return {}
}
const RenderComponent = (props) => {
  const list = props.buttonList // .value
  let dropDownNode
  let buttonNodeList = list
  if (list.length > props.limit) {
    buttonNodeList = list.slice(0, props.limit - 1)
    dropDownNode = <ElDropdown style={'margin-left: 8px'} size={props.size}>
      {{
        default: () => props.buttonComp === 'button'
          ? <CipButton square={true} icon={ArrowDown}/>
          : <CipButtonText>更多 <ElIcon><CaretBottom/></ElIcon></CipButtonText>,
        dropdown: () => <ElDropdownMenu>
          {
            list.slice(props.limit - 1).map(item => {
              const { onClick, text, disabled } = getButtonInfo(item)
              return <ElDropdownItem onClick={disabled ? undefined : onClick} disabled={disabled}>{text}</ElDropdownItem>
            })
          }
        </ElDropdownMenu>
      }}
    </ElDropdown>
  }
  const result = buttonNodeList.map(item => {
    const { onClick, text, type, showDisabledButton, dangerButton, needPop, popTitle, popPlacement, icon, disabled } = getButtonInfo(item)
    let ButtonComponent = props.buttonComp === 'button' ? CipButton : CipButtonText
    if (props.buttonComp && needPop) ButtonComponent = CipButtonPop
    const buttonProps = {
      type,
      disabled,
      showDisabledButton,
      dangerButton,
      icon,
      onClick
    } as any
    if (needPop) {
      buttonProps.popTitle = popTitle
      buttonProps.popPlacement = popPlacement
    }
    return <ButtonComponent
      {...buttonProps}
    >{text}</ButtonComponent>
  })
  if (dropDownNode) {
    result.push(dropDownNode)
  }
  return result
}
export default {
  name: 'CipButtonCollapse',
  props: {
    limit: { type: Number },
    row: { type: Object, required: true },
    buttonComp: { type: String, default: 'text', validate: (val) => ['text', 'button'].includes(val) },
    showDisabled: { type: Boolean, default: undefined }
  },
  setup (props, { slots }) {
    const cipTable = useTable() as any
    const buttonList = ref([])
    const originRef = ref()
    const handlerLimit = computed(() => {
      return getUsingConfig(props.limit, props.buttonComp === 'text' ? 3 : 4)
    })
    const showDisabledButton = computed(() => {
      return getUsingConfig(props.showDisabled, cipTable.showDisabledButton, true)
    })
    let vnodeList = []
    onMounted(() => {
      watch(() => props.row, () => {
        nextTick().then(() => collectButtons())
      }, { immediate: true, deep: true })
    })
    const collectButtons = () => {
      buttonList.value = []
      vnodeList.forEach(vnode => getButtons(vnode))
    }
    const getButtons = (vnode) => {
      if (vnode.shapeFlag === 16) { // 数组
        vnode.children.forEach(v => getButtons(v))
      }
      if (vnode.shapeFlag === 17) { // 原生的dom
        vnode.children.forEach(v => getButtons(v))
      }
      if (vnode.shapeFlag === 36) { // 组件
        const componentName = (vnode.type.name || '').toLowerCase()
        if (componentName.indexOf('button') > -1) {
          const info = getButtonInfo(vnode)
          if (showDisabledButton.value === false && info.disabled) {
            console.log('button 不符合展示条件')
          } else {
            buttonList.value.push(vnode)
          }
        } else {
          if (vnode.component) {
            const children = vnode.component.subTree.children || []
            children.forEach(v => getButtons(v))
          }
        }
      }
    }
    return () => {
      vnodeList = slots.default?.()
      return <div class={'cip-table-handler'}>
        <div ref={el => { originRef.value = el }} style={'display: none'}>{vnodeList}</div>
        <RenderComponent limit={handlerLimit.value} size={cipTable.size} buttonList={buttonList.value} buttonComp={props.buttonComp} />
      </div>
    }
  }
}
