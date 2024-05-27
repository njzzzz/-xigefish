import './index.less'

export default {
  name: 'collapse-switch',
  props: {
    isCollapse: Boolean,
    nonCollapsible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:isCollapse'],
  setup (props, { emit }) {
    const toggleCollapse = function () {
      emit('update:isCollapse', !props.isCollapse)
    }
    return () => {
      if (!props.nonCollapsible) {
        return (<div className={'top-left__aside__switch'}>
          <i onClick={toggleCollapse}
             className={`${props.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'} fold-icon`} />
        </div>)
      } else {
        return null
      }
    }
  }
}
