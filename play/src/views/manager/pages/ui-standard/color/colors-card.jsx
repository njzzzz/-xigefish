import { onMounted, ref } from 'vue'
import { ElTooltip } from 'element-plus'
import styles from './colors-card.modules.less'
import ColorCard from './color-card'
export default {
  props: {
    type: String,
    validate: (val) => ['primary', 'danger', 'warning', 'success', 'info'].includes(val)
  },
  setup (props) {
    const mainColor = ref('')
    const slaveColors = ref({})
    const colors = ['light-3', 'light-5', 'light-7', 'light-8', 'light-9', 'dark-2']
    onMounted(() => {
      const styles = getComputedStyle(document.documentElement)
      mainColor.value = styles.getPropertyValue(`--el-color-${props.type}`)
      colors.forEach(value => {
        slaveColors.value[value] = styles.getPropertyValue(`--el-color-${props.type}-${value}`)
      })

      // mainColor.value = document.body.style.getPropertyValue(`--el-color-${props.type}`)
    })
    return () => <div class={styles.card}>
      <ColorCard class={styles.main} cssVar={`--el-color-${props.type}`}/>
      <div class={styles['slave-wrapper']}>
        {
          colors
            .map(value =>
              <ElTooltip key={value} >
                {{
                  default: () => <div class={styles.slave}
                                     style={{
                                       backgroundColor: `var(--el-color-${props.type}-${value})`
                                     }}></div>,
                  content: () => <div style={{ color: `var(--el-color-${props.type}-${value})` }}>
                    {`--el-color-${props.type}-light-${value}`}<br/>
                    {slaveColors.value[value]}
                  </div>
                }}
              </ElTooltip>
            )
        }

      </div>
    </div>
  }
}
