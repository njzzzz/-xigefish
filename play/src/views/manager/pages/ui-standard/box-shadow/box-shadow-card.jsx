
const levelMap = {
  0: null,
  1: '-lighter',
  2: '-light',
  3: ''
}

export default {
  props: {
    level: Number
  },
  setup (props) {
    return () => <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--el-bg-color)',
      border: props.level === 0 ? '1px solid var(--el-border-color)' : undefined,
      boxShadow: props.level === 0 ? undefined : `var(--el-box-shadow${levelMap[props.level]})`
    }}>
      第{props.level}层
    </div>
  }
}
